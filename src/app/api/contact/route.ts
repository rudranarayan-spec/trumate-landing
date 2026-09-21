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

    // Configure Nodemailer transporter with your SMTP credentials
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
              <td style="padding: 8px; color: #1C3516; font-weight: bold;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 8px; background-color: #fff; border-radius: 6px; padding: 12px;">${message}</td>
            </tr>
          </table>

          <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center;">
            This email was automatically dispatched from your Trumate website contact form.
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Contact message sent successfully to admin." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Nodemailer contact error:", error);
    return NextResponse.json(
      { message: "Failed to send email. Please check server configurations." },
      { status: 500 }
    );
  }
}