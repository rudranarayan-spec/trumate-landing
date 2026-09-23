import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const slug = body.name.toLowerCase().replace(/\s+/g, "-");
    
    const newCategory = await Category.create({ name: body.name, slug });
    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}