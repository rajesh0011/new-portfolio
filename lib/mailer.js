import nodemailer from "nodemailer";

/** Returns nodemailer transport, or null when SMTP env vars are missing. */
export function getTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER?.trim();
  // Gmail shows app passwords as "abcd efgh ijkl mnop" - the spaces must go.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export function getRecipient() {
  return process.env.CONTACT_TO_EMAIL?.trim() || process.env.SMTP_USER?.trim() || "";
}

/** Turns a nodemailer error into a short, actionable hint for the server log. */
export function describeMailError(err) {
  if (err?.code === "EAUTH" || err?.responseCode === 535) {
    return "SMTP authentication failed - for Gmail use a 16-character App Password (needs 2-Step Verification), not your normal password.";
  }
  if (err?.code === "ESOCKET" || err?.code === "ECONNECTION" || err?.code === "ETIMEDOUT") {
    return "Could not reach the SMTP server - check SMTP_HOST / SMTP_PORT and network access.";
  }
  return err?.message || "Unknown mail error";
}
