import { site } from "@/content/site";
import { doctor } from "@/content/doctor";

/** Only confirmed details are included; unconfirmed fields are simply omitted. */
export function clinicJsonLd() {
  const c = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${site.url}/#clinic`,
    name: site.name,
    alternateName: site.fullName,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/rkm-logo.png`,
    image: `${site.url}/og/rkm-eye-care-og.jpg`,
    medicalSpecialty: "Ophthalmology",
    sameAs: [site.instagram.url],
    areaServed: site.town,
    ...(c.phone ? { telephone: c.phone } : {}),
    ...(c.email ? { email: c.email } : {}),
    ...(c.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: c.address.slice(0, -1).join(", "),
            addressLocality: c.address[c.address.length - 1],
            addressCountry: "IN",
          },
        }
      : {}),
    ...(c.mapsUrl ? { hasMap: c.mapsUrl } : {}),
    ...(c.hours
      ? {
          openingHours: c.hours.map((h) => `${h.days} ${h.time}`),
        }
      : {}),
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
    ...(doctor.photo ? { image: `${site.url}${doctor.photo}` } : {}),
  };
}
