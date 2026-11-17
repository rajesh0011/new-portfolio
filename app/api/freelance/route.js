import { NextResponse } from "next/server";
import { getTransporter, getRecipient, describeMailError } from "@/lib/mailer";
import { validateFreelance, escapeHtml } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (body?.website) {
    return NextResponse.json({ ok: true });
  }

  const { ok, errors, values } = validateFreelance(body);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: Object.values(errors)[0], errors },
      { status: 400 }
    );
  }

  const transporter = getTransporter();
  const to = getRecipient();
  if (!transporter || !to) {
    console.error("Freelance form: SMTP is not configured.");
    return NextResponse.json(
      { ok: false, error: "Email delivery is temporarily unavailable. Please email me directly." },
      { status: 503 }
    );
  }

  const { name, email, phone, company, projectType, budget, timeline, details } = values;
  try {
    await transporter.sendMail({
      from: `"Freelance Enquiry" <${process.env.SMTP_USER.trim()}>`,
      to,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
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
        .filter((l) => l !== null)
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
        </div>`,
    });
  } catch (err) {
    console.error("Freelance form SMTP error:", describeMailError(err), err?.message);
    return NextResponse.json(
      { ok: false, error: "We couldn't deliver your enquiry right now. Please try again or email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
