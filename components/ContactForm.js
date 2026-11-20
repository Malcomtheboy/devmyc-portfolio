"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/lib/content";

/*
  Contact form that posts to /api/contact, which forwards the message
  to Mohamed's inbox. If sending isn't set up yet or fails, the visitor
  is shown the email address instead, so a message is never lost silently.
*/
export default function ContactForm({ topic = "General enquiry", compact = false }) {
  const id = useId();
  const startedAt = useRef(0);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | unavailable
  const [error, setError] = useState("");

  // Time the form was shown, used by the server's spam check
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, topic, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 503 || res.status === 502) {
        setStatus("unavailable");
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("unavailable");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-accent/40 bg-accent-dim p-6">
        <p className="font-medium text-ink-100">Thanks, your message is on its way.</p>
        <p className="mt-2 text-sm text-ink-300">I&apos;ll reply to the email address you gave.</p>
      </div>
    );
  }

  const field =
    "mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink-100 placeholder:text-ink-400 transition-colors focus:border-accent focus:outline-none";
  const label = "text-sm text-ink-200";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor={`${id}-name`} className={label}>Name</label>
          <input id={`${id}-name`} name="name" required maxLength={100} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>Email</label>
          <input id={`${id}-email`} name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className={label}>Message</label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={compact ? 4 : 6}
          placeholder="What do you need, and roughly when?"
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, often filled in by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-ink-100">{error}</p>
      )}
      {status === "unavailable" && (
        <p role="alert" className="rounded-xl bg-surface-2 p-4 text-sm leading-relaxed text-ink-200">
          The form couldn&apos;t send right now. Please email me directly at{" "}
          <span className="font-mono text-ink-100">{site.email}</span>.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="max-w-xs text-xs leading-relaxed text-ink-400">
          Your message goes straight to my inbox. Nothing is stored on this site.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 cursor-pointer items-center rounded-full bg-ink-100 px-6 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
