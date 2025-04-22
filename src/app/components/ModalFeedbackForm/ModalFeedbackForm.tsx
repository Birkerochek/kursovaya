"use client";
import React from "react";
import styled from "styled-components";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { sendTelegramMessage } from "@/app/lib/telegram";
import { useSession } from "next-auth/react";
import AuthButton from "../AuthButton/AuthButton";
import useFormFetch from "./hooks/useFormFetch";
import { ErrorMessage, Form, FormContainer, FormTitle, Input, NoAuthorizationText, NoForm, SubmitButton, Textarea } from "./ModalFeedbackFormStyles";




const ModalFeedbackForm: React.FC = () => {

  const { session, onSubmit, register, control, errors, handleSubmit } = useFormFetch();

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
