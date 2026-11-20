import Link from "next/link";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { nav, site } from "@/lib/content";

/*
  Top navigation: inline links from 768px up, a small menu on phones.
  The theme switch is always visible.
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
          {site.name}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-8">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm text-ink-300">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-200 hover:text-ink-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <MobileMenu items={nav} />
        </div>
      </Container>
    </header>
  );
}
