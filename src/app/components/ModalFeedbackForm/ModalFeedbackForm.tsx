"use client";
import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { sendTelegramMessage } from "@/app/lib/telegram";
import { useSession } from "next-auth/react";
import AuthButton from "../AuthButton/AuthButton";

const FormContainer = styled.div`
  border-radius: 20px;
  background: #0b5c7e;
  padding: 20px;
  width: 100%;
  max-width: 500px;
`;
const NoForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  flex-direction:column;
`
const NoAuthorizationText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #e5e5e5;
`
const FormTitle = styled.h3`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 28px;
  color: #fff;
  margin: 20px 0;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 20px 20px;
`;

const Input = styled.input`
  border: 1px solid #fff;
  border-radius: 15px;
  width: 92.5%;
  height: 50px;
  background: none;
  padding: 0 15px;
  color: #fff;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: #a5a5a5;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid #fff;
  border-radius: 15px;
  width: 92.5%;
  height: 120px;
  padding: 15px;
  background: none;
  color: #fff;
  resize: none;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: #a5a5a5;
  }
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  width: 100%;
  height: 45px;
  background: #2573d8;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 18px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #1954a0;
  }
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: -10px;
`;

interface FormData {
  name: string;
  phone: string;
  email?: string;
  techType: string;
  description: string;
}

const ModalFeedbackForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<FormData>();
const {data: session} = useSession()
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Ошибка при создании заявки");
      }

      const telegramMessage = `
      🔔 Новая заявка!
      
      👤 Имя: ${data.name}
      📱 Телефон: ${data.phone}
      ${data.email ? `📧 Email: ${data.email}` : ''}
      🔧 Тип техники: ${data.techType}
      📝 Описание: ${data.description}
          `.trim();
      
      await sendTelegramMessage(telegramMessage);
      reset();
      alert("Заявка успешно отправлена!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        `Произошла ошибка при отправке заявки: ${
          error instanceof Error ? error.message : "Пожалуйста, попробуйте снова"
        }`
      );
    }
  };

  return (
    <FormContainer>
      <FormTitle>Оставить заявку</FormTitle>
      {!session ?(
        <NoForm>
          <NoAuthorizationText>Войдите в систему, чтобы оставить заявку</NoAuthorizationText>
          <AuthButton/>

        </NoForm>
      )
    :
    (
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          placeholder="Имя"
          {...register("name", { required: "Поле 'Имя' обязательно" })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

        <Controller
          name="phone"
          control={control} 
          rules={{
            required: "Поле 'Номер телефона' обязательно",
            pattern: {
              value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
              message: "Неверный формат номера телефона",
            }
          }}
          render={({ field }) => (
            <Input
              as={PatternFormat}
              format="+7 (###) ###-##-##"
              placeholder="Номер телефона"
              value={field.value}
              onValueChange={(values) => {
                field.onChange(values.formattedValue);
              }}
            />
          )}
        />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

        <Input
          placeholder="Почта (необязательно)"
          {...register("email", {
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Неверный формат почты",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          placeholder="Тип техники"
          {...register("techType", {
            required: "Поле 'Тип техники' обязательно",
          })}
        />
        {errors.techType && (
          <ErrorMessage>{errors.techType.message}</ErrorMessage>
        )}

        <Textarea
          placeholder="Описание проблемы"
          {...register("description", {
            required: "Поле 'Описание проблемы' обязательно",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

        <SubmitButton type="submit">Отправить</SubmitButton>
      </Form>

    )}
    </FormContainer>
  );
};

export default ModalFeedbackForm;
