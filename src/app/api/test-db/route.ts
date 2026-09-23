import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    
    return NextResponse.json(
      { success: true, message: "Database connection successful!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}