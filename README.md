# RKM Eye Care website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Ready to deploy on Vercel.

## Run locally
```bash
npm install
cp .env.example .env.local     # optional for local work, see "Appointment form"
npm run dev                    # http://localhost:3000
npm run build && npm start     # production check
npm run typecheck
```
Requires Node 20 or newer.

## Deploy on Vercel
1. Push this folder to a Git repository, or run `npx vercel` from this folder.
2. In Vercel, import the project (framework is detected automatically; no settings to change).
3. Add the environment variables below, then redeploy.
4. Set `NEXT_PUBLIC_SITE_URL` to the final domain so canonical links, the sitemap and sharing previews use it.

## Appointment form: setup (important)
The form posts to `/api/appointments`, which emails the clinic through [Resend](https://resend.com).
The visitor is told "request sent" **only after Resend accepts the email**; failures show "Nothing has been sent".
Until the variables below are set, the form says online requests are not open yet. It never shows a booking confirmation:
the wording is always "request", "not a confirmed booking".

1. **Resend:** create an account, add your domain under *Domains*, add the DNS records (SPF/DKIM) it shows and wait for "Verified". Create an API key under *API Keys* with **Sending access** only, limited to that domain.
2. **Vercel:** Project > Settings > Environment Variables. Add these for **Production** (variable names exactly as shown):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | the key from Resend (starts with `re_`) |
| `APPOINTMENT_TO_EMAIL` | clinic inbox that receives requests (comma-separate several) |
| `APPOINTMENT_FROM_EMAIL` | sender on the verified domain, e.g. `RKM Eye Care <appointments@yourdomain.com>` |
| `NEXT_PUBLIC_SITE_URL` | final site address, e.g. `https://www.yourdomain.com` |

3. **Redeploy** so the new variables take effect.
4. **Locally:** `cp .env.example .env.local`, fill in the values, run `npm run dev`. `.env.local` is git-ignored; never commit keys.

Key safety: `RESEND_API_KEY`, `APPOINTMENT_TO_EMAIL` and `APPOINTMENT_FROM_EMAIL` are read only inside `app/api/appointments/route.ts` on the server. They have no `NEXT_PUBLIC_` prefix and are not in the browser bundle (verified). Do not add that prefix.

Checks in the endpoint: same-origin only, JSON only, 8 KB limit, server-side validation (name, Indian/international phone, date within 90 days in India time, listed time and reason, consent), honeypot, rate limits, HTML-escaped email. Nothing is stored or logged about the patient; provider errors (status and message only) are logged to Vercel to help diagnose setup problems.

See `docs/LAUNCH-CHECKLIST.md` for the full list of what is done, what is needed from the clinic, production steps, launch tests, and recommended security improvements (notably a CAPTCHA) before the form is made public.

## Where to edit content (all in `content/`)
| File | What it controls |
|---|---|
| `site.ts` | Phone, email, **WhatsApp**, address, Maps link, opening hours (all `null` until verified), Instagram, navigation, and `showDraftNotes` |
| `doctor.ts` | Doctor biography, qualification details, clinical interests, awards, **portrait** |
| `services.ts` | The seven service cards |
| `optical.ts` | Optical care items (add descriptions once confirmed) |
| `news.ts` | News posts, newest first (each gets its own page) |
| `about.ts` | Vision, mission, foundation, values, promise (verbatim from the supplied PDF) |
| `gallery.ts` | Gallery images and categories |

### Placeholders still to fill (nothing has been invented)
- Phone, email, address, Google Maps link, opening hours → `content/site.ts` (appear in header/footer/contact/structured data automatically)
- WhatsApp number → `contact.whatsapp` (the WhatsApp buttons appear only once this is set)
- Optical care items and any confirmed services availability
- Privacy Notice wording should be reviewed by the clinic
- Set `showDraftNotes: false` in `site.ts` to hide the amber "to be confirmed" labels at launch

The doctor profile (`content/doctor.ts`) is complete with the clinic's supplied biography, qualifications, clinical interests, awards, TCMC number and portrait (`public/images/doctor/dr-chandana.webp`, overwrite to replace). Edit the wording only with the clinic's approval.

## Assets
- `public/brand/`: official logo, cropped from the supplied Vision/Mission PDF (colour + white versions)
- `public/images/clinic/`: the 8 render images extracted from the renders PDF, white page margins trimmed, converted to WebP
- `public/images/news/`: the supplied "Coming soon" poster
- `public/og/`: sharing image · `app/icon.png`, `app/apple-icon.png`: favicons made from the logo's eye mark
- `source-assets/`: the original PDFs and reference screenshots (not served; safe to delete)
- `docs/WEBSITE-PROMPT.md`: the original brief

All gallery images are labelled "architectural visualisation". Replace with photographs when the clinic is complete.

## Notes
- MB Hospital was used only as a structural reference (navigation pattern, doctor profile, appointment flow).
- Malayalam is supported (Noto Sans Malayalam, `lang="ml"` on Malayalam text).
- Motion is subtle and switches off for visitors who prefer reduced motion.
