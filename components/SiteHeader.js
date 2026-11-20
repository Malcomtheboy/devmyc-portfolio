import Link from "next/link";
import Container from "./Container";
import LangSwitch from "./LangSwitch";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { getI18n } from "@/lib/i18n";

/*
  Top navigation: inline links from 768px up, a small menu on phones.
  Language and theme switches are always visible.
*/
export default async function SiteHeader() {
  const { lang, c, href } = await getI18n();
  const nav = c.nav.map((item) => ({ ...item, href: href(item.href) }));

  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-canvas/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-surface focus:px-3 focus:py-2 focus:text-ink-100"
      >
        {c.ui.skip}
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={href("/")} aria-label={`${c.site.name}, ${c.ui.home}`} className="shrink-0 text-sm font-medium tracking-tight text-ink-100">
          {c.site.name}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-6">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm text-ink-300 lg:gap-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-200 hover:text-ink-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <LangSwitch lang={lang} label={lang === "no" ? "EN" : "NO"} title={c.ui.langSwitchLabel} />
            <ThemeToggle label={c.ui.themeToggle} title={c.ui.themeTitle} />
            <MobileMenu items={nav} label={c.ui.menu} />
          </div>
        </div>
      </Container>
    </header>
  );
}
