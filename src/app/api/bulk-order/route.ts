import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, businessName, businessType, productInterest, quantity, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !businessName || !quantity) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter with your SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your email address
        pass: process.env.SMTP_PASS, // Your email password or App Password
      },
    });

    // Email content for the admin
    const mailOptions = {
      from: `"Trumate Wholesale Desk" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Where admin receives orders
      subject: `📦 New Bulk Order Request: ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #FAF9F5;">
          <h2 style="color: #1C3516; border-bottom: 2px solid #1C3516; padding-bottom: 10px;">New Bulk Order Inquiry</h2>
          <p>You have received a new bulk order request from your Trumate website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 40%;">Contact Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background-color: #fff;">
              <td style="padding: 8px; font-weight: bold;">Business Name:</td>
              <td style="padding: 8px;">${businessName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Business Type:</td>
              <td style="padding: 8px; text-transform: capitalize;">${businessType}</td>
            </tr>
            <tr style="background-color: #fff;">
              <td style="padding: 8px; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr style="background-color: #fff;">
              <td style="padding: 8px; font-weight: bold;">Product Interest:</td>
              <td style="padding: 8px; text-transform: capitalize;">${productInterest}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Estimated Quantity:</td>
              <td style="padding: 8px; color: #1C3516; font-weight: bold;">${quantity}</td>
            </tr>
            <tr style="background-color: #fff;">
              <td style="padding: 8px; font-weight: bold; vertical-align: top;">Additional Message:</td>
              <td style="padding: 8px;">${message || "No additional message provided."}</td>
            </tr>
          </table>

          <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center;">
            This email was automatically dispatched from your Trumate website bulk order form.
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Bulk order submitted successfully and email sent to admin." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { message: "Failed to send email. Please check server configurations." },
      { status: 500 }
    );
  }
}