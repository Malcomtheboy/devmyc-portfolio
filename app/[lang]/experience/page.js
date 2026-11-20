import Container from "@/components/Container";
import { Eyebrow, PageHeader, ProjectList, Tags, Timeline } from "@/components/ui";
import { getI18n, pageMeta } from "@/lib/i18n";

export async function generateMetadata() {
  const { lang, c } = await getI18n();
  const t = c.pages.experience;
  return pageMeta(lang, "/experience", t.metaTitle, t.metaDescription);
}

function Group({ title, children }) {
  return (
    <section className="grid gap-6 border-t border-line py-12 md:grid-cols-[12rem_1fr] md:gap-16">
      <Eyebrow as="h2">{title}</Eyebrow>
      <div>{children}</div>
    </section>
  );
}

export default async function ExperiencePage() {
  const { lang, c } = await getI18n();
  const t = c.pages.experience;
  return (
    <>
      <PageHeader label={t.label} title={t.title} />
      <Container className="pb-24 sm:pb-32">
        <Group title={t.education}>
          <Timeline items={c.education} />
        </Group>

        <Group title={t.work}>
          <Timeline items={c.experience} />
        </Group>

        <Group title={t.technical}>
          <div className="space-y-8">
            {c.skills.map((s) => (
              <div key={s.group}>
                <h3 className="mb-3 text-ink-100">{s.group}</h3>
                <Tags items={s.items} />
              </div>
            ))}
          </div>
        </Group>

        <Group title={t.projects}>
          <ProjectList items={c.projects} base={lang === "no" ? "/no" : ""} />
        </Group>
      </Container>
    </>
  );
}
