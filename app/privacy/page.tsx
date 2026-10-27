import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { site } from "@/content/site";
import { PageHero } from "@/components/Section";
import { DraftNote } from "@/components/DraftNote";

export const metadata = buildMetadata({
  title: "Privacy Notice",
  description: `How ${site.name} handles the details you send through the appointment request form.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Privacy Notice", path: "/privacy" }])} />
      <PageHero eyebrow="Privacy" title="Privacy Notice" />
      <section className="section">
        <div className="container-x max-w-3xl">
          <div className="mb-8">
            <DraftNote>
              Draft written for the website as built. The clinic should review it, and add the legal
              entity name and a contact for privacy questions, before launch.
            </DraftNote>
          </div>
          <div className="grid gap-9 text-[1.02rem] leading-relaxed text-slate-600 [&_h2]:mb-3 [&_h2]:text-[1.5rem]">
            <div>
              <h2>What we collect</h2>
              <p>
                When you send an appointment request we ask for your name, phone number, preferred date
                and time, the reason for the consultation, an optional message, and your agreement to be
                contacted. Please do not include detailed medical records in the message box.
              </p>
            </div>
            <div>
              <h2>How we use it</h2>
              <p>
                Your details are used only to respond to your request, for example to call you and
                confirm or arrange a time. Sending the form does not confirm an appointment.
              </p>
            </div>
            <div>
              <h2>How it is handled</h2>
              <p>
                The request is sent securely to the clinic’s email through a delivery service. This
                website does not keep a database of requests and does not add your details to any
                marketing list. The page is cleared after you send a request.
              </p>
            </div>
            <div>
              <h2>Analytics and cookies</h2>
              <p>This website does not use advertising or tracking cookies.</p>
            </div>
            <div>
              <h2>Links to other sites</h2>
              <p>
                Our Instagram link takes you to a service run by another company, which has its own
                privacy practices.
              </p>
            </div>
            <div>
              <h2>Your choices</h2>
              <p>
                You can ask the clinic to correct or delete the details you sent. Contact details for
                this are on the Contact page once they are published.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
