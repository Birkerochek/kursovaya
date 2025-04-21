import { Application, Master } from "@/app/admin/types";
import { sendTelegramMessage } from "@/app/lib/telegram";

interface UseMasterAssignProps {
    masters: Master[];
    application: Application;
    onAssignMaster: (applicationId: number, masterId: number) => Promise<void>;
}
  
  interface UseMasterAssignReturn {
    handleMasterAssign: (applicationId: number, masterId: number) => Promise<void>;
  }
export default function useMasterAssign({onAssignMaster, application, masters}: UseMasterAssignProps): UseMasterAssignReturn {
  const handleMasterAssign = async (applicationId: number, masterId: number) => {
    try {
      await onAssignMaster(applicationId, masterId);
      
      const selectedMaster = masters.find(m => m.id === masterId);
      const masterMessage = `
  📋 Обновление заявки #${applicationId}
  
  👤 Клиент: ${application.name}
  📱 Телефон: ${application.phone}
  ${application.email ? `✉️ Email: ${application.email}` : ''}
  🔧 Услуга: ${application.techType}
  📝 Сообщение: ${application.description}
  
  👨‍🔧 Назначенный мастер:
  👤 ${selectedMaster ? selectedMaster.name : 'Не назначен'}
  🛠️ ${selectedMaster ? selectedMaster.specialization : ''}
  
  #обновление_заявки`.trim();
  
      await sendTelegramMessage(masterMessage);
    } catch (error) {
      console.error('Error sending master assignment notification:', error);
    }
  };


    return {
        handleMasterAssign,
    }
}