import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main id="main" className="shell max-w-3xl py-20">
      <Link href="/" className="text-sm text-accent underline underline-offset-4">← Back to {siteConfig.brand}</Link>
      <h1 className="h-section mt-6">{title}</h1>
      <div className="mt-4 rounded-lg border border-amber-300/40 bg-amber-300/10 p-4 text-sm text-amber-100">
        <strong>Template notice:</strong> This is a starting template, not legal advice. Items marked [PLACEHOLDER] must be completed, and the whole document should be reviewed by a qualified professional before launch. We make no claim of compliance with any specific law.
      </div>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-mist [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-bone [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}
