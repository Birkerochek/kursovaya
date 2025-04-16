import { reviewsApi } from "@/app/lib/supabase/reviewsApi";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await reviewsApi.getAllReviews();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await reviewsApi.createReview(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create review" },
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
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    await reviewsApi.deleteReview(Number(id));
    return NextResponse.json({ message: "Review deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete review" },
      { status: 500 }
    );
  }
}