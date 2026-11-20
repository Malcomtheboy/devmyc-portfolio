import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import EnquiryButton from "@/components/EnquiryButton";
import { Eyebrow, ProjectList, Tags, TextLink, Timeline } from "@/components/ui";
import { getI18n } from "@/lib/i18n";

export default async function Home() {
  const { lang, c, href } = await getI18n();
  const h = c.home;
  const s = h.sections;
  const featured = c.projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        {/* Faint grid that fades out: texture without imagery */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_65%)]"
        />
        <Container className="relative pt-24 pb-20 sm:pt-36 sm:pb-28">
          <Eyebrow className="animate-rise">
            <span className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-accent" aria-hidden="true" />
            {c.site.location}
          </Eyebrow>
          <h1
            id="hero-title"
            className="animate-rise mt-6 max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-balance text-ink-100 [animation-delay:80ms] sm:text-6xl lg:text-7xl"
          >
            {h.heroBefore} <span className="text-accent">{h.heroAccent}</span>.
          </h1>
          <p className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-pretty text-ink-300 [animation-delay:160ms]">
            {h.heroLead}
          </p>
          <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:240ms]">
            <Link
              href={href("/projects")}
              className="inline-flex h-11 items-center rounded-full bg-ink-100 px-5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
            >
              {h.viewProjects}
            </Link>
            <Link
              href={href("/contact")}
              className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-ink-100 transition-colors duration-200 hover:border-ink-300"
            >
              {h.getInTouch}
            </Link>
          </div>
        </Container>
      </section>

      {/* Key facts */}
      <Container>
        <dl className="grid border-t border-line sm:grid-cols-3">
          {h.facts.map((f) => (
            <div key={f.label} className="border-b border-line py-6 sm:border-b-0 sm:pr-8">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">{f.label}</dt>
              <dd className="mt-2 text-ink-200">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <div className="mt-20 sm:mt-28">
        <Section id="projects" index="01" label={s.projects.label} title={s.projects.title}>
          <ProjectList items={featured} base={lang === "no" ? "/no" : ""} />
          <div className="mt-8">
            <TextLink href={href("/projects")}>{c.ui.allProjects}</TextLink>
          </div>
        </Section>

        <Section id="skills" index="02" label={s.skills.label} title={s.skills.title}>
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {c.skills.map((g) => (
              <div key={g.group}>
                <Eyebrow as="h3" className="mb-4">{g.group}</Eyebrow>
                <Tags items={g.items} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="about" index="03" label={s.about.label} title={s.about.title}>
          <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-14">
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-pretty text-ink-300">
              {c.about.slice(0, 2).map((para) => (
                <p key={para}>{para}</p>
              ))}
              <div className="pt-3">
                <TextLink href={href("/about")}>{h.moreAbout}</TextLink>
              </div>
            </div>
            <figure className="order-first w-48 overflow-hidden rounded-2xl border border-line bg-surface sm:w-56 lg:order-none lg:w-full">
              {/* Full photo, no cropping */}
              <Image
                src={c.site.photo.src}
                alt={c.site.photo.alt}
                width={c.site.photo.width}
                height={c.site.photo.height}
                sizes="(min-width: 1024px) 16rem, 14rem"
                className="h-auto w-full"
              />
            </figure>
          </div>
        </Section>

        <Section id="experience" index="04" label={s.experience.label} title={s.experience.title}>
          <Eyebrow as="h3" className="mb-4">{h.education}</Eyebrow>
          <Timeline items={c.education} compact />
          <Eyebrow as="h3" className="mt-12 mb-4">{h.work}</Eyebrow>
          <Timeline items={c.experience.filter((e) => !e.earlier)} compact />
          <div className="mt-8">
            <TextLink href={href("/experience")}>{h.fullExperience}</TextLink>
          </div>
        </Section>

        <Section id="services" index="05" label={s.services.label} title={s.services.title}>
          <ul className="grid gap-4 sm:grid-cols-3">
            {c.services.map((svc) => (
              <li key={svc.slug} className="rounded-2xl border border-line p-6">
                <p className="text-ink-100">{svc.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ink-400">
                  {c.ui.from} {svc.price}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <TextLink href={href("/services")}>{h.seeServices}</TextLink>
          </div>
        </Section>

        <Section id="contact" index="06" label={s.contact.label} title={s.contact.title}>
          <ul className="flex flex-col gap-4 text-lg sm:flex-row sm:gap-10">
            <li>
              <EnquiryButton
                subject={h.hello}
                email={c.site.email}
                ui={c.ui}
                className="cursor-pointer text-ink-100 underline decoration-line underline-offset-8 transition-colors hover:decoration-accent"
              >
                {c.site.email}
              </EnquiryButton>
            </li>
            {[
              { href: c.site.links.linkedin, label: "LinkedIn" },
              { href: c.site.links.github, label: "GitHub" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ink-100 underline decoration-line underline-offset-8 transition-colors hover:decoration-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
