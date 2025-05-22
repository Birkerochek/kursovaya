import { Service } from "@/app/lib/supabase/serviceApi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function useCatalogFetch(){
   

      const { isLoading, error, data, isError } = useQuery({
        queryKey: ['services'],
        queryFn: async() =>{
          const { data } = await axios.get<Service[]>("/api/services");
          return data;
          
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
        
      })
    
      return{
        isLoading,
        error,
        data,
        isError
      }
}