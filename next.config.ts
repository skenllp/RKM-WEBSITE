import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    // Only this true/false value reaches the browser, never the settings themselves.
    NEXT_PUBLIC_BOOKING_OPEN: String(
      Boolean(
        (process.env.RESEND_API_KEY &&
          process.env.APPOINTMENT_TO_EMAIL &&
          process.env.APPOINTMENT_FROM_EMAIL) ||
          (process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET),
      ),
    ),
    // Spam check (Cloudflare Turnstile) switches on only when both keys are set.
    NEXT_PUBLIC_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY
        ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
        : "",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
