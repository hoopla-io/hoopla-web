// app/api/send-newsletter/route.ts

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lastninja294@gmail.com",
    pass: "vuti zsjz mwyp apuw",
  },
});

export async function POST(request: Request) {
  const { emails, message } = await request.json();

  if (!emails || emails.length === 0 || !message) {
    return NextResponse.json(
      { error: "Emails and message are required" },
      { status: 400 }
    );
  }

  try {
    const emailPromises = emails.map((email: string) => {
      const mailOptions = {
        from: `Hoopla Web <lastninja294@gmail.com>`,
        to: email,
        subject: "New Newsletter Update",
        text: "We have exciting news for you!",
        html: `<html>
                    <body>
                    <h1>Exciting News!</h1>
                    <p>${message}</p>
                    </body>
                </html>`,
      };

      return transporter.sendMail(mailOptions);
    });

    // Wait for all email promises to resolve
    await Promise.all(emailPromises);

    return NextResponse.json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails", details: error },
      { status: 500 }
    );
  }
}
