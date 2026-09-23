/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/Category";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT: Update category
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updatedCategory = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedCategory }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: Remove category
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Category deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}