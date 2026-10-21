export const siteConfig = {
  name: "LeadFlow Systems",
  tagline: "Better websites. Smarter workflows. Fewer manual steps.",
  description: "Professional websites and practical workflow automation for service businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  socialLinks: { linkedin: "", instagram: "" },
};

export const packages = [
  {
    name: "Starter Website", price: "$350", cadence: "one-time", maintenance: "$49/month",
    description: "A professional starting point for a service business that needs a clearer online presence.",
    features: ["One responsive landing page", "One inquiry form", "One basic email-notification workflow", "One standard integration", "Basic on-page SEO", "One revision round", "Testing and handover"],
    slug: "starter", recommended: false,
  },
  {
    name: "LeadFlow Growth", price: "$850", cadence: "one-time", maintenance: "$149/month",
    description: "A connected website and lead process for teams ready to organize incoming inquiries.",
    features: ["Up to five standard pages", "Lead capture + CRM/database integration", "Email notifications", "Follow-up task automation", "Basic logging and error handling", "Analytics setup when configured", "Two revision rounds", "Testing and documentation"],
    slug: "growth", recommended: true,
  },
  {
    name: "AI Workflow Pro", price: "From $1,500", cadence: "one-time", maintenance: "$249/month",
    description: "A scoped AI-assisted workflow integrated with your existing tools and review process.",
    features: ["Custom website or existing-site integration", "Up to three agreed workflows", "Appropriate API and CRM integrations", "One scoped AI-assisted workflow", "Human review for consequential AI actions", "Error alerts and documentation", "Testing, training and handover"],
    slug: "pro", recommended: false,
  },
];

export const services = [
  { number: "01", title: "Website development", description: "A fast, clear website that explains your services and gives customers a straightforward way to request a quote.", bullets: ["Responsive landing and multi-page sites", "Quote and contact forms", "Technical SEO fundamentals", "Analytics integration when configured"], icon: "globe" },
  { number: "02", title: "Lead management automation", description: "Connect inquiry forms to the tools your team already uses, with useful notifications and next steps.", bullets: ["Form-to-CRM integration", "Lead notifications and routing", "Data validation and follow-up reminders", "Logging and error alerts"], icon: "workflow" },
  { number: "03", title: "AI workflow integration", description: "Use AI for bounded administrative tasks, with sensible checks and human review where it matters.", bullets: ["Inquiry classification", "Structured data extraction", "Draft responses and summaries", "Human approval for consequential actions"], icon: "sparkles" },
  { number: "04", title: "Maintenance & support", description: "Keep the agreed parts of your site and workflows in good order with defined support boundaries.", bullets: ["Defined website updates", "Workflow health checks", "Troubleshooting and limited content edits", "Monthly service reporting"], icon: "shield-check" },
];
