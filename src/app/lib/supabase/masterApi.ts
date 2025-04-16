import { supabase } from "@/app/components/supabaseClient";

export interface Master {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  is_active: boolean;
}

export const mastersApi = {
  getAllMasters: async () => {
    const { data, error } = await supabase
      .from('masters')
      .select('*')
      
      .order('name');

    if (error) throw error;
    return data as Master[];
  },
  
  getMasterById: async (id: number) => {
    const { data, error } = await supabase
      .from('masters')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Master;
  }
};