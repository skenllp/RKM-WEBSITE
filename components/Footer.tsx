import Link from "next/link";
import { navigation, site, telHref } from "@/content/site";
import { Logo } from "./Logo";
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { DraftNote } from "./DraftNote";

export function Footer() {
  const c = site.contact;
  return (
    <footer className="bg-navy text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <Logo variant="white" withTagline height={64} />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/80">
            {site.fullName}. Compassionate, ethical and patient-focused eye care, founded in loving
            memory of Radhakrishnan.
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-navy"
          >
            <InstagramIcon width={18} height={18} />
            {site.instagram.handle}
            <span className="sr-only"> on Instagram (opens in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] !text-[#7fe0e6]">
            Explore
          </h2>
          <ul className="mt-5 grid gap-2.5 text-[0.95rem]">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/85 transition hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="text-white/85 transition hover:text-white hover:underline">
                Privacy Notice
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] !text-[#7fe0e6]">
            Contact
          </h2>
          <ul className="mt-5 grid gap-4 text-[0.95rem] text-white/85">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-teal" width={20} height={20} />
              <span>
                {c.address ? (
                  c.address.map((l) => <span key={l} className="block">{l}</span>)
                ) : (
                  <>
                    Coming soon to {site.town}
                    <DraftNote className="mt-1 block">Address to be confirmed</DraftNote>
                  </>
                )}
              </span>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 shrink-0 text-teal" width={20} height={20} />
              {c.phone ? (
                <a href={telHref(c.phone)} className="hover:underline">{c.phone}</a>
              ) : (
                <DraftNote>Phone to be confirmed</DraftNote>
              )}
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 shrink-0 text-teal" width={20} height={20} />
              {c.email ? (
                <a href={`mailto:${c.email}`} className="break-all hover:underline">{c.email}</a>
              ) : (
                <DraftNote>Email to be confirmed</DraftNote>
              )}
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 shrink-0 text-teal" width={20} height={20} />
              {c.hours ? (
                <span>
                  {c.hours.map((h) => (
                    <span key={h.days} className="block">{h.days}: {h.time}</span>
                  ))}
                </span>
              ) : (
                <DraftNote>Opening hours to be confirmed</DraftNote>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x flex flex-col gap-2 py-6 pb-28 text-sm text-white/70 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <p className="md:text-right">
            Clinic images on this site are architectural visualisations, not photographs of the finished clinic.
          </p>
        </div>
      </div>
    </footer>
  );
}
