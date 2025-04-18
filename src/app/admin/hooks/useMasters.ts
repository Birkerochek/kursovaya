import { use, useEffect, useState } from "react";
import { Master } from "../types";
import { NewMaster } from "@/app/lib/supabase/masterApi";

export const useMasters = () => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMasters = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/masters", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при получении мастеров");
      }

      const data: Master[] = await response.json();
      setMasters(data);
    } catch (error) {
      console.error("Error fetching masters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = async (masterId: string, phone: string) =>{
    setLoading(true);
    try {
      const response = await fetch("/api/masters", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(masterId),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении мастеров");
      }

      const data: Master[] = await response.json();
      setMasters(data);
    }
    catch (error) {
      console.error("Error fetching masters:", error);
    }

  }
  const createMaster = async (master: NewMaster) => {
    setLoading(true);
    try {
      const response = await fetch('/api/masters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(master),
      });
      if (!response.ok) throw new Error('Ошибка при создании мастера');
      const newMaster: Master = await response.json();
      setMasters(prev => [newMaster, ...prev]);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMasters();
  }, []);

  return {
    masters,
    loading,
    fetchMasters,
    handlePhoneChange,
    createMaster
  };
};
