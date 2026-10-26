/**
 * News & Updates: add new posts at the TOP of this list.
 *
 * Each post becomes a card on /news and its own page at /news/<slug>.
 *   - `date`: ISO date "2026-11-01" (omit while unknown; nothing is invented)
 *   - `category`: "Opening updates" | "Announcements" | "Health awareness"
 *   - `image`: path under /public (optional)
 *   - `body`: array of paragraphs
 * Only publish facts the clinic has confirmed.
 */

export type NewsPost = {
  slug: string;
  title: string;
  category: "Opening updates" | "Announcements" | "Health awareness";
  date?: string;
  excerpt: string;
  body: string[];
  image?: { src: string; alt: string; width: number; height: number };
  /** JPEG used for social sharing previews (WhatsApp, Facebook, LinkedIn handle JPEG best). Falls back to the site image. */
  ogImage?: { src: string; width: number; height: number };
  /** Malayalam line shown on the poster, for display with correct typography. */
  malayalam?: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "rkm-eye-care-coming-soon-to-parappanangadi",
    title: "RKM Eye Care is coming soon to Parappanangadi",
    category: "Opening updates",
    excerpt:
      "RKM Eye Care, Radhakrishnan Memorial Eye Care, is on its way to Parappanangadi. Follow us for the latest updates.",
    body: [
      "RKM Eye Care (Radhakrishnan Memorial Eye Care) is coming soon to Parappanangadi.",
      "We will share the opening date, location details and contact information here and on our Instagram page as soon as they are confirmed.",
    ],
    malayalam: "പരപ്പനങ്ങാടിക്ക് ഇനി കാഴ്ച മങ്ങില്ല...",
    ogImage: { src: "/og/coming-soon-poster.jpg", width: 1200, height: 800 },
    image: {
      src: "/images/news/coming-soon-poster.webp",
      alt: "RKM Eye Care coming soon poster with a smiling eye character giving a thumbs up and the Malayalam line for Parappanangadi.",
      width: 1200,
      height: 800,
    },
  },
];
