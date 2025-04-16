import { applicationsApi, type Application } from "@/app/api/applications/route";
import { useState } from "react";

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const data = await applicationsApi.getAllApplications();
      setApplications(data as Application[]);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    applicationId: number, 
    newStatus: Application['status']
  ): Promise<void> => {
    try {
      await applicationsApi.updateApplicationStatus(applicationId, newStatus);
      setApplications((apps) =>
        apps.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  };

  const handleAssignMaster = async (applicationId: number, masterId: number) => {
    try {
      const updatedApplication = await applicationsApi.assignMaster(applicationId, masterId);
      const assignedAt = new Date().toISOString();
      
      setApplications((apps) =>
        apps.map((app) =>
          app.id === applicationId
            ? { ...app, master_id: masterId, assigned_at: assignedAt }
            : app
        )
      );
      return updatedApplication;
    } catch (error) {
      console.error("Error assigning master:", error);
      throw error;
    }
  };

  const handleDeleteApplication = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту заявку?")) {
      return;
    }

    try {
      await applicationsApi.deleteApplication(id);
      setApplications((apps) => apps.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Ошибка при удалении заявки");
    }
  };

  return {
    applications,
    loading,
    fetchApplications,
    handleStatusChange,
    handleAssignMaster,
    handleDeleteApplication,
  };
};