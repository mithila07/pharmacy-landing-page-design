# OneCare Pharmacy — content still needed

The OneCare site (`/onecare`) is built, but some facts were never supplied. Rather than guess, the site shows each one as a visible `[REPLACE]` chip. Nearly all of them live in one file, [`src/app/data/onecare.ts`](src/app/data/onecare.ts). Fill in a value there and it updates everywhere it appears: header, hero card, branch cards, footer and JSON-LD.

Phone links, map links and the GPhC badge link only start working once their value is real. Until then they render as plain, non-clickable text.

## 1. Company and legal (`OC_LEGAL`)

- [ ] Company number (Greenleafe BR Retail Limited)
- [ ] Registered office address
- [ ] Superintendent pharmacist: full name
- [ ] Superintendent pharmacist: GPhC registration number
- [ ] Website domain. Used for the canonical URL and the JSON-LD `url`
- [ ] Privacy notice, cookie policy, complaints (including NHS complaints) and terms. The footer links point to `#` for now
- [ ] Accessibility statement: known issues, date last reviewed, and how to ask for another format, plus a contact email or phone (`src/app/pages/AccessibilityPageOneCare.tsx`)
- [ ] Contact form: an endpoint to receive messages (`OC_CONTACT_ENDPOINT`) and the reply time to promise. Until the endpoint is set, the form validates but tells people to phone instead of sending

## 2. Bewick Road branch (13–15 Bewick Road, Gateshead, NE8 4DP · GPhC 1037448)

- [ ] Phone number
- [ ] Email address
- [ ] Opening hours for each day, including lunch closures and Sunday
- [ ] Bank holiday and seasonal exceptions
- [ ] Landmark or transport note (e.g. nearest bus stop or parking)
- [ ] Facilities: parking, step-free access, private consultation room
- [ ] NHS ODS code (for structured data; no longer shown on the page)
- [ ] Map coordinates (lat/lng). Optional: they enable "nearest branch" sorting in the booking flow
- [ ] Check the Google Maps link, currently built from an address search
- [ ] Replace the placeholder GPhC badge image (`src/assets/gphc-logo.png`) with this branch's own badge, and check the register link

## 3. Branch 2 — everything is still unknown

- [ ] Branch name (short name, e.g. the street)
- [ ] Full address: street, town, postcode
- [ ] Town or area. Also used in the hero eyebrow, SEO title, footer blurb and `seoArea` in `branding.ts`
- [ ] GPhC premises registration number and badge image
- [ ] Phone, email
- [ ] Opening hours, lunch closures, exceptions
- [ ] Landmark or transport note, facilities
- [ ] NHS ODS code
- [ ] Google Maps URL and coordinates

## 4. Services and prices (`OC_SERVICES`)

- [ ] Confirm the service list, and which branch offers each service. Every service is currently marked as offered at both branches
- [ ] Appointment length for each service (shown as `[REPLACE] min`)
- [ ] "From" price for each private service (shown as `£[REPLACE]`)
- [ ] Travel clinic: confirm which of these each branch offers: hepatitis A and B, typhoid, cholera, rabies, meningitis ACWY, Japanese encephalitis, tick-borne encephalitis, malaria prevention, altitude sickness. **Yellow fever is left off on purpose**, because only designated yellow fever centres can give it. Add it only if OneCare is one
- [ ] Vaccinations and everyday treatments: confirm the list (flu, chickenpox, shingles, HPV, meningitis B; hay fever, cystitis, acid reflux, cold sores, migraine, fungal nail, threadworm, period delay, vitamin B12) and set prices
- [ ] Blood tests were **left out on purpose**: the booking system has no blood-test service yet. Add one if OneCare offers it
- [ ] **Compliance check, Vitamin B12:** B12 injections are prescription-only, so the site calls it a "Vitamin B12 service" and doesn't advertise the injection. The superintendent should approve this wording
- [ ] Ear wax removal: confirm the method (e.g. microsuction) before naming it on the site
- [ ] Walk-in policy for each branch (FAQ)
- [ ] Delivery: is it available? (not mentioned on the site until confirmed)

## 5. NHS Pharmacy First

- [ ] Superintendent to check the eligibility wording for all 7 conditions
- [ ] Superintendent to approve the safety-netting callout ("Very unwell? Call 999. For urgent advice, call NHS 111.")
- [ ] Clinical review line under NHS services: the reviewer's name and the review date
- [ ] Confirm permission to use the NHS logo. For now the site uses a plain "NHS" text tag, not the NHS logo

## 6. Copy and imagery

- [ ] Approve the hero headline: "Your local pharmacy, twice over."
- [ ] Trust-row claim (e.g. years serving Gateshead)
- [ ] About page: the "Our story" paragraph (how OneCare started, who runs it, how long it has served Gateshead)
- [ ] About page: the superintendent's photo, and a short introduction in their own words
- [ ] Hero video, weight loss photo and travel clinic photo are **AI-generated** (Higgsfield) to show the layout. The people aren't OneCare staff or patients. Replace them with real footage and photos before launch, or have them approved as illustrative
- [ ] Photography: every photo on the site is a stand-in shared with other demo sites. Replace them with OneCare's own photos (both shopfronts, the team, the consultation rooms, and a photo for each service). They're mapped in `OC_IMAGES` and on each service in `src/app/data/onecare.ts`
- [ ] Answers to the FAQs that still show `[REPLACE]`
- [ ] Open Graph share image (`/og-onecare.jpg`, 1200×630)
- [ ] Reviews section: hidden on purpose. Add it only with real, verifiable reviews. Never add star ratings or an `AggregateRating`

## 7. Booking

- [ ] Confirm the booking URLs and service IDs on the booking platform for each branch. The "Book" buttons currently open the shared in-app flow at `/onecare/book/<serviceId>`
- [ ] Confirm the attribution wording for the booking platform, if any is required

## Checks to run once the content is in

- [ ] Open-now logic: `npx esbuild scripts/onecare-open-now.test.ts --bundle --platform=node --format=esm --loader:.jpeg=empty --loader:.jpg=empty --loader:.png=empty --loader:.svg=empty --loader:.ico=empty --outfile=<tmp>.mjs && node <tmp>.mjs`. Add test cases if real hours include unusual patterns
- [ ] Search the codebase for `[REPLACE` and confirm no matches are left
- [ ] Check at 320 / 390 / 768 / 1024 / 1440 px and at 200% zoom
