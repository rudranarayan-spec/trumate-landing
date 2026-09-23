/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // 1. Connect to Database and Save Contact Inquiry
    await connectDB();
    const newContact = await Contact.create({
      name,
      email,
      phone,
      subject: subject || "General Inquiry",
      message,
      status: "Unread",
    });

    // 2. Configure Nodemailer transporter with your SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content for the admin
    const mailOptions = {
      from: `"Trumate Customer Support" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `✉️ New Contact Message: ${subject || "General Inquiry"}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #FAF9F5;">
          <h2 style="color: #1C3516; border-bottom: 2px solid #1C3516; padding-bottom: 10px;">New Contact Form Message</h2>
          <p>You have received a new customer inquiry from your Trumate website contact page.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 35%;">Sender Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background-color: #fff;">
              <td style="padding: 8px; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px;">${phone ? `<a href="tel:${phone}">${phone}</a>` : "Not provided"}</td>
            </tr>
            <tr style="background-color: #fff;">
              <td style="padding: 8px; font-weight: bold;">Subject:</td>
              <td style="padding: 8px; color: #1C3516; font-weight: bold;">${subject || "General Inquiry"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px; background-color: #fff; border-radius: 6px;">${message}</td>
            </tr>
          </table>

          <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center;">
            This email was automatically dispatched from your Trumate website contact form.
          </p>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Contact message saved and sent successfully to admin.", data: newContact },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Nodemailer contact error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process contact message." },
      { status: 500 }
    );
  }
}

// GET API endpoint to fetch contact inquiries for your Admin Dashboard
export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}