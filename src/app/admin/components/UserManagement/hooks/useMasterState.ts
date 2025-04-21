import { useState } from "react";


export default function useMasterState(){
      const [newMaster, setNewMaster] = useState({
        name: '',
        email: '',
        specialization: '',
        phone: '',
      });
    
      return{
        newMaster,
        setNewMaster
      }
}