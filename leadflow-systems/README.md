# LeadFlow Systems — Agency Website

Next.js (App Router) · TypeScript (strict) · Tailwind CSS · React Three Fiber · Framer Motion · Zod.
A static-first marketing site with one server route (`/api/contact`). No database or always-on server is needed.

## 1. Required software
- Node.js 20 or newer (22 recommended) and npm
- Git, and a GitHub account
- A Vercel account (free tier is fine to start)

## 2. Install
```bash
npm install
```

## 3. Run locally
```bash
cp .env.example .env.local
npm run dev        # http://localhost:3000
```
Checks: `npm run lint`, `npm run typecheck`, `npm run build`.

## 4. Configure environment variables
Edit `.env.local` (locally) or Project Settings → Environment Variables (Vercel). Only `NEXT_PUBLIC_*` values reach the browser; everything else stays on the server.

| Variable | Purpose | Required? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, sitemap, Open Graph | Yes for production |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on site, used as fallback when form delivery fails | Recommended |
| `NEXT_PUBLIC_BOOKING_URL` | Cal.com/Calendly link for "Book a Discovery Call" | Optional |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL` | Footer social links | Optional |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables Plausible analytics | Optional |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form email delivery via Resend | Needed for the form to send |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile spam check | Optional |

Brand, packages, FAQ, and navigation live in `lib/site.ts`.

## 5. Test the form and the demo
- **Demo:** open the "Follow one inquiry" section, press *Run Demo*, then *Reset Demo*. It needs no keys and sends nothing.
- **Form, unconfigured:** submit a valid form. You should see a clear "not set up, message was not sent" error (never a false success), plus a mailto fallback if `NEXT_PUBLIC_CONTACT_EMAIL` is set.
- **Form, configured:** set the three Resend variables, verify your sender domain in Resend, submit, and confirm the email arrives with a Reply-To of the visitor.
- **Validation:** submit empty or invalid values; errors appear per field and focus moves to the first one.

## 6. Push to GitHub
```bash
git init && git add . && git commit -m "Initial LeadFlow Systems site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## 7. Deploy on Vercel
1. Vercel → Add New → Project → import the GitHub repo (framework: Next.js, auto-detected).
2. Add the environment variables above.
3. Deploy, then add your custom domain and update `NEXT_PUBLIC_SITE_URL`.

## 8. Integrations needing external credentials
Resend (email), Cloudflare Turnstile (spam check), Plausible (analytics), Cal.com/Calendly (booking).

## 9. Inactive until configured
- Contact form delivery (shows an honest error until Resend variables are set)
- "Book a Discovery Call" opens the on-page contact form until `NEXT_PUBLIC_BOOKING_URL` is set
- Turnstile and analytics are off by default

## Deployment checklist
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` all pass
- [ ] Environment variables set in Vercel; no secrets committed
- [ ] Resend sender domain verified; test submission received
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain
- [ ] Privacy Policy and Terms: every `[PLACEHOLDER]` completed and reviewed by a qualified professional
- [ ] Confirm pricing, maintenance limits, ownership and warranty terms match your written proposal template
- [ ] Add real contact email and booking link
- [ ] Test on a phone: mobile menu, demo, form
- [ ] Run Lighthouse on the live URL
- [ ] Add real case studies with client permission using `components/CaseStudy.tsx`

## Notes
- The in-memory rate limiter is best-effort on serverless. Enable Turnstile or a shared store (e.g. Upstash) for stronger protection.
- Fonts use system stacks (no external font requests). Swap in `next/font` if you want a custom typeface.
- `npm audit` reports a PostCSS advisory in Next's bundled build tooling. It affects build-time CSS processing, not runtime. Re-check after updating Next.
