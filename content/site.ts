/**
 * Central, editable site settings.
 *
 * Anything the clinic has NOT yet confirmed is `null`. While a value is `null`
 * the website shows a clearly labelled placeholder (or hides the related
 * action, e.g. the WhatsApp button). Fill a value in and it appears everywhere
 * automatically: header, footer, contact page, structured data.
 */

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "RKM Eye Care",
  fullName: "Radhakrishnan Memorial Eye Care",
  tagline: "Better Vision Brighter Life",
  description:
    "RKM Eye Care (Radhakrishnan Memorial Eye Care) offers compassionate, ethical and patient-focused eye care, with an optical care showroom, coming soon to Parappanangadi.",
  /** Slightly longer, keyword-aware description for the home page and search results. */
  seoDescription:
    "Ethical, patient-focused eye clinic and optical showroom coming soon to Parappanangadi, Kerala. Cataract, glaucoma, retina, cornea and paediatric eye care.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost
      ? `https://${vercelHost}`
      : process.env.NODE_ENV === "production"
        ? "https://rkmeyecare.com"
        : "http://localhost:3000"),

  /** Search-result title for the home page (keeps the town and service in the first 60 characters). */
  seoTitle: "RKM Eye Care | Eye Clinic & Optical Care in Parappanangadi",
  region: "Kerala",
  district: "Malappuram",
  keywords: [
    "eye clinic Parappanangadi",
    "ophthalmologist Parappanangadi",
    "eye hospital Malappuram",
    "optical shop Parappanangadi",
    "cataract glaucoma retina Kerala",
    "RKM Eye Care",
  ],

  /** Confirmed from the supplied "Coming Soon" poster. */
  town: "Parappanangadi",
  openingStatus: "Coming soon",

  instagram: {
    url: "https://www.instagram.com/rkm_eyecare",
    handle: "@rkm_eyecare",
  },

  /**
   * ---- TO BE CONFIRMED BY THE CLINIC ----
   * Replace `null` with the verified value.
   *   phone:    "+91 98765 43210"   (shown + used for tel: links)
   *   email:    "hello@example.com"
   *   whatsapp: "919876543210"      (digits only, with country code; enables the WhatsApp button)
   *   address:  ["Line 1", "Line 2", "Parappanangadi, Kerala PIN"]
   *   mapsUrl:  "https://maps.google.com/?q=..."
   *   hours:    [{ days: "Monday to Saturday", time: "9:00 am to 5:00 pm" }]
   */
  contact: {
    phone: null as string | null,
    email: null as string | null,
    whatsapp: null as string | null,
    address: null as string[] | null,
    mapsUrl: null as string | null,
    hours: null as { days: string; time: string }[] | null,
  },

  /**
   * While true, pages show small "to be confirmed" notes next to unverified
   * content (services availability, optical services, doctor biography).
   * Set to false once the clinic has signed off on the content.
   */
  showDraftNotes: false,

  /**
   * True once appointment email delivery is configured (worked out in
   * next.config.ts at build time). Until then the site invites visitors to
   * follow for opening updates instead of showing a form that cannot send.
   */
  bookingOpen: process.env.NEXT_PUBLIC_BOOKING_OPEN === "true",
};

export type NavItem = {
  label: string;
  /** Compact label used in the desktop header. */
  short: string;
  href: string;
  /** Pages not in the menu that highlight this item. */
  also?: string[];
};

/** Main menu, kept short. Optical Care and News are reached from the pages they sit under. */
export const navigation: NavItem[] = [
  { label: "Home", short: "Home", href: "/" },
  { label: "Eye Care Services", short: "Services", href: "/services", also: ["/optical-care"] },
  { label: "Our Doctor", short: "Our Doctor", href: "/doctor" },
  { label: "Facilities", short: "Facilities", href: "/facilities" },
  { label: "About Us", short: "About", href: "/about", also: ["/news"] },
  { label: "Contact Us", short: "Contact", href: "/contact" },
];

/** The footer lists every page, including those not in the main menu. */
export const footerNavigation: { label: string; href: string }[] = [
  ...navigation,
  { label: "Optical Care", href: "/optical-care" },
  { label: "News & Updates", href: "/news" },
  { label: "Privacy Notice", href: "/privacy" },
];

export const APPOINTMENT_HREF = "/contact#appointment";

/** Wording of the main call to action, which follows `site.bookingOpen`. */
export const cta = site.bookingOpen
  ? { label: "Book an Appointment", medium: "Book Appointment" }
  : { label: "Get Opening Updates", medium: "Opening Updates" };

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}
