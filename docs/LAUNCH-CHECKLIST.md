# RKM Eye Care website: launch checklist

Status key: [x] done, [ ] still to do.

## 1. Completed development work
- [x] Pages: Home, About Us, Eye Care Services, Our Doctor, Optical Care, Facilities, News & Updates (+ post pages), Contact Us, Privacy Notice, 404
- [x] Official RKM logo (cropped from the supplied PDF), navy / teal / white identity, Fraunces + Manrope + Noto Sans Malayalam
- [x] All 8 clinic renders extracted from the PDF, white page margins trimmed, converted to WebP, categorised into the 5 gallery groups, with lightbox and filters
- [x] Every clinic image is labelled an architectural visualisation (hero, gallery, optical page, about page, lightbox, footer); no photo is presented as the finished clinic
- [x] Mobile: hamburger top left, centred logo, full-screen white menu, animated, focus-trapped, Escape/close button, persistent Book Appointment (header + bottom bar)
- [x] Phones show no picture behind text: header bands are plain navy; gallery captions sit under images
- [x] Doctor profile page complete: biography, qualifications with institutions, clinical interests, awards, TCMC number and portrait, all from the clinic's supplied text
- [x] Appointment form: client + server validation, honeypot, same-origin check, content-type and size limits, two-tier rate limit, HTML-escaped email, delivery errors reported honestly, never shows a booking confirmation (wording: "request", "not a confirmed booking")
- [x] API key is server-only; verified absent from the browser bundle
- [x] SEO: title/description/canonical on every page, Open Graph + Twitter images (JPEG), `MedicalClinic` and `Physician` JSON-LD, sitemap.xml, robots.txt, favicon/apple icon
- [x] Accessibility: skip link, landmarks, one h1 per page, no heading jumps, form labels/errors announced, keyboard-operable menu and lightbox, reduced-motion and no-JS fallbacks; automated axe-core scan (WCAG 2.1 A/AA) reports no violations
- [x] TypeScript strict check and production build pass; 0 npm audit findings; clean `npm ci && npm run build` from the ZIP verified

## 2. Information still needed from the client
- [x] ~~Dr. Chandana Prabhakar biography, education, interests, awards~~ supplied and published. Ask the clinic to read the doctor page once and approve the wording, in particular that the biography mentions "a reputed hospital in Malappuram" and uses both "Super Speciality" and "Super Specialty" for the hospital name (kept exactly as supplied)
- [ ] Written confirmation that the supplied portrait (`public/images/doctor/dr-chandana.webp`) is approved for publication, or a replacement photo
- [ ] Clinic address and Google Maps link
- [ ] Phone number, email address, opening hours
- [ ] Official WhatsApp number (the WhatsApp buttons stay hidden until supplied)
- [ ] Which of the 7 service areas are actually offered at opening; any wording changes
- [ ] Optical Care: what is offered (eyeglasses, frames, services); confirm no brand partnership claims. Brand names in the renders are design illustrations only
- [ ] Opening date / announcement wording, if to be published
- [ ] Final approval of the Privacy Notice and the consent checkbox wording (see section 5)
- [ ] Final domain name

## 3. Production configuration (Vercel + Resend)
- [ ] Create a Resend account, add and verify the sending domain (SPF + DKIM; add DMARC), create a **sending-only** API key restricted to that domain
- [ ] In Vercel > Project > Settings > Environment Variables (scope: **Production**; do not copy the key into Preview):
  - `RESEND_API_KEY`
  - `APPOINTMENT_TO_EMAIL` (clinic inbox; comma-separate several)
  - `APPOINTMENT_FROM_EMAIL` (e.g. `RKM Eye Care <appointments@yourdomain.com>`, on the verified domain)
  - `NEXT_PUBLIC_SITE_URL` (final `https://` domain)
