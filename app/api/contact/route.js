/*
  POST /api/contact
  Receives the contact form and forwards it to Mohamed's inbox through
  Resend (https://resend.com). Nothing is stored on this site.

  Environment variables (set in Vercel, never in the code):
    RESEND_API_KEY    API key from the Resend dashboard
    CONTACT_TO_EMAIL  where messages go, e.g. the email used for Resend
    CONTACT_FROM      optional sender; defaults to Resend's test sender,
                      which can only deliver to the Resend account's own email

  Spam and abuse guards: a hidden "website" field bots tend to fill in,
  a minimum time between opening the form and sending, length limits,
  and a simple per-IP limit (best effort on serverless).
*/

const LIMITS = { name: 100, email: 200, topic: 100, message: 5000 };
const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map(); // ip -> timestamps, lives as long as the server instance

function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clean = (value, max) => String(value ?? "").trim().slice(0, max);
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots: pretend success so they don't retry, but send nothing
  const elapsed = Date.now() - Number(data.startedAt || 0);
  if (data.website || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) {
    return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const name = clean(data.name, LIMITS.name);
  const email = clean(data.email, LIMITS.email);
  const topic = clean(data.topic, LIMITS.topic) || "General enquiry";
  const message = clean(data.message, LIMITS.message);

  if (!name || !isEmail(email) || message.length < 10) {
    return Response.json(
      { error: "Please add your name, a valid email and a short message." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    // Not configured yet: the form tells the visitor to email directly
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "devmyc.no <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `[devmyc.no] ${topic} from ${name}`,
      text: `${message}\n\n---\nFrom: ${name} <${email}>\nTopic: ${topic}\nSent via the contact form on devmyc.no`,
    }),
    signal: AbortSignal.timeout(10000),
  }).catch(() => null);

  if (!res || !res.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
