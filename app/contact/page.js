import Container from "@/components/Container";
import { PageHeader } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Mohamed Hussein by email, LinkedIn or GitHub.",
};

/*
  No contact form on purpose: a form needs a server or third-party service
  to receive messages, and a plain email link collects no data at all.
*/
const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "mohamed-hussein", href: site.links.linkedin },
  { label: "GitHub", value: "Malcomtheboy", href: site.links.github },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Open to graduate roles and internships."
        intro="Based in Oslo and open to opportunities in Norway and abroad, including London. Email is the quickest way to reach me."
      />
      <Container className="pb-24 sm:pb-32">
        <ul className="divide-y divide-line border-y border-line">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                className="group grid gap-2 py-8 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-16"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">{c.label}</span>
                <span className="text-xl font-medium tracking-tight break-all text-ink-100 transition-colors group-hover:text-accent sm:text-2xl">
                  {c.value}
                </span>
                <span aria-hidden="true" className="hidden text-ink-400 transition-transform group-hover:translate-x-1 sm:inline">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
