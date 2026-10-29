# Shivakem Pharmacy: what's still needed before launch

Site: `/shivakem` (home), `/shivakem/about`, `/shivakem/contact`, plus the shared booking flow at `/shivakem/book/<serviceId>`.
Data lives in `src/app/data/shivakem.ts`. Anything marked `// DUMMY` or showing `[REPLACE…]` on the page needs a real value.

## Confirmed by the pharmacy
- Name, phone (020 8904 1514), address (12a Court Parade, Wembley, Middlesex HA0 3HU), GPhC premises number 1035195

## Still needed
- [ ] Opening hours, including bank holidays (**DUMMY**: Mon to Fri 09:00 to 18:30, Sat 09:00 to 17:00)
- [ ] Email address (`email` on `SK_BRANCH`)
- [ ] Registered company name, company number and registered office (`SK_LEGAL`)
- [ ] Superintendent pharmacist's name and GPhC number (`SK_LEGAL`), and a short introduction for the About page
- [ ] About page: "Our story" paragraph
- [ ] Facilities (consultation room, step-free access, parking) (**DUMMY**)
- [ ] The service list and prices. Prices come from the shared catalogue (`src/app/data/services.ts`), the same ones the booking page shows; confirm them for Shivakem
- [ ] Photos: every photo is shared stand-in stock. Replace with Shivakem's own (shopfront, team, consultation room, services) in `SK_IMAGES` and `SK_HERO_SLIDES`
- [ ] Google reviews: the six reviews, the 4.9 rating and the 86 count are **DUMMY**. Show only real reviews from Shivakem's Google Business Profile, or remove `<ReviewsShivakem />`. Never add an `AggregateRating` to the structured data
- [ ] Google Place ID (`googlePlaceId` on `SK_BRANCH`). Until it's set, "Write a review" opens the pharmacy on Google Maps instead of Google's review box
- [ ] Contact form endpoint (`SK_CONTACT_ENDPOINT`). Until it's set, the form explains that messages aren't switched on and gives the phone number
- [ ] Privacy notice, cookie policy, complaints procedure and terms pages (footer links are placeholders)
- [ ] ODS code, if NHS listings need it

## Design notes
- Built on the One Care design system: pages carry `theme-onecare theme-shivakem`, and `styles/theme.css` re-points the tokens to the logo's royal blue (#0450B4). No green outside the logo
- Titles: Cal Sans. Body, buttons and links: Google Sans Flex (both from Google Fonts)
- Interface icons: Fluent UI (`@fluentui/react-icons`) through the `Fl` helper in `components/shivakemUi.tsx`
- 3D icons (`src/assets/shivakem/icons3d`): the 30 service icons (Pharmacy First conditions, travel, vaccines, treatments) are generated for Shivakem (Higgsfield, GPT Image 2.5, transparent background) with different subjects from One Care's. The section-title icons (stethoscope, vaccines, treatments, pharmacist coat) are One Care's set recoloured to blue. To add one in the same style, use the Japanese encephalitis icon (natural colours, small blue accent) as the reference image and this prompt, changing the subject: "A single 3D icon in the same style as the reference image (Airbnb 2025 app icon style): soft, tactile, slightly stylised rendered object with rounded, chunky proportions and realistic but simplified materials. Gentle studio lighting from the top left, very subtle soft contact shadow. Use natural, true-to-life colours so the object is instantly recognisable. Royal blue #0450B4 appears only as one small accent detail, never as the main colour. Three-quarter view, centred, fully transparent background. No text, no logos, no faces, no teal. Subject: ..."
- The shared booking and questionnaire flow keeps its own (Lucide) icons, as it does for every brand
