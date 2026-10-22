export type Package = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  maintenance: string;
  recommended?: boolean;
  summary: string;
  features: string[];
};

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

export const siteConfig = {
  brand: "LeadFlow Systems",
  tagline: "Websites. Workflow Automation. AI Integration.",
  description:
    "We build conversion-focused websites and practical automations that help service businesses capture leads, organize customer inquiries, and follow up more consistently.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEmail,
  bookingUrl,
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
  },
  analytics: { plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "" },
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
} as const;

/** Booking link if configured, otherwise the on-page contact form. Never an invented URL. */
export const bookingHref = bookingUrl || "#contact";
export const bookingIsExternal = Boolean(bookingUrl);

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
] as const;

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter Website",
    price: "$350",
    priceNote: "one-time",
    maintenance: "$49/month",
    summary: "A focused landing page with one working inquiry flow.",
    features: [
      "One responsive landing page",
      "One lead or inquiry form",
      "One basic email-notification workflow",
      "One standard integration",
      "Basic on-page SEO",
      "One revision round",
      "Testing and handover",
    ],
  },
  {
    id: "growth",
    name: "LeadFlow Growth",
    price: "$850",
    priceNote: "one-time",
    maintenance: "$149/month",
    recommended: true,
    summary: "A small business site with a complete lead capture workflow.",
    features: [
      "Up to five standard website pages",
      "A lead capture workflow",
      "One CRM or database integration",
      "Email notifications",
      "Follow-up task automation",
      "Basic error handling and logging",
      "Analytics setup when credentials are provided",
      "Two revision rounds",
      "Testing and documentation",
    ],
  },
  {
    id: "pro",
    name: "AI Workflow Pro",
    price: "From $1,500",
    priceNote: "one-time, starting price",
    maintenance: "$249/month",
    summary: "Multiple workflows plus one clearly scoped AI-assisted process.",
    features: [
      "A custom website or existing-site integration",
      "Up to three agreed automation workflows",
      "Appropriate CRM and API integrations",
      "One clearly scoped AI-assisted workflow",
      "Human approval for consequential AI-generated actions",
      "Error alerts and workflow documentation",
      "Testing, handover, and agreed training",
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What types of businesses do you work with?",
    a: "Mainly small and medium-sized home-service companies in the US and UK, such as HVAC contractors, plumbers, electricians, and roofers. Any appointment- or quote-based business that handles inquiries by form, email, or phone may be a fit.",
  },
  {
    q: "What is included in a website project?",
    a: "It depends on the package: responsive pages, inquiry or quote forms, clear calls to action, basic technical SEO, and analytics integration when you provide the credentials. Each package lists its exact deliverables, and the proposal confirms them in writing.",
  },
  {
    q: "What does automation actually do?",
    a: "It handles repetitive steps between a customer submitting an inquiry and your team acting on it: saving the lead to your CRM or database, sending a notification, categorizing it, and creating a follow-up task. It does not replace your judgement or your customer conversations.",
  },
  {
    q: "Do I need an existing CRM?",
    a: "No. If you do not have one, we can store leads in a simple database or spreadsheet-style tool and discuss whether a CRM makes sense later. If you already use one, we will check that it offers a suitable integration.",
  },
  {
    q: "Can you work with my existing website?",
    a: "Often, yes. Depending on how your site is built, we can add forms and workflows to it or build a new site. We review it during discovery before agreeing a scope. Some site builders limit what can be integrated.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines depend on scope, how quickly feedback arrives, and third-party integrations. We give an estimate in the proposal and tell you early if something is likely to change it.",
  },
  {
    q: "Are AI API costs included?",
    a: "No, unless a signed proposal explicitly says so. Language-model usage is billed by the provider, usually by volume. We help you estimate it and use your own account so the costs stay transparent.",
  },
  {
    q: "What does monthly maintenance cover?",
    a: "Monitoring and troubleshooting within the agreed scope, minor website updates, workflow health checks, dependency and configuration checks, and a monthly summary. It is not unlimited development, and it does not guarantee uptime or business outcomes. Exact support limits are stated in your proposal.",
  },
  {
    q: "What is the difference between a one-time setup fee and monthly maintenance?",
    a: "The setup fee pays for designing, building, testing, and handing over the project. Maintenance is optional ongoing support that keeps things running and up to date after launch. You can decline maintenance unless a written proposal says it is required.",
  },
  {
    q: "Who owns the website and source code?",
    a: "Ownership terms are written into your proposal. Our intent is that you own your website content and the deliverables you pay for, with accounts and credentials held in your name. Confirm the exact terms before signing.",
  },
  {
    q: "Do you guarantee more leads or sales?",
    a: "No. We build tools that help you capture and follow up on the inquiries you receive. Results depend on your market, pricing, reputation, and many things outside our control.",
  },
  {
    q: "What happens if a workflow fails?",
    a: "We build in error handling and, where scoped, alerts and logging, so failures are visible rather than silent. Fixes for issues within the agreed scope are handled under the delivery warranty period or maintenance plan stated in your proposal.",
  },
  {
    q: "Can I request a custom quotation?",
    a: "Yes. Advanced integrations, complex CRM migrations, custom AI applications, extensive data processing, and additional pages or workflows are quoted separately. Use the quote request form and describe what you need.",
  },
];
