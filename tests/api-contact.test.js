import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMail = vi.fn();
let transporter = { sendMail };

vi.mock("@/lib/mailer", () => ({
  getTransporter: () => transporter,
  getRecipient: () => "owner@example.com",
  describeMailError: (e) => e.message,
}));

const { POST: contact } = await import("@/app/api/contact/route");
const { POST: freelance } = await import("@/app/api/freelance/route");

const req = (body, raw) => ({ json: async () => (raw ? Promise.reject(new Error("bad")) : body) });

beforeEach(() => {
  sendMail.mockReset();
  sendMail.mockResolvedValue({});
  transporter = { sendMail };
  process.env.SMTP_USER = "owner@example.com";
  vi.spyOn(console, "error").mockImplementation(() => {});
});

const goodContact = { name: "Asha Rao", email: "asha@corp.com", message: "Looking to hire you for our team." };

describe("POST /api/contact", () => {
  it("sends the email and returns ok", async () => {
    const res = await contact(req(goodContact));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(sendMail).toHaveBeenCalledTimes(1);
    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toBe("owner@example.com");
    expect(mail.text).toContain("Asha Rao");
  });

  it("returns 400 with field errors on invalid input and sends nothing", async () => {
    const res = await contact(req({ name: "", email: "nope", message: "" }));
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.errors.email).toBeTruthy();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns 400 for malformed JSON", async () => {
    expect((await contact(req(null, true))).status).toBe(400);
  });

  it("silently accepts honeypot submissions without sending", async () => {
    const res = await contact(req({ ...goodContact, website: "spam.com" }));
    expect((await res.json()).ok).toBe(true);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("REPORTS FAILURE (502) when SMTP fails - never a fake success", async () => {
    sendMail.mockRejectedValue(new Error("Invalid login"));
    const res = await contact(req(goodContact));
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });

  it("returns 503 when SMTP is not configured", async () => {
    transporter = null;
    expect((await contact(req(goodContact))).status).toBe(503);
  });

  it("escapes HTML in the email body", async () => {
    await contact(req({ ...goodContact, message: "<script>alert(1)</script> hello there" }));
    expect(sendMail.mock.calls[0][0].html).not.toContain("<script>");
  });

  it("strips header-injection attempts from the name", async () => {
    await contact(req({ ...goodContact, name: "Bob\r\nBcc: evil@x.com" }));
    expect(sendMail.mock.calls[0][0].replyTo).not.toMatch(/[\r\n]/);
  });
});

describe("POST /api/freelance", () => {
  const good = { ...goodContact, details: "Need a Next.js audit and rebuild.", phone: "+91 98765 43210" };

  it("sends valid enquiries", async () => {
    const res = await freelance(req(good));
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(1);
  });
  it("validates phone", async () => {
    expect((await freelance(req({ ...good, phone: "x" }))).status).toBe(400);
  });
  it("reports SMTP failure as 502", async () => {
    sendMail.mockRejectedValue(new Error("down"));
    expect((await freelance(req(good))).status).toBe(502);
  });
});
