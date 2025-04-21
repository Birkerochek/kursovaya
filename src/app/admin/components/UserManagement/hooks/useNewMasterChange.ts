import { ChangeEvent } from "react";
import useMasterState from "./useMasterState";

export default function useNewsMasterChange(){
    const { newMaster, setNewMaster } = useMasterState()

    const handleNewMasterChange = (field: keyof typeof newMaster) => 
        (e: ChangeEvent<HTMLInputElement>) => {
          setNewMaster(prev => ({ ...prev, [field]: e.target.value }));
        };

        return{
            newMaster,
            setNewMaster,
            handleNewMasterChange
        }
    
}