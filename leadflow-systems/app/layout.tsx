import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "LeadFlow Systems — Better Websites. Smarter Workflows.", template: "%s | LeadFlow Systems" },
  description: "Professional websites, lead management automation, and practical AI workflows for service businesses.",
  applicationName: "LeadFlow Systems",
  openGraph: { type: "website", siteName: siteConfig.name, title: "LeadFlow Systems — Better Websites. Smarter Workflows.", description: "Websites and practical automation for service businesses.", url: siteConfig.url },
  twitter: { card: "summary_large_image", title: "LeadFlow Systems", description: "Better websites. Smarter workflows. Fewer manual steps." },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#080b12", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
