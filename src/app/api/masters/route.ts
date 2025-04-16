import { mastersApi } from "@/app/lib/supabase/masterApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const data = await mastersApi.getMasterById(Number(id));
      return NextResponse.json(data);
    }

    const data = await mastersApi.getAllMasters();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch masters" },
      { status: 500 }
    );
  }
}