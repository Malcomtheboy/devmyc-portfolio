"use client";

import { useId, useRef, useState } from "react";
import { site } from "@/lib/content";

/*
  "Ask about ..." button. A plain mailto: link does nothing on computers
  without a mail app set up, so this opens a small dialog instead:
  write in Gmail or Outlook on the web, use the device's mail app,
  or copy the address. No data is sent anywhere by this site.
*/
export default function EnquiryButton({ subject, children, className = "" }) {
  const dialogRef = useRef(null);
  const titleId = useId(); // several buttons can share a page
  const [copied, setCopied] = useState(false);

  const to = site.email;
  const body = "Hi Mohamed,\n\n";
  const enc = encodeURIComponent;
  const options = [
    {
      label: "Write in Gmail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`,
      external: true,
    },
    {
      label: "Write in Outlook",
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
      external: true,
    },
    {
      label: "Use my email app",
      href: `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(to);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address is visible in the dialog to copy by hand
    }
  }

  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()} className={className}>
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-3xl border border-line bg-surface p-0 text-ink-200 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">Get in touch</p>
              <h2 id={titleId} className="mt-2 text-xl font-medium tracking-tight text-ink-100">
                {subject}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="grid size-8 shrink-0 place-items-center rounded-full text-ink-300 transition-colors hover:bg-surface-2 hover:text-ink-100"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-300">
            Tell me a little about what you need, and I&apos;ll get back to you.
          </p>

          <ul className="mt-6 space-y-2">
            {options.map((o) => (
              <li key={o.label}>
                <a
                  href={o.href}
                  {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => dialogRef.current?.close()}
                  className="flex items-center justify-between rounded-2xl border border-line px-4 py-3 text-ink-100 transition-colors hover:border-ink-300 hover:bg-surface-2"
                >
                  {o.label}
                  <span aria-hidden="true" className="text-ink-400">{o.external ? "↗" : "→"}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-surface-2 px-4 py-3">
            <span className="truncate font-mono text-sm text-ink-200">{to}</span>
            <button
              type="button"
              onClick={copy}
              className="shrink-0 rounded-full px-3 py-1 text-sm text-accent transition-colors hover:bg-accent-dim"
            >
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
