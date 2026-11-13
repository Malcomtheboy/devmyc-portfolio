import { site, projects } from "@/lib/content";

// Served at /sitemap.xml so search engines can find every page
export default function sitemap() {
  const pages = ["", "/projects", "/about", "/experience", "/contact"];
  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
