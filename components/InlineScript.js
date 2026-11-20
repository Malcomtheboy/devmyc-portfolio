/*
  Inline <script> that runs once while the HTML is parsed (before first
  paint). On the client React renders it as type="text/plain" so it is not
  re-run and React doesn't warn about script tags (pattern from the Next.js
  "Preventing flash before hydration" guide).
*/
export default function InlineScript({ html }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
