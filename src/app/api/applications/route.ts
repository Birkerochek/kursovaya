import { supabase } from "@/app/components/supabaseClient";

export interface Application {
  id: number;
  name: string;
  phone: string;
  email?: string;
  techType: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  master_id: number | null;
  assigned_at: string | null;
  created_at: string;
  user_id?: string;
}

export const applicationsApi = {
  getAllApplications: async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  getUserApplications: async (userId: string) => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        masters (
          name,
          specialization
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  createApplication: async (application: Omit<Application, 'id' | 'status' | 'master_id' | 'assigned_at' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('applications')
      .insert([{
        ...application,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateApplicationStatus: async (applicationId: number, status: Application['status']) => {
    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId)
      .select();

    if (error) throw error;
    return data;
  },

  assignMaster: async (applicationId: number, masterId: number) => {
    const { data, error } = await supabase
      .from('applications')
      .update({ 
        master_id: masterId, 
        assigned_at: new Date().toISOString() 
      })
      .eq('id', applicationId)
      .select();

    if (error) throw error;
    return data;
  },

  deleteApplication: async (id: number) => {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};