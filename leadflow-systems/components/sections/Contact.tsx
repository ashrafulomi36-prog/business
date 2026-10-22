import { ContactForm } from "@/components/ContactForm";
import { BookingLink } from "@/components/ui/BookingLink";
import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-20 sm:py-28" aria-labelledby="contact-h">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-accent/10 to-transparent" aria-hidden="true" />
      <div className="shell relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2 id="contact-h" className="h-section mt-4">Let&rsquo;s Make Your Lead Process Work Better.</h2>
          <p className="lede mt-5">
            Tell us how your business currently handles inquiries. We&rsquo;ll review the workflow and discuss whether automation is a sensible fit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingLink className="btn-primary">Book a Discovery Call</BookingLink>
            <a href="#quote-form" className="btn-ghost">Request a Project Quote</a>
          </div>
          {siteConfig.contactEmail ? (
            <p className="mt-8 text-sm text-mist">
              Prefer email?{" "}
              <a className="text-accent underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            </p>
          ) : null}
        </div>
        <div id="quote-form" className="card p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-bone">Request a project quote</h3>
          <p className="mt-1 text-sm text-mist">No obligation. We reply by email.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
