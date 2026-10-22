import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { WorkflowDemo } from "@/components/sections/WorkflowDemo";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Trust } from "@/components/sections/Trust";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const org = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.brand,
    url: siteConfig.url,
    description: siteConfig.description,
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org).replace(/</g, "\\u003c") }} />
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Services />
        <WorkflowDemo />
        <Process />
        <Pricing />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
