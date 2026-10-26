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

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"),

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
  showDraftNotes: true,
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Eye Care Services", href: "/services" },
  { label: "Our Doctor", href: "/doctor" },
  { label: "Optical Care", href: "/optical-care" },
  { label: "Facilities", href: "/facilities" },
  { label: "News & Updates", href: "/news" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const APPOINTMENT_HREF = "/contact#appointment";

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}
