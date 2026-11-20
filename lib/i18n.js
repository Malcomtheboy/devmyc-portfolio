import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { LOCALES, getContent, localePath } from "./content";

/*
  Server-side language helpers.
  URLs: English (default) has no prefix, e.g. /projects.
        Norwegian lives under /no, e.g. /no/projects.
  proxy.js maps the unprefixed English URLs to the [lang] = "en" pages.
*/

// Current language from the [lang] route segment, plus its content
export async function getI18n() {
  const l = await lang();
  if (!LOCALES.includes(l)) notFound();
  return { lang: l, c: getContent(l), href: (path) => localePath(l, path) };
}

// Page metadata with canonical URL and links to the other language
export function pageMeta(l, path, title, description) {
  return {
    title,
    description,
    alternates: {
      canonical: localePath(l, path),
      languages: {
        en: localePath("en", path),
        nb: localePath("no", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: {
      locale: l === "no" ? "nb_NO" : "en_GB",
      url: localePath(l, path),
    },
  };
}
