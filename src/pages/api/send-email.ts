import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // process.env, not import.meta.env: Vite inlines the latter at build time.
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_RECIPIENT ?? user;

    if (!user || !pass) {
      return Response.json(
        { error: "Contact form is not configured" },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${name}" <${user}>`,
      replyTo: email,
      to: recipient,
      subject: `Hoopla Web (${name})`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Message:</strong></p><p>${escapeHtml(message)}</p>`,
    });

    return Response.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
