import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import EnquiryButton from "@/components/EnquiryButton";
import { PageHeader } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Mohamed Hussein by email, LinkedIn or GitHub.",
};

/*
  Contact form at the top (sent via /api/contact), then direct channels.
  The email row opens the same dialog as the "Ask about" buttons.
*/
const rowClass = "group grid w-full cursor-pointer gap-2 py-8 text-left sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-16";

function RowContent({ label, value }) {
  return (
    <>
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">{label}</span>
      <span className="text-xl font-medium tracking-tight break-all text-ink-100 transition-colors group-hover:text-accent sm:text-2xl">
        {value}
      </span>
      <span aria-hidden="true" className="hidden text-ink-400 transition-transform group-hover:translate-x-1 sm:inline">
        →
      </span>
    </>
  );
}

const links = [
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
      <Container className="pb-16">
        <section aria-labelledby="form-title" className="grid gap-8 border-t border-line pt-12 md:grid-cols-[12rem_1fr] md:gap-16">
          <h2 id="form-title" className="font-mono text-xs uppercase tracking-[0.18em] text-ink-300">Send a message</h2>
          <div className="max-w-2xl">
            <ContactForm />
          </div>
        </section>
      </Container>
      <Container className="pb-24 sm:pb-32">
        <ul className="divide-y divide-line border-y border-line">
          <li>
            <EnquiryButton subject="Hello from devmyc.no" className={rowClass}>
              <RowContent label="Email" value={site.email} />
            </EnquiryButton>
          </li>
          {links.map((c) => (
            <li key={c.label}>
              <a href={c.href} className={rowClass}>
                <RowContent label={c.label} value={c.value} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
