import { useMasters } from "@/app/admin/hooks/useMasters";
import { ChangeEvent, useState } from "react";
import useNewsMasterChange from "./useNewMasterChange";


export default function useAddMaster(){
  const [creating, setCreating] = useState(false);
    const { createMaster } = useMasters();
    const { newMaster, setNewMaster } = useNewsMasterChange();
     const handleNewMasterChange = (field: keyof typeof newMaster) => 
          (e: ChangeEvent<HTMLInputElement>) => {
            setNewMaster(prev => ({ ...prev, [field]: e.target.value }));
          };
      const handleAddMaster = async () => {
        try {
          setCreating(true);
          await createMaster(newMaster);
          setNewMaster({ name: '', email: '', specialization: '', phone: '' });
          alert('Мастер добавлен')
        } catch {
       
        } finally {
          setCreating(false);
        }
      };
    
      return{
        handleAddMaster,
        creating,
        newMaster,
        handleNewMasterChange
      }

}