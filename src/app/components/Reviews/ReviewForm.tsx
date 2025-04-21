import React, { useState } from "react";
import styled from "styled-components";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--color-grey-white);
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--color-white);
  border-radius: 4px;
  min-height: 100px;
  font-family: inherit;
  resize: vertical;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const RatingLabel = styled.label`
  font-weight: 500;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: var(--color-primary);
  }
`;

interface ReviewFormProps {
  onSubmit: (data: { rating: number; text: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, text });
    setText("");
    setRating(5);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <RatingContainer>
        <RatingLabel>Оценка:</RatingLabel>
        <Rating
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue || 5);
          }}
          precision={1}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      </RatingContainer>
      
      <TextArea
        placeholder="Напишите ваш отзыв здесь..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      
      <SubmitButton type="submit">Отправить отзыв</SubmitButton>
    </Form>
  );
};

export default ReviewForm;
