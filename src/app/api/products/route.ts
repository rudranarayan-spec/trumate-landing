import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import "@/models/Category"; // Register model for population

export async function GET() {
  await connectDB();
  try {
    const products = await Product.find({})
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}