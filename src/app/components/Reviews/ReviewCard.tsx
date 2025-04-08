import React from 'react';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ReviewerName = styled.h4`
  margin: 0;
  color: #1b3764;
  font-size: 18px;
`;

const ReviewDate = styled.span`
  color: #666;
  font-size: 14px;
`;

const ReviewText = styled.p`
  margin: 10px 0;
  color: #333;
  line-height: 1.5;
`;

export interface ReviewCardProps {
  id: number;
  name: string;
  rating: number;
  text: string;
  created_at: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, text, created_at }) => {
  const date = new Date(created_at).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card>
      <ReviewHeader>
        <ReviewerName>{name}</ReviewerName>
        <Rating
          value={rating}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      </ReviewHeader>
      <ReviewText>{text}</ReviewText>
      <ReviewDate>{date}</ReviewDate>
    </Card>
  );
};

export default ReviewCard;