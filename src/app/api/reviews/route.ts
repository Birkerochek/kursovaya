import { supabase } from "@/app/components/supabaseClient";

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  user_id: string;
  created_at: string;
}

export const reviewsApi = {
  getAllReviews: async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Review[];
  },

  createReview: async (review: Omit<Review, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert([review])
      .select()
      .single();

    if (error) throw error;
    return data as Review;
  },
    deleteReview: async (id: number) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
      return true;
    },
};