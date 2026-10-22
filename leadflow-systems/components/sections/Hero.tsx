import { ArrowRight } from "lucide-react";
import { BookingLink } from "@/components/ui/BookingLink";
import { HeroVisual } from "@/components/three/HeroVisual";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="grid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative grid items-center gap-10 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
        <div>
          <p className="eyebrow">{siteConfig.tagline}</p>
          <h1 className="h-display mt-5">Turn More Inquiries Into Organized Opportunities.</h1>
          <p className="lede mt-6 max-w-xl">{siteConfig.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingLink className="btn-primary">
              Book a Discovery Call <ArrowRight size={16} aria-hidden />
            </BookingLink>
            <a href="#services" className="btn-ghost">
              Explore Our Services
            </a>
          </div>
          <p className="mt-6 text-sm text-mist">Transparent starting prices. No lock-in. Clear scope in writing.</p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
