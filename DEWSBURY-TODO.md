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
- [ ] Is the pharmacy signed up to NHS Pharmacy First? The site and the About stats ("7 conditions treated free on the NHS") assume it is.
- [ ] NHS: flu jab, blood pressure check, stop smoking support (bookable), inhaler check (walk-in). Confirm each.
- [ ] Private: private flu jab (bookable, from £15), emergency contraception and pregnancy test (walk-in). Confirm prices; they come from `src/app/data/services.ts`.
- [ ] Anything else to add, such as contraception, travel vaccines, ear wax removal or weight management.

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
