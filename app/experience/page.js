import Container from "@/components/Container";
import { Eyebrow, PageHeader, ProjectList, Tags, Timeline } from "@/components/ui";
import { education, experience, projects, skills } from "@/lib/content";

export const metadata = {
  title: "Experience",
  description: "Education, work experience and technical experience of Mohamed Hussein.",
};

function Group({ title, children }) {
  return (
    <section className="grid gap-6 border-t border-line py-12 md:grid-cols-[12rem_1fr] md:gap-16">
      <Eyebrow as="h2">{title}</Eyebrow>
      <div>{children}</div>
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        label="Experience"
        title="Education, work and what I've built along the way."
      />
      <Container className="pb-24 sm:pb-32">
        <Group title="Education">
          <Timeline items={education} />
        </Group>

        <Group title="Work">
          <Timeline items={experience} />
        </Group>

        <Group title="Technical">
          <div className="space-y-8">
            {skills.map((s) => (
              <div key={s.group}>
                <h3 className="mb-3 text-ink-100">{s.group}</h3>
                <Tags items={s.items} />
              </div>
            ))}
          </div>
        </Group>

        <Group title="Projects">
          <ProjectList items={projects} />
        </Group>
      </Container>
    </>
  );
}
