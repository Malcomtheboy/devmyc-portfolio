import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InlineScript from "@/components/InlineScript";
import { LOCALES } from "@/lib/content";
import { getI18n, pageMeta } from "@/lib/i18n";

// next/font downloads the fonts at build time and serves them from our own
// domain: no request to Google from the visitor's browser (privacy + speed).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Prerender every page in both languages
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata() {
  const { lang, c } = await getI18n();
  const base = pageMeta(lang, "/", undefined, c.home.metaDescription);
  return {
    ...base,
    metadataBase: new URL(c.site.url),
    title: {
      default: c.home.metaTitle,
      template: `%s — ${c.site.name}`,
    },
    openGraph: { ...base.openGraph, type: "website", siteName: c.site.name },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
    { media: "(prefers-color-scheme: light)", color: "#f6f5f2" },
  ],
  colorScheme: "dark light",
};

/*
  Runs before the first paint so there is no flash of the wrong theme:
  a saved choice wins, otherwise follow the visitor's system setting.
*/
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout({ children }) {
  const { lang } = await getI18n();
  return (
    <html
      lang={lang === "no" ? "nb" : "en"}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
