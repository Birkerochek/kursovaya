import React from "react";
import {
  CardContent,
  Select,
  MenuItem,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { StyledCard, DeleteButton, StatusChip } from "./StyledComponents";
import { Application, Master } from "../types";

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
            <StatusChip
              label={getStatusLabel(application.status)}
              status={application.status}
              size="small"
            />
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
            <Typography variant="body1">{application.service}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Сообщение
            </Typography>
            <Typography variant="body2">{application.message}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Статус
            </Typography>
            <Select
              value={application.status}
              onChange={(e) => onStatusChange(application.id, e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem value="pending">В обработке</MenuItem>
              <MenuItem value="approved">Одобрено</MenuItem>
              <MenuItem value="rejected">Отклонено</MenuItem>
            </Select>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Мастер
            </Typography>
            <Select
              value={application.master_id || ""}
              onChange={(e) =>
                onAssignMaster(application.id, Number(e.target.value))
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

          <Typography variant="caption" color="textSecondary">
            Создано:{" "}
            {new Date(application.created_at).toLocaleDateString("ru-RU")}
          </Typography>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};