- [ ] Redeploy after setting variables (they are read at build/start)
- [ ] Attach the custom domain, confirm HTTPS
- [ ] Fill `content/site.ts` (phone, email, whatsapp, address, mapsUrl, hours) and `content/doctor.ts`; set `showDraftNotes: false`
- [ ] Turn on Vercel Deployment Protection for Preview URLs so unfinished drafts are not public
- [ ] Add a Vercel Firewall rate-limit rule for `POST /api/appointments`
- [ ] Add a CAPTCHA (see section 5) before announcing the form publicly
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console; claim the Google Business Profile once the address is confirmed
- [ ] Decide on analytics. If added, update the Privacy Notice (it currently says no tracking cookies are used)

## 4. Final launch testing (needs the live site and real keys)
- [ ] Send a real test enquiry on the production domain: email arrives, wording says "request", fields correct (Malayalam/unicode names too)
- [ ] Temporarily use a wrong key to confirm the visitor sees "Nothing has been sent" and Vercel logs show the provider error
- [ ] Submit 6+ times quickly to confirm throttling and the on-screen message
- [ ] Test on real devices: iPhone Safari, Android Chrome (menu, form date picker, gallery, Malayalam rendering)
- [ ] Screen-reader pass (VoiceOver / TalkBack) on the menu, form and gallery
- [ ] Run Lighthouse (mobile) on Home, Doctor, Facilities, Contact; check LCP and CLS
- [ ] Check link previews: WhatsApp, Facebook Sharing Debugger, LinkedIn for `/` and the news post
- [ ] Validate JSON-LD in Google's Rich Results Test; confirm sitemap/robots use the final domain
- [ ] Click every link and anchor once on production; check 404 page
- [ ] Re-read every page for unconfirmed claims (no accreditations, equipment, hours, counts or testimonials were added; keep it that way)

## 5. Privacy notice and security review

### Privacy Notice: needs client / legal approval
The notice at `/privacy` is a plain-language draft, not legal advice. Before launch the clinic should confirm:
1. The legal entity name acting as the data controller, and a named contact (email/phone) for privacy requests; add a grievance contact if required
2. That the notice matches Indian data-protection requirements (e.g. the Digital Personal Data Protection Act, 2023 and rules) and any medical-council guidance. Get a lawyer's review
3. Processors and cross-border transfer: enquiries pass through **Vercel** (hosting; may log IP addresses) and **Resend** (email delivery, US-based). The notice should name them and say data may be processed outside India
4. A retention period for enquiry emails and who in the clinic can read the inbox
5. Wording for parents/guardians booking for a child (the form asks for "patient name" and a phone number)
6. Consent checkbox wording
7. The "no tracking cookies" statement stays true only if no analytics/pixels are added

### Security and spam protection: recommended before the form goes public
Already in place: server-side validation, honeypot, same-origin + JSON content-type checks, 8 KB body limit, in-memory rate limits (40 attempts / 5 emails per 10 min per IP, per server instance), HTML-escaped email, no personal data in logs, no database, secrets server-only, basic security headers.

Still recommended:
1. **CAPTCHA** (Cloudflare Turnstile or hCaptcha): the honeypot and origin check stop only simple bots. Highest-value addition
2. **Shared rate limiting**: in-memory limits reset on cold starts and are per instance. Use a Vercel Firewall rate-limit rule (or Upstash/Redis) on `/api/appointments`
3. **Resend hygiene**: sending-only key, single verified domain, rotate if exposed, monitor bounces/complaints, 2FA on the Resend and clinic mail accounts
4. **Delivery reliability**: there is deliberately no database, so if email delivery fails the enquiry is lost (the visitor is told so and asked to contact the clinic). If guaranteed capture matters, add a queue/inbox store, which also changes the Privacy Notice
5. **Content-Security-Policy** header (not set; needs testing against Next.js inline scripts). HSTS is applied by Vercel on HTTPS
6. **Alerting**: watch Vercel logs / Resend for repeated `delivery_failed`
7. Keep dependencies updated (`npm audit` is clean today)
