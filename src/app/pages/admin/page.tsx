"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  Typography,
  Container,
  Box,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { Delete as DeleteIcon } from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

const DeleteButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
});

const StatusChip = styled(Chip)(({ status }: { status: string }) => ({
  backgroundColor:
    status === "approved"
      ? "#4caf50"
      : status === "rejected"
        ? "#f44336"
        : "#ff9800",
  color: "white",
  fontWeight: "bold",
}));

interface Master {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
}

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  status: "pending" | "approved" | "rejected";
  master_id: number | null;
  assigned_at: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
    fetchMasters();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMasters = async () => {
    try {
      const response = await fetch("/api/masters");
      if (!response.ok) throw new Error("Failed to fetch masters");
      const data = await response.json();
      setMasters(data);
    } catch (error) {
      console.error("Error fetching masters:", error);
    }
  };

  const handleStatusChange = async (
    applicationId: number,
    newStatus: string,
  ) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // Update local state
      setApplications((apps) =>
        apps.map((app) =>
          app.id === applicationId
            ? {
                ...app,
                status: newStatus as "pending" | "approved" | "rejected",
              }
            : app,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAssignMaster = async (
    applicationId: number,
    masterId: number,
  ) => {
    try {
      const response = await fetch(
        `/api/applications/${applicationId}/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ masterId }),
        },
      );

      if (!response.ok) throw new Error("Failed to assign master");

      const updatedApplication = await response.json();
      setApplications((apps) =>
        apps.map((app) =>
          app.id === applicationId
            ? {
                ...app,
                master_id: masterId,
                assigned_at: updatedApplication.assigned_at,
              }
            : app,
        ),
      );
    } catch (error) {
      console.error("Error assigning master:", error);
    }
  };

  const handleDeleteApplication = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту заявку?")) {
      return;
    }

    try {
      const response = await fetch(`/api/applications/${id}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      // Обновляем список заявок после удаления
      setApplications(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Ошибка при удалении заявки");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
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

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Управление заявками
        </Typography>
        <Grid container spacing={3}>
          {applications.map((application) => (
            <Grid item xs={12} sm={6} md={4} key={application.id}>
              <StyledCard>
                <DeleteButton
                  onClick={() => handleDeleteApplication(application.id)}
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
                      <Typography variant="body1">
                        {application.name}
                      </Typography>
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
                      <Typography variant="body1">
                        {application.service}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        Сообщение
                      </Typography>
                      <Typography variant="body2">
                        {application.message}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Статус
                      </Typography>
                      <Select
                        value={application.status}
                        onChange={(e) =>
                          handleStatusChange(application.id, e.target.value)
                        }
                        size="small"
                        fullWidth
                      >
                        <MenuItem value="pending">В обработке</MenuItem>
                        <MenuItem value="approved">Одобрено</MenuItem>
                        <MenuItem value="rejected">Отклонено</MenuItem>
                      </Select>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        gutterBottom
                      >
                        Мастер
                      </Typography>
                      <Select
                        value={application.master_id || ""}
                        onChange={(e) =>
                          handleAssignMaster(
                            application.id,
                            Number(e.target.value),
                          )
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
                      {new Date(application.created_at).toLocaleDateString(
                        "ru-RU",
                      )}
                    </Typography>
                  </Stack>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
