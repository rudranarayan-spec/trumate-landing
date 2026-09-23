/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/Category";

// GET: Fetch all categories
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Create a new category
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const category = await Category.create(body);
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}