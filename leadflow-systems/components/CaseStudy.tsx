export type CaseStudyProps = {
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  /** Only include measured results the client has agreed to publish. */
  results?: string[];
};

/** Reusable case-study card. Populate only with real, client-approved projects. */
export function CaseStudy({ client, industry, challenge, solution, deliverables, results }: CaseStudyProps) {
  return (
    <article className="card p-7">
      <p className="eyebrow">{industry}</p>
      <h3 className="mt-2 text-xl font-semibold text-bone">{client}</h3>
      <dl className="mt-5 space-y-4 text-sm leading-relaxed">
        <div><dt className="font-medium text-bone">Challenge</dt><dd className="mt-1 text-mist">{challenge}</dd></div>
        <div><dt className="font-medium text-bone">Solution</dt><dd className="mt-1 text-mist">{solution}</dd></div>
        <div>
          <dt className="font-medium text-bone">Delivered</dt>
          <dd className="mt-1"><ul className="list-disc space-y-1 pl-5 text-mist">{deliverables.map((d) => <li key={d}>{d}</li>)}</ul></dd>
        </div>
        {results && results.length > 0 && (
          <div><dt className="font-medium text-bone">Results</dt>
            <dd className="mt-1"><ul className="list-disc space-y-1 pl-5 text-mist">{results.map((r) => <li key={r}>{r}</li>)}</ul></dd>
          </div>
        )}
      </dl>
    </article>
  );
}
