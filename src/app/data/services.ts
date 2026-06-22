export interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  icon: string;
  category: string;
}

export const nhsServices: Service[] = [
  { id: "nhs-flu", name: "NHS Flu Vaccination", description: "Free flu jab for eligible patients during flu season", icon: "Syringe", category: "Vaccinations" },
  { id: "nhs-covid", name: "NHS COVID-19 Vaccination", description: "COVID-19 booster and seasonal vaccinations", icon: "ShieldCheck", category: "Vaccinations" },
  { id: "nhs-pneumonia", name: "Pneumococcal Vaccination", description: "NHS pneumonia vaccine for at-risk groups", icon: "Syringe", category: "Vaccinations" },
  { id: "nhs-shingles", name: "Shingles Vaccination", description: "Free shingles vaccine for eligible patients aged 70-79", icon: "Syringe", category: "Vaccinations" },
  { id: "nhs-men-b", name: "Meningitis B Vaccination", description: "Free MenB vaccine for eligible babies as part of the NHS childhood immunisation schedule", icon: "Syringe", category: "Vaccinations" },
  { id: "nhs-nms", name: "New Medicine Service (NMS)", description: "Support when starting a new medicine for a long-term condition", icon: "Pill", category: "Medication Support" },
  { id: "nhs-mur", name: "Medicines Use Review", description: "Review of your current medications to improve effectiveness", icon: "ClipboardList", category: "Medication Support" },
  { id: "nhs-dms", name: "Discharge Medicines Service", description: "Support after hospital discharge with your medicines", icon: "Hospital", category: "Medication Support" },
  { id: "nhs-cpcs", name: "Community Pharmacist Consultation (CPCS)", description: "GP or NHS 111 referral for minor illness consultation", icon: "Stethoscope", category: "Consultations" },
  { id: "nhs-pfs", name: "Pharmacy First Service", description: "Treatment for 7 common conditions without a GP appointment", icon: "HeartPulse", category: "Consultations" },
  // The 7 NHS Pharmacy First conditions — each links to a dedicated booking page.
  { id: "nhs-pf-sinusitis", name: "Sinusitis", description: "Acute sinusitis treatment for adults and children aged 12+", icon: "Wind", category: "Pharmacy First" },
  { id: "nhs-pf-sore-throat", name: "Sore Throat", description: "Treatment for acute sore throat in patients aged 5 and over", icon: "Activity", category: "Pharmacy First" },
  { id: "nhs-pf-earache", name: "Earache", description: "Acute otitis media (earache) treatment for children 1-17", icon: "Ear", category: "Pharmacy First" },
  { id: "nhs-pf-insect-bite", name: "Infected Insect Bite", description: "Treatment for infected insect bites in patients aged 1+", icon: "Bug", category: "Pharmacy First" },
  { id: "nhs-pf-impetigo", name: "Impetigo", description: "Treatment for impetigo skin infections in patients aged 1+", icon: "Hand", category: "Pharmacy First" },
  { id: "nhs-pf-shingles", name: "Shingles", description: "Treatment for shingles in adults aged 18 and over", icon: "Zap", category: "Pharmacy First" },
  { id: "nhs-pf-uti", name: "Uncomplicated UTI (women)", description: "UTI treatment for women aged 16-64 without a GP visit", icon: "Droplets", category: "Pharmacy First" },
  { id: "nhs-bp", name: "Blood Pressure Check Service", description: "Free NHS blood pressure check for adults 40+", icon: "Activity", category: "Health Checks" },
  { id: "nhs-hc", name: "NHS Health Check", description: "Cardiovascular risk assessment for adults aged 40-74", icon: "Heart", category: "Health Checks" },
  { id: "nhs-smoking", name: "Stop Smoking Service", description: "NHS support to help you quit smoking for good", icon: "Ban", category: "Lifestyle" },
  { id: "nhs-sti", name: "Emergency Contraception (EHC)", description: "Free emergency hormonal contraception from your pharmacy", icon: "ShieldPlus", category: "Sexual Health" },
  { id: "nhs-chlamydia", name: "Chlamydia Screening", description: "Free chlamydia testing for under 25s", icon: "TestTube", category: "Sexual Health" },
  { id: "nhs-contraception", name: "Oral Contraception Service", description: "Start or continue oral contraception without a GP visit", icon: "Pill", category: "Sexual Health" },
  { id: "nhs-substance", name: "Substance Misuse Service", description: "Supervised consumption and needle exchange programme", icon: "HandHelping", category: "Lifestyle" },
  { id: "nhs-palliative", name: "Palliative Care Service", description: "Ensuring access to palliative care medicines", icon: "HeartHandshake", category: "Specialist" },
  { id: "nhs-appliance", name: "Appliance Use Review", description: "Review of prescribed appliances to ensure correct use", icon: "Wrench", category: "Specialist" },
  { id: "nhs-stoma", name: "Stoma Appliance Customisation", description: "Customisation of stoma appliances for comfort and fit", icon: "Settings", category: "Specialist" },
  { id: "nhs-hypertension", name: "Hypertension Case Finding", description: "Identifying undiagnosed high blood pressure in the community", icon: "Activity", category: "Health Checks" },
];

export const privateServices: Service[] = [
  // Travel Health
  { id: "prv-travel-consult", name: "Travel Health Consultation", description: "Pre-travel risk assessment and vaccination advice", price: "From 25", icon: "Plane", category: "Travel Health" },
  { id: "prv-hep-a", name: "Hepatitis A Vaccine", description: "Protection for travel to high-risk areas", price: "From 50", icon: "Syringe", category: "Travel Health" },
  { id: "prv-hep-b", name: "Hepatitis B Vaccine", description: "3-dose course for long-term protection", price: "From 45", icon: "Syringe", category: "Travel Health" },
  { id: "prv-typhoid", name: "Typhoid Vaccine", description: "Essential for travel to South Asia, Africa, South America", price: "From 35", icon: "Syringe", category: "Travel Health" },
  { id: "prv-rabies", name: "Rabies Vaccine", description: "Pre-exposure prophylaxis for high-risk travellers", price: "From 60", icon: "Syringe", category: "Travel Health" },
  { id: "prv-cholera", name: "Cholera Vaccine", description: "Oral vaccine for travel to endemic areas", price: "From 35", icon: "Syringe", category: "Travel Health" },
  { id: "prv-meningitis", name: "Meningitis ACWY Vaccine", description: "Required for Hajj/Umrah and some countries", price: "From 50", icon: "Syringe", category: "Travel Health" },
  { id: "prv-japanese-enc", name: "Japanese Encephalitis Vaccine", description: "For travellers to rural Asia", price: "From 90", icon: "Syringe", category: "Travel Health" },
  { id: "prv-yellowfever", name: "Yellow Fever Vaccine", description: "Certified yellow fever vaccination centre", price: "From 65", icon: "Syringe", category: "Travel Health" },
  { id: "prv-malaria", name: "Malaria Prevention", description: "Anti-malarial tablets and advice", price: "From 30", icon: "Pill", category: "Travel Health" },
  { id: "prv-tickborne", name: "Tick-Borne Encephalitis Vaccine", description: "For travellers to forested areas in Europe/Asia", price: "From 65", icon: "Syringe", category: "Travel Health" },
  // Private Vaccinations
  { id: "prv-flu-private", name: "Private Flu Vaccination", description: "Flu jab for non-NHS eligible patients", price: "From 15", icon: "Syringe", category: "Private Vaccinations" },
  { id: "prv-chicken-pox", name: "Chickenpox Vaccine", description: "Varicella vaccination for children and adults", price: "From 65", icon: "Syringe", category: "Private Vaccinations" },
  { id: "prv-hpv", name: "HPV Vaccine", description: "Protection against human papillomavirus", price: "From 155", icon: "Syringe", category: "Private Vaccinations" },
  { id: "prv-mmr", name: "MMR Vaccine", description: "Measles, mumps, and rubella protection", price: "From 40", icon: "Syringe", category: "Private Vaccinations" },
  { id: "prv-men-b", name: "Meningitis B Vaccine (Bexsero)", description: "Private MenB vaccination for children and adults not eligible on the NHS", price: "From 120", icon: "Syringe", category: "Private Vaccinations" },
  { id: "prv-dtap", name: "DTP Booster Vaccine", description: "Diphtheria, tetanus, pertussis booster", price: "From 45", icon: "Syringe", category: "Private Vaccinations" },
  { id: "prv-shingles-prv", name: "Private Shingles Vaccine", description: "Shingrix vaccine for shingles prevention", price: "From 200", icon: "Syringe", category: "Private Vaccinations" },
  // Sexual Health
  { id: "prv-sti-test", name: "STI Testing", description: "Confidential sexually transmitted infection screening", price: "From 40", icon: "TestTube", category: "Sexual Health" },
  { id: "prv-ehc", name: "Private Emergency Contraception", description: "Morning-after pill available without prescription", price: "From 25", icon: "ShieldPlus", category: "Sexual Health" },
  { id: "prv-ed", name: "Erectile Dysfunction Treatment", description: "Confidential consultation and treatment", price: "From 20", icon: "Pill", category: "Sexual Health" },
  { id: "prv-period-delay", name: "Period Delay Treatment", description: "Delay your period for holidays or events", price: "From 15", icon: "Calendar", category: "Sexual Health" },
  // Weight Management
  { id: "prv-weight-consult", name: "Weight Management Consultation", description: "Personalised weight loss plan and support", price: "From 30", icon: "Scale", category: "Weight Management" },
  { id: "prv-wegovy", name: "Wegovy (Semaglutide)", description: "GLP-1 weight loss injection programme", price: "From 199", icon: "Syringe", category: "Weight Management" },
  { id: "prv-mounjaro", name: "Mounjaro (Tirzepatide)", description: "Weight management injection programme", price: "From 199", icon: "Syringe", category: "Weight Management" },
  { id: "prv-orlistat", name: "Orlistat (Xenical)", description: "Prescription weight loss capsules", price: "From 30", icon: "Pill", category: "Weight Management" },
  { id: "prv-saxenda", name: "Saxenda (Liraglutide)", description: "Daily weight loss injection treatment", price: "From 180", icon: "Syringe", category: "Weight Management" },
  // Hair Loss
  { id: "prv-hair-consult", name: "Hair Loss Consultation", description: "Assessment and treatment options for hair loss", price: "From 20", icon: "User", category: "Hair Loss" },
  { id: "prv-finasteride", name: "Finasteride", description: "Daily tablet for male pattern baldness", price: "From 18", icon: "Pill", category: "Hair Loss" },
  { id: "prv-minoxidil", name: "Minoxidil Treatment", description: "Topical hair regrowth treatment", price: "From 25", icon: "Droplets", category: "Hair Loss" },
  // Skin Conditions
  { id: "prv-acne", name: "Acne Treatment", description: "Consultation and prescription treatment for acne", price: "From 25", icon: "Sparkles", category: "Skin & Dermatology" },
  { id: "prv-eczema", name: "Eczema Treatment", description: "Emollients and prescription treatments", price: "From 20", icon: "Hand", category: "Skin & Dermatology" },
  { id: "prv-psoriasis", name: "Psoriasis Treatment", description: "Topical treatments and management advice", price: "From 25", icon: "Hand", category: "Skin & Dermatology" },
  { id: "prv-rosacea", name: "Rosacea Treatment", description: "Prescription creams and oral treatments", price: "From 25", icon: "Sparkles", category: "Skin & Dermatology" },
  { id: "prv-fungal", name: "Fungal Nail Treatment", description: "Antifungal treatments for nail infections", price: "From 20", icon: "Pill", category: "Skin & Dermatology" },
  { id: "prv-cold-sore", name: "Cold Sore Treatment", description: "Fast-acting antiviral cold sore treatment", price: "From 15", icon: "Pill", category: "Skin & Dermatology" },
  { id: "prv-wart", name: "Wart & Verruca Treatment", description: "Cryotherapy and topical treatments", price: "From 30", icon: "Zap", category: "Skin & Dermatology" },
  // Ear Health
  { id: "prv-ear-wax", name: "Ear Wax Removal", description: "Microsuction ear wax removal by trained clinicians", price: "From 40", icon: "Ear", category: "Ear Health" },
  { id: "prv-ear-infection", name: "Ear Infection Treatment", description: "Assessment and treatment for ear infections", price: "From 25", icon: "Stethoscope", category: "Ear Health" },
  // Diagnostic & Testing
  { id: "prv-blood-test", name: "Private Blood Tests", description: "Comprehensive blood test panels available", price: "From 50", icon: "TestTube", category: "Diagnostic & Testing" },
  { id: "prv-cholesterol", name: "Cholesterol Check", description: "Lipid profile testing with results in minutes", price: "From 20", icon: "Activity", category: "Diagnostic & Testing" },
  { id: "prv-diabetes", name: "Diabetes Screening (HbA1c)", description: "Blood sugar level testing for diabetes risk", price: "From 25", icon: "Droplets", category: "Diagnostic & Testing" },
  { id: "prv-thyroid", name: "Thyroid Function Test", description: "TSH and thyroid hormone level testing", price: "From 35", icon: "TestTube", category: "Diagnostic & Testing" },
  { id: "prv-vitamin-d", name: "Vitamin D Testing", description: "Check your vitamin D levels", price: "From 30", icon: "Sun", category: "Diagnostic & Testing" },
  { id: "prv-iron", name: "Iron Level Testing", description: "Ferritin and iron panel blood test", price: "From 30", icon: "TestTube", category: "Diagnostic & Testing" },
  { id: "prv-allergy", name: "Allergy Testing", description: "Identify common allergens causing symptoms", price: "From 60", icon: "Flower", category: "Diagnostic & Testing" },
  { id: "prv-covid-test", name: "COVID-19 PCR & Antigen Test", description: "Fit to fly and day 2 arrival testing", price: "From 30", icon: "TestTube", category: "Diagnostic & Testing" },
  { id: "prv-dna", name: "DNA Health Test", description: "Genetic predisposition health screening", price: "From 149", icon: "Dna", category: "Diagnostic & Testing" },
  // Lifestyle Treatments
  { id: "prv-smoking", name: "Private Stop Smoking Service", description: "NRT, Champix & counselling for smoking cessation", price: "From 25", icon: "Ban", category: "Lifestyle Treatments" },
  { id: "prv-altitude", name: "Altitude Sickness Prevention", description: "Acetazolamide for high-altitude travel", price: "From 20", icon: "Mountain", category: "Lifestyle Treatments" },
  { id: "prv-jet-lag", name: "Jet Lag Treatment", description: "Melatonin for managing jet lag symptoms", price: "From 15", icon: "Clock", category: "Lifestyle Treatments" },
  { id: "prv-migraine", name: "Migraine Treatment", description: "Triptans and preventative migraine medication", price: "From 15", icon: "Brain", category: "Lifestyle Treatments" },
  { id: "prv-hayfever", name: "Hay Fever Treatment", description: "Prescription-strength antihistamines and nasal sprays", price: "From 12", icon: "Flower", category: "Lifestyle Treatments" },
  { id: "prv-cystitis", name: "Cystitis Treatment", description: "Antibiotics for urinary tract infections", price: "From 20", icon: "Pill", category: "Lifestyle Treatments" },
  { id: "prv-acid-reflux", name: "Acid Reflux Treatment", description: "PPI and H2 blocker treatments available", price: "From 12", icon: "Pill", category: "Lifestyle Treatments" },
  { id: "prv-ibs", name: "IBS Treatment", description: "Irritable bowel syndrome management", price: "From 20", icon: "Pill", category: "Lifestyle Treatments" },
  { id: "prv-threadworm", name: "Threadworm Treatment", description: "Over the counter and prescription treatments", price: "From 10", icon: "Pill", category: "Lifestyle Treatments" },
  // Aesthetic & Cosmetic
  { id: "prv-dermal", name: "Dermal Fillers", description: "Lip, cheek and jawline enhancement", price: "From 200", icon: "Sparkles", category: "Aesthetic & Cosmetic" },
  { id: "prv-botox", name: "Anti-Wrinkle Injections", description: "Botulinum toxin for wrinkle reduction", price: "From 180", icon: "Sparkles", category: "Aesthetic & Cosmetic" },
  { id: "prv-chemical-peel", name: "Chemical Peels", description: "Skin resurfacing and rejuvenation treatments", price: "From 80", icon: "Sparkles", category: "Aesthetic & Cosmetic" },
  { id: "prv-microneedling", name: "Microneedling", description: "Collagen induction therapy for skin renewal", price: "From 120", icon: "Sparkles", category: "Aesthetic & Cosmetic" },
  { id: "prv-vitamin-injection", name: "Vitamin B12 Injection", description: "Energy-boosting vitamin B12 intramuscular injection", price: "From 30", icon: "Syringe", category: "Aesthetic & Cosmetic" },
  { id: "prv-iv-drip", name: "IV Vitamin Drip Therapy", description: "Intravenous vitamin infusions for wellness", price: "From 150", icon: "Droplets", category: "Aesthetic & Cosmetic" },
];

