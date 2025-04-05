import { useState } from "react";
import { supabase } from "@/app/components/supabaseClient";
import { Application } from "../types";

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*");

      if (error) throw error;
      setApplications(data as Application[]);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    applicationId: number,
    newStatus: string,
  ) => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", applicationId)
        .select();

      if (error) throw error;

      // Обновляем локальное состояние
      setApplications((apps) =>
        apps.map((app) =>
          app.id === applicationId
            ? { ...app, status: newStatus as Application["status"] }
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
      const assignedAt = new Date().toISOString();

      const { data, error } = await supabase
        .from("applications")
        .update({ master_id: masterId, assigned_at: assignedAt })
        .eq("id", applicationId)
        .select();

      if (error) throw error;

      setApplications((apps) =>
        apps.map((app) =>
          app.id === applicationId
            ? { ...app, master_id: masterId, assigned_at: assignedAt }
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
      const { data, error } = await supabase
        .from("applications")
        .delete()
        .eq("id", id);

      if (error) throw error;

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