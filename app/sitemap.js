import { getContent, localePath } from "@/lib/content";

// Served at /sitemap.xml: every page in English and Norwegian,
// each entry linking to its other-language version.
export default function sitemap() {
  const c = getContent("en");
  const paths = [
    "/",
    "/projects",
    "/about",
    "/experience",
    "/services",
    "/contact",
    ...c.projects.map((p) => `/projects/${p.slug}`),
  ];
  const abs = (lang, path) => `${c.site.url}${localePath(lang, path) === "/" ? "" : localePath(lang, path)}`;

  return paths.flatMap((path) =>
    ["en", "no"].map((lang) => ({
      url: abs(lang, path),
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.6 : 0.8,
      alternates: { languages: { en: abs("en", path), nb: abs("no", path) } },
    }))
  );
}
