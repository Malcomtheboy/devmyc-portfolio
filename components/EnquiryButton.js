"use client";

import { useId, useRef, useState } from "react";
import { site } from "@/lib/content";
import ContactForm from "./ContactForm";

/*
  "Ask about ..." button. Opens a dialog with the contact form (topic
  pre-filled), plus Gmail / Outlook / mail-app links and a copy button
  for people who prefer their own email.
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
      label: "Gmail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`,
      external: true,
    },
    {
      label: "Outlook",
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
      external: true,
    },
    {
      label: "Email app",
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
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(30rem,calc(100vw-2rem))] overflow-y-auto rounded-3xl border border-line bg-surface p-0 text-ink-200 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
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

          <div className="mt-6">
            <ContactForm topic={subject} compact />
          </div>

          <p className="mt-8 border-t border-line pt-6 text-sm text-ink-300">Or use your own email:</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {options.map((o) => (
              <li key={o.label}>
                <a
                  href={o.href}
                  {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-100 transition-colors hover:border-ink-300 hover:bg-surface-2"
                >
                  {o.label}
                  <span aria-hidden="true" className="text-ink-400">{o.external ? "↗" : "→"}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-surface-2 px-4 py-3">
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
