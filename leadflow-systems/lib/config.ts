export const siteConfig = {
  name: "LeadFlow Systems",
  tagline: "Every inquiry in one place, answered the same day.",
  description:
    "We build lead capture and follow-up systems for service businesses, so no inquiry gets lost between the website, the inbox and the phone.",
  email: "hello@leadflow.systems",
};

export const services = [
  { icon: "globe", title: "Websites that capture", text: "Fast, clear sites with forms that send every inquiry straight into your pipeline." },
  { icon: "workflow", title: "Automated follow-up", text: "Replies, reminders and hand-offs run on their own, so leads hear back within minutes." },
  { icon: "sparkles", title: "AI-assisted replies", text: "Drafts first answers and sorts inquiries by intent. You approve what goes out." },
  { icon: "shield-check", title: "Reliable and private", text: "Monitored workflows and clean data handling, with alerts if anything stops." },
] as const;

export const packages = [
  { name: "Launch", price: "From $900", text: "One site, one capture flow, one inbox.", items: ["Up to 5 pages", "Inquiry form with instant confirmation", "Email notifications"] },
  { name: "Pipeline", price: "From $2,400", text: "Everything in Launch, plus a working follow-up system.", items: ["Central lead list", "Automated follow-up sequences", "Weekly lead report"], featured: true },
  { name: "Managed", price: "From $400/mo", text: "We run and improve the system for you.", items: ["Monitoring and fixes", "Monthly workflow tuning", "Priority support"] },
];
