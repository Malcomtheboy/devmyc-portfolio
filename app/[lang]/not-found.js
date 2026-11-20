import Container from "@/components/Container";
import { Eyebrow, TextLink } from "@/components/ui";
import { getI18n } from "@/lib/i18n";

export async function generateMetadata() {
  const { c } = await getI18n();
  return { title: c.pages.notFound.metaTitle };
}

// Shown for any URL that doesn't exist, including unknown /projects/... slugs
export default async function NotFound() {
  const { c, href } = await getI18n();
  const t = c.pages.notFound;
  return (
    <Container className="py-32 sm:py-44">
      <Eyebrow>
        <span className="text-accent">404</span>
        <span className="mx-2 text-ink-400">/</span>
        {t.label}
      </Eyebrow>
      <h1 className="mt-6 max-w-2xl text-4xl font-medium tracking-[-0.03em] text-balance text-ink-100 sm:text-5xl">
        {t.title}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">{t.text}</p>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <TextLink href={href("/")} back>{t.home}</TextLink>
        <TextLink href={href("/projects")}>{t.projects}</TextLink>
      </div>
    </Container>
  );
}
