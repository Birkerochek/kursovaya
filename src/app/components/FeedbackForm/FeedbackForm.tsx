import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { Wrapper } from "../Wrapper/Wrapper";
import Title from "../Title/Title";

interface FormData {
  name: string;
  phone: string;
  email?: string;
  techType: string;
  description: string;
}

export const FeedbackCont = styled.div`
  border-radius: 20px;
  width: 898px;
  height: 1104px;
  background: #0b5c7e;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FeedbackTitle = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 45px;
  color: #fff;
  margin: 40px 0;
  text-align: center;
`;

export const FeedbackFormCont = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const FeedbackInput = styled.input`
  border: 1px solid #fff;
  border-radius: 20px;
  width: 786px;
  height: 89px;
  background: none;
  padding-left: 20px;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    color: #a5a5a5;
  }
`;

export const FeedbackTextarea = styled.textarea`
  border: 1px solid #fff;
  border-radius: 20px;
  width: 766px;
  height: 283px;
  padding: 20px;
  background: none;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    color: #a5a5a5;
  }
`;

export const FeedbackButton = styled.button`
  border-radius: 10px;
  width: 215px;
  height: 51px;
  background: #2573d8;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  border: none;

  &:hover {
    background: #1954a0;
  }
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  align-self: flex-start;
  padding-left: 20px;
`;

const FeedbackForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Wrapper>
      <Title>Обратная связь</Title>
      <FeedbackCont>
        <FeedbackTitle>RemTopia</FeedbackTitle>
        <FeedbackFormCont onSubmit={handleSubmit(onSubmit)} noValidate>
          <FeedbackInput
            placeholder="Имя"
            {...register("name", { required: "Поле 'Имя' обязательно" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <FeedbackInput
            placeholder="Номер телефона"
            {...register("phone", { required: "Поле 'Номер телефона' обязательно" })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

          <FeedbackInput
            placeholder="Почта ( необязательно )"
            {...register("email", {
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Неверный формат почты",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <FeedbackInput
            placeholder="Тип техники"
            {...register("techType", { required: "Поле 'Тип техники' обязательно" })}
          />
          {errors.techType && <ErrorMessage>{errors.techType.message}</ErrorMessage>}

          <FeedbackTextarea
            placeholder="Описание проблемы"
            {...register("description", { required: "Поле 'Описание проблемы' обязательно" })}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

          <FeedbackButton type="submit">Отправить</FeedbackButton>
        </FeedbackFormCont>
      </FeedbackCont>
    </Wrapper>
  );
};

export default FeedbackForm;
