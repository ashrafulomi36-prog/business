import { ArrowRight } from "lucide-react";

const problems = [
  ["Inquiries scattered across channels", "Forms, emails, calls, and messages land in different places, so some are seen late."],
  ["Lead details copied by hand", "Someone retypes names and job details into a spreadsheet or CRM, and typos creep in."],
  ["Follow-ups that depend on memory", "A busy week means a quote request sits unanswered. Nobody meant to ignore it."],
  ["Disconnected tools", "The form, the spreadsheet, and the CRM do not talk to each other."],
  ["Repetitive admin", "The same small tasks, repeated every day, take time from skilled people."],
];

const fixes = [
  "One inquiry form that sends details to a single, organized place",
  "Automatic notifications so the right person sees each new lead",
  "Follow-up tasks created for you, with a visible due date",
  "Checks for duplicates and clear alerts when something fails",
  "Documentation, so you always know how it works",
];

export function Problem() {
  return (
    <section className="border-t border-line py-20 sm:py-28" aria-labelledby="problem-h">
      <div className="shell">
        <p className="eyebrow">The everyday friction</p>
        <h2 id="problem-h" className="h-section mt-4 max-w-3xl">
          Good businesses lose track of good leads for ordinary reasons.
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <ul className="divide-y divide-line border-y border-line">
            {problems.map(([t, d]) => (
              <li key={t} className="py-5">
                <h3 className="text-base font-semibold text-bone">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-mist">{d}</p>
              </li>
            ))}
          </ul>
          <div className="card p-7 sm:p-9">
            <p className="eyebrow">How we help</p>
            <p className="mt-3 text-lg text-bone">
              We connect the steps between “a customer reached out” and “someone is handling it”.
            </p>
            <ul className="mt-6 space-y-3">
              {fixes.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed text-mist">
                  <ArrowRight size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
