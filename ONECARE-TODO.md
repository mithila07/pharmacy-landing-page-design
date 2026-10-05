# One Care Pharmacy — content still needed

The One Care Pharmacy site (`/onecare`) is built, but some facts were never supplied. For the demo, each one is filled with a realistic dummy value (see section 0). Nearly all of them live in one file, [`src/app/data/onecare.ts`](src/app/data/onecare.ts). Fill in a value there and it updates everywhere it appears: header, hero card, branch cards, footer and JSON-LD.

Dummy values behave like real ones: the Low Fell phone and email links are clickable, and the dummy hours drive the live open/closed status. Swap every row in section 0 before the site goes live.

## 0. Dummy details currently live on the site (replace before launch)

The site no longer shows `[REPLACE]` placeholders. These stand-in values are filled in instead. Each one is marked `// DUMMY` in [`src/app/data/onecare.ts`](src/app/data/onecare.ts) unless noted otherwise.

| Where | Dummy value | Notes |
|---|---|---|
| Company number | 13895214 | Footer legal line |
| Registered office | 13 Bewick Road, Gateshead NE8 4DP | Footer legal line |
| Superintendent GPhC no. | 2087514 | Footer, About page |
| Website domain | onecarepharmacy.co.uk | Inferred from the branch email |
| Bewick Road hours | Mon to Fri 09:00 to 18:00, Sat 09:00 to 13:00, Sun closed | Drives the live "Open now" status |
| Bank holidays (both) | Closed 25 Dec, 26 Dec, 1 Jan | |
| Bewick Road facilities | Consultation room, step-free access, on-street parking | Also in the FAQ |
| Bewick Road landmark | "In Bensham, a short walk from Saltwell Park" | |
| Bewick Road ODS code | FQ146 | Not shown on the page |
| **Branch 2, all of it** | One Care Pharmacy, Low Fell. 248 Durham Road, Low Fell, Gateshead NE9 5AE. 0191 498 0612, lf@onecarepharmacy.co.uk, GPhC 1041207, ODS FW382. Mon to Fri 09:00 to 13:00 and 13:30 to 17:30, weekends closed. Consultation room, step-free, rear parking | Marked `demo: true`. It's left out of search-engine data, and its GPhC link goes to the register search, not a specific pharmacy. The phone number is from Ofcom's drama range, so it can never ring a real line |
| Prices and durations | Weight loss clinic from £25 (20 min), ear wax removal from £45 (30 min) | |
| FAQ answers | Walk-in policy, consultation rooms, parking and step-free access | `OC_FAQS` |
| Area wording | "Bensham and Low Fell, Gateshead" in the footer, "Gateshead & Low Fell" in page titles (`seoArea` in `branding.ts`) | |
| About page | "Our story" paragraph, and Munir's one-line introduction. A 3D illustration stands in for his photo | `AboutPageOneCare.tsx` |
| Accessibility statement | Testing claims and "last reviewed October 2026" | `AccessibilityPageOneCare.tsx`. Make sure the claims are true before launch |
| Contact form | Promises a reply "within two working days" | The form still doesn't send. Without `OC_CONTACT_ENDPOINT` it asks people to phone |

## 1. Company and legal (`OC_LEGAL`)

- [ ] Company number (Greenleafe BR Retail Limited)
- [ ] Registered office address
- [x] Superintendent pharmacist: full name (Munir Nazrul)
- [ ] Superintendent pharmacist: GPhC registration number
- [ ] Website domain. Used for the canonical URL and the JSON-LD `url`. The email suggests onecarepharmacy.co.uk; confirm before using it
- [ ] Privacy notice, cookie policy, complaints (including NHS complaints) and terms. The footer links point to `#` for now
- [ ] Accessibility statement: known issues, date last reviewed, and how to ask for another format, plus a contact email or phone (`src/app/pages/AccessibilityPageOneCare.tsx`)
- [ ] Contact form: an endpoint to receive messages (`OC_CONTACT_ENDPOINT`) and the reply time to promise. Until the endpoint is set, the form validates but tells people to phone instead of sending

## 2. Bewick Road branch (One Care Pharmacy, 13 Bewick Road, Gateshead NE8 4DP · GPhC 1037448 · 0191 477 4456 · br@onecarepharmacy.co.uk)

- [x] Phone number (0191 477 4456)
- [x] Email address (br@onecarepharmacy.co.uk)
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
- [ ] Travel clinic: confirm which of these each branch offers: hepatitis A and B, typhoid, cholera, rabies, meningitis ACWY, Japanese encephalitis, tick-borne encephalitis, malaria prevention, altitude sickness. **Yellow fever is left off on purpose**, because only designated yellow fever centres can give it. Add it only if One Care is one
- [ ] Vaccinations and everyday treatments: confirm the list (flu, chickenpox, shingles, HPV, meningitis B; hay fever, cystitis, acid reflux, cold sores, migraine, fungal nail, threadworm, period delay, vitamin B12) and set prices
- [ ] Blood tests were **left out on purpose**: the booking system has no blood-test service yet. Add one if One Care offers it
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
- [ ] About page: the "Our story" paragraph (how One Care started, who runs it, how long it has served Gateshead)
- [ ] About page: the superintendent's photo, and a short introduction in their own words
- [ ] Hero video, weight loss photo and travel clinic photo are **AI-generated** (Higgsfield) to show the layout. The people aren't One Care staff or patients. Replace them with real footage and photos before launch, or have them approved as illustrative
- [ ] 3D icons (`src/assets/onecare/icons3d/*.webp`, 37 files) are AI-generated for One Care (Higgsfield, GPT Image 2.5, transparent background), using the stethoscope as the style reference. To add one in the same style, reuse this prompt and change the subject: "A single 3D icon in the same style as the reference image (Airbnb 2025 app icon style): soft, tactile, slightly stylised rendered object with rounded, chunky proportions and realistic but simplified materials. Gentle studio lighting from the top left, very subtle soft contact shadow. Natural object colours with deep teal #2E7A75 and mint #5BBDB8 accents. Three-quarter view, centred, fully transparent background. No text, no logos, no faces. Subject: ..." Interface icons (buttons, footer, contact details) are Phosphor, duotone weight
- [ ] Photography: every photo on the site is a stand-in shared with other demo sites. Replace them with One Care's own photos (both shopfronts, the team, the consultation rooms, and a photo for each service). They're mapped in `OC_IMAGES` and on each service in `src/app/data/onecare.ts`
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
