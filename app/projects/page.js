import Container from "@/components/Container";
import { PageHeader, ProjectList } from "@/components/ui";
import { projects } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Apps, platforms and prototypes built by Mohamed Hussein: Rihla, Listly, Noragentic, Trace and more.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projects"
        title="Things I've built, and what I'm building next."
        intro="From a co-founded mobile app and a bachelor project to my own AI prototypes. Each page covers the problem, what I did and the stack."
      />
      <Container className="pb-24 sm:pb-32">
        <ProjectList items={projects} />
      </Container>
    </>
  );
}
