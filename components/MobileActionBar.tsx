import Link from "next/link";
import { APPOINTMENT_HREF, site, telHref, whatsappHref } from "@/content/site";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Persistent appointment / contact bar for phones, and a floating WhatsApp
 * button for larger screens. WhatsApp and Call appear ONLY once the verified
 * numbers are added in content/site.ts.
 */
export function MobileActionBar() {
  const { phone, whatsapp } = site.contact;

  return (
    <>
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-8px_24px_-12px_rgb(11_39_64/0.5)] md:hidden"
      >
        <ul className="flex divide-x divide-white/15">
          <li className="flex-[1.4]">
            <Link
              href={APPOINTMENT_HREF}
              className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm font-bold"
            >
              <CalendarIcon width={19} height={19} />
              Book Appointment
            </Link>
          </li>
          {phone ? (
            <li className="flex-1">
              <a href={telHref(phone)} className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm font-bold">
                <PhoneIcon width={19} height={19} />
                Call
              </a>
            </li>
          ) : (
            <li className="flex-1">
              <Link href="/contact" className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm font-bold">
                <PhoneIcon width={19} height={19} />
                Contact
              </Link>
            </li>
          )}
          {whatsapp ? (
            <li className="flex-1">
              <a
                href={whatsappHref(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm font-bold"
              >
                <WhatsAppIcon width={19} height={19} />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ) : null}
        </ul>
      </nav>

      {whatsapp ? (
        <a
          href={whatsappHref(whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with RKM Eye Care on WhatsApp (opens in a new tab)"
          className="fixed bottom-6 right-6 z-30 hidden size-14 items-center justify-center rounded-full bg-[#1f9d55] text-white shadow-lift transition hover:scale-105 md:flex"
        >
          <WhatsAppIcon width={30} height={30} />
        </a>
      ) : null}
    </>
  );
}
