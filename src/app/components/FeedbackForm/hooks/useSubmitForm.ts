import { useSession } from "next-auth/react";
import { sendTelegramMessage } from "@/app/lib/telegram";
import {  SubmitHandler, useForm } from "react-hook-form";

interface FormData {
    name: string;
    phone: string;
    email?: string;
    techType: string;
    description: string;
    user_id?: string;
  }
  
export default function useSubmitForm(){
      const { data: session } = useSession();
      const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
      } = useForm<FormData>();
    
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = {
        ...data,
        user_id: session?.user?.id
      };

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка при создании заявки");
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
  return{
    session,
    register,
    handleSubmit,
    onSubmit,
    errors,
    control

  }
}