"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APPOINTMENT_HREF, cta, site, telHref, whatsappHref } from "@/content/site";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

/** How far a visitor scrolls before the phone bar slides in, so it never doubles up with the hero buttons. */
const SHOW_AFTER_PX = 480;

/**
 * Persistent appointment / contact bar for phones, and a floating WhatsApp
 * button for larger screens. WhatsApp and Call appear ONLY once the verified
 * numbers are added in content/site.ts.
 */
export function MobileActionBar() {
  const { phone, whatsapp } = site.contact;
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the contact page the bar's only job would be linking to the page already open.
  const hideBar = pathname === "/contact" && !phone && !whatsapp;

  return (
    <>
      {hideBar ? null : (
        <nav
          aria-label="Quick actions"
          inert={!show}
          className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy pb-[env(safe-area-inset-bottom)] text-white transition-transform duration-300 ease-[var(--ease-out-soft)] md:hidden ${
            show ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <ul className="flex divide-x divide-white/15">
            <li className="flex-[1.4]">
              <Link
                href={APPOINTMENT_HREF}
                className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm font-semibold"
              >
                <CalendarIcon width={19} height={19} />
                {cta.medium}
              </Link>
            </li>
            {phone ? (
              <li className="flex-1">
                <a href={telHref(phone)} className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm font-semibold">
                  <PhoneIcon width={19} height={19} />
                  Call
                </a>
              </li>
            ) : null}
            {whatsapp ? (
              <li className="flex-1">
                <a
                  href={whatsappHref(whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm font-semibold"
                >
                  <WhatsAppIcon width={19} height={19} />
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      )}

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
