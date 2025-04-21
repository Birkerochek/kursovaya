import { Controller } from "react-hook-form";
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
import { PatternFormat } from "react-number-format";
import AuthButton from "../AuthButton/AuthButton";
import useSubmitForm from "./hooks/useSubmitForm";



const FeedbackForm: React.FC = () => {
  const { session, handleSubmit, onSubmit, register, errors, control } = useSubmitForm()
  return (
    <Wrapper>
      <Title>Обратная связь</Title>
        {!session ? (
         <NoAuthorization id="feedback-form">
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
