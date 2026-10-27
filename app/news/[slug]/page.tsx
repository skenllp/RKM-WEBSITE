import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { newsPosts } from "@/content/news";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { PageHero, CtaBand } from "@/components/Section";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, newsArticleJsonLd } from "@/lib/structured-data";

type Params = { slug: string };

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
    type: "article",
    image: post.image
      ? {
          url: post.ogImage?.src ?? post.image.src,
          width: post.ogImage?.width ?? post.image.width,
          height: post.ogImage?.height ?? post.image.height,
          alt: post.image.alt,
        }
      : undefined,
  });
}

export default async function NewsPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const date = formatDate(post.date);
  const article = newsArticleJsonLd(post);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "News & Updates", path: "/news" },
          { name: post.title, path: `/news/${post.slug}` },
        ])}
      />
      {article ? <JsonLd data={article} /> : null}
      <PageHero
        eyebrow={post.category}
        title={post.title}
        intro={date ? <time dateTime={post.date}>{date}</time> : undefined}
      />
      <article className="section">
        <div className="container-x max-w-3xl">
          {post.image ? (
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              priority
              sizes="(min-width: 768px) 720px, 94vw"
              className="h-auto w-full rounded-[1.5rem] shadow-lift"
            />
          ) : null}
          {post.malayalam ? (
            <p lang="ml" className="mt-8 font-display text-3xl text-navy">
              {post.malayalam}
            </p>
          ) : null}
          <div className="mt-6 grid gap-5 text-[1.08rem] leading-relaxed text-slate-600">
            {post.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Link href="/news" className="btn btn-outline mt-10">
            <ArrowRight width={18} height={18} className="rotate-180" />
            All updates
          </Link>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
