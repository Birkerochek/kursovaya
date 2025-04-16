import { supabase } from "@/app/components/supabaseClient";

export interface Service {
  id: number;
  title: string;
  img: string;
  description?: string;
  price?: number;
}

export const servicesApi = {
  searchServices: async (query: string) => {
    const { data, error } = await supabase
      .from("services")
      .select("id, title")
      .ilike("title", `%${query}%`)
      .limit(5);

    if (error) throw error;
    return data;
  },

  getAllServices: async () => {
    const { data, error } = await supabase
      .from('services')
      .select('id, img, title, description, price')
      .order('id');

    if (error) throw error;
    return data;
  },

  getServiceById: async (id: string) => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};