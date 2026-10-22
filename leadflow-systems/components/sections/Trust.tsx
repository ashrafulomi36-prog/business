import { FileCheck2, KeyRound, ListChecks, Mail, Scale, PlayCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

const items = [
  { icon: ListChecks, title: "A clear delivery process", text: "Five defined stages, each with an agreed outcome, so you always know what happens next." },
  { icon: FileCheck2, title: "What you receive at handover", text: "The finished site and workflows, documentation of how they work, and a walkthrough of how to use them." },
  { icon: KeyRound, title: "Security and access", text: "Accounts stay in your name where possible. We request only the access we need, and secrets are never placed in website code." },
  { icon: Scale, title: "Honest pricing and scope", text: "Prices are published here. Anything outside a package is quoted separately and in writing." },
  { icon: Mail, title: "A real contact method", text: siteConfig.contactEmail ? `Email ${siteConfig.contactEmail} or use the form below.` : "Use the contact form below to reach us directly." },
  { icon: PlayCircle, title: "A demo you can try", text: "The workflow demonstration above shows how an inquiry moves through the system, using sample data." },
];

export function Trust() {
  return (
    <section id="about" className="border-t border-line py-20 sm:py-28" aria-labelledby="trust-h">
      <div className="shell">
        <p className="eyebrow">About and approach</p>
        <h2 id="trust-h" className="h-section mt-4 max-w-3xl">Trust is built by being specific.</h2>
        <p className="lede mt-5 max-w-2xl">
          {siteConfig.brand} is a small, productized studio. Rather than show logos or statistics, we explain exactly how we work. Real case studies will be added here as projects are completed with client permission.
        </p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-ink-900 p-7">
              <Icon size={20} className="text-accent" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-bone">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
