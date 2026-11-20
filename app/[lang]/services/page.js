import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { Eyebrow, PageHeader } from "@/components/ui";
import EnquiryButton from "@/components/EnquiryButton";
import { getI18n, pageMeta } from "@/lib/i18n";

export async function generateMetadata() {
  const { lang, c } = await getI18n();
  const t = c.pages.services;
  return pageMeta(lang, "/services", t.metaTitle, t.metaDescription);
}

// Every project with an image, shown as "Apps I've built" (in this order)
const APP_SLUGS = ["rihla", "listly", "noragentic", "trace", "barbershop", "go123movies"];

function SectionHead({ id, label, title, intro }) {
  return (
    <div className="grid gap-4 border-t border-line pt-14 md:grid-cols-[12rem_1fr] md:gap-16">
      <Eyebrow as="p">{label}</Eyebrow>
      <div>
        <h2 id={id} className="text-2xl font-medium tracking-tight text-balance text-ink-100 sm:text-3xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-ink-300">{intro}</p>}
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const { lang, c, href } = await getI18n();
  const t = c.pages.services;
  const subjectFor = (name) => (lang === "no" ? `Forespørsel: ${name}` : `${name} ${t.enquiry}`);
  const apps = APP_SLUGS.map((slug) => c.projects.find((p) => p.slug === slug)).filter((p) => p?.images?.length);

  return (
    <>
      <PageHeader label={t.label} title={t.title} intro={t.intro} />

      {/* Packages */}
      <Container className="pb-20">
        <ul className="grid gap-5 lg:grid-cols-3">
          {c.services.map((s) => (
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
                    {c.ui.mostComplete}
                  </span>
                )}
              </div>
              <p className="mt-6">
                <span className="block font-mono text-xs uppercase tracking-[0.18em] text-ink-400">{c.ui.from}</span>
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
              <p className="mt-6 text-sm text-ink-400">{c.ui.goodFor}: {s.fit}</p>
              <EnquiryButton
                subject={subjectFor(s.name)}
                email={c.site.email}
                ui={c.ui}
                className={`mt-8 inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-medium transition-colors duration-200 ${
                  s.highlight
                    ? "bg-ink-100 text-canvas hover:bg-accent"
                    : "border border-line text-ink-100 hover:border-ink-300"
                }`}
              >
                {t.askAbout} {s.name.toLowerCase()}
              </EnquiryButton>
            </li>
          ))}
        </ul>
      </Container>

      {/* Example websites (fictional businesses, live pages under /examples) */}
      <Container className="pb-20">
        <section aria-labelledby="examples-title">
          <SectionHead id="examples-title" label={t.examplesLabel} title={t.examplesTitle} intro={t.examplesIntro} />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {c.examples.map((ex) => (
              <li key={ex.slug}>
                <a href={ex.href} target="_blank" rel="noopener" className="group block">
                  <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                    {/* Browser-window frame */}
                    <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden="true">
                      <span className="size-2 rounded-full bg-line" />
                      <span className="size-2 rounded-full bg-line" />
                      <span className="size-2 rounded-full bg-line" />
                    </div>
                    <Image
                      src={ex.image}
                      alt={`${ex.name}: ${t.examplesTitle.toLowerCase()}`}
                      width={1280}
                      height={800}
                      sizes="(min-width: 768px) 22rem, 100vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <p>
                      <span className="text-ink-100">{ex.name}</span>
                      <span className="text-ink-400"> · {ex.kind}</span>
                    </p>
                    <span className="shrink-0 text-sm text-accent">
                      {t.openExample} <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      {/* Apps from my projects */}
      <Container className="pb-20">
        <section aria-labelledby="apps-title">
          <SectionHead id="apps-title" label={t.appsLabel} title={t.appsTitle} intro={t.appsIntro} />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {apps.map((p) => {
              const img = p.images[0];
              const isPhone = img.height > img.width;
              return (
                <li key={p.slug}>
                  <Link href={href(`/projects/${p.slug}`)} className="group block">
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface">
                      {img.note && (
                        <span className="absolute top-3 left-3 z-10 rounded-full border border-line bg-canvas/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-300 backdrop-blur">
                          {c.ui.imageBadges[img.note]}
                        </span>
                      )}
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 768px) 22rem, 100vw"
                        className={
                          isPhone
                            ? "h-[88%] w-auto rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-[1.03]"
                            : "h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        }
                      />
                    </div>
                    <div className="mt-4">
                      <p className="text-ink-100 transition-colors group-hover:text-accent">{p.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-300">{p.summary}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>

      {/* Process + CTA */}
      <Container className="pb-24 sm:pb-32">
        <section aria-labelledby="process-title" className="grid gap-10 border-t border-line pt-14 md:grid-cols-[12rem_1fr] md:gap-16">
          <Eyebrow as="h2" id="process-title">{t.processLabel}</Eyebrow>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.map((step, i) => (
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
            {t.ctaTitle}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <EnquiryButton
              subject={t.projectEnquiry}
              email={c.site.email}
              ui={c.ui}
              className="inline-flex h-11 cursor-pointer items-center rounded-full bg-ink-100 px-5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
            >
              {t.ctaButton}
            </EnquiryButton>
            <Link
              href={href("/projects")}
              className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-ink-100 transition-colors duration-200 hover:border-ink-300"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
