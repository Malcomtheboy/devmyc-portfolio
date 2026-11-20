"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/*
  EN / NO switch. Links to the same page in the other language:
  /projects  <->  /no/projects. English (no prefix) is the default.
*/
export default function LangSwitch({ lang, label, title }) {
  const pathname = usePathname() || "/";
  const isNo = pathname === "/no" || pathname.startsWith("/no/");
  const bare = isNo ? pathname.replace(/^\/no/, "") || "/" : pathname;
  const target = lang === "no" ? bare : bare === "/" ? "/no" : `/no${bare}`;

  return (
    <Link
      href={target}
      hrefLang={lang === "no" ? "en" : "nb"}
      aria-label={title}
      title={title}
      className="grid h-9 shrink-0 place-items-center rounded-full border border-line px-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-300 transition-colors duration-200 hover:border-ink-300 hover:text-ink-100"
    >
      {label}
    </Link>
  );
}
