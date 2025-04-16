import { mastersApi, type Master } from "@/app/api/masters/route";
import { useState } from "react";

export const useMasters = () => {
  const [masters, setMasters] = useState<Master[]>([]);

  const fetchMasters = async () => {
    try {
      const data = await mastersApi.getAllMasters();
      setMasters(data);
    } catch (error) {
      console.error("Error fetching masters:", error);
    }
  };

  return {
    masters,
    fetchMasters,
  };
};