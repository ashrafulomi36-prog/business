import { z } from "zod";

export const serviceOptions = [
  "Website design and development",
  "Lead management automation",
  "AI-assisted workflows",
  "Maintenance and optimization",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500+",
  "Not sure yet",
] as const;

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => {
    if (!v) return true;
    try {
      const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
      return u.hostname.includes(".");
    } catch {
      return false;
    }
  }, "Enter a valid website address");

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(200),
  company: z.string().trim().min(2, "Enter your company name").max(150),
  website: optionalUrl,
  service: z.enum(serviceOptions, { errorMap: () => ({ message: "Choose a service" }) }),
  budget: z.enum(budgetOptions, { errorMap: () => ({ message: "Choose a budget range" }) }),
  message: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters")
    .max(3000, "Please keep the description under 3,000 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree so we can process your request" }),
  }),
  // Honeypot: real users never fill this in
  company_fax: z.string().max(200).optional(),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
