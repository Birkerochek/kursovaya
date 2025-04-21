import { Service } from "@/app/lib/supabase/serviceApi";
import { useEffect, useState } from "react";


export default function useFetchServices(){
      const [servicesData, setServicesData] = useState<Service[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
          useEffect(() => {
            const fetchServices = async () => {
              try {
                const response = await fetch("/api/services", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
        
                if (!response.ok) {
                  throw new Error("Ошибка при получении услуг");
                }
        
                const data: Service[] = await response.json();
                setServicesData(data);
              } catch (error) {
                console.error("Error fetching services:", error);
                setError(
                  error instanceof Error ? error.message : "Неизвестная ошибка"
                );
              } finally {
                setLoading(false);
              }
            };
        
            fetchServices();
          }, []);
        

    return{
        loading,
        error,
        servicesData
    }
}