import Container from "@/components/Container";
import { Eyebrow, TextLink } from "@/components/ui";

export const metadata = {
  title: "Page not found",
};

// Shown for any URL that doesn't exist, including unknown /projects/... slugs
export default function NotFound() {
  return (
    <Container className="py-32 sm:py-44">
      <Eyebrow>
        <span className="text-accent">404</span>
        <span className="mx-2 text-ink-400">/</span>
        Not found
      </Eyebrow>
      <h1 className="mt-6 max-w-2xl text-4xl font-medium tracking-[-0.03em] text-balance text-ink-100 sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
        The link may be old or mistyped. Try the homepage or the project list instead.
      </p>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <TextLink href="/" back>Back home</TextLink>
        <TextLink href="/projects">See projects</TextLink>
      </div>
    </Container>
  );
}
