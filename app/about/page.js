import Image from "next/image";
import Container from "@/components/Container";
import { Eyebrow, PageHeader, Tags, TextLink } from "@/components/ui";
import { site, about, strengths, languages } from "@/lib/content";

export const metadata = {
  title: "About",
  description: "About Mohamed Hussein: IT and Management graduate from USN, working across software, data and security.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader label="About" title="Curious about technology and business." />
      <Container className="pb-24 sm:pb-32">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
          <figure className="w-56 overflow-hidden rounded-2xl border border-line bg-surface sm:w-64 lg:w-full">
            <Image
              src={site.photo.src}
              alt={site.photo.alt}
              width={800}
              height={800}
              priority
              sizes="(min-width: 1024px) 20rem, 16rem"
              className="aspect-[4/5] w-full object-cover object-center"
            />
          </figure>

          <div className="max-w-2xl">
            <div className="space-y-6 text-lg leading-relaxed text-pretty text-ink-300">
              {about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <div>
                <Eyebrow as="h2" className="mb-4">How I work</Eyebrow>
                <ul className="space-y-2 text-ink-200">
                  {strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow as="h2" className="mb-4">Languages</Eyebrow>
                <Tags items={languages} />
              </div>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink href="/projects">See my projects</TextLink>
              <TextLink href="/contact">Get in touch</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
