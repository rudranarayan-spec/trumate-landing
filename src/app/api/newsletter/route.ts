/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Update path if your db connection utility is located elsewhere
import Newsletter from "@/models/Newsletter";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if the email already exists
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        // Reactivate if they previously unsubscribed
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
        return NextResponse.json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
        });
      }

      return NextResponse.json(
        { success: true, message: "You are already subscribed to our newsletter!" },
        { status: 200 }
      );
    }

    // Create a new subscriber record
    await Newsletter.create({ email });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter!",
    });
  } catch (error: any) {
    console.error("Newsletter submission error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: subscribers }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch subscribers error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Subscriber ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const deleted = await Newsletter.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Subscriber deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete subscriber error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}