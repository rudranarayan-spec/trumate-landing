/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import Category from "@/models/Category";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    // 1. Fetch total counts
    const totalCategories = await Category.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    // Placeholder if you have a bulk order model (fallback to 0 if not yet created)
    // const totalBulkOrders = await BulkOrder.countDocuments();
    const totalBulkOrders = 0; 

    // 2. Get product count breakdown per category using aggregation
    const productsPerCategory = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories", // MongoDB collection name for categories
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $project: {
          categoryId: "$_id",
          categoryName: "$categoryInfo.name",
          categorySlug: "$categoryInfo.slug",
          count: 1,
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalCategories,
        totalProducts,
        totalBulkOrders,
        productsPerCategory,
      },
    });
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}