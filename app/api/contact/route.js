import { NextResponse } from "next/server";
import { getTransporter, getRecipient, describeMailError } from "@/lib/mailer";
import { validateContact, escapeHtml } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot field - pretend success so bots learn nothing.
  if (body?.website) {
    return NextResponse.json({ ok: true });
  }

  const { ok, errors, values } = validateContact(body);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: Object.values(errors)[0], errors },
      { status: 400 }
    );
  }

  const transporter = getTransporter();
  const to = getRecipient();
  if (!transporter || !to) {
    console.error("Contact form: SMTP_HOST / SMTP_USER / SMTP_PASS / CONTACT_TO_EMAIL are not all set.");
    return NextResponse.json(
      { ok: false, error: "Email delivery is temporarily unavailable. Please email me directly." },
      { status: 503 }
    );
  }

  const { name, email, company, message } = values;
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER.trim()}>`,
      to,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New portfolio enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        "Message:",
        message,
      ]
        .filter((l) => l !== null)
        .join("\n"),
      html: `
        <div style="font-family: sans-serif; font-size: 14px; color: #111;">
          <h2 style="margin-bottom: 8px;">New portfolio enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>`,
    });
  } catch (err) {
    console.error("Contact form SMTP error:", describeMailError(err), err?.message);
    return NextResponse.json(
      { ok: false, error: "We couldn't deliver your message right now. Please try again or email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, message: "Enquiry sent." });
}
