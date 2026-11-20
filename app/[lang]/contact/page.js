import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import EnquiryButton from "@/components/EnquiryButton";
import { PageHeader } from "@/components/ui";
import { getI18n, pageMeta } from "@/lib/i18n";

export async function generateMetadata() {
  const { lang, c } = await getI18n();
  const t = c.pages.contact;
  return pageMeta(lang, "/contact", t.metaTitle, t.metaDescription);
}

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

export default async function ContactPage() {
  const { c } = await getI18n();
  const t = c.pages.contact;
  const links = [
    { label: "LinkedIn", value: "mohamed-hussein", href: c.site.links.linkedin },
    { label: "GitHub", value: "Malcomtheboy", href: c.site.links.github },
  ];

  return (
    <>
      <PageHeader label={t.label} title={t.title} intro={t.intro} />
      <Container className="pb-16">
        <section aria-labelledby="form-title" className="grid gap-8 border-t border-line pt-12 md:grid-cols-[12rem_1fr] md:gap-16">
          <h2 id="form-title" className="font-mono text-xs uppercase tracking-[0.18em] text-ink-300">{t.formTitle}</h2>
          <div className="max-w-2xl">
            <ContactForm topic={c.home.hello} email={c.site.email} t={c.ui.form} />
          </div>
        </section>
      </Container>
      <Container className="pb-24 sm:pb-32">
        <ul className="divide-y divide-line border-y border-line">
          <li>
            <EnquiryButton subject={c.home.hello} email={c.site.email} ui={c.ui} className={rowClass}>
              <RowContent label={t.email} value={c.site.email} />
            </EnquiryButton>
          </li>
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className={rowClass}>
                <RowContent label={l.label} value={l.value} />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
