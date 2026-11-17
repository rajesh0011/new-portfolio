import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidPhone,
  cleanLine,
  validateContact,
  validateFreelance,
  escapeHtml,
} from "@/lib/validation";

describe("isValidEmail", () => {
  it.each(["a@b.co", "first.last+tag@example.com"])("accepts %s", (e) => expect(isValidEmail(e)).toBe(true));
  it.each(["", "abc", "a@b", "a b@c.com", "a@b.c", "a@@b.com", "<x>@b.com", null, 5])(
    "rejects %s",
    (e) => expect(isValidEmail(e)).toBe(false)
  );
  it("rejects over-long addresses", () => {
    expect(isValidEmail("a".repeat(250) + "@b.com")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it.each(["+91-7900099842", "7900099842", "(044) 123 4567"])("accepts %s", (p) => expect(isValidPhone(p)).toBe(true));
  it.each(["", "abc", "123", "+", "12-ab-56789"])("rejects %s", (p) => expect(isValidPhone(p)).toBe(false));
});

describe("cleanLine", () => {
  it("removes CR/LF to block header injection", () => {
    expect(cleanLine("Bob\r\nBcc: evil@x.com")).toBe("Bob Bcc: evil@x.com");
  });
  it("returns empty string for non-strings", () => {
    expect(cleanLine(undefined)).toBe("");
  });
});

describe("validateContact", () => {
  const good = { name: "Asha Rao", email: "Asha@Corp.com ", message: "We would like to hire you." };

  it("passes and normalises valid input", () => {
    const r = validateContact(good);
    expect(r.ok).toBe(true);
    expect(r.values.email).toBe("asha@corp.com");
  });
  it("flags every missing required field", () => {
    const r = validateContact({});
    expect(r.ok).toBe(false);
    expect(Object.keys(r.errors).sort()).toEqual(["email", "message", "name"]);
  });
  it("rejects short names and messages", () => {
    const r = validateContact({ ...good, name: "A", message: "hi" });
    expect(r.errors.name).toMatch(/at least/);
    expect(r.errors.message).toMatch(/at least/);
  });
  it("rejects over-long message", () => {
    expect(validateContact({ ...good, message: "x".repeat(3001) }).errors.message).toMatch(/at most/);
  });
  it("rejects whitespace-only fields", () => {
    expect(validateContact({ ...good, name: "   " }).errors.name).toBe("Name is required.");
  });
  it("ignores non-string payloads safely", () => {
    expect(validateContact({ name: {}, email: [], message: 5 }).ok).toBe(false);
  });
});

describe("validateFreelance", () => {
  const good = {
    name: "Asha Rao",
    email: "asha@corp.com",
    phone: "+91 98765 43210",
    details: "Need a performance audit of our Next.js storefront.",
  };
  it("passes valid input", () => expect(validateFreelance(good).ok).toBe(true));
  it("requires phone and details", () => {
    const r = validateFreelance({ name: good.name, email: good.email });
    expect(r.errors.phone).toBeTruthy();
    expect(r.errors.details).toBeTruthy();
  });
  it("rejects bad phone", () => {
    expect(validateFreelance({ ...good, phone: "abc" }).errors.phone).toMatch(/valid phone/);
  });
});

describe("escapeHtml", () => {
  it("escapes markup", () => {
    expect(escapeHtml(`<img src=x onerror="a('b')">&`)).toBe(
      "&lt;img src=x onerror=&quot;a(&#039;b&#039;)&quot;&gt;&amp;"
    );
  });
});
