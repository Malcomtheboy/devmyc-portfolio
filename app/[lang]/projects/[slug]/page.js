import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { Eyebrow, Tags, TextLink, isTodo } from "@/components/ui";
import { getContent } from "@/lib/content";
import { getI18n, pageMeta } from "@/lib/i18n";

// Prerender one static page per project (slugs are the same in both languages).
// Unknown slugs hit notFound() below and get the 404 page.
export function generateStaticParams() {
  return getContent("en").projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { lang, c } = await getI18n();
  const project = c.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMeta(lang, `/projects/${slug}`, project.name, project.summary);
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

// Phone screenshots sit three in a row; desktop screenshots get full width.
// Images that aren't plain screenshots (mockup, demo data, concept,
// illustration) get an honest caption underneath.
function Note({ img, notes }) {
  return img.note ? <figcaption className="mt-2 text-sm text-ink-400">{notes[img.note]}</figcaption> : null;
}

function Screens({ images, notes }) {
  const phone = images.filter((i) => i.height > i.width);
  const desktop = images.filter((i) => i.height <= i.width);
  return (
    <div className="space-y-6">
      {desktop.map((img) => (
        <figure key={img.src}>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 42rem, 100vw" className="h-auto w-full" />
          </div>
          <Note img={img} notes={notes} />
        </figure>
      ))}
      {phone.length > 0 && (
        <figure>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {phone.map((img) => (
              <li key={img.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 640px) 14rem, 45vw" className="h-auto w-full" />
              </li>
            ))}
          </ul>
          <Note img={phone[0]} notes={notes} />
        </figure>
      )}
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
  const { c, href } = await getI18n();
  const index = c.projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const p = c.projects[index];
  const next = c.projects[(index + 1) % c.projects.length];
  const t = c.ui.labels;
  const meta = [
    { label: t.role, value: p.role },
    { label: t.team, value: p.team },
    { label: t.year, value: p.year },
    { label: t.status, value: p.status },
  ].filter((m) => !isTodo(m.value));

  return (
    <article>
      <Container className="pt-16 pb-12 sm:pt-24">
        <TextLink href={href("/projects")} back>{c.ui.allProjects}</TextLink>
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
        {p.overview && <Block title={t.overview}><p>{p.overview}</p></Block>}
        {p.problem && <Block title={t.problem}><p>{p.problem}</p></Block>}
        {p.solution && <Block title={p.concept ? t.idea : t.solution}><p>{p.solution}</p></Block>}
        {p.images?.length > 0 && <Block title={t.screens}><Screens images={p.images} notes={c.ui.imageNotes} /></Block>}
        {p.features?.length > 0 && <Block title={t.features}><List items={p.features} /></Block>}
        {p.points?.length > 0 && <Block title={p.concept ? t.planned : t.myPart}><List items={p.points} /></Block>}
        {p.security?.length > 0 && <Block title={t.security}><List items={p.security} /></Block>}
        {p.principle && (
          <Block title={t.principle}>
            <p className="text-2xl font-medium tracking-tight text-ink-100">{p.principle}</p>
          </Block>
        )}
        {p.stack?.length > 0 && <Block title={t.stack}><Tags items={p.stack} /></Block>}
        {p.links?.length > 0 && (
          <Block title={t.links}>
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
          href={href(`/projects/${next.slug}`)}
          className="group flex items-baseline justify-between gap-6 border-y border-line py-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">{c.ui.nextProject}</span>
          <span className="text-2xl font-medium tracking-tight text-ink-100 transition-colors group-hover:text-accent sm:text-3xl">
            {next.name} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </Container>
    </article>
  );
}
