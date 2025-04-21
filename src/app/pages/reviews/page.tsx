"use client";

import React, { useEffect, useState } from "react";
import { Wrapper } from "@/app/components/Wrapper/Wrapper";
import Title from "@/app/components/Title/Title";
import ReviewForm from "@/app/components/Reviews/ReviewForm";
import styled from "styled-components";
import BackButton from "@/app/UI/BackButton";
import { supabase } from "@/app/components/supabaseClient";
import { useSession } from "next-auth/react";
import { Review } from "@/app/lib/supabase/reviewsApi";
import useReviewFetch, { ReviewCardProps } from "./hooks/useReviewsFetch";
import ReviewCard from "@/app/components/Reviews/ReviewCard";
import useReviewsFetch from "./hooks/useReviewsFetch";
import useSubmitReview from "./hooks/useSubmitReview";
import useDeleteReview from "./hooks/useDeleteReview";

const ReviewsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
`;

const NoReviews = styled.p`
  text-align: center;
  color: var(--color-grey);
  font-size: 1.1em;
  margin: 2em 0;
`;

const ReviewsPage = () => {
  const { data: session } = useSession();
  const { reviews, loading } = useReviewsFetch()
  const { handleSubmitReview } = useSubmitReview()
  const { handleDeleteReview } = useDeleteReview()

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
