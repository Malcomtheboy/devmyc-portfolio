import Link from "next/link";
import Container from "./Container";
import { nav, site } from "@/lib/content";

/*
  Top navigation. No JavaScript menu: on small screens the links simply
  wrap into a compact row, which keeps it fast and accessible.
*/
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-canvas/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-surface focus:px-3 focus:py-2 focus:text-ink-100"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name}, home`} className="shrink-0 text-sm font-medium tracking-tight text-ink-100">
          {/* Initials on phones so the menu fits; full name from 640px up */}
          <span className="sm:hidden">MH</span>
          <span className="hidden sm:inline">{site.name}</span>
          <span className="text-accent">.</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-4 text-sm text-ink-300 sm:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors duration-200 hover:text-ink-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
