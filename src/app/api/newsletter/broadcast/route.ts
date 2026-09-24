/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db";
import Newsletter from "@/models/Newsletter";

export async function POST(req: NextRequest) {
  try {
    const { subject, message } = await req.json();

    if (!subject || !message) {
      return NextResponse.json(
        { success: false, message: "Subject and message content are required." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Fetch only active subscribers
    const subscribers = await Newsletter.find({ isActive: true });

    if (subscribers.length === 0) {
      return NextResponse.json(
        { success: false, message: "No active subscribers found to send mail to." },
        { status: 404 }
      );
    }

    const emails = subscribers.map((sub) => sub.email);

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email using BCC to keep recipient emails private, or loop through them
    // Using BCC for a single dispatch is efficient for small-to-medium lists:
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Trumate" <support@trumate.com>`,
      bcc: emails, // Keeps subscribers' email addresses hidden from one another
      subject: subject,
      text: message, // Plain text fallback
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #faf9f5;">
          <h2 style="color: #1C3516; margin-top: 0;">Trumate Newsletter Update</h2>
          <div style="color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
            ${message}
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 11px; color: #9ca3af; text-align: center;">
            You are receiving this because you subscribed on Trumate. If you wish to unsubscribe, please contact support.
          </p>
        </div>
      `,
    });

    console.log("Newsletter broadcast sent: %s", info.messageId);

    return NextResponse.json({
      success: true,
      message: `Newsletter successfully sent to ${emails.length} active subscriber(s)!`,
    });
  } catch (error: any) {
    console.error("Broadcast mailing error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send broadcast emails." },
      { status: 500 }
    );
  }
}