import { useState } from "react";
import { supabase } from "@/app/components/supabaseClient";
import { Master } from "../types";

export const useMasters = () => {
  const [masters, setMasters] = useState<Master[]>([]);

  const fetchMasters = async () => {
    try {
      const { data, error } = await supabase.from("masters").select("*");

      if (error) throw error;
      setMasters(data as Master[]);
    } catch (error) {
      console.error("Error fetching masters:", error);
    }
  };

  return {
    masters,
    fetchMasters,
  };
};