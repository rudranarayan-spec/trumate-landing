/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import "@/models/Category"; // Ensures the Category model is registered for populate()

// GET: Fetch all products with populated category information
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category");

    const query = categoryId ? { category: categoryId } : {};

    const products = await Product.find(query)
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Create a new product
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}