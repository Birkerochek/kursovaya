import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Wrapper } from "../Wrapper/Wrapper";
import Title from "../Title/Title";
import {
  FeedbackCont,
  FeedbackTitle,
  FeedbackFormCont,
  FeedbackInput,
  FeedbackTextarea,
  FeedbackButton,
  ErrorMessage,
} from "./FeedbackFormStyles";

interface FormData {
  name: string;
  phone: string;
  email?: string;
  techType: string;
  description: string;
}



const FeedbackForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Sending form data:", data);

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      // Очищаем форму после успешной отправки
      reset();
      alert("Заявка успешно отправлена!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        `Произошла ошибка при отправке заявки: ${error instanceof Error ? error.message : "Пожалуйста, попробуйте снова"}`,
      );
    }
  };

  return (
    <Wrapper>
      <Title>Обратная связь</Title>
      <FeedbackCont id="feedback-form">
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
