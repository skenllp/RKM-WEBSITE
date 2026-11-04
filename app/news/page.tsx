import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { site } from "@/content/site";
import { newsPosts } from "@/content/news";
import { InstagramCard, PageHero } from "@/components/Section";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";

export const metadata = buildMetadata({
  title: "News & Updates",
  description: `Opening updates, announcements and eye-health awareness from ${site.name}, the new eye clinic and optical showroom coming to Parappanangadi.`,
  path: "/news",
});

export default function NewsPage() {
  const [latest, ...older] = newsPosts;
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
            <li className="md:col-span-2">
              <Reveal className="h-full">
                <NewsCard post={latest} headingLevel="h2" featured />
              </Reveal>
            </li>
            <li className="md:col-span-2 lg:col-span-1">
              <Reveal delay={100} className="h-full">
                <InstagramCard
                  title="More on Instagram"
                  text={`Follow ${site.instagram.handle} for the latest posts and announcements.`}
                />
              </Reveal>
            </li>
            {older.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={(i % 3) * 80} className="h-full">
                  <NewsCard post={post} headingLevel="h2" />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
