const steps = [
  ["Discovery and workflow audit", "We learn how inquiries currently arrive and what happens next."],
  ["Scope, deliverables, and proposal", "You receive a written scope, price, and the deliverables for approval."],
  ["Design and implementation", "We build the site and workflows and share progress for feedback."],
  ["Testing and deployment", "We test forms and automations end to end before going live."],
  ["Handover and ongoing support", "You get documentation and access, with optional maintenance."],
];

export function Process() {
  return (
    <section id="process" className="border-t border-line py-20 sm:py-28" aria-labelledby="process-h">
      <div className="shell">
        <p className="eyebrow">Process</p>
        <h2 id="process-h" className="h-section mt-4 max-w-3xl">A straightforward path from first call to handover.</h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-ink-900 p-6">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-base font-semibold text-bone">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist">
          Delivery timelines depend on scope, client feedback, and third-party integrations. We give an estimate in the proposal and flag changes early.
        </p>
      </div>
    </section>
  );
}
