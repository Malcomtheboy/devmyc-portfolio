import Image from "next/image";
import Container from "@/components/Container";
import { Eyebrow, PageHeader, Tags, TextLink } from "@/components/ui";
import { getI18n, pageMeta } from "@/lib/i18n";

export async function generateMetadata() {
  const { lang, c } = await getI18n();
  const t = c.pages.about;
  return pageMeta(lang, "/about", t.metaTitle, t.metaDescription);
}

export default async function AboutPage() {
  const { c, href } = await getI18n();
  const t = c.pages.about;
  return (
    <>
      <PageHeader label={t.label} title={t.title} />
      <Container className="pb-24 sm:pb-32">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
          <figure className="w-56 overflow-hidden rounded-2xl border border-line bg-surface sm:w-64 lg:w-full">
            <Image
              src={c.site.photo.src}
              alt={c.site.photo.alt}
              width={c.site.photo.width}
              height={c.site.photo.height}
              priority
              sizes="(min-width: 1024px) 20rem, 16rem"
              className="h-auto w-full"
            />
          </figure>

          <div className="max-w-2xl">
            <div className="space-y-6 text-lg leading-relaxed text-pretty text-ink-300">
              {c.about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <div>
                <Eyebrow as="h2" className="mb-4">{t.howIWork}</Eyebrow>
                <ul className="space-y-2 text-ink-200">
                  {c.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow as="h2" className="mb-4">{t.languages}</Eyebrow>
                <Tags items={c.languages} />
              </div>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink href={href("/projects")}>{t.seeProjects}</TextLink>
              <TextLink href={href("/contact")}>{t.getInTouch}</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
