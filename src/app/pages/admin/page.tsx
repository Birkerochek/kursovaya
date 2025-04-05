"use client";

import { useEffect } from "react";
import { useApplications } from "./hooks/useApplications";
import { useMasters } from "./hooks/useMasters";
import { ApplicationsList } from "./components/ApplicationsList";

export default function AdminPage() {
  const {
    applications,
    loading,
    fetchApplications,
    handleStatusChange,
    handleAssignMaster,
    handleDeleteApplication,
  } = useApplications();

  const { masters, fetchMasters } = useMasters();

  useEffect(() => {
    fetchApplications();
    fetchMasters();
  }, []);

  return (
    <ApplicationsList
      applications={applications}
      masters={masters}
      onStatusChange={handleStatusChange}
      onAssignMaster={handleAssignMaster}
      onDelete={handleDeleteApplication}
      loading={loading}
    />
  );
}
