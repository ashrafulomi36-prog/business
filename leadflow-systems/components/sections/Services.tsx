import { Globe, Workflow, Sparkles, Wrench, Check } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design and Development",
    items: [
      "Responsive landing pages and business websites",
      "Service and contact pages",
      "Quote-request or inquiry forms",
      "Clear calls to action",
      "Basic technical SEO",
      "Analytics integration when configured",
    ],
  },
  {
    icon: Workflow,
    title: "Lead Management Automation",
    items: [
      "Form-to-CRM or form-to-database integrations",
      "Lead notifications",
      "Lead categorization and routing",
      "Follow-up task creation",
      "Duplicate prevention and error handling",
      "Workflow documentation",
    ],
  },
  {
    icon: Sparkles,
    title: "AI-Assisted Workflows",
    items: [
      "AI-assisted classification of incoming inquiries",
      "Structured information extraction",
      "Draft responses for human approval",
      "Summaries and internal workflow assistance",
      "Optional integration with compatible language-model APIs",
    ],
    note: "We use AI only where it offers a practical benefit. AI output can be wrong, so a person reviews anything consequential.",
  },
  {
    icon: Wrench,
    title: "Maintenance and Optimization",
    items: [
      "Monitoring and troubleshooting within the agreed scope",
      "Minor website updates",
      "Workflow health checks",
      "Dependency and configuration checks",
      "Monthly service summaries",
      "Optional improvements under a separately agreed scope",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-line py-20 sm:py-28" aria-labelledby="services-h">
      <div className="shell">
        <p className="eyebrow">Services</p>
        <h2 id="services-h" className="h-section mt-4 max-w-3xl">Four services, each with a clear deliverable.</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map(({ icon: Icon, title, items, note }, i) => (
            <article
              key={title}
              className="card group p-7 transition-colors duration-300 hover:border-accent/40 hover:bg-ink-700/60"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-ink-900 text-accent">
                  <Icon size={19} aria-hidden />
                </span>
                <span className="font-mono text-xs text-mist/70">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-bone">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                    <Check size={15} className="mt-1 shrink-0 text-accent/80" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
              {note && <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-mist/90">{note}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
