import Container from "@/components/Container";
import { PageHeader, ProjectList } from "@/components/ui";
import { getI18n, pageMeta } from "@/lib/i18n";

export async function generateMetadata() {
  const { lang, c } = await getI18n();
  const t = c.pages.projects;
  return pageMeta(lang, "/projects", t.metaTitle, t.metaDescription);
}

export default async function ProjectsPage() {
  const { lang, c } = await getI18n();
  const t = c.pages.projects;
  return (
    <>
      <PageHeader label={t.label} title={t.title} intro={t.intro} />
      <Container className="pb-24 sm:pb-32">
        <ProjectList items={c.projects} base={lang === "no" ? "/no" : ""} />
      </Container>
    </>
  );
}
