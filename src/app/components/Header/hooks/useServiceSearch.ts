import { Service } from "@/app/lib/supabase/serviceApi";
import { useEffect, useState } from "react";

interface ISearchResult {
    id: number;
    title: string;
  }
  
export default function useServiceSearch() {
      const [searchQuery, setSearchQuery] = useState("");
      const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
      const [isSearching, setIsSearching] = useState(false);
    
      useEffect(() => {
        const searchServices = async () => {
          if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
          }
    
    
          setIsSearching(true);
          try {
            const response = await fetch(`/api/services?query=${encodeURIComponent(searchQuery)}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (!response.ok) {
              throw new Error("Ошибка при поиске услуг");
            }
    
            const data: Pick<Service, "id" | "title">[] = await response.json();
            setSearchResults(data);
          } catch (error) {
            console.error("Error searching services:", error);
            setSearchResults([]);
          } finally {
            setIsSearching(false);
          }
        };
    
        const debounceTimer = setTimeout(searchServices, 50);
        return () => clearTimeout(debounceTimer);
      }, [searchQuery]);
    
    return {
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
      };
    }
