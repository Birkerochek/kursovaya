import { Review } from "@/app/lib/supabase/reviewsApi";
import { useEffect, useState } from "react";

export interface ReviewCardProps {
  id: number;
  name: string;
  rating: number;
  text: string;
  created_at: string;
   
    isAdmin?: boolean;
    
    onDelete?: (id: number) => void;
}
export default function useReviewsFetch(){
      const [reviews, setReviews] = useState<ReviewCardProps[]>([]);
      const [loading, setLoading] = useState(true);
    
        const fetchReviews = async () => {
          setLoading(true);
          try {
            const response = await fetch("/api/reviews", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error("Ошибка при получении отзывов");
            }
      
            const data: Review[] = await response.json();
            setReviews(data);
          } catch (error) {
            console.error("Error fetching reviews:", error);
          } finally {
            setLoading(false);
          }
        };
        useEffect(() => {
            fetchReviews();
          }, []);
      
        return{
            reviews,
            fetchReviews,
            loading
        }

}