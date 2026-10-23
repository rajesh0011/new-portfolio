"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "New website / web app",
  budget: "",
  timeline: "",
  details: "",
  website: "",
};

const projectTypes = [
  "New website / web app",
  "Performance / SEO audit",
  "UI implementation from design",
  "API / payment integration",
  "Ongoing frontend support",
  "Other",
];

export default function FreelanceForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/freelance", {
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
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6 sm:p-8">
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
        <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
        <Field label="Company (optional)" name="company" value={form.company} onChange={handleChange} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/60 dark:text-paper/60">
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className="w-full rounded-xl border border-ink-line/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-gold dark:border-paper/20 dark:bg-ink [&>option]:bg-paper dark:[&>option]:bg-ink"
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="Estimated budget (optional)"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="e.g. $2,000 – $5,000"
        />
      </div>

      <Field
        label="Timeline (optional)"
        name="timeline"
        value={form.timeline}
        onChange={handleChange}
        placeholder="e.g. Launch in 6 weeks"
      />

      <div>
        <label htmlFor="details" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/60 dark:text-paper/60">
          Project requirements
        </label>
        <textarea
          id="details"
          name="details"
          rows={6}
          required
          value={form.details}
          onChange={handleChange}
          placeholder="What are you building? Any references, pages, integrations, or must-have features?"
          className="w-full rounded-xl border border-ink-line/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-gold dark:border-paper/20"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-gold dark:text-ink"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "loading" ? "Submitting..." : "Submit project enquiry"}
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-teal-dark dark:text-teal-light">
          <CheckCircle2 className="h-4 w-4" /> Enquiry received — I&apos;ll follow up within a business day.
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4" /> {errorMsg}
        </p>
      )}
    </form>
  );
}

function Field({ label, name, type = "text", value, onChange, required = false, placeholder }) {
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
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink-line/20 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-gold dark:border-paper/20"
      />
    </div>
  );
}
