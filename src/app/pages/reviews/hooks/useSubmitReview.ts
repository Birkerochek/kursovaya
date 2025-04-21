import { useSession } from "next-auth/react";
import useReviewsFetch from "./useReviewsFetch";


export default function useSubmitReview(){
      const { fetchReviews, reviews, loading } = useReviewsFetch()
      const { data: session } = useSession();
    

    const handleSubmitReview = async (data: { rating: number; text: string }) => {
        if (!session?.user?.id) {
          alert("Пожалуйста, войдите в систему, чтобы оставить отзыв");
          return;
        }
    
        try {
          const reviewData = {
            user_id: session.user.id,
            name: session.user.name || "Анонимный пользователь",
            rating: data.rating,
            text: data.text,
          };
    
          const response = await fetch("/api/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Ошибка при создании отзыва");
          }
    
          await fetchReviews();
          alert("Спасибо за ваш отзыв!");
        } catch (error) {
          console.error("Error submitting review:", error);
          alert(
            `Произошла ошибка при отправке отзыва: ${
              error instanceof Error ? error.message : "Пожалуйста, попробуйте снова"
            }`
          );
        }
      };

      return{
        handleSubmitReview
      }
    
}