import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSession } from "next-auth/react";
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
  NoAuthorization,
  NoAuthorizationText,
} from "./FeedbackFormStyles";
import { supabase } from "../supabaseClient";
import { sendTelegramMessage } from "@/app/lib/telegram";
import { PatternFormat } from "react-number-format";
import Modal from "../Modal/Modal";
import ModalFeedbackForm from "../ModalFeedbackForm/ModalFeedbackForm";
import AuthButton from "../AuthButton/AuthButton";

interface FormData {
  name: string;
  phone: string;
  email?: string;
  techType: string;
  description: string;
  user_id?: string;
}

const FeedbackForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    control
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Sending form data:", data);

      const formData = {
        ...data,
        user_id: session?.user?.id || null
      };

      const { error } = await supabase.from("applications").insert([formData]);

      if (error) {
        throw new Error(error.message);
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
    <Wrapper>
      <Title>Обратная связь</Title>
        {!session ? (
         <NoAuthorization>
          <FeedbackTitle>RemTopia</FeedbackTitle>
          <NoAuthorizationText>Для отправки заявки необходимо <AuthButton/></NoAuthorizationText>
          
         </NoAuthorization>
         
        ) : (
      <FeedbackCont id="feedback-form">
        <FeedbackTitle>RemTopia</FeedbackTitle>
          <FeedbackFormCont onSubmit={handleSubmit(onSubmit)} noValidate>
            <FeedbackInput
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
                <FeedbackInput
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
        )}
    </Wrapper>
  );
};

export default FeedbackForm;
