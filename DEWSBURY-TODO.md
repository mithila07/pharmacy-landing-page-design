# Dewsbury Moor Pharmacy: to confirm before launch

Built on the Kepple Lane template (like J Morris, Acre and Meadows), with three extra sections inspired by pharmappy.com's design suite: quick booking under the hero, a bento grid of everyday services, and a closing booking band.

Facts come from dewsburymoorpharmacy.co.uk (read 6 November 2026). Anything not published there shows as `[REPLACE — …]`.

- Branch details and legal: `src/app/data/dewsbury.ts`
- Hero, About copy, quick booking, bento and closing band: the `dewsbury` entry in `src/app/data/templateSites.ts`
- Colours and fonts (Jost titles, Clarity City body): `.theme-dewsbury` in `src/styles/theme.css`

## Missing details
- [ ] GPhC premises registration number (blank on the current site)
- [ ] Company name and company number of the operator (blank on the current site)
- [ ] Superintendent pharmacist's GPhC number (Ash Ali is named, but no number is given)
- [ ] Map coordinates, for the "nearest branch" logic

## Check against the current site
- [ ] Opening hours: Monday to Friday 9am to 6pm, closed at weekends. Confirm, and supply bank holiday hours.
- [ ] A second phone number, 020 8854 3530 (a London code), appears in the current site's header. We use 01924 502828 only.
- [ ] The current site's social links point to "Haveela Pharmacy". The footer's Facebook, Instagram and X icons are the template's placeholders; supply Dewsbury Moor's own accounts, or remove them.
- [ ] Medicines Use Review is listed on the current site but ended in England in 2021. It's been left off.

## Services
Everything below is shown on the home page and in the booking overlay. Confirm each one before launch, and remove any the pharmacy doesn't offer (`src/app/data/dewsbury.ts` and the `dewsbury` entry in `templateSites.ts`). Prices come from `src/app/data/services.ts`.
- [ ] NHS Pharmacy First, all seven conditions (the About stats also say "7 conditions treated free on the NHS").
- [ ] NHS: flu jab, blood pressure check, stop smoking support, New Medicine Service, inhaler checks (walk-in).
- [ ] Private, headline: weight loss clinic (from £30), ear wax removal (from £40).
- [ ] Travel clinic: consultation (from £25), hepatitis A, hepatitis B, typhoid, cholera, rabies, meningitis ACWY, Japanese encephalitis, tick-borne encephalitis, malaria prevention, altitude sickness. Yellow fever is left out until the pharmacy confirms it's a registered centre.
- [ ] Other private: private flu jab, chickenpox, HPV, period delay, hay fever, cold sores, migraine, fungal nail, vitamin B12 service; emergency contraception and pregnancy tests (walk-in).
- [ ] Weight loss copy and photo deliberately don't mention or show any medicine (MHRA rules on prescription-only medicines). Keep it that way.

## Google reviews
- [ ] The six reviews and the 4.8 rating (57 reviews) on the home page are placeholders (`DMP_REVIEWS` and `DMP_GOOGLE_RATING` in `src/app/data/dewsbury.ts`). Replace them with real reviews from the pharmacy's Google Business Profile, and keep the rating and count in step with Google.
- [ ] Google Place ID (`DMP_GOOGLE_PLACE_ID`). Until it's set, "Write a review" and "See all on Google" open the pharmacy on Google Maps instead of the review box.

## Forms and cookies
- [ ] The contact and nomination forms run in preview: nothing is sent until `forms.endpoint` is set on the `dewsbury` entry in `templateSites.ts`.
- [ ] The cookie notice saves the visitor's choice (`dmp-cookie-consent` in localStorage). When analytics are added, load them only if the choice is "all".
- [ ] The cookie notice's "Cookie policy" link needs the policy page.

## Pages and photos
- [ ] Footer policy links (privacy, terms, cookies, complaints, accessibility) need their pages.
- [ ] Photos are stand-in stock. Real photos of the shop front and the team would help.
