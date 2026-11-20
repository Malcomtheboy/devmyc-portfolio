import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { Eyebrow, Tags, TextLink, isTodo } from "@/components/ui";
import { projects } from "@/lib/content";

// Prerender one static page per project at build time.
// Unknown slugs hit notFound() below and get the 404 page.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

function List({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ title, children }) {
  return (
    <div className="grid gap-4 border-t border-line py-10 md:grid-cols-[12rem_1fr] md:gap-16">
      <Eyebrow as="h2">{title}</Eyebrow>
      <div className="max-w-2xl text-lg leading-relaxed text-pretty text-ink-300">{children}</div>
    </div>
  );
}

/*
  Reading `params` inside <Suspense> lets Next.js show the page shell
  instantly on navigation. All known slugs are still prerendered as static
  HTML by generateStaticParams, so visitors get the full page straight away.
*/
export default function ProjectPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const isConcept = p.status?.startsWith("Concept");
  const meta = [
    { label: "Role", value: p.role },
    { label: "Team", value: p.team },
    { label: "Year", value: p.year },
    { label: "Status", value: p.status },
  ].filter((m) => !isTodo(m.value));

  return (
    <article>
      <Container className="pt-16 pb-12 sm:pt-24">
        <TextLink href="/projects" back>All projects</TextLink>
        <h1 className="animate-rise mt-10 text-5xl font-medium tracking-[-0.03em] text-ink-100 sm:text-7xl">
          {p.name}
        </h1>
        <p className="animate-rise mt-6 max-w-2xl text-xl leading-relaxed text-pretty text-ink-200 [animation-delay:80ms]">
          {p.summary}
        </p>
        <dl className="animate-rise mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 [animation-delay:160ms]">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">{m.label}</dt>
              <dd className="mt-2 text-ink-200">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pb-8">
        {p.overview && (
          <Block title="Overview">
            <p>{p.overview}</p>
          </Block>
        )}
        {p.problem && (
          <Block title="Problem">
            <p>{p.problem}</p>
          </Block>
        )}
        {p.solution && (
          <Block title={isConcept ? "The idea" : "Solution"}>
            <p>{p.solution}</p>
          </Block>
        )}
        {p.features?.length > 0 && (
          <Block title="What it does">
            <List items={p.features} />
          </Block>
        )}
        {p.points?.length > 0 && (
          <Block title={isConcept ? "Planned features" : "My part"}>
            <List items={p.points} />
          </Block>
        )}
        {p.security?.length > 0 && (
          <Block title="Security">
            <List items={p.security} />
          </Block>
        )}
        {p.principle && (
          <Block title="Principle">
            <p className="text-2xl font-medium tracking-tight text-ink-100">{p.principle}</p>
          </Block>
        )}
        {p.stack?.length > 0 && (
          <Block title="Stack">
            <Tags items={p.stack} />
          </Block>
        )}
        {p.images?.length > 0 && (
          <Block title="Screens">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {p.images.map((img) => (
                <li key={img.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <Image src={img.src} alt={img.alt} width={335} height={723} sizes="(min-width: 640px) 14rem, 45vw" className="h-auto w-full" />
                </li>
              ))}
            </ul>
          </Block>
        )}
        {p.links?.length > 0 && (
          <Block title="Links">
            <ul className="flex flex-col gap-3">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-100 underline decoration-line underline-offset-8 transition-colors hover:decoration-accent">
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Block>
        )}
      </Container>

      <Container className="pb-24 sm:pb-32">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-baseline justify-between gap-6 border-y border-line py-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">Next project</span>
          <span className="text-2xl font-medium tracking-tight text-ink-100 transition-colors group-hover:text-accent sm:text-3xl">
            {next.name} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </Container>
    </article>
  );
}
