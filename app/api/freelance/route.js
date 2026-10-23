import { NextResponse } from "next/server";
import { getTransporter, getRecipient } from "@/lib/mailer";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      details,
      website, // honeypot
    } = body;

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !phone || !details) {
      return NextResponse.json(
        { ok: false, error: "Name, email, phone, and project details are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const to = getRecipient();

    if (!transporter) {
      console.warn("Freelance enquiry received but SMTP is not configured:", { name, email, company });
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email delivery isn't configured yet on the server. The site owner needs to set SMTP_HOST, SMTP_USER, and SMTP_PASS.",
        },
        { status: 503 }
      );
    }

    await transporter.sendMail({
      from: `"Freelance Enquiry" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `New freelance project enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        company ? `Company: ${company}` : null,
        projectType ? `Project type: ${projectType}` : null,
        budget ? `Budget: ${budget}` : null,
        timeline ? `Timeline: ${timeline}` : null,
        "",
        "Project details:",
        details,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: sans-serif; font-size: 14px; color: #111;">
          <h2 style="margin-bottom: 8px;">New freelance project enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          ${projectType ? `<p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>` : ""}
          ${budget ? `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ""}
          ${timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>` : ""}
          <p><strong>Project details:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(details)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Freelance form error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your enquiry. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
