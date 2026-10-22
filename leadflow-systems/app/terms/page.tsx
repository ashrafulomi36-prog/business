import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <LegalPage title="Terms of Service">
      <p>Last updated: [PLACEHOLDER: date]. These terms cover use of this website. Paid projects are governed by a separate written proposal or agreement.</p>
      <section><h2>About this site</h2><p>This website is operated by [PLACEHOLDER: legal name and jurisdiction] under the name {siteConfig.brand}.</p></section>
      <section><h2>Information only</h2><p>Content on this site is general information. Listed prices are starting prices; final scope and price are confirmed in a written proposal. Nothing here is a guarantee of results, leads, revenue, or uptime.</p></section>
      <section><h2>Projects and payment</h2><p>[PLACEHOLDER: payment terms, deposits, revision limits, warranty period, ownership and licensing, third-party costs, and cancellation. These must be set out in your client agreement.]</p></section>
      <section><h2>Acceptable use</h2><p>Do not misuse the site, attempt to disrupt it, or submit unlawful or harmful content through the contact form.</p></section>
      <section><h2>Liability</h2><p>[PLACEHOLDER: limitation of liability wording, to be reviewed by a qualified professional for your jurisdiction.]</p></section>
      <section><h2>Changes</h2><p>We may update these terms. The date above shows the latest revision.</p></section>
    </LegalPage>
  );
}
