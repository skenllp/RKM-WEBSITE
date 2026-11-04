"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  galleryCategories,
  galleryImages,
  type GalleryCategory,
  type GalleryImage,
} from "@/content/gallery";
import { CloseIcon, ArrowRight } from "./Icons";
import { cn } from "@/lib/utils";

type Filter = "All" | GalleryCategory;

export function GalleryExplorer({
  initialFilter = "All",
  limit,
  showFilters = true,
  preview = false,
}: {
  initialFilter?: Filter;
  limit?: number;
  showFilters?: boolean;
  /** Home page layout: large first image, and a swipeable row on phones. */
  preview?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const items = useMemo(() => {
    const list =
      filter === "All" ? galleryImages : galleryImages.filter((g) => g.categories.includes(filter));
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [filter, limit]);

  const open = useCallback((index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setActive(index);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  const close = useCallback(() => {
    setActive(null);
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  const current: GalleryImage | null = active !== null ? (items[active] ?? null) : null;

  return (
    <div>
      {showFilters ? (
        <div
          role="group"
          aria-label="Filter facilities gallery by area"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {(["All", ...galleryCategories] as Filter[]).map((c) => {
            const on = filter === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(c)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                  on
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-slate-600 hover:border-navy hover:text-navy",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Showing {items.length} {items.length === 1 ? "image" : "images"}
        {filter === "All" ? "" : ` in ${filter}`}.
      </p>

      <ul
        className={cn(
          "gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5",
          showFilters && "mt-8",
          preview
            ? "-mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0"
            : "grid",
        )}
      >
        {items.map((g, i) => {
          const large = preview && i === 0;
          return (
            <li
              key={g.id}
              className={cn(
                preview && "w-[82%] shrink-0 snap-center sm:w-auto",
                large && "sm:col-span-2 lg:row-span-2",
              )}
            >
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-navy text-left"
                aria-label={`Enlarge image: ${g.caption}`}
              >
                <span className="relative block aspect-[4/3] w-full flex-1 overflow-hidden">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    placeholder="blur"
                    blurDataURL={g.blurDataURL}
                    loading="lazy"
                    sizes={
                      large
                        ? "(min-width: 1024px) 770px, (min-width: 640px) 94vw, 82vw"
                        : "(min-width: 1024px) 380px, (min-width: 640px) 47vw, 92vw"
                    }
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex items-baseline justify-between gap-3 bg-navy px-4 py-3 text-white sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-transparent sm:bg-gradient-to-t sm:from-navy-900/85 sm:to-transparent sm:p-4 sm:pt-14">
                  <span className="text-sm font-semibold">{g.caption}</span>
                  <span className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-wider text-white/85">
                    Visualisation
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label="Enlarged facilities image"
        className="m-auto w-[min(96vw,72rem)] max-w-none overflow-visible rounded-2xl bg-transparent p-0 backdrop:bg-navy-900/90"
      >
        {current ? (
          <figure className="relative">
            <div className="overflow-hidden rounded-2xl bg-white">
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="96vw"
                className="max-h-[78dvh] w-full object-contain"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 text-sm">
                <span className="font-semibold text-navy">{current.caption}</span>
                <span className="text-slate-600">
                  Architectural visualisation. The finished clinic may differ.
                </span>
              </figcaption>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close enlarged image"
              className="absolute -top-3 right-0 flex size-11 items-center justify-center rounded-full bg-white text-navy shadow-lift sm:-right-3"
            >
              <CloseIcon width={22} height={22} />
            </button>
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-[38%] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-lift"
                >
                  <ArrowRight width={22} height={22} className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-[38%] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy shadow-lift"
                >
                  <ArrowRight width={22} height={22} />
                </button>
              </>
            ) : null}
          </figure>
        ) : null}
      </dialog>
    </div>
  );
}