// Online Doctor services (lifestyle treatments available via online consultation)
const onlineDoctorCategories = new Set([
  "Weight Management",
  "Hair Loss",
  "Sexual Health",
  "Skin & Dermatology",
  "Lifestyle Treatments",
]);

export const onlineDoctorServices: Service[] = privateServices.filter(
  (s) => onlineDoctorCategories.has(s.category)
);

export const inPersonPrivateServices: Service[] = privateServices.filter(
  (s) => !onlineDoctorCategories.has(s.category)
);

export const pharmacyInfo = {
  name: "CareFirst Pharmacy",
  tagline: "Your Local Health & Wellness Partner",
  phone: "020 7123 4567",
  email: "info@carefirstpharmacy.co.uk",
  address: "42 High Street, London, SE1 1AA",
  openingHours: [
    { day: "Monday - Friday", hours: "8:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
  ],
  googleRating: 4.8,
  totalReviews: 324,
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542!2d-0.0876!3d51.5034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzEyLjIiTiAwwrAwNScxNS40Ilc!5e0!3m2!1sen!2suk!4v1",
  reviews: [
    { name: "Sarah M.", rating: 5, text: "Absolutely wonderful service. The pharmacist took time to explain my new medication thoroughly. Always friendly and professional.", date: "2 weeks ago" },
    { name: "James T.", rating: 5, text: "Got my travel vaccinations sorted here. Very knowledgeable staff and competitive prices. Highly recommend!", date: "1 month ago" },
    { name: "Priya K.", rating: 5, text: "The ear wax removal service was brilliant. Quick, painless, and professional. Much better than my GP experience.", date: "3 weeks ago" },
    { name: "David W.", rating: 4, text: "Great pharmacy with a wide range of services. The weight management programme has been really helpful for me.", date: "1 month ago" },
    { name: "Emma L.", rating: 5, text: "Used their Pharmacy First service for a UTI and was seen within 10 minutes. Saved me a GP appointment!", date: "5 days ago" },
  ],
};

export function getServiceCategories(services: Service[]): string[] {
  return [...new Set(services.map(s => s.category))];
}