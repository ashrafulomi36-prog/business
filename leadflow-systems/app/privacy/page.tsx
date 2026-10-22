import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated: [PLACEHOLDER: date]. This policy describes how {siteConfig.brand} (“we”) handles information collected through this website.</p>
      <section><h2>Who is responsible</h2><p>[PLACEHOLDER: legal name of the business or individual, and contact details]. Contact: {siteConfig.contactEmail || "[PLACEHOLDER: contact email]"}.</p></section>
      <section><h2>Information we collect</h2>
        <ul>
          <li>Details you enter in the contact form: name, email, company, website (optional), service interest, budget range, and project description.</li>
          <li>Basic technical data your browser sends when loading the site (such as IP address), used for security and rate limiting.</li>
          <li>If analytics is enabled: [PLACEHOLDER: confirm what the analytics provider collects and whether cookies are used].</li>
        </ul>
        <p>Please do not include sensitive personal information in the form.</p>
      </section>
      <section><h2>How we use it</h2><p>To respond to your inquiry, prepare quotes, and protect the site from spam and abuse. [PLACEHOLDER: confirm legal basis where required.]</p></section>
      <section><h2>Service providers</h2><p>Form submissions may be delivered through an email provider (for example Resend) and spam checks through a provider (for example Cloudflare Turnstile), if configured. The site is hosted by [PLACEHOLDER: hosting provider, e.g. Vercel]. [PLACEHOLDER: list providers actually used and any international transfers.]</p></section>
      <section><h2>Retention</h2><p>[PLACEHOLDER: how long inquiry emails are kept.]</p></section>
      <section><h2>Your rights</h2><p>Depending on where you live, you may be able to request access to, correction of, or deletion of your information. Contact us using the details above. [PLACEHOLDER: add jurisdiction-specific wording after review.]</p></section>
      <section><h2>Interactive demonstration</h2><p>The workflow demonstration on this site uses fictional sample data and runs in your browser. It does not send or store anything.</p></section>
    </LegalPage>
  );
}
