import { useSession } from "next-auth/react";
import useReviewsFetch from "./useReviewsFetch";


export default function useDeleteReview(){
    const { fetchReviews } = useReviewsFetch()
    const { data: session } = useSession()

    const handleDeleteReview = async (id: number) => {
        if (!session || session.user.role !== "admin") {
          alert("У вас недостаточно прав для выполнения этого действия");
          return;
        }
    
        try {
          const response = await fetch(`/api/reviews?id=${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Ошибка при удалении отзыва");
          }
    
          await fetchReviews();
          alert("Отзыв успешно удалён");
        } catch (error) {
          console.error("Error deleting review:", error);
          alert(
            `Произошла ошибка при удалении отзыва: ${
              error instanceof Error ? error.message : "Пожалуйста, попробуйте снова"
            }`
          );
        }
      };
    

    return{
        handleDeleteReview
    }
}