import { supabase } from "@/app/components/supabaseClient";

export interface Master {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  is_active: boolean;
}
export interface NewMaster {
  name: string;
  email: string;
  specialization: string;
  phone: string;
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
  },

  updateMasterPhone: async ( id: number, phone: string) => {
    const { data, error } = await supabase
      .from('masters')
      .update({ phone })
      .eq('id', id);
    
      if(error) throw error;
    return data;
  },
  createMaster: async (master: NewMaster) => {
    const { data, error } = await supabase
      .from('masters')
      .insert(master)
      .single();

    if (error) throw error;
    return data as Master;
  },
};