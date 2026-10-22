"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, ClipboardList, Database, FileInput, Play, RotateCcw, ShieldCheck } from "lucide-react";

const STEPS = [
  { icon: FileInput, title: "Quote request submitted", detail: "A fictional customer fills in the form." },
  { icon: ShieldCheck, title: "Request validated", detail: "Required fields and email format are checked." },
  { icon: Database, title: "Automation processes it", detail: "Categorized, checked for duplicates, routed." },
  { icon: ClipboardList, title: "Lead appears in sample CRM", detail: "A new row is added to the table." },
  { icon: Bell, title: "Notification preview", detail: "Shows what the team would be sent." },
  { icon: CheckCircle2, title: "Follow-up task created", detail: "A task with a due date is assigned." },
] as const;

const STEP_MS = 1300;

const sampleRows = [
  { name: "R. Okafor", job: "Boiler service", status: "Contacted" },
  { name: "D. Whitfield", job: "Roof inspection", status: "Quoted" },
];

export function WorkflowDemo() {
  // step = number of completed steps (0..6)
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    if (!running) return;
    if (step >= STEPS.length) {
      setRunning(false);
      return;
    }
    timer.current = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return clear;
  }, [running, step]);

  const run = useCallback(() => {
    clear();
    setStep(1);
    setRunning(true);
  }, []);

  const reset = useCallback(() => {
    clear();
    setRunning(false);
    setStep(0);
  }, []);

  const done = step >= STEPS.length;
  const current = step > 0 ? STEPS[Math.min(step, STEPS.length) - 1] : null;
  const status = current
    ? `Step ${Math.min(step, STEPS.length)} of ${STEPS.length}: ${current.title}${done ? ". Demo complete." : ""}`
    : "Demo ready. Press Run Demo to start.";

  return (
    <section id="demo" className="border-t border-line py-20 sm:py-28" aria-labelledby="demo-h">
      <div className="shell">
        <p className="eyebrow">See it work</p>
        <h2 id="demo-h" className="h-section mt-4 max-w-3xl">Follow one inquiry through the workflow.</h2>
        <p className="lede mt-5 max-w-2xl">
          This is an <strong className="font-medium text-bone">interactive demonstration using sample data</strong>. It runs in your browser only. No email is sent, no real person is contacted, and nothing is saved to a real CRM.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={run} disabled={running} className="btn-primary disabled:cursor-not-allowed disabled:opacity-50">
            <Play size={16} aria-hidden /> {done ? "Run Again" : "Run Demo"}
          </button>
          <button type="button" onClick={reset} disabled={step === 0} className="btn-ghost disabled:cursor-not-allowed disabled:opacity-40">
            <RotateCcw size={16} aria-hidden /> Reset Demo
          </button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">{status}</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <ol className="card divide-y divide-line" aria-label="Workflow steps">
            {STEPS.map((s, i) => {
              const state = i < step - 1 ? "done" : i === step - 1 ? (done ? "done" : "active") : "idle";
              const Icon = s.icon;
              return (
                <li key={s.title} className="flex gap-3.5 p-4" aria-current={state === "active" ? "step" : undefined}>
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      state === "done"
                        ? "border-accent/50 bg-accent/15 text-accent"
                        : state === "active"
                          ? "border-accent bg-accent text-ink-950"
                          : "border-line text-mist/60"
                    }`}
                  >
                    <Icon size={16} aria-hidden />
                  </span>
                  <div>
                    <p className={`text-sm font-medium ${state === "idle" ? "text-mist" : "text-bone"}`}>
                      {i + 1}. {s.title}
                      <span className="sr-only">{state === "done" ? " (complete)" : state === "active" ? " (in progress)" : " (pending)"}</span>
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-mist/80">{s.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="card min-h-[22rem] p-5 sm:p-6" aria-label="Demonstration output">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist/70">Sample data only</p>

            {step === 0 && (
              <p className="mt-6 text-sm text-mist">Press “Run Demo” to submit a fictional quote request and watch each stage.</p>
            )}

            <div className="mt-4 space-y-4">
              <AnimatePresence initial={false}>
                {step >= 1 && (
                  <Panel key="req" title="Quote request (fictional)">
                    <dl className="grid grid-cols-[6rem_1fr] gap-y-1 text-sm">
                      <dt className="text-mist">Name</dt><dd className="text-bone">Jordan Ellis</dd>
                      <dt className="text-mist">Email</dt><dd className="text-bone">jordan@example.com</dd>
                      <dt className="text-mist">Job</dt><dd className="text-bone">Furnace replacement quote</dd>
                    </dl>
                  </Panel>
                )}
                {step >= 2 && (
                  <Panel key="val" title="Validation">
                    <p className="text-sm text-bone">✓ Required fields present &nbsp;✓ Email format valid &nbsp;✓ Consent given</p>
                  </Panel>
                )}
                {step >= 3 && (
                  <Panel key="proc" title="Automation result">
                    <p className="text-sm text-bone">Category: HVAC – replacement &nbsp;·&nbsp; Duplicate check: none found &nbsp;·&nbsp; Route: Estimator</p>
                  </Panel>
                )}
                {step >= 4 && (
                  <Panel key="crm" title="Sample CRM">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[22rem] text-left text-sm">
                        <thead className="text-xs text-mist">
                          <tr><th className="py-1 font-medium">Name</th><th className="py-1 font-medium">Job</th><th className="py-1 font-medium">Status</th></tr>
                        </thead>
                        <tbody>
                          {sampleRows.map((r) => (
                            <tr key={r.name} className="border-t border-line text-mist">
                              <td className="py-1.5">{r.name}</td><td>{r.job}</td><td>{r.status}</td>
                            </tr>
                          ))}
                          <tr className="border-t border-accent/40 bg-accent/10 text-bone">
                            <td className="py-1.5">Jordan Ellis</td><td>Furnace replacement</td><td>New</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}
                {step >= 5 && (
                  <Panel key="note" title="Notification preview (not sent)">
                    <p className="text-sm text-bone">New lead: Jordan Ellis – Furnace replacement quote. Assigned to Estimator.</p>
                  </Panel>
                )}
                {step >= 6 && (
                  <Panel key="task" title="Follow-up task">
                    <p className="text-sm text-bone">☐ Call Jordan Ellis to confirm site visit &nbsp;·&nbsp; Due: next business day</p>
                  </Panel>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-lg border border-line bg-ink-900 p-4"
    >
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">{title}</p>
      {children}
    </motion.div>
  );
}
