import { useState } from "react";
import { Master } from "../types";

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

  return {
    masters,
    loading,
    fetchMasters,
  };
};
