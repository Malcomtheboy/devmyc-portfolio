import { NextResponse } from "next/server";

/*
  Language routing.
  - English is the default and has no prefix:   /projects
  - Norwegian lives under /no:                  /no/projects
  Internally every page lives in app/[lang]/..., so an unprefixed URL is
  rewritten to /en/... (the visitor still sees /projects). Anyone who
  types /en/... is redirected to the clean URL so each page has one address.
*/
export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/no" || pathname.startsWith("/no/")) return;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals, metadata files and anything with a file
  // extension (images, the example sites, sitemap.xml, robots.txt, icon.svg)
  matcher: ["/((?!api|_next|opengraph-image|.*\\.).*)"],
};
