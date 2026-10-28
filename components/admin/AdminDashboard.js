"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Database,
  Eye,
  EyeOff,
  Images,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import ProjectImage from "@/components/ProjectImage";
import { projectCategories } from "@/lib/data";

const CATEGORIES = projectCategories.filter((c) => c.id !== "all" && c.id !== "featured");

const EMPTY = {
  name: "",
  url: "",
  tag: "",
  category: "hospitality",
  summary: "",
  tech: "",
  points: "",
  metrics: [],
  image: "",
  featured: false,
  inGallery: true,
  published: true,
};

async function api(path, options = {}) {
  const res = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

/** Resize + compress in the browser so uploads stay small (Netlify body limit is ~6 MB). */
async function imageToDataUrl(file, maxWidth = 1600, quality = 0.85) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

const inputCls =
  "w-full rounded-lg border border-ink-line/20 bg-white/70 px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none dark:border-paper/20 dark:bg-ink-soft/70 dark:text-paper dark:placeholder:text-paper/40";
const labelCls = "mb-1 block font-mono text-[10px] uppercase tracking-widest text-ink/60 dark:text-paper/60";

/* --------------------------------- Login ---------------------------------- */

function Login({ status, onDone }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/session", { method: "POST", body: JSON.stringify({ password }) });
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="card-surface w-full max-w-sm space-y-4 p-7 shadow-xl">
        <div>
          <span className="eyebrow">Portfolio CMS</span>
          <h1 className="mt-2 text-3xl font-semibold">Sign in</h1>
        </div>
        {status && !status.authConfigured && (
          <p className="rounded-lg bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
            ADMIN_PASSWORD is not set on the server. Add it to your environment variables first.
          </p>
        )}
        {status && !status.dbConfigured && (
          <p className="rounded-lg bg-gold/15 p-3 text-xs text-gold-dark dark:text-gold">
            MONGODB_URI is not set - the site is showing the static fallback projects.
          </p>
        )}
        <div>
          <label className={labelCls} htmlFor="pw">Admin password</label>
          <input id="pw" type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>
        {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper disabled:opacity-50 dark:bg-gold dark:text-ink"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </button>
      </form>
    </div>
  );
}

/* ------------------------------ Project form ------------------------------ */

function ProjectForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    ...initial,
    tech: (initial?.tech || []).join(", "),
    points: (initial?.points || []).join("\n"),
    metrics: initial?.metrics || [],
  }));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const editing = Boolean(initial?.id);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const dataUrl = await imageToDataUrl(file);
      const res = await api("/api/media", { method: "POST", body: JSON.stringify({ dataUrl, name: file.name }) });
      set("image", res.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form };
      if (editing) {
        await api(`/api/projects/${initial.id}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await api("/api/projects", { method: "POST", body: JSON.stringify(payload) });
      }
      onSaved();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:p-8">
      <form
        onSubmit={submit}
        data-lenis-prevent
        className="relative w-full max-w-2xl space-y-5 rounded-2xl border border-ink-line/10 bg-paper p-6 shadow-2xl dark:border-paper/10 dark:bg-ink sm:p-8"
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-ink/5 dark:hover:bg-paper/10">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-3xl font-semibold">{editing ? "Edit project" : "New project"}</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Name *</label>
            <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Ramee Hotels & Resorts" />
          </div>
          <div>
            <label className={labelCls}>Live URL</label>
            <input value={form.url} onChange={(e) => set("url", e.target.value)} className={inputCls} placeholder="https://..." />
          </div>
          <div>
            <label className={labelCls}>Tag</label>
            <input value={form.tag} onChange={(e) => set("tag", e.target.value)} className={inputCls} placeholder="Enterprise Hospitality" />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Tech (comma separated)</label>
            <input value={form.tech} onChange={(e) => set("tech", e.target.value)} className={inputCls} placeholder="Next.js, TypeScript, Tailwind CSS" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Summary</label>
            <textarea rows={3} value={form.summary} onChange={(e) => set("summary", e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Engineering highlights (one per line)</label>
            <textarea rows={4} value={form.points} onChange={(e) => set("points", e.target.value)} className={inputCls} />
          </div>
        </div>

        {/* Metrics */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={labelCls + " !mb-0"}>Metrics</label>
            {form.metrics.length < 6 && (
              <button type="button" onClick={() => set("metrics", [...form.metrics, { label: "", value: "" }])} className="text-xs font-normal text-gold-dark dark:text-gold">
                + Add metric
              </button>
            )}
          </div>
          <div className="space-y-2">
            {form.metrics.map((m, i) => (
              <div key={i} className="flex gap-2">
                <input value={m.label} placeholder="Label (e.g. Mobile LCP)" onChange={(e) => set("metrics", form.metrics.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} className={inputCls} />
                <input value={m.value} placeholder="Value (e.g. 1.5s)" onChange={(e) => set("metrics", form.metrics.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} className={inputCls} />
                <button type="button" aria-label="Remove metric" onClick={() => set("metrics", form.metrics.filter((_, j) => j !== i))} className="shrink-0 rounded-lg px-2 text-ink/50 hover:text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className={labelCls}>Project image (used in the scroll gallery)</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-ink-line/15 bg-ink/5 sm:w-52 dark:border-paper/15">
              <ProjectImage project={{ ...form, name: form.name || "Preview" }} className="h-full w-full object-cover object-top" />
            </div>
            <div className="flex-1 space-y-2">
              <input value={form.image} onChange={(e) => set("image", e.target.value)} className={inputCls} placeholder="https://... or upload below (blank = auto screenshot of the site)" />
              <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold-dark disabled:opacity-60 dark:text-gold">
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                Upload image
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[
            ["published", "Published"],
            ["inGallery", "Show in scroll gallery"],
            ["featured", "Featured / flagship"],
          ].map(([key, label]) => (
            <label key={key} className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={form[key]} onChange={(e) => set(key, e.target.checked)} className="h-4 w-4 accent-[#D4A857]" />
              {label}
            </label>
          ))}
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-full border border-ink-line/20 px-5 py-2 text-sm dark:border-paper/20">Cancel</button>
          <button type="submit" disabled={saving || uploading} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2 text-sm font-semibold text-paper disabled:opacity-60 dark:bg-gold dark:text-ink">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} {editing ? "Save changes" : "Create project"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* -------------------------------- Dashboard ------------------------------- */

export default function AdminDashboard() {
  const [status, setStatus] = useState(null); // null = loading
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null); // project | "new" | null
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const loadStatus = useCallback(async () => {
    const res = await fetch("/api/admin/session", { cache: "no-store" });
    setStatus(await res.json());
  }, []);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api("/api/projects?includeDrafts=true");
      setProjects(res.projects);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadStatus(); }, [loadStatus]);
  useEffect(() => { if (status?.authenticated) loadProjects(); }, [status?.authenticated, loadProjects]);

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 3500);
  };

  async function patch(p, changes) {
    setProjects((list) => list.map((x) => (x.id === p.id ? { ...x, ...changes } : x))); // optimistic
    try {
      await api(`/api/projects/${p.id}`, { method: "PATCH", body: JSON.stringify(changes) });
    } catch (err) {
      setError(err.message);
      loadProjects();
    }
  }

  async function remove(p) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    try {
      await api(`/api/projects/${p.id}`, { method: "DELETE" });
      setProjects((list) => list.filter((x) => x.id !== p.id));
      flash("Project deleted");
    } catch (err) {
      setError(err.message);
    }
  }

  async function move(index, dir) {
    const next = [...projects];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    setProjects(next);
    try {
      await api("/api/projects/reorder", { method: "POST", body: JSON.stringify({ ids: next.map((p) => p.id) }) });
    } catch (err) {
      setError(err.message);
      loadProjects();
    }
  }

  async function seed() {
    try {
      const res = await api("/api/admin/seed", { method: "POST" });
      flash(`Imported ${res.inserted} project(s), skipped ${res.skipped} existing`);
      loadProjects();
    } catch (err) {
      setError(err.message);
    }
  }

  async function logout() {
    await api("/api/admin/session", { method: "DELETE" });
    setProjects([]);
    loadStatus();
  }

  if (!status) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }
  if (!status.authenticated) return <Login status={status} onDone={loadStatus} />;

  return (
    <div className="container-page py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Portfolio CMS</span>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Projects</h1>
          <p className="mt-1 text-xs text-ink/60 dark:text-paper/60">
            {projects.length} total · {projects.filter((p) => p.published).length} published · {projects.filter((p) => p.inGallery).length} in gallery
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/" className="rounded-full border border-ink-line/20 px-4 py-2 text-xs font-semibold dark:border-paper/20">View site</a>
          <button onClick={seed} className="inline-flex items-center gap-1.5 rounded-full border border-ink-line/20 px-4 py-2 text-xs font-semibold dark:border-paper/20">
            <Database className="h-3.5 w-3.5" /> Import starter projects
          </button>
          <button onClick={() => setEditing("new")} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper dark:bg-gold dark:text-ink">
            <Plus className="h-3.5 w-3.5" /> New project
          </button>
          <button onClick={logout} aria-label="Sign out" className="inline-flex items-center gap-1.5 rounded-full border border-ink-line/20 px-3 py-2 text-xs dark:border-paper/20">
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {notice && <p className="mb-4 rounded-lg bg-teal/15 p-3 text-sm text-teal-dark dark:text-teal-light">{notice}</p>}
      {error && <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {loading && !projects.length ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-gold" /></div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-line/25 p-12 text-center dark:border-paper/25">
          <p className="text-sm text-ink/70 dark:text-paper/70">No projects in the database yet.</p>
          <button onClick={seed} className="mt-4 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink">Import my existing projects</button>
        </div>
      ) : (
        <ul className="space-y-3">
          {projects.map((p, i) => (
            <li key={p.id} className={`card-surface flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap ${p.published ? "" : "opacity-60"}`}>
              <div className="flex flex-col">
                <button disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up" className="rounded p-1 hover:bg-ink/5 disabled:opacity-25 dark:hover:bg-paper/10"><ArrowUp className="h-4 w-4" /></button>
                <button disabled={i === projects.length - 1} onClick={() => move(i, 1)} aria-label="Move down" className="rounded p-1 hover:bg-ink/5 disabled:opacity-25 dark:hover:bg-paper/10"><ArrowDown className="h-4 w-4" /></button>
              </div>
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-ink/5">
                <ProjectImage project={p} className="h-full w-full object-cover object-top" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-xl font-semibold">{p.name}</p>
                <p className="truncate font-mono text-[10px] uppercase tracking-wider text-ink/55 dark:text-paper/55">
                  {p.category} · {p.tag || "no tag"}{!p.published && " · DRAFT"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => patch(p, { featured: !p.featured })} title="Featured" aria-label="Toggle featured" className={`rounded-full p-2 ${p.featured ? "text-gold" : "text-ink/30 dark:text-paper/30"}`}><Star className="h-4 w-4" fill={p.featured ? "currentColor" : "none"} /></button>
                <button onClick={() => patch(p, { inGallery: !p.inGallery })} title="Show in scroll gallery" aria-label="Toggle gallery" className={`rounded-full p-2 ${p.inGallery ? "text-teal" : "text-ink/30 dark:text-paper/30"}`}><Images className="h-4 w-4" /></button>
                <button onClick={() => patch(p, { published: !p.published })} title="Published" aria-label="Toggle published" className="rounded-full p-2 text-ink/70 dark:text-paper/70">{p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</button>
                <button onClick={() => setEditing(p)} aria-label="Edit" className="rounded-full p-2 hover:bg-ink/5 dark:hover:bg-paper/10"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => remove(p)} aria-label="Delete" className="rounded-full p-2 text-red-500 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <ProjectForm
          initial={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            flash("Saved - the live site updates within about a minute");
            loadProjects();
          }}
        />
      )}
    </div>
  );
}
