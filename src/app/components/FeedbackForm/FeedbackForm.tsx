import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Wrapper } from "../Wrapper/Wrapper";
import Title from "../Title/Title";

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

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const SMSRU_API_KEY = "67BD4C16-9ED1-FDE9-0838-3723174F8670"; // 🔹 Вставь сюда API-ключ от SMS.RU

  // Функция отправки SMS
  const sendSMS = async (phone, message) => {
    const url = `https://sms.ru/sms/send?api_id=${SMSRU_API_KEY}&to=${phone}&msg=${encodeURIComponent(message)}&json=1`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log("Ответ от SMS.RU:", result);
      return result;
    } catch (error) {
      console.error("Ошибка при отправке SMS:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const message = 
      `Новая заявка!\n` +
      `Имя: ${data.name}\n` +
      `Номер телефона: ${data.phone}\n` +
      `Почта: ${data.email || "не указана"}\n` +
      `Тип техники: ${data.techType}\n` +
      `Описание проблемы: ${data.description}`;

    try {
      // Отправка SMS
      const smsResult = await sendSMS(data.phone, message);

      if (smsResult && smsResult.status === "OK") {
        console.log("SMS успешно отправлено!");
      } else {
        console.log("Ошибка при отправке SMS:", smsResult);
      }

      reset();
    } catch (error) {
      console.error("Ошибка при обработке формы:", error);
    }
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
            {...register("phone", {
              required: "Поле 'Номер телефона' обязательно",
            })}
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
            {...register("techType", {
              required: "Поле 'Тип техники' обязательно",
            })}
          />
          {errors.techType && (
            <ErrorMessage>{errors.techType.message}</ErrorMessage>
          )}

          <FeedbackTextarea
            placeholder="Описание проблемы"
            {...register("description", {
              required: "Поле 'Описание проблемы' обязательно",
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}

          <FeedbackButton type="submit">Отправить</FeedbackButton>
        </FeedbackFormCont>
      </FeedbackCont>
    </Wrapper>
  );
};

export default FeedbackForm;
