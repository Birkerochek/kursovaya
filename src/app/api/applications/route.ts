import { applicationsApi } from "@/app/lib/supabase/applicationApi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const data = await applicationsApi.getUserApplications(userId);
      return NextResponse.json(data);
    }

    const data = await applicationsApi.getAllApplications();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await applicationsApi.createApplication(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, masterId } = body;

    if (status) {
      const data = await applicationsApi.updateApplicationStatus(id, status);
      return NextResponse.json(data);
    }

    if (masterId) {
      const data = await applicationsApi.assignMaster(id, masterId);
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    await applicationsApi.deleteApplication(Number(id));
    return NextResponse.json({ message: "Application deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}