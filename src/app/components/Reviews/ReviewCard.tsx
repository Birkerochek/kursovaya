import React from 'react';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ReviewCardProps } from '@/app/pages/reviews/hooks/useReviewsFetch';

const Card = styled.div`
position: relative;
  background: var(--color-white);
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
  color: var(--color-help);
  font-size: 18px;
`;

const ReviewDate = styled.span`
  color: #666;
  font-size: 14px;
`;

const ReviewText = styled.p`
  margin: 10px 0;
  color: var(--color-grey);
  line-height: 1.5;
`;
const DeleteButton = styled.button`
  position: absolute;
  right: 20px;
  top: 80px;
  background-color: red;
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;


const ReviewCard: React.FC<ReviewCardProps> = ({ id, name, rating, text, created_at, isAdmin = false, onDelete, }) => {
  const date = new Date(created_at).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card>
       {isAdmin && onDelete && (
        <DeleteButton onClick={() => onDelete(id)}>Удалить</DeleteButton>
      )}
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