import Image from "next/image";
import Link from "next/link";
import type { NewsPost } from "@/content/news";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "./Icons";

export function NewsCard({
  post,
  headingLevel: H = "h3",
}: {
  post: NewsPost;
  headingLevel?: "h2" | "h3";
}) {
  const date = formatDate(post.date);
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      {post.image ? (
        <div className="relative aspect-[3/2] overflow-hidden bg-mist">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
          <span>{post.category}</span>
          {date ? <time dateTime={post.date} className="font-semibold text-slate-600">{date}</time> : null}
        </p>
        <H className="mt-3 text-[1.35rem]">
          <Link
            href={`/news/${post.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </H>
        {post.malayalam ? (
          <p lang="ml" className="mt-2 text-lg font-semibold text-navy">
            {post.malayalam}
          </p>
        ) : null}
        <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-slate-600">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy">
          Read update
          <ArrowRight width={18} height={18} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
