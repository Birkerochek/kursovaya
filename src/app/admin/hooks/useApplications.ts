import { useState } from "react";
import { Application } from "../types";

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при получении заявок");
      }

      const data: Application[] = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    applicationId: number,
    newStatus: Application["status"]
  ): Promise<void> => {
    try {
      const response = await fetch("/api/applications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: applicationId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении статуса");
      }

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

  const handleAssignMaster = async (
    applicationId: number,
    masterId: number
  ) => {
    try {
      const response = await fetch("/api/applications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: applicationId, masterId }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при назначении мастера");
      }

      const updatedApplication = await response.json();
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
      const response = await fetch(`/api/applications?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении заявки");
      }

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