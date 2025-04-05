import React from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import { ApplicationCard } from "./ApplicationCard";
import { Application, Master } from "../types";

interface ApplicationsListProps {
  applications: Application[];
  masters: Master[];
  onStatusChange: (applicationId: number, newStatus: string) => void;
  onAssignMaster: (applicationId: number, masterId: number) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({
  applications,
  masters,
  onStatusChange,
  onAssignMaster,
  onDelete,
  loading,
}) => {
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Управление заявками
        </Typography>
        <Grid container spacing={3}>
          {applications.map((application) => (
            <Grid item xs={12} sm={6} md={4} key={application.id}>
              <ApplicationCard
                application={application}
                masters={masters}
                onStatusChange={onStatusChange}
                onAssignMaster={onAssignMaster}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
