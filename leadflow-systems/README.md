# LeadFlow Systems

A premium, responsive Next.js website for a specialist website and workflow automation studio serving small service businesses. Built with TypeScript, Tailwind CSS v4, React Three Fiber, Three.js, Framer Motion dependency support, and Lucide icons.

## Features

- Responsive single-page marketing site with service cards, process, pricing comparison, FAQs, and contact section.
- Lightweight React Three Fiber hero illustration with a CSS loading fallback and reduced-motion CSS support.
- Interactive client-side workflow simulation using fictional information. It never sends or stores demo data.
- Contact form with client-side required-field validation and server-side Zod validation.
- Optional server-side email delivery using Resend. If email is not configured, the API returns an explicit error and the page offers direct email fallback; it does not claim an inquiry was sent.
- SEO metadata, Open Graph basics, sitemap, robots configuration, and draft privacy/terms pages.
- Configurable business name, URL, email, booking URL, packages and social links in `lib/config.ts`.

## Requirements

- Node.js 20.9+ (recommended for Next.js 15)
- npm

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000. The site and demo work without external credentials. The online contact form requires the optional email configuration below.

## Contact form delivery (optional)

1. Create a Resend account and verify a sender/domain appropriate for your production setup.
2. Add these server-only environment variables to `.env.local` and Vercel Project Settings → Environment Variables:

```env
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=LeadFlow Systems <verified-sender@yourdomain.com>
CONTACT_TO_EMAIL=your-real-inbox@yourdomain.com
```

3. Set `NEXT_PUBLIC_CONTACT_EMAIL` to the real fallback email shown on the site. Set `NEXT_PUBLIC_SITE_URL` to the production canonical URL.
4. Test a real submission in the deployed environment and verify delivery. The form must not be considered production-ready until this is done.

Never prefix private credentials with `NEXT_PUBLIC_`, commit `.env.local`, or put secrets in client-side code.

## Booking and brand configuration

- Set `NEXT_PUBLIC_BOOKING_URL` to your real Calendly, Cal.com or other booking page. Until configured, CTAs direct visitors to the contact form.
- Update `lib/config.ts` to adjust service content, package scope, maintenance fees, social links and brand details.
- Replace the placeholder email and `https://example.com` before production.
- Replace or review `app/privacy/page.tsx` and `app/terms/page.tsx` for your actual business, jurisdictions and data practices. These are starter drafts, not legal advice.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## GitHub and Vercel

```bash
git init
git add .
git commit -m "Build LeadFlow Systems website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/leadflow-systems.git
git push -u origin main
```

Then import the repository in Vercel, use the Next.js preset and deploy. Add environment variables in Vercel before testing contact delivery. A GitHub push alone does not configure email or booking integrations.

## Launch checklist

- [ ] Replace placeholder email and canonical URL.
- [ ] Configure and test a real booking link or verify the contact fallback.
- [ ] Configure Resend and test the contact form from production, including error behavior.
- [ ] Review privacy and terms pages with the actual data flow and jurisdiction in mind.
- [ ] Verify package prices, scope and maintenance boundaries are commercially accurate.
- [ ] Test keyboard navigation, mobile layouts, reduced motion and a device without WebGL.
- [ ] Run lint, type-check and production build in the target Node/npm environment.
- [ ] Add domain, analytics (if desired), favicon/brand assets and monitoring as needed.

## Notes

The 3D hero is decorative and does not carry essential copy. A static fallback is present while the scene loads. The interactive workflow is explicitly a simulation and does not connect to CRM, email or real customer systems. No fake checkout, testimonials, customer logos, performance statistics or business-result guarantees are included.
