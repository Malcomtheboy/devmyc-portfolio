"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/*
  Phone menu built on <details>/<summary>: works with keyboard and
  screen readers out of the box. It closes itself after navigating.
*/
export default function MobileMenu({ items, label = "Menu" }) {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="group relative md:hidden">
      <summary
        aria-label={label}
        className="grid size-9 cursor-pointer list-none place-items-center rounded-full border border-line text-ink-300 transition-colors hover:text-ink-100 [&::-webkit-details-marker]:hidden"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 8h16M4 16h16" />
        </svg>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden size-4 group-open:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </summary>
      <nav aria-label="Main" className="absolute right-0 top-12 w-52 rounded-2xl border border-line bg-surface p-2 shadow-xl shadow-black/20">
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl px-4 py-3 text-ink-200 transition-colors hover:bg-surface-2 hover:text-ink-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
