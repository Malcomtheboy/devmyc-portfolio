import Link from "next/link";
import Container from "@/components/Container";
import { Eyebrow, PageHeader } from "@/components/ui";
import EnquiryButton from "@/components/EnquiryButton";
import { process, services } from "@/lib/content";

export const metadata = {
  title: "Services",
  description:
    "Websites from NOK 3,000, system architecture from NOK 8,000 and full apps from NOK 15,000. Built by Mohamed Hussein in Oslo.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Need a website, a plan or a whole app?"
        intro="I build the same kind of things I show on this site, for people and small businesses. Prices are starting points; you get a fixed quote before anything begins."
      />

      <Container className="pb-20">
        <ul className="grid gap-5 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.slug}
              className={`flex flex-col rounded-3xl border p-7 sm:p-8 ${
                s.highlight ? "border-accent/60 bg-surface" : "border-line bg-surface/60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-medium tracking-tight text-ink-100">{s.name}</h2>
                {s.highlight && (
                  <span className="rounded-full bg-accent-dim px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Most complete
                  </span>
                )}
              </div>
              <p className="mt-6">
                <span className="block font-mono text-xs uppercase tracking-[0.18em] text-ink-400">From</span>
                <span className="mt-1 block text-4xl font-medium tracking-[-0.03em] text-ink-100">{s.price}</span>
              </p>
              <p className="mt-5 leading-relaxed text-pretty text-ink-300">{s.summary}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6 text-ink-200">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-400">Good for: {s.fit}</p>
              <EnquiryButton
                subject={`${s.name} enquiry`}
                className={`mt-8 inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-medium transition-colors duration-200 ${
                  s.highlight
                    ? "bg-ink-100 text-canvas hover:bg-accent"
                    : "border border-line text-ink-100 hover:border-ink-300"
                }`}
              >
                Ask about {s.name.toLowerCase()}
              </EnquiryButton>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pb-24 sm:pb-32">
        <section aria-labelledby="process-title" className="grid gap-10 border-t border-line pt-14 md:grid-cols-[12rem_1fr] md:gap-16">
          <Eyebrow as="h2" id="process-title">How it works</Eyebrow>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title}>
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-medium text-ink-100">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-16 rounded-3xl border border-line bg-surface p-8 sm:p-10">
          <h2 className="max-w-xl text-2xl font-medium tracking-tight text-balance text-ink-100 sm:text-3xl">
            Not sure which one fits? Tell me what you have in mind.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <EnquiryButton
              subject="Project enquiry"
              className="inline-flex h-11 cursor-pointer items-center rounded-full bg-ink-100 px-5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
            >
              Get in touch
            </EnquiryButton>
            <Link
              href="/projects"
              className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-ink-100 transition-colors duration-200 hover:border-ink-300"
            >
              See my work first
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
