import { servicesApi } from "@/app/lib/supabase/serviceApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const query = searchParams.get("query");

    if (id) {
      const data = await servicesApi.getServiceById(id);
      return NextResponse.json(data);
    }

    if (query) {
      const data = await servicesApi.searchServices(query);
      return NextResponse.json(data);
    }

    const data = await servicesApi.getAllServices();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch services" },
      { status: 500 }
    );
  }
}