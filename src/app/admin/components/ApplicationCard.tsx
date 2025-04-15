import React, { use } from "react";
import {
  CardContent,
  Select,
  MenuItem,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { StyledCard, DeleteButton, StatusText, StatusChip } from "./StyledComponents";
import { Application, Master } from "../types";
import { sendTelegramMessage } from "@/app/lib/telegram";
import { supabase } from "@/app/components/supabaseClient";
import { useSession } from "next-auth/react";

interface ApplicationCardProps {
  application: Application;
  masters: Master[];
  onStatusChange: (applicationId: number, newStatus: string) => void;
  onAssignMaster: (applicationId: number, masterId: number) => void;
  onDelete: (id: number) => void;
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "В обработке";
    case "approved":
      return "Одобрено";
    case "rejected":
      return "Отклонено";
    default:
      return status;
  }
};

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  masters,
  onStatusChange,
  onAssignMaster,
  onDelete,
}) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const handleStatusChange = async (applicationId: number, newStatus: string) => {
    try {
      await onStatusChange(applicationId, newStatus);
      
      const statusMessage = `
  📋 Обновление заявки #${applicationId}
  
  👤 Клиент: ${application.name}
  📱 Телефон: ${application.phone}
  ${application.email ? `✉️ Email: ${application.email}` : ''}
  🔧 Услуга: ${application.techType}
  📝 Сообщение: ${application.description}
  
  📊 Новый статус: ${getStatusLabel(newStatus)}
  
  #обновление_заявки`.trim();
  
      await sendTelegramMessage(statusMessage);
    } catch (error) {
      console.error('Error sending status change notification:', error);
    }
  };
  
  const handleMasterAssign = async (applicationId: number, masterId: number) => {
    try {
      await onAssignMaster(applicationId, masterId);
      
      const selectedMaster = masters.find(m => m.id === masterId);
      const masterMessage = `
  📋 Обновление заявки #${applicationId}
  
  👤 Клиент: ${application.name}
  📱 Телефон: ${application.phone}
  ${application.email ? `✉️ Email: ${application.email}` : ''}
  🔧 Услуга: ${application.techType}
  📝 Сообщение: ${application.description}
  
  👨‍🔧 Назначенный мастер:
  👤 ${selectedMaster ? selectedMaster.name : 'Не назначен'}
  🛠️ ${selectedMaster ? selectedMaster.specialization : ''}
  
  #обновление_заявки`.trim();
  
      await sendTelegramMessage(masterMessage);
    } catch (error) {
      console.error('Error sending master assignment notification:', error);
    }
  };
  return (
    <StyledCard>
      <DeleteButton
        onClick={() => onDelete(application.id)}
        
        color="error"
        size="small"
        title="Удалить заявку"
      >
        <DeleteIcon />
      </DeleteButton>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Заявка #{application.id}
            </Typography>
            <StatusChip status={application.status}>
              <StatusText>{getStatusLabel(application.status)}</StatusText>
            </StatusChip>
              
            
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Клиент
            </Typography>
            <Typography variant="body1">{application.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              📱 {application.phone}
            </Typography>
            {application.email && (
              <Typography variant="body2" color="textSecondary">
                ✉️ {application.email}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Услуга
            </Typography>
            <Typography variant="body1">{application.techType}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Сообщение
            </Typography>
            <Typography variant="body2">{application.description}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Статус
            </Typography>
            <Select
              value={application.status}
              onChange={(e) => handleStatusChange(application.id, e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="pending">В обработке</MenuItem>
              <MenuItem value="approved">Одобрено</MenuItem>
              <MenuItem value="rejected">Отклонено</MenuItem>
            </Select>
          </Box>

            {
              isAdmin && (

          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Мастер
            </Typography>
            <Select
              value={application.master_id || ""}
              onChange={(e) =>
                handleMasterAssign(application.id, Number(e.target.value))
              }
              size="small"
              fullWidth
              displayEmpty
            >
              
              <MenuItem value="">Выберите мастера</MenuItem>
              {masters.map((master) => (
                <MenuItem key={master.id} value={master.id}>
                  {master.name} ({master.specialization})
                </MenuItem>
              ))}
            </Select>
          </Box>
              )
            }

          <Typography variant="caption" color="textSecondary">
            Создано:{" "}
            {new Date(application.created_at).toLocaleDateString("ru-RU")}
          </Typography>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};
