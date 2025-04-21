import { Application } from "@/app/admin/types";
import { sendTelegramMessage } from "@/app/lib/telegram";

interface UseStatusChangeProps {
  application: Application;
  onStatusChange: (applicationId: number, newStatus: Application['status']) => Promise<void>;
}

interface UseStatusChangeReturn {
  handleStatusChange: (applicationId: number, newStatus: Application['status']) => Promise<void>;
    getStatusLabel: (status: Application['status']) => string;
}

export default function useStatusChange({ onStatusChange, application }: UseStatusChangeProps): UseStatusChangeReturn {
  const getStatusLabel = (status: Application['status']) => {
    switch (status) {
      case "pending":
        return "В обработке";
      case "approved":
        return "Одобрено";
      case "rejected":
        return "Отклонено";
      default:
        return "Неизвестный статус";
    }
  };

  const handleStatusChange = async (applicationId: number, newStatus: Application['status']) => {
    try {
      await onStatusChange(applicationId, newStatus);

      const statusMessage = `
        📋 Обновление заявки #${applicationId}
        
        👤 Клиент: ${application.name}
        📱 Телефон: ${application.phone}
        ${application.email ? `✉️ Email: ${application.email}` : ''}
        🔧 Услуга: ${application.techType}
        📝 Сообщение: ${application.description}
        
        📊 Новый статус: ${getStatusLabel(newStatus)}
        
        #обновление_заявки`.trim();

      await sendTelegramMessage(statusMessage);
    } catch (error) {
      console.error('Error sending status change notification:', error);
    }
  };

  return {
    handleStatusChange,
    getStatusLabel,
  };
}