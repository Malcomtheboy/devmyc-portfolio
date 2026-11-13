import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { Eyebrow, ProjectList, Tags, TextLink, Timeline } from "@/components/ui";
import { site, about, projects, skills, education, experience } from "@/lib/content";

const featured = projects.filter((p) => p.featured);

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Faint grid that fades out: texture without imagery */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_65%)]"
      />
      <Container className="relative pt-24 pb-20 sm:pt-36 sm:pb-28">
        <Eyebrow className="animate-rise">
          <span className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-accent" aria-hidden="true" />
          {site.location}
        </Eyebrow>
        <h1
          id="hero-title"
          className="animate-rise mt-6 max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-balance text-ink-100 [animation-delay:80ms] sm:text-6xl lg:text-7xl"
        >
          I build software around data, and I care about keeping it{" "}
          <span className="text-accent">secure</span>.
        </h1>
        <p className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-pretty text-ink-300 [animation-delay:160ms]">
          {site.name} — IT and Management graduate from the University of
          South-Eastern Norway. I work across databases, full-stack
          development and access control, and I&apos;m building mobile
          products that put AI to practical use.
        </p>
        <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:240ms]">
          <Link
            href="/projects"
            className="inline-flex h-11 items-center rounded-full bg-ink-100 px-5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-ink-100 transition-colors duration-200 hover:border-ink-300"
          >
            Get in touch
          </Link>
        </div>
      </Container>
    </section>
  );
}

function Intro() {
  const facts = [
    { label: "Education", value: "Bachelor in IT & Management, USN" },
    { label: "Graduated", value: "2026" },
    { label: "Focus", value: "Software, data, security & AI products" },
  ];
  return (
    <Container>
      <dl className="grid border-t border-line sm:grid-cols-3">
        {facts.map((f) => (
          <div key={f.label} className="border-b border-line py-6 sm:border-b-0 sm:pr-8">
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">{f.label}</dt>
            <dd className="mt-2 text-ink-200">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />

      <div className="mt-20 sm:mt-28">
        <Section id="projects" index="01" label="Projects" title="Selected work, from shipped prototypes to what I'm building next.">
          <ProjectList items={featured} />
          <div className="mt-8">
            <TextLink href="/projects">All projects</TextLink>
          </div>
        </Section>

        <Section id="skills" index="02" label="Skills" title="Tools I use to build and ship.">
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group}>
                <Eyebrow as="h3" className="mb-4">{s.group}</Eyebrow>
                <Tags items={s.items} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="about" index="03" label="About" title="Curious about technology and business.">
          <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-14">
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-pretty text-ink-300">
              {about.slice(0, 2).map((para) => (
                <p key={para}>{para}</p>
              ))}
              <div className="pt-3">
                <TextLink href="/about">More about me</TextLink>
              </div>
            </div>
            <figure className="order-first w-48 overflow-hidden rounded-2xl border border-line bg-surface sm:w-56 lg:order-none lg:w-full">
              {/* Square source cropped to a 3:4 portrait, centred on the face */}
              <Image
                src={site.photo.src}
                alt={site.photo.alt}
                width={800}
                height={800}
                sizes="(min-width: 1024px) 16rem, 14rem"
                className="aspect-[3/4] w-full object-cover object-center"
              />
            </figure>
          </div>
        </Section>

        <Section id="experience" index="04" label="Experience" title="Education and work.">
          <Eyebrow as="h3" className="mb-4">Education</Eyebrow>
          <Timeline items={education} compact />
          <Eyebrow as="h3" className="mt-12 mb-4">Work</Eyebrow>
          <Timeline items={experience.filter((e) => !e.earlier)} compact />
          <div className="mt-8">
            <TextLink href="/experience">Full experience</TextLink>
          </div>
        </Section>

        <Section id="contact" index="05" label="Contact" title="Open to graduate roles and internships.">
          <ul className="flex flex-col gap-4 text-lg sm:flex-row sm:gap-10">
            {[
              { href: `mailto:${site.email}`, label: site.email },
              { href: site.links.linkedin, label: "LinkedIn" },
              { href: site.links.github, label: "GitHub" },
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
