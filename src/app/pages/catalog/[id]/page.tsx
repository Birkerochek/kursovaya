import { supabase } from "@/app/components/supabaseClient";
import CatalogDetail from "./CatalogDetail";

interface ServiceData {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
}

async function getService(id: string): Promise<ServiceData | null> {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching service:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const service = await getService(params.id);

  if (!service) {
    return <div>Услуга не найдена</div>;
  }

  return <CatalogDetail service={service} />;
}
