// Shared form validation (used by the client forms AND the API routes).

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  phone: { min: 7, max: 20 },
  company: { max: 120 },
  message: { min: 10, max: 3000 },
  short: { max: 120 },
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^\+?[0-9(][0-9\s().-]{5,}$/;
// Strip control characters (blocks header-injection via CR/LF in single-line fields).
// eslint-disable-next-line no-control-regex
const CTRL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function isValidEmail(email) {
  return typeof email === "string" && email.length <= LIMITS.email.max && EMAIL_RE.test(email);
}

export function isValidPhone(phone) {
  if (typeof phone !== "string" || !PHONE_RE.test(phone)) return false;
  const digits = phone.replace(/\D/g, "").length;
  return digits >= LIMITS.phone.min && phone.length <= LIMITS.phone.max;
}

export function cleanLine(value) {
  return typeof value === "string" ? value.replace(/[\r\n\t]+/g, " ").replace(CTRL_RE, "").trim() : "";
}

export function cleanText(value) {
  return typeof value === "string" ? value.replace(CTRL_RE, "").replace(/\r\n/g, "\n").trim() : "";
}

function lengthError(label, value, { min = 0, max = Infinity }) {
  if (value.length < min) return `${label} must be at least ${min} characters.`;
  if (value.length > max) return `${label} must be at most ${max} characters.`;
  return null;
}

/** Returns { ok, errors: {field: msg}, values } for the contact form. */
export function validateContact(input = {}) {
  const values = {
    name: cleanLine(input.name),
    email: cleanLine(input.email).toLowerCase(),
    company: cleanLine(input.company),
    message: cleanText(input.message),
  };
  const errors = {};

  if (!values.name) errors.name = "Name is required.";
  else {
    const e = lengthError("Name", values.name, LIMITS.name);
    if (e) errors.name = e;
  }

  if (!values.email) errors.email = "Email is required.";
  else if (!isValidEmail(values.email)) errors.email = "Please enter a valid email address.";

  if (values.company) {
    const e = lengthError("Company", values.company, LIMITS.company);
    if (e) errors.company = e;
  }

  if (!values.message) errors.message = "Message is required.";
  else {
    const e = lengthError("Message", values.message, LIMITS.message);
    if (e) errors.message = e;
  }

  return { ok: Object.keys(errors).length === 0, errors, values };
}

/** Returns { ok, errors, values } for the freelance enquiry form. */
export function validateFreelance(input = {}) {
  const base = validateContact({ ...input, message: input.details });
  const errors = { ...base.errors };
  if (errors.message) {
    errors.details = errors.message.replace("Message", "Project details");
    delete errors.message;
  }

  const values = {
    name: base.values.name,
    email: base.values.email,
    company: base.values.company,
    details: base.values.message,
    phone: cleanLine(input.phone),
    projectType: cleanLine(input.projectType),
    budget: cleanLine(input.budget),
    timeline: cleanLine(input.timeline),
  };

  if (!values.phone) errors.phone = "Phone number is required.";
  else if (!isValidPhone(values.phone)) errors.phone = "Please enter a valid phone number.";

  for (const key of ["projectType", "budget", "timeline"]) {
    const e = lengthError(key, values[key], LIMITS.short);
    if (e) errors[key] = e;
  }

  return { ok: Object.keys(errors).length === 0, errors, values };
}

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
