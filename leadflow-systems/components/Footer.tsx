import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-12">
      <div className="shell flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-semibold text-bone">{siteConfig.brand}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mist">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm sm:grid-cols-3">
          <Link href="/#services" className="text-mist hover:text-bone">Services</Link>
          <Link href="/#pricing" className="text-mist hover:text-bone">Pricing</Link>
          <Link href="/#contact" className="text-mist hover:text-bone">Contact</Link>
          <Link href="/privacy" className="text-mist hover:text-bone">Privacy Policy</Link>
          <Link href="/terms" className="text-mist hover:text-bone">Terms of Service</Link>
          {siteConfig.social.linkedin && <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-bone">LinkedIn</a>}
          {siteConfig.social.github && <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-bone">GitHub</a>}
        </nav>
      </div>
      <div className="shell mt-10 border-t border-line pt-6 text-xs text-mist/80">
        © {year} {siteConfig.brand}. All rights reserved.
      </div>
    </footer>
  );
}
