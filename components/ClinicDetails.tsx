import { site, telHref } from "@/content/site";
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 shrink-0 text-teal-700">{icon}</span>
      <div>
        <p className="label">{label}</p>
        <div className="mt-1 font-semibold text-navy">{children}</div>
      </div>
    </li>
  );
}

/** The clinic's contact details. Each one appears as soon as it is filled in, in content/site.ts. */
export function ClinicDetails() {
  const c = site.contact;
  return (
    <ul className="grid gap-6">
      <Row icon={<PinIcon width={22} height={22} />} label="Location">
        {c.address ? (
          <>
            {c.address.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
            {c.mapsUrl ? (
              <a
                href={c.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-teal-700 underline"
              >
                Open in Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </>
        ) : (
          <>{site.town}, {site.region}</>
        )}
      </Row>
      {c.phone ? (
        <Row icon={<PhoneIcon width={22} height={22} />} label="Phone">
          <a href={telHref(c.phone)} className="hover:underline">{c.phone}</a>
        </Row>
      ) : null}
      {c.email ? (
        <Row icon={<MailIcon width={22} height={22} />} label="Email">
          <a href={`mailto:${c.email}`} className="break-all hover:underline">{c.email}</a>
        </Row>
      ) : null}
      {c.hours ? (
        <Row icon={<ClockIcon width={22} height={22} />} label="Opening hours">
          {c.hours.map((h) => (
            <span key={h.days} className="block">{h.days}: {h.time}</span>
          ))}
        </Row>
      ) : null}
      <Row icon={<InstagramIcon width={22} height={22} />} label="Instagram">
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-0.5 hover:underline"
        >
          {site.instagram.handle}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Row>
    </ul>
  );
}
