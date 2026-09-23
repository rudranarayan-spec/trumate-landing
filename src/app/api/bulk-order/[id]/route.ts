/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import BulkOrder from "@/models/BulkOrder";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT: Update bulk order status or details
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updatedBulkOrder = await BulkOrder.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBulkOrder) {
      return NextResponse.json({ success: false, error: "Bulk order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedBulkOrder }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE: Remove bulk order entry
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedBulkOrder = await BulkOrder.findByIdAndDelete(id);

    if (!deletedBulkOrder) {
      return NextResponse.json({ success: false, error: "Bulk order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Bulk order deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}