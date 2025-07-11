import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email configuration - You'll need to set these environment variables
const EMAIL_USER = process.env.EMAIL_USER || "your-email@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "your-app-password";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@stafet.com";

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to other services like 'outlook', 'yahoo', etc.
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // Use App Password for Gmail
  },
});

export async function POST(request: NextRequest) {
  try {
    // Log environment variables for debugging (remove in production)
    console.log("Email configuration check:", {
      EMAIL_USER: EMAIL_USER,
      hasEmailPass: !!EMAIL_PASS,
      ADMIN_EMAIL: ADMIN_EMAIL,
    });

    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email configuration
    if (!EMAIL_USER || EMAIL_USER === "your-email@gmail.com") {
      console.error("EMAIL_USER not configured properly");
      return NextResponse.json(
        { error: "Email service not configured properly" },
        { status: 500 }
      );
    }

    if (!EMAIL_PASS) {
      console.error("EMAIL_PASS not configured");
      return NextResponse.json(
        { error: "Email authentication not configured" },
        { status: 500 }
      );
    }

    // Email to the user (confirmation)
    const userEmailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Thank you for contacting STAFET - We'll be in touch shortly!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #6366F1; margin-bottom: 20px;">Thank you for reaching out!</h1>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hi ${name},
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for contacting STAFET. We have received your message and our team will review it shortly.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366F1;">
              <h3 style="color: #6366F1; margin-top: 0;">Your Message Summary:</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              ${
                phone
                  ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>`
                  : ""
              }
              <p style="margin: 10px 0 0;"><strong>Message:</strong></p>
              <p style="margin: 5px 0; color: #666; font-style: italic;">"${message}"</p>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              We typically respond within 24 hours during business days. In the meantime, feel free to explore our website to learn more about our services.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Best regards,<br>
                The STAFET Team
              </p>
              <p style="color: #999; font-size: 12px; margin-top: 15px;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Email to admin (notification)
    const adminEmailOptions = {
      from: EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #6366F1; margin-bottom: 20px;">🚀 New Contact Form Submission</h1>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              You have received a new message through the STAFET website contact form.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366F1;">
              <h3 style="color: #6366F1; margin-top: 0;">Contact Details:</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #6366F1; text-decoration: none;">${email}</a></p>
              ${
                phone
                  ? `<p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #6366F1; text-decoration: none;">${phone}</a></p>`
                  : ""
              }
              <p style="margin: 15px 0 5px;"><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
                <p style="margin: 0; color: #333; line-height: 1.6;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 25px;">
              <a href="mailto:${email}" style="background-color: #6366F1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                Reply to ${name}
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Submitted: ${new Date().toLocaleString()}
              </p>
              <p style="color: #999; font-size: 12px; margin-top: 10px;">
                This message was sent through the STAFET website contact form.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    console.log("Attempting to send emails...");
    const emailResults = await Promise.allSettled([
      transporter.sendMail(userEmailOptions),
      transporter.sendMail(adminEmailOptions),
    ]);

    // Check if any emails failed
    const failedEmails = emailResults.filter(
      (result) => result.status === "rejected"
    );
    if (failedEmails.length > 0) {
      console.error("Some emails failed to send:", failedEmails);
      return NextResponse.json(
        {
          error: "Some emails failed to send",
          success: false,
          details: failedEmails.map((fail) =>
            fail.status === "rejected" ? fail.reason : "Unknown error"
          ),
        },
        { status: 500 }
      );
    }

    console.log("All emails sent successfully");
    return NextResponse.json(
      {
        message: "Emails sent successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        success: false,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
