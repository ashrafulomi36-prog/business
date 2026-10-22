import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";

export function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="faq" className="border-t border-line py-20 sm:py-28" aria-labelledby="faq-h">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-h" className="h-section mt-4">Straight answers.</h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-medium text-bone [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={18} className="mt-1 shrink-0 text-accent transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
