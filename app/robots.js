import { getContent } from "@/lib/content";

// Served at /robots.txt: allow all crawlers (except the example sites,
// which are fictional) and point them to the sitemap
export default function robots() {
  const { site } = getContent("en");
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/examples/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
