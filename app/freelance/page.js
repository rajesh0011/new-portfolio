import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FreelanceForm from "@/components/FreelanceForm";
import { freelanceServices, process, achievements } from "@/lib/data";

export const metadata = {
  title: "Hire a Freelance Next.js Developer",
  description:
    "Hire Rajesh Kumar for freelance Next.js and React development — SEO-friendly web apps, performance audits, and pixel-perfect UI builds. Share your project requirements to get started.",
  alternates: { canonical: "/freelance" },
};

export default function FreelancePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-16 sm:pt-24">
          <div className="container-page grid gap-4 pb-16 sm:pb-20">
            <p className="eyebrow">Freelance</p>
            <h1 className="section-heading max-w-3xl">
              Bring your product to launch with a developer who ships and measures.
            </h1>
            <p className="max-w-2xl text-base text-ink/70 dark:text-paper/70 sm:text-lg">
              Available for freelance and contract engagements — from a single performance audit
              to a full Next.js build. Share the brief below and I&apos;ll reply within a business
              day with next steps.
            </p>
          </div>
        </section>

        <section className="border-y border-ink-line/10 py-16 dark:border-paper/10 sm:py-20">
          <div className="container-page">
            <p className="eyebrow mb-4">What I can build</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {freelanceServices.map((s) => (
                <div key={s.title} className="card-surface p-6">
                  <h3 className="mb-2 font-display text-lg font-medium">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/70 dark:text-paper/70">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-page">
            <p className="eyebrow mb-4">How it works</p>
            <div className="grid gap-6 sm:grid-cols-4">
              {process.map((step, i) => (
                <div key={step.step} className="relative">
                  <span className="font-mono text-xs text-gold-dark dark:text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-medium">{step.step}</h3>
                  <p className="mt-1 text-sm text-ink/60 dark:text-paper/60">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-ink-line/10 bg-ink-soft/[0.03] py-10 dark:border-paper/10 dark:bg-paper/[0.02]">
          <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
            {achievements.map((a) => (
              <div key={a.label} className="flex flex-col gap-1">
                <span className="font-display text-2xl font-medium text-gold-dark dark:text-gold sm:text-3xl">
                  {a.value}
                </span>
                <span className="text-xs leading-snug text-ink/60 dark:text-paper/60 sm:text-sm">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="enquiry" className="scroll-mt-20 py-20 sm:py-28">
          <div className="container-page grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Project enquiry</p>
              <h2 className="section-heading mb-6">Tell me about your project.</h2>
              <p className="max-w-md text-ink/70 dark:text-paper/70">
                The more detail you share, the faster I can put together an accurate proposal.
                Every field marked required is the minimum I need to respond.
              </p>
            </div>
            <FreelanceForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
