import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { Wrapper } from "@/app/components/Wrapper/Wrapper";
import { Grid } from "../StyledComponents";
import { ApplicationCard } from "../ApplicationCard/ApplicationCard";
import { Application, Master } from "../../types";

interface ApplicationsListProps {
  applications: Application[];
  masters: Master[];
  onStatusChange: (applicationId: number, newStatus: Application['status']) => Promise<void>;
  onAssignMaster: (applicationId: number, masterId: number) => Promise<void>;
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
    <Wrapper>
      <Typography variant="h4" component="h1" gutterBottom>
        Управление заявками
      </Typography>
      <Grid>
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            masters={masters}
            onStatusChange={onStatusChange}
            onAssignMaster={onAssignMaster}
            onDelete={onDelete}
          />
        ))}
      </Grid>
    </Wrapper>
  );
};
