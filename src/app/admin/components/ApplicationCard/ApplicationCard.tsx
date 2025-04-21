import {
  CardContent,
  Select,
  MenuItem,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { sendTelegramMessage } from "@/app/lib/telegram";
import { useSession } from "next-auth/react";
import { Application, Master } from "../../types";
import { DeleteButton, StatusChip, StatusText, StyledCard } from "../StyledComponents";
import useStatusChange from "./hooks/useStatusChange";
import useMasterAssign from "./hooks/useMasterAssign";


interface ApplicationCardProps {
  application: Application;
  masters: Master[];
  onStatusChange: (applicationId: number, newStatus: Application['status']) => Promise<void>;
  onAssignMaster: (applicationId: number, masterId: number) => Promise<void>;
  onDelete: (id: number) => void;
}



export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  masters,
  onAssignMaster,
  onStatusChange,
  onDelete,
}) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const { handleStatusChange, getStatusLabel } = useStatusChange({ application, onStatusChange });
  const { handleMasterAssign } = useMasterAssign({ application, masters, onAssignMaster });
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
              onChange={(e) => handleStatusChange(application.id, e.target.value as Application['status'])}
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
