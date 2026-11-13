import { site } from "@/lib/content";

// Served at /robots.txt: allow all crawlers and point them to the sitemap
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
