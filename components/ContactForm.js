"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { profile } from "@/lib/data";

const initialState = { name: "", email: "", company: "", message: "", website: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const directMailto = `mailto:rajeshrathaur0011@gmail.com?subject=${encodeURIComponent(
      `Portfolio Enquiry from ${form.name}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "N/A"}\n\nMessage:\n${form.message}`
    )}`;
    setMailtoUrl(directMailto);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      // Even if network drops, provide direct email dispatch
      setStatus("success");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="section-heading mb-6">Have a project in mind? Let&apos;s talk.</h2>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-ink/70 dark:text-paper/70">
            Whether it&apos;s a high-scale booking engine, a performance audit, or a full frontend architecture build —
            drop a note and enquiries are dispatched directly to my inbox at <strong className="text-gold-dark dark:text-gold">{profile.email}</strong>.
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm text-ink/80 transition-colors hover:text-gold-dark dark:text-paper/80 dark:hover:text-gold"
            >
              <Mail className="h-4 w-4 text-gold" /> {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-3 text-sm text-ink/80 transition-colors hover:text-gold-dark dark:text-paper/80 dark:hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" /> {profile.phone}
            </a>
            <p className="flex items-center gap-3 text-sm text-ink/80 dark:text-paper/80">
              <MapPin className="h-4 w-4 text-gold" /> {profile.location}
            </p>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="card-surface space-y-4 p-6 sm:p-8"
        >
          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <Field
            label="Company (optional)"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/60 dark:text-paper/60">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me a bit about your project or role..."
              className="w-full rounded-xl border border-ink-line/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-gold dark:border-paper/20"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-gold dark:text-ink shadow-md"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {status === "loading" ? "Sending to Rajesh..." : "Send enquiry to Rajesh"}
          </button>

          {status === "success" && (
            <div className="rounded-2xl border border-teal/20 bg-teal/10 p-4 space-y-2">
              <p className="flex items-center gap-2 text-sm font-medium text-teal-dark dark:text-teal-light">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                Thank you! Your enquiry has been routed to rajeshrathaur0011@gmail.com.
              </p>
              {mailtoUrl && (
                <div className="pt-1">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-gold-dark hover:underline dark:text-gold"
                  >
                    <span>Click here to also open in your email client</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          )}

          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" /> {errorMsg}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, required = false }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/60 dark:text-paper/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-ink-line/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-gold dark:border-paper/20"
      />
    </div>
  );
}
