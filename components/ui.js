import Link from "next/link";
import Container from "./Container";

/*
  Small shared building blocks used by several pages.
  Kept in one file because each one is only a few lines.
*/

// Placeholder text starts with "TODO" in lib/content.js; never show it raw.
export const isTodo = (value) => !value || String(value).startsWith("TODO");

// Small uppercase mono label, e.g. "EDUCATION"
export function Eyebrow({ children, as: Tag = "p", className = "" }) {
  return (
    <Tag className={`font-mono text-xs uppercase tracking-[0.18em] text-ink-300 ${className}`}>
      {children}
    </Tag>
  );
}

// Top of every subpage: label, big title, optional intro
export function PageHeader({ label, title, intro }) {
  return (
    <Container className="pt-20 pb-14 sm:pt-28 sm:pb-20">
      <Eyebrow className="animate-rise">
        <span className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-accent" aria-hidden="true" />
        {label}
      </Eyebrow>
      <h1 className="animate-rise mt-6 max-w-3xl text-4xl font-medium tracking-[-0.03em] text-balance text-ink-100 [animation-delay:80ms] sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-300 [animation-delay:160ms]">
          {intro}
        </p>
      )}
    </Container>
  );
}

export function TextLink({ href, children, back = false }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline"
    >
      {back && <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">←</span>}
      {children}
      {!back && <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>}
    </Link>
  );
}

export function Tags({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-line px-3 py-1 text-sm text-ink-200">
          {item}
        </li>
      ))}
    </ul>
  );
}

// Rows of "title · org .......... period", with optional note below
export function Timeline({ items, compact = false }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={`${item.org}-${item.title}`} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-8">
          <div>
            <p>
              <span className="text-ink-100">{item.title}</span>
              <span className="text-ink-400"> · </span>
              <span className="text-ink-300">{item.org}</span>
            </p>
            {item.note && !compact && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-300">{item.note}</p>}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-400 sm:pt-1">{item.period}</p>
        </li>
      ))}
    </ul>
  );
}

export function ProjectList({ items }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/projects/${p.slug}`}
            className="group grid gap-3 py-7 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-8"
          >
            <span className="text-lg font-medium text-ink-100 transition-colors group-hover:text-accent">
              {p.name}
            </span>
            <span className="max-w-xl text-ink-300">{p.summary}</span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-400">
              {p.status}
              <span aria-hidden="true" className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
