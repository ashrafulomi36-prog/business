import { Check, Globe, MessageSquareText, Inbox, Sparkles, ShieldCheck, Workflow } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import WorkflowSceneClient from "@/components/WorkflowSceneClient";
import { packages, services, siteConfig } from "@/lib/config";

const iconMap = { globe: Globe, workflow: Workflow, sparkles: Sparkles, "shield-check": ShieldCheck } as const;
const problems = [
  { icon: MessageSquareText, title: "Inquiries in too many places", text: "Website forms, inboxes and phone notes make it hard to see the full picture.", solution: "One list for every inquiry." },
  { icon: Inbox, title: "Slow or missed replies", text: "A lead that waits a day is often a lead that went elsewhere.", solution: "Instant confirmation and timed follow-up." },
];

export default function Home() {
  return (
    <>
      <header className="bar">
        <a href="#top" className="brand">{siteConfig.name}</a>
        <nav aria-label="Main"><a href="#services">Services</a><a href="#packages">Packages</a><a href="#contact" className="btn-sm">Get in touch</a></nav>
      </header>
      <main id="top">
        <section className="hero wrap">
          <div>
            <h1>{siteConfig.tagline}</h1>
            <p className="lead">{siteConfig.description}</p>
            <a href="#contact" className="btn">Book a free review</a>
          </div>
          <div className="scene-wrap"><WorkflowSceneClient /></div>
        </section>

        <section className="wrap problems">
          {problems.map((p) => (
            <article key={p.title}><p.icon aria-hidden size={22} /><h2>{p.title}</h2><p>{p.text}</p><strong>{p.solution}</strong></article>
          ))}
        </section>

        <section id="services" className="wrap">
          <h2 className="sec">What we build</h2>
          <div className="grid4">
            {services.map((s) => { const Icon = iconMap[s.icon]; return (
              <article key={s.title}><Icon aria-hidden size={22} /><h3>{s.title}</h3><p>{s.text}</p></article>
            ); })}
          </div>
        </section>

        <section id="packages" className="wrap">
          <h2 className="sec">Packages</h2>
          <div className="grid3">
            {packages.map((p) => (
              <article key={p.name} className={"featured" in p && p.featured ? "pkg featured" : "pkg"}>
                <h3>{p.name}</h3><p className="price">{p.price}</p><p>{p.text}</p>
                <ul>{p.items.map((i) => <li key={i}><Check aria-hidden size={16} />{i}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="wrap contact">
          <div><h2 className="sec">Tell us where inquiries get lost</h2><p className="lead">Describe how leads reach you today. We'll reply within one business day with what we'd change first.</p><p>Or email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p></div>
          <ContactForm />
        </section>
      </main>
      <footer className="wrap foot">© {new Date().getFullYear()} {siteConfig.name}</footer>
    </>
  );
}
