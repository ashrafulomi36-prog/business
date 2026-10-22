import { Check } from "lucide-react";
import { packages } from "@/lib/site";

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line py-20 sm:py-28" aria-labelledby="pricing-h">
      <div className="shell">
        <p className="eyebrow">Pricing</p>
        <h2 id="pricing-h" className="h-section mt-4 max-w-3xl">Clear starting prices, in US dollars.</h2>
        <p className="lede mt-5 max-w-2xl">
          These are proposed starting prices. We confirm scope and the final price in a written proposal before any work begins.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.id}
              id={`package-${p.id}`}
              className={`card relative flex flex-col p-7 ${p.recommended ? "border-accent/60 bg-ink-700/70" : ""}`}
            >
              {p.recommended && (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink-950">
                  Recommended
                </span>
              )}
              <h3 className="text-lg font-semibold text-bone">{p.name}</h3>
              <p className="mt-1 text-sm text-mist">{p.summary}</p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl tracking-tight text-bone">{p.price}</span>
                <span className="text-sm text-mist">{p.priceNote}</span>
              </p>
              <p className="mt-1 text-sm text-mist">Optional maintenance: {p.maintenance}</p>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                    <Check size={15} className="mt-1 shrink-0 text-accent" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-package={p.name}
                className={`${p.recommended ? "btn-primary" : "btn-ghost"} mt-8 w-full`}
              >
                Request a quote
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="card p-7">
            <h3 className="text-base font-semibold text-bone">Needs beyond these packages</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Advanced integrations, complex CRM migrations, custom AI applications, extensive data processing, and additional pages or workflows require a separate quotation.
            </p>
          </div>
          <div className="card p-7">
            <h3 className="text-base font-semibold text-bone">What maintenance means</h3>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-mist">
              <li>Optional unless a written proposal says otherwise.</li>
              <li>Covers only the stated service scope. It is not unlimited development or unlimited support.</li>
              <li>Third-party software, hosting, domains, messaging charges, and AI API usage are separate unless a signed proposal includes them.</li>
              <li>It does not guarantee uptime or business outcomes.</li>
              <li>Your proposal states the exact support limits, such as hours and response times.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
