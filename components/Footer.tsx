import Link from "next/link";
import { navigation, site, telHref } from "@/content/site";
import { Logo } from "./Logo";
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

export function Footer() {
  const c = site.contact;
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 lg:py-24">
        <div className="md:col-span-5">
          <Logo variant="white" withTagline height={64} />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/75">
            {site.fullName}. Compassionate, ethical and patient-focused eye care, founded in loving
            memory of Radhakrishnan.
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-navy"
          >
            <InstagramIcon width={18} height={18} />
            {site.instagram.handle}
            <span className="sr-only"> on Instagram (opens in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="label font-sans !text-aqua">Explore</h2>
          <ul className="mt-4 grid text-[0.95rem]">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1.5 text-white/80 transition hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="inline-block py-1.5 text-white/80 transition hover:text-white hover:underline"
              >
                Privacy Notice
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="label font-sans !text-aqua">Contact</h2>
          {/* Details appear here as soon as they are filled in, in content/site.ts. */}
          <ul className="mt-5 grid gap-4 text-[0.95rem] text-white/80">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-aqua" width={20} height={20} />
              <span>
                {c.address ? (
                  c.address.map((l) => <span key={l} className="block">{l}</span>)
                ) : (
                  <>Opening soon in {site.town}, {site.region}</>
                )}
              </span>
            </li>
            {c.phone ? (
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 shrink-0 text-aqua" width={20} height={20} />
                <a href={telHref(c.phone)} className="hover:underline">{c.phone}</a>
              </li>
            ) : null}
            {c.email ? (
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 shrink-0 text-aqua" width={20} height={20} />
                <a href={`mailto:${c.email}`} className="break-all hover:underline">{c.email}</a>
              </li>
            ) : null}
            {c.hours ? (
              <li className="flex gap-3">
                <ClockIcon className="mt-0.5 shrink-0 text-aqua" width={20} height={20} />
                <span>
                  {c.hours.map((h) => (
                    <span key={h.days} className="block">{h.days}: {h.time}</span>
                  ))}
                </span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 pb-24 text-sm text-white/65 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <p className="md:text-right">
            Clinic images on this site are architectural visualisations, not photographs of the finished clinic.
          </p>
        </div>
      </div>
    </footer>
  );
}
