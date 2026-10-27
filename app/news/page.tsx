import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { site } from "@/content/site";
import { newsPosts } from "@/content/news";
import { PageHero } from "@/components/Section";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, InstagramIcon } from "@/components/Icons";

export const metadata = buildMetadata({
  title: "News & Updates",
  description: `Opening updates, announcements and eye-health awareness from ${site.name}, the new eye clinic and optical showroom coming to Parappanangadi.`,
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "News & Updates", path: "/news" }])} />
      <PageHero
        eyebrow="News & Updates"
        title="The latest from RKM Eye Care"
        intro="Opening updates, clinic announcements and eye-health awareness."
      />
      <section className="section">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {newsPosts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={(i % 3) * 80} className="h-full">
                  <NewsCard post={post} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal delay={100} className="h-full">
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-72 flex-col justify-between rounded-[1.25rem] bg-navy p-7 text-white transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <InstagramIcon width={36} height={36} className="text-teal" />
                  <span>
                    <span className="block font-display text-[1.5rem] leading-snug">
                      More on Instagram
                    </span>
                    <span className="mt-2 block text-white/80">
                      Follow {site.instagram.handle} for the latest posts and announcements.
                    </span>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                      Open Instagram
                      <ArrowRight width={18} height={18} className="transition group-hover:translate-x-1" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
