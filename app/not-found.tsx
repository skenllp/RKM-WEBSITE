import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Page not found",
    description: "The page you are looking for could not be found.",
    path: "/",
  }),
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x max-w-xl text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)]">We could not find that page</h1>
        <p className="mt-4 text-slate-600">
          The link may be old or mistyped. You can head back to the home page or send us an
          appointment request.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">Go to Home</Link>
          <Link href="/contact#appointment" className="btn btn-outline">Book an Appointment</Link>
        </div>
      </div>
    </section>
  );
}
