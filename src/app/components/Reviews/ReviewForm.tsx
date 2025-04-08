import React, { useState } from 'react';
import styled from 'styled-components';
import { Rating, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const FormContainer = styled.form`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const FormTitle = styled.h3`
  color: #1b3764;
  margin-bottom: 20px;
`;

const FieldContainer = styled.div`
  margin-bottom: 20px;
`;

const ErrorText = styled.p`
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 3px;
`;

interface ReviewFormData {
  name: string;
  rating: number;
  text: string;
}

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => Promise<void>;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 5,
    }
  });

  const onSubmitHandler = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmitHandler)}>
      <FormTitle>Оставить отзыв</FormTitle>
      <FieldContainer>
        <TextField
          fullWidth
          label="Ваше имя"
          {...register('name', { required: 'Имя обязательно' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </FieldContainer>

      <FieldContainer>
        <Controller
          name="rating"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Rating
              {...field}
              precision={0.5}
              size="large"
            />
          )}
        />
        {errors.rating && <ErrorText>Оценка обязательна</ErrorText>}
      </FieldContainer>

      <FieldContainer>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Ваш отзыв"
          {...register('text', { 
            required: 'Текст отзыва обязателен',
            minLength: {
              value: 10,
              message: 'Отзыв должен содержать минимум 10 символов'
            }
          })}
          error={!!errors.text}
          helperText={errors.text?.message}
        />
      </FieldContainer>

      <Button 
        type="submit" 
        variant="contained" 
        disabled={isSubmitting}
        sx={{ 
          backgroundColor: '#1b3764',
          '&:hover': {
            backgroundColor: '#152a4d'
          }
        }}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
      </Button>
    </FormContainer>
  );
};

export default ReviewForm;