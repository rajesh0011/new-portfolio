# Rajesh Kumar — Portfolio

A Next.js (App Router, `.js` files) portfolio and freelance-enquiry site, built with Tailwind CSS.
Content is sourced from your CV and lives in one file: `lib/data.js`.

## Features

- SEO: per-page metadata, Open Graph/Twitter cards, JSON-LD Person schema, `sitemap.xml`, `robots.txt`.
- Light/dark theme toggle (persisted, no flash-of-wrong-theme).
- Responsive, animated UI (Tailwind + Framer Motion) — hero, achievements, experience timeline,
  project case studies, skills, and a signature "Core Web Vitals console" widget.
- Contact form on the home page that emails you every enquiry.
- Dedicated `/freelance` page with a project-requirements form (name, email, phone, company,
  project type, budget, timeline, details) that also emails you.
- Spam protection via a honeypot field on both forms.

## 1. Install

```bash
npm install
```

## 2. Configure email delivery

Enquiries are sent by email using SMTP (via Nodemailer). Copy the example env file:

```bash
cp .env.example .env.local
```

Then fill in `.env.local`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youraddress@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_TO_EMAIL=rajeshrathaur0011@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Using Gmail (recommended, free):**
1. Turn on 2-Step Verification on the Google account you want to send from.
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Use that 16-character password as `SMTP_PASS` (not your normal Gmail password).

Any SMTP provider works the same way (Outlook, Zoho, SendGrid SMTP, Resend SMTP, your host's mailbox, etc.) —
just change `SMTP_HOST`/`SMTP_PORT`.

`CONTACT_TO_EMAIL` is the inbox that receives every enquiry — set it to your own email address.
If it's not set, it defaults to `rajeshrathaur0011@gmail.com` (from your CV).

Until SMTP is configured, the forms will show a clear error instead of failing silently.

## 3. Run locally

```bash
npm run dev
```

Visit http://localhost:3000.

## 4. Deploy

Works on any Next.js host (Vercel is easiest):

1. Push this project to a GitHub repo.
2. Import it on https://vercel.com/new.
3. Add the same environment variables from `.env.local` in the Vercel project settings.
4. Deploy.

## Editing content

- **All text/data** (name, experience, projects, skills, freelance services): `lib/data.js`.
- **Colors/fonts/tokens**: `tailwind.config.js`.
- **Pages**: `app/page.js` (home), `app/freelance/page.js` (freelance).
- **Sections**: individual files in `components/`.

## Notes

- Replace `public/og-image.png` and `public/favicon.svg` with your own branding when ready.
- Set `NEXT_PUBLIC_SITE_URL` to your real domain before deploying — it feeds the sitemap,
  canonical URLs, and Open Graph tags.
