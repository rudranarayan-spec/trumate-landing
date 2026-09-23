/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT: Update product
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProduct }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: Remove product
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}