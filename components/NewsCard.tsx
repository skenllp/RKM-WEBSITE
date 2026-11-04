import Image from "next/image";
import Link from "next/link";
import type { NewsPost } from "@/content/news";
import { cn, formatDate } from "@/lib/utils";
import { ArrowRight } from "./Icons";

export function NewsCard({
  post,
  headingLevel: H = "h3",
  featured = false,
}: {
  post: NewsPost;
  headingLevel?: "h2" | "h3";
  /** Wider layout with the image beside the text, from tablet width up. */
  featured?: boolean;
}) {
  const date = formatDate(post.date);
  return (
    <article
      className={cn(
        "card group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-navy/40",
        featured && "md:flex-row",
      )}
    >
      {post.image ? (
        <div
          className={cn(
            "relative aspect-[3/2] overflow-hidden",
            featured ? "bg-navy md:aspect-auto md:w-1/2 md:shrink-0" : "bg-ivory",
          )}
        >
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes={
              featured
                ? "(min-width: 768px) 400px, 94vw"
                : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            }
            className={cn(
              "transition duration-700 group-hover:scale-[1.03]",
              // Posters carry text, so the wide layout shows them whole rather than cropping.
              featured ? "object-contain" : "object-cover",
            )}
          />
        </div>
      ) : null}
      <div className={cn("flex flex-1 flex-col p-6", featured && "md:p-8")}>
        <p className="flex flex-wrap items-center gap-x-3 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
          <span>{post.category}</span>
          {date ? <time dateTime={post.date} className="font-semibold text-slate-600">{date}</time> : null}
        </p>
        <H className={cn("mt-3 text-[1.35rem]", featured && "md:text-[1.75rem]")}>
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
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
          Read update
          <ArrowRight width={18} height={18} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
