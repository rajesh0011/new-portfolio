import { NextResponse } from "next/server";
import { getTransporter, getRecipient } from "@/lib/mailer";
import fs from "fs";
import path from "path";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Ensure local persistence for inquiries so no enquiry is ever lost
function logEnquiryToFile(enquiry) {
  try {
    const file = path.join(process.cwd(), "lib", "enquiries.json");
    let entries = [];
    if (fs.existsSync(file)) {
      entries = JSON.parse(fs.readFileSync(file, "utf8"));
    }
    entries.unshift({ ...enquiry, receivedAt: new Date().toISOString() });
    fs.writeFileSync(file, JSON.stringify(entries, null, 2), "utf8");
  } catch (err) {
    console.error("Could not write enquiry to backup file:", err);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, company, website } = body;

    // Honeypot field
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const to = getRecipient() || "rajeshrathaur0011@gmail.com";
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(
      `Portfolio Enquiry from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\n\nMessage:\n${message}`
    )}`;

    // 1. Always record enquiry locally to ensure zero lead loss
    logEnquiryToFile({ name, email, company, message, targetEmail: to });

    const transporter = getTransporter();

    // 2. If SMTP is configured, send via email transport
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.SMTP_USER || to}>`,
          to,
          replyTo: email,
          subject: `New portfolio enquiry from ${name}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            company ? `Company: ${company}` : null,
            "",
            "Message:",
            message,
          ]
            .filter(Boolean)
            .join("\n"),
          html: `
            <div style="font-family: sans-serif; font-size: 14px; color: #111;">
              <h2 style="margin-bottom: 8px;">New portfolio enquiry</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
          `,
        });
      } catch (smtpErr) {
        console.error("SMTP send error (enquiry was safely logged to disk):", smtpErr);
      }
    }

    return NextResponse.json({
      ok: true,
      recipient: to,
      mailtoUrl,
      message: `Enquiry received for ${to}.`,
    });
  } catch (err) {
    console.error("Contact form route error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again." },
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
