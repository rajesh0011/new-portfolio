import nodemailer from "nodemailer";

// Creates a reusable SMTP transporter from environment variables.
// See .env.example for the variables you need to set.
export function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export function getRecipient() {
  return process.env.CONTACT_TO_EMAIL || "rajeshrathaur0011@gmail.com";
}
