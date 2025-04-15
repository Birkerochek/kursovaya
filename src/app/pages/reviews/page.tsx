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
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setReviews(data || []);
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
    if (!session?.user) {
      alert("Пожалуйста, войдите в систему, чтобы оставить отзыв");
      return;
    }

    try {
      const { error } = await supabase.from("reviews").insert([
        {
          user_id: session.user.id,
          name: session.user.name || "Анонимный пользователь",
          rating: data.rating,
          text: data.text,
        },
      ]);

      if (error) throw error;

      await fetchReviews();
      alert("Спасибо за ваш отзыв!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(
        "Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте снова.",
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
          reviews.map((review) => <ReviewCard key={review.id} {...review} />)
        )}
      </ReviewsContainer>
    </Wrapper>
  );
};

export default ReviewsPage;
