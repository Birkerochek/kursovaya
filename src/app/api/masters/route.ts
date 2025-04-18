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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, phone } = body;

    if (id && phone) {
      const data = await mastersApi.updateMasterPhone(Number(id), phone);
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update master" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, specialization, phone } = await request.json();
    if (!name || !email || !specialization || !phone) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const data = await mastersApi.createMaster({ name, email, specialization, phone });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create master' },
      { status: 500 }
    );
  }
}
