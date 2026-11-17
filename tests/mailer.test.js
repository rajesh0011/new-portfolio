import { describe, it, expect, beforeEach } from "vitest";
import { getTransporter, getRecipient, describeMailError } from "@/lib/mailer";

beforeEach(() => {
  for (const k of ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL"]) delete process.env[k];
});

describe("mailer", () => {
  it("returns null transporter when config is missing", () => {
    expect(getTransporter()).toBeNull();
  });
  it("builds a transporter and strips spaces from app passwords", () => {
    Object.assign(process.env, {
      SMTP_HOST: "smtp.gmail.com",
      SMTP_PORT: "587",
      SMTP_USER: "a@b.com",
      SMTP_PASS: "abcd efgh ijkl mnop",
    });
    const t = getTransporter();
    expect(t).toBeTruthy();
    expect(t.options.auth.pass).toBe("abcdefghijklmnop");
    expect(t.options.secure).toBe(false);
  });
  it("uses secure for port 465", () => {
    Object.assign(process.env, { SMTP_HOST: "h", SMTP_PORT: "465", SMTP_USER: "u", SMTP_PASS: "p" });
    expect(getTransporter().options.secure).toBe(true);
  });
  it("recipient falls back to SMTP_USER", () => {
    process.env.SMTP_USER = "me@x.com";
    expect(getRecipient()).toBe("me@x.com");
    process.env.CONTACT_TO_EMAIL = "inbox@x.com";
    expect(getRecipient()).toBe("inbox@x.com");
  });
  it("explains auth failures", () => {
    expect(describeMailError({ code: "EAUTH" })).toMatch(/App Password/);
  });
});
