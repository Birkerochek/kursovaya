"use client";

import React, { useEffect, useState } from "react";
import { Wrapper } from "@/app/components/Wrapper/Wrapper";
import Title from "@/app/components/Title/Title";
import ReviewCard, {
  ReviewCardProps,
} from "@/app/components/Reviews/ReviewCard";
import ReviewForm from "@/app/components/Reviews/ReviewForm";
import styled from "styled-components";
import BackButton from "@/app/UI/BackButton";
import { supabase } from "@/app/components/supabaseClient";
import { useSession } from "next-auth/react";
import { Review } from "@/app/lib/supabase/reviewsApi";

const ReviewsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
`;

const NoReviews = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1em;
  margin: 2em 0;
`;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<ReviewCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

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

  return (
    <Wrapper>
      <BackButton />
      <Title>Отзывы клиентов</Title>
      <ReviewsContainer>
        {session ? (
          <ReviewForm onSubmit={handleSubmitReview} />
        ) : (
          <NoReviews>
            Пожалуйста, войдите в систему, чтобы оставить отзыв
          </NoReviews>
        )}

        {loading ? (
          <NoReviews>Загрузка отзывов...</NoReviews>
        ) : reviews.length === 0 ? (
          <NoReviews>Пока нет отзывов. Будьте первым!</NoReviews>
        ) : (
          reviews.map((review) => <ReviewCard key={review.id} {...review}   isAdmin={session?.user?.role === "admin"}
          onDelete={handleDeleteReview}/>)
        )}
      </ReviewsContainer>
    </Wrapper>
  );
};

export default ReviewsPage;
