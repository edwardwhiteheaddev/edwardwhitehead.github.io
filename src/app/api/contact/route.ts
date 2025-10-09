import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Nodemailer transport configuration
  // IMPORTANT: These credentials should be set as environment variables in your deployment environment.
  // DO NOT hardcode them here.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: (process.env.SMTP_SECURE === 'true'), // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your SMTP username
      pass: process.env.SMTP_PASS, // Your SMTP password
    },
  });

  // Email content
  const mailOptions = {
    from: `"Website Contact Form" <${process.env.SMTP_USER}>`, // Sender address
    to: "ed.surreal@gmail.com", // Edward's email address
    replyTo: email,
    subject: `New message from ${name}`,
    text: message,
    html: `<p>You have a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
  };

  try {
    // Verify transporter configuration
    // await transporter.verify(); // Optional: verify connection configuration

    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please check server configuration." },
      { status: 500 }
    );
  }
}
