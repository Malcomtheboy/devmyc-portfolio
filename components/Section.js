import Container from "./Container";

/*
  A homepage section with a small numbered label on the left
  and the content on the right (stacked on mobile).
*/
export default function Section({ id, index, label, title, children }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-10 md:grid-cols-[12rem_1fr] md:gap-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-300">
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-ink-400">/</span>
          {label}
        </p>
        <div>
          <h2
            id={headingId}
            className="max-w-2xl text-2xl font-medium tracking-tight text-balance text-ink-100 sm:text-3xl"
          >
            {title}
          </h2>
          <div className="mt-10">{children}</div>
        </div>
      </Container>
    </section>
  );
}
