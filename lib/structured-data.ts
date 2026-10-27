import { site } from "@/content/site";
import { doctor } from "@/content/doctor";
import type { NewsPost } from "@/content/news";

const DAY_CODES: Record<string, string> = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday",
  friday: "Friday", saturday: "Saturday", sunday: "Sunday",
};
const DAY_ORDER = Object.values(DAY_CODES);

/** "Monday to Saturday" / "Mon, Wed and Fri" -> ["Monday", ...]. Returns null if the text is not understood. */
function parseDays(text: string): string[] | null {
  const t = text.toLowerCase();
  const find = (w: string) => DAY_ORDER.find((d) => d.toLowerCase().startsWith(w.slice(0, 3)));
  const words = t.match(/[a-z]+/g) ?? [];
  const named = words.filter((w) => w.length >= 3 && find(w) && DAY_ORDER.some((d) => d.toLowerCase().startsWith(w.slice(0, 3))));
  if (/\b(to|-|–|through)\b/.test(t) && named.length === 2) {
    const a = DAY_ORDER.indexOf(find(named[0])!);
    const b = DAY_ORDER.indexOf(find(named[1])!);
    if (a <= b) return DAY_ORDER.slice(a, b + 1);
    return [...DAY_ORDER.slice(a), ...DAY_ORDER.slice(0, b + 1)];
  }
  const list = named.map((w) => find(w)!).filter(Boolean);
  return list.length ? Array.from(new Set(list)) : null;
}

/** "9:00 am to 5:00 pm" -> { opens: "09:00", closes: "17:00" } */
function parseTimes(text: string): { opens: string; closes: string } | null {
  const m = [...text.toLowerCase().matchAll(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/g)];
  if (m.length < 2) return null;
  const conv = (x: RegExpMatchArray, fallback?: string) => {
    let h = Number(x[1]);
    const min = x[2] ?? "00";
    const ap = x[3] ?? fallback;
    if (ap === "pm" && h < 12) h += 12;
    if (ap === "am" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${min}`;
  };
  const closeAp = m[1][3];
  return { opens: conv(m[0], closeAp), closes: conv(m[1]) };
}

/** Only confirmed details are included; unconfirmed fields are simply omitted. */
export function clinicJsonLd() {
  const c = site.contact;
  const postal = c.address?.join(" ").match(/\b\d{6}\b/)?.[0];
  const hoursSpec = (c.hours ?? [])
    .map((h) => {
      const days = parseDays(h.days);
      const times = parseTimes(h.time);
      return days && times
        ? { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: times.opens, closes: times.closes }
        : null;
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${site.url}/#clinic`,
    name: site.name,
    alternateName: [site.fullName, "RKM Eye Clinic", "RKM Optical Care"],
    slogan: site.tagline,
    description: site.seoDescription,
    url: site.url,
    logo: `${site.url}/brand/rkm-logo.png`,
    image: `${site.url}/og/rkm-eye-care-og.jpg`,
    medicalSpecialty: "Ophthalmology",
    knowsLanguage: ["en", "ml"],
    sameAs: [site.instagram.url],
    areaServed: [
      { "@type": "City", name: site.town },
      { "@type": "AdministrativeArea", name: `${site.district}, ${site.region}` },
    ],
    // The town, district and country are confirmed; the street address is added once the clinic provides it.
    address: {
      "@type": "PostalAddress",
      ...(c.address && c.address.length > 1 ? { streetAddress: c.address.slice(0, -1).join(", ") } : {}),
      addressLocality: site.town,
      addressRegion: site.region,
      ...(postal ? { postalCode: postal } : {}),
      addressCountry: "IN",
    },
    ...(c.phone ? { telephone: c.phone } : {}),
    ...(c.email ? { email: c.email } : {}),
    ...(c.mapsUrl ? { hasMap: c.mapsUrl } : {}),
    ...(hoursSpec.length ? { openingHoursSpecification: hoursSpec } : {}),
    employee: { "@id": `${site.url}/doctor#physician` },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: site.fullName,
    url: site.url,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#clinic` },
  };
}

export function physicianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${site.url}/doctor#physician`,
    name: doctor.name,
    jobTitle: doctor.designation,
    medicalSpecialty: "Ophthalmology",
    identifier: doctor.registration,
    url: `${site.url}/doctor`,
    worksFor: { "@id": `${site.url}/#clinic` },
    ...(doctor.qualificationDetails
      ? {
          alumniOf: doctor.qualificationDetails
            .filter((q) => q.institution)
            .map((q) => ({ "@type": "EducationalOrganization", name: q.institution })),
        }
      : {}),
    ...(doctor.photo ? { image: `${site.url}${doctor.photo}` } : {}),
  };
}

/** Breadcrumb trail for inner pages, e.g. breadcrumbJsonLd([{ name: "About Us", path: "/about" }]). Home is added automatically. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

/** News article markup. Only emitted when the post has a confirmed date (Google requires one). */
export function newsArticleJsonLd(post: NewsPost) {
  if (!post.date) return null;
  const img = post.ogImage?.src ?? post.image?.src;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${site.url}/news/${post.slug}`,
    ...(img ? { image: [`${site.url}${img}`] } : {}),
    author: { "@id": `${site.url}/#clinic` },
    publisher: { "@id": `${site.url}/#clinic` },
  };
}
