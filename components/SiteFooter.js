import Container from "./Container";
import { site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 text-sm text-ink-300">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {/* Static year on purpose: the page is prerendered, so no runtime clock */}
          © 2026 {site.name}. Built with Next.js.
        </p>
        <ul className="flex gap-6">
          <li>
            <a href={site.links.github} className="transition-colors hover:text-ink-100">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} className="transition-colors hover:text-ink-100">
              LinkedIn
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
