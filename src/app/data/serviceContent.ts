export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceContent {
  headline: string;
  intro: string;
  benefits: string[];
  whatToExpect: string[];
  suitableFor: string[];
  faqs: ServiceFAQ[];
  image: string;
  imageAlt: string;
  /** Optional per-service safety-netting advice. Falls back to a default when omitted. */
  safetyNetting?: string;
}

// Category-level SEO content
export const categoryContent: Record<string, ServiceContent> = {
  "Vaccinations": {
    headline: "NHS Vaccinations at Your Local Community Pharmacy",
    intro:
      "Our qualified pharmacists deliver NHS vaccinations in a comfortable, walk-in friendly environment — no GP appointment needed. We offer flu, COVID-19, shingles, and pneumococcal vaccines to eligible patients, helping protect you and your community against serious preventable illnesses.",
    benefits: [
      "No GP appointment required — book directly online",
      "Administered by trained and accredited immunisation pharmacists",
      "Quick 15-minute appointments with no long waits",
      "Private consultation room for your comfort and privacy",
      "NHS-funded for all eligible patients — completely free of charge",
    ],
    whatToExpect: [
      "You'll be greeted by our team and asked to complete a short health screening form",
      "Your pharmacist will review your eligibility and medical history",
      "The vaccination takes seconds and you'll remain for a brief 15-minute observation",
      "You'll receive a vaccination record and aftercare advice before leaving",
    ],
    suitableFor: [
      "Adults aged 65+ for NHS Flu and Pneumococcal vaccines",
      "Adults with long-term health conditions (diabetes, heart disease, asthma)",
      "Pregnant women eligible for flu vaccinations",
      "Patients aged 70–79 eligible for the NHS Shingles vaccine",
    ],
    faqs: [
      {
        q: "Do I need a GP referral to get an NHS vaccination at the pharmacy?",
        a: "No. You can book directly with us online or walk in. Our pharmacist will confirm your eligibility during the consultation.",
      },
      {
        q: "Is it safe to have a flu jab and COVID booster at the same appointment?",
        a: "Yes. Co-administration of flu and COVID vaccines is safe and recommended by the NHS to reduce the number of visits needed.",
      },
      {
        q: "What side effects should I expect after vaccination?",
        a: "Mild soreness at the injection site, slight fatigue or a low-grade temperature are common and usually resolve within 24–48 hours.",
      },
      {
        q: "How do I know if I'm eligible for a free NHS vaccine?",
        a: "Eligibility is based on age, underlying health conditions, and occupation. Our pharmacist can check your eligibility at your appointment, or you can call us in advance.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1598300188480-626f2f79ab8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Pharmacist administering a vaccination injection",
  },

  "Medication Support": {
    headline: "Personalised Medication Support from Your Community Pharmacist",
    intro:
      "Starting a new long-term medication can be daunting. Our pharmacists provide expert, one-to-one guidance through the New Medicine Service (NMS), Medicines Use Review (MUR), and Discharge Medicines Service — helping you understand your treatment, manage side effects, and get the best results from your prescription.",
    benefits: [
      "Free NHS service — available at no cost to eligible patients",
      "Personalised 1-to-1 consultation with a clinical pharmacist",
      "Help managing side effects and ensuring correct medication use",
      "Improved adherence linked to better health outcomes",
      "Reduces hospital readmissions after discharge",
    ],
    whatToExpect: [
      "Your pharmacist will review all your current medications and any recent changes",
      "You'll discuss any concerns, side effects, or difficulties you're experiencing",
      "Practical advice is given on timing, storage, and interactions",
      "A follow-up check-in may be arranged to monitor your progress",
    ],
    suitableFor: [
      "Patients newly prescribed a medicine for a long-term condition",
      "Anyone recently discharged from hospital with new or changed medications",
      "Patients taking multiple medicines (polypharmacy)",
      "Patients who are unsure how or when to take their medicines correctly",
    ],
    faqs: [
      {
        q: "What is the New Medicine Service (NMS)?",
        a: "The NMS is a free NHS service for patients starting a new medicine for conditions like asthma, diabetes, high blood pressure, or anticoagulant therapy. It includes two consultations over four weeks.",
      },
      {
        q: "How is the Discharge Medicines Service different?",
        a: "The DMS is specifically for patients referred by a hospital after discharge. Your pharmacist contacts you within 72 hours to review any medicines changes made during your stay.",
      },
      {
        q: "Do I need a GP referral for medication support services?",
        a: "No referral is needed for NMS or MUR. The DMS requires a referral from the hospital pharmacy team, which is arranged automatically on discharge.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Pharmacist providing medication advice to a patient",
  },

  "Consultations": {
    headline: "Community Pharmacist Consultations — See a Clinician Today",
    intro:
      "Through the NHS Community Pharmacist Consultation Service (CPCS) and Pharmacy First programme, our pharmacists can assess and treat a range of minor illnesses and common conditions directly — saving you time and relieving pressure on your GP and local A&E. No appointment needed for many conditions.",
    benefits: [
      "See a qualified clinician the same day, often without an appointment",
      "Treat 7 common conditions under NHS Pharmacy First without a GP visit",
      "Accept NHS 111 and GP referrals for urgent minor illness consultations",
      "Prescribe over-the-counter and prescription medicines where appropriate",
      "Private consultation room — fully confidential",
    ],
    whatToExpect: [
      "Briefly describe your symptoms to our counter staff upon arrival",
      "You'll be invited into a private consultation room to speak with a pharmacist",
      "The pharmacist will assess your symptoms, ask relevant questions, and examine you if needed",
      "A treatment recommendation, prescription, or onward referral will be provided",
    ],
    suitableFor: [
      "Adults and children with minor illnesses such as sore throat, earache, or sinusitis",
      "Patients referred by NHS 111 or a GP practice",
      "Anyone seeking advice on urinary tract infections, impetigo, shingles, or infected insect bites",
      "Patients who cannot get a timely GP appointment",
    ],
    faqs: [
      {
        q: "What conditions can be treated under Pharmacy First?",
        a: "The seven Pharmacy First clinical pathways cover sinusitis, sore throat, earache, infected insect bites, impetigo, shingles, and uncomplicated urinary tract infections in women.",
      },
      {
        q: "Can the pharmacist prescribe antibiotics?",
        a: "Yes. Under Pharmacy First, our pharmacists are independent prescribers authorised to supply antibiotics for eligible conditions including impetigo, infected insect bites, and UTIs.",
      },
      {
        q: "Is there a charge for a Pharmacy First consultation?",
        a: "No. The Pharmacy First service is fully funded by the NHS and free to all patients.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Pharmacist consulting with a patient in a private consultation room",
  },

  "Health Checks": {
    headline: "Free NHS Health Checks & Blood Pressure Testing at Our Pharmacy",
    intro:
      "Catching conditions like high blood pressure early can prevent heart attacks and strokes. Our pharmacy provides free NHS Blood Pressure Checks for adults aged 40+, NHS Health Checks for cardiovascular risk assessment, and hypertension case-finding services — all without needing a GP appointment.",
    benefits: [
      "Fast, accurate results using validated digital blood pressure monitors",
      "No fasting or preparation required for a blood pressure check",
      "NHS Health Check includes cholesterol, BMI, blood sugar, and lifestyle assessment",
      "Results explained clearly with personalised advice and onward referral if needed",
      "Helping to identify undiagnosed hypertension in over 5 million UK adults",
    ],
    whatToExpect: [
      "Arrive at a time that suits you — most checks take under 20 minutes",
      "Our pharmacist will take your blood pressure using an upper-arm cuff",
      "For the NHS Health Check, a small finger-prick blood sample may be taken for cholesterol and glucose",
      "Results are explained on the spot with lifestyle advice and a follow-up plan if readings are elevated",
    ],
    suitableFor: [
      "Adults aged 40–74 who haven't had an NHS Health Check in the past 5 years",
      "Anyone concerned about their blood pressure or family history of heart disease",
      "Patients referred by their GP or NHS 111 for a blood pressure review",
      "Adults who want a baseline cardiovascular risk assessment",
    ],
    faqs: [
      {
        q: "What is a normal blood pressure reading?",
        a: "A healthy blood pressure is considered to be between 90/60 mmHg and 120/80 mmHg. Readings of 140/90 mmHg or above may indicate hypertension and should be reviewed by a clinician.",
      },
      {
        q: "How long does an NHS Health Check take?",
        a: "The full NHS Health Check typically takes 15–20 minutes and includes checks for BMI, blood pressure, cholesterol, blood glucose, and a lifestyle risk questionnaire.",
      },
      {
        q: "Who is eligible for a free NHS Health Check?",
        a: "Adults aged 40–74 who do not have a pre-existing cardiovascular condition (such as diabetes, high blood pressure, or kidney disease) are eligible once every 5 years.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1666887360866-959a31b05985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Blood pressure monitoring health check at a pharmacy",
  },

  "Lifestyle": {
    headline: "NHS Stop Smoking & Lifestyle Support Services",
    intro:
      "Quitting smoking is the single best thing you can do for your health. Our NHS-funded Stop Smoking Service offers evidence-based behavioural support alongside NRT (nicotine replacement therapy), giving you the best possible chance of success. We also provide confidential support for substance misuse through our supervised consumption programme.",
    benefits: [
      "Up to 4× more likely to quit with professional support vs going it alone",
      "Free NHS nicotine replacement products including patches, gum, and inhalators",
      "Weekly one-to-one sessions with a trained stop-smoking advisor",
      "Access to prescription-only treatments like Varenicline (Champix) where appropriate",
      "Non-judgemental, confidential environment",
    ],
    whatToExpect: [
      "An initial 30-minute consultation to understand your smoking history and motivation",
      "A personalised quit plan with a target quit date",
      "Regular weekly or fortnightly check-ins for 12 weeks",
      "CO breath testing to monitor your progress",
      "Ongoing emotional and behavioural support throughout your quit journey",
    ],
    suitableFor: [
      "Any smoker who wants to quit, regardless of how long they have smoked",
      "People who have tried to quit before and want structured support this time",
      "Pregnant women who smoke (priority referrals available)",
      "Young people aged 12+ with parental consent",
    ],
    faqs: [
      {
        q: "Is the NHS Stop Smoking Service really free?",
        a: "Yes. The service, consultations, and NRT products are all provided free of charge through the NHS for eligible patients.",
      },
      {
        q: "Can I get Champix (Varenicline) through the pharmacy?",
        a: "Your pharmacist or GP can prescribe Varenicline if it's clinically appropriate. It has been shown to be highly effective and is available free on an NHS prescription.",
      },
      {
        q: "What is supervised consumption?",
        a: "Our supervised consumption service supports patients prescribed methadone or buprenorphine by ensuring doses are taken correctly and safely at our pharmacy. We also provide needle exchange services.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1664745889728-256a5966e898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Healthy lifestyle concept representing stop smoking support",
  },

  "Sexual Health": {
    headline: "Confidential NHS Sexual Health Services at Your Pharmacy",
    intro:
      "We provide a range of free and confidential NHS sexual health services including emergency contraception (EHC), chlamydia screening for under 25s, and oral contraception. Our discreet consultation rooms ensure complete privacy, with no GP appointment or referral needed.",
    benefits: [
      "Completely confidential — consultations held in a private room",
      "Emergency contraception available without a prescription",
      "Free chlamydia testing kits for under 25s",
      "Start or continue oral contraception without visiting a GP",
      "Same-day service for time-sensitive treatments like the morning-after pill",
    ],
    whatToExpect: [
      "Request the service discreetly at the pharmacy counter",
      "You'll be invited into a private consultation room immediately",
      "A brief health screening ensures the treatment is appropriate and safe for you",
      "Medication is dispensed or a test kit provided on the same visit",
    ],
    suitableFor: [
      "Anyone needing emergency contraception within 72 hours of unprotected sex",
      "Sexually active people aged under 25 seeking a free chlamydia test",
      "Women who want to start or continue oral contraceptive pills",
      "Anyone seeking confidential sexual health advice",
    ],
    faqs: [
      {
        q: "Is emergency contraception (the morning-after pill) available without a prescription?",
        a: "Yes. Levonorgestrel (Levonelle) and Ulipristal acetate (ellaOne) are both available from our pharmacy. The NHS EHC service provides this free for eligible patients.",
      },
      {
        q: "How discreet is the chlamydia screening service?",
        a: "Completely discreet. You can collect a self-sampling kit from our pharmacy with no face-to-face consultation required. Results are sent directly to you.",
      },
      {
        q: "Can I get the contraceptive pill from the pharmacy without seeing a GP?",
        a: "Yes. Under the NHS Oral Contraception Service, our pharmacist can initiate and continue hormonal contraception following a clinical assessment.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Private pharmacy consultation room for sexual health services",
  },

  "Specialist": {
    headline: "Specialist NHS Pharmacy Services — Palliative Care & Appliance Support",
    intro:
      "We provide essential specialist NHS services including palliative care medicine access, appliance use reviews, and stoma appliance customisation. Our experienced pharmacists work closely with GPs, district nurses, and community specialist teams to ensure seamless care for patients with complex needs.",
    benefits: [
      "24/7 emergency palliative care medicine access in line with Just in Case protocols",
      "Expert stoma appliance fitting and customisation for comfort and dignity",
      "Appliance Use Reviews to ensure correct use of prescribed devices",
      "Close liaison with community nursing and specialist teams",
      "Sensitive, compassionate care for patients at end of life",
    ],
    whatToExpect: [
      "Your community nurse or GP will often refer you to this service",
      "A specialist pharmacist will assess your appliance or medication needs",
      "Customisations or adjustments are made on-site where possible",
      "Ongoing reviews are scheduled to monitor comfort and effectiveness",
    ],
    suitableFor: [
      "Patients with a stoma following bowel, bladder, or colorectal surgery",
      "Patients in receipt of palliative care in the community",
      "Patients prescribed an appliance such as a catheter or drainage device",
      "Carers managing appliances on behalf of a patient",
    ],
    faqs: [
      {
        q: "What is an Appliance Use Review (AUR)?",
        a: "An AUR is a free NHS consultation to check you are using a prescribed appliance correctly. It improves comfort, reduces waste, and identifies any issues with fit or use.",
      },
      {
        q: "Can a pharmacist customise my stoma bag?",
        a: "Yes. Our pharmacists trained in stoma care can cut and customise stoma appliances to achieve the best fit, improving skin protection and overall comfort.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Pharmacy specialist service consultation",
  },

  "Travel Health": {
    headline: "Expert Travel Health Vaccinations & Malaria Prevention",
    intro:
      "Planning an international trip? Our travel health clinic offers comprehensive pre-travel consultations, destination-specific vaccination programmes, and antimalarial prescriptions. As an accredited Yellow Fever vaccination centre, we provide the certified documentation required for entry to many countries.",
    benefits: [
      "Destination-specific health risk assessment from qualified travel health pharmacists",
      "Full range of travel vaccines including Yellow Fever, Typhoid, Hepatitis A & B, Rabies, and more",
      "Antimalarial prescription and advice tailored to your itinerary",
      "Certified Yellow Fever vaccination with official international certificate (ICVP)",
      "Competitive pricing — often significantly cheaper than GP or travel clinic rates",
    ],
    whatToExpect: [
      "Book a travel health consultation 6–8 weeks before your departure if possible",
      "Provide your destination(s), travel dates, and activities (e.g., hiking, volunteering)",
      "Your pharmacist will perform a risk assessment and create a personalised vaccination schedule",
      "Vaccines can often be administered on the same day as the consultation",
      "You'll receive a vaccination record and written antimalarial advice to take with you",
    ],
    suitableFor: [
      "Travellers visiting tropical or developing regions in Africa, Asia, or South America",
      "Backpackers, volunteers, or healthcare workers with extended stays abroad",
      "Hajj and Umrah pilgrims requiring the Meningitis ACWY certificate",
      "Business travellers with short-notice trips requiring rapid vaccination",
    ],
    faqs: [
      {
        q: "Do I need a Yellow Fever certificate to enter certain countries?",
        a: "Yes. Countries including Brazil, Kenya, and Ghana require proof of Yellow Fever vaccination for entry. We are a registered Yellow Fever vaccination centre and issue official ICVP certificates.",
      },
      {
        q: "How far in advance should I book a travel health appointment?",
        a: "Ideally 6–8 weeks before travel, as some vaccines (e.g., Hepatitis B, Rabies) require a 3-dose course over several weeks. However, we can still help with last-minute trips.",
      },
      {
        q: "Do I need anti-malarial tablets for all tropical destinations?",
        a: "Not always. Malaria risk varies significantly by region and season. Our pharmacist will assess your specific itinerary and recommend the most appropriate prevention strategy.",
      },
      {
        q: "Are travel vaccinations available on the NHS?",
        a: "Some travel vaccines (e.g., Typhoid, Hepatitis A) may be available free on the NHS if your GP agrees they are necessary. Most travel vaccines, however, require private payment.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1701686794404-3670ea43687e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Travel health passport and vaccination documents for international travel",
  },

  "Private Vaccinations": {
    headline: "Private Vaccination Clinic — Fast, Affordable Protection",
    intro:
      "Our private vaccination service covers all major vaccinations not available on the NHS, including chickenpox, HPV, MMR top-up, Shingrix shingles vaccine, and more. Walk-in appointments available with instant access to our trained immunisation team.",
    benefits: [
      "No waiting lists — appointments available within 24 hours",
      "Full vaccination records provided for employment, travel, or school entry requirements",
      "Competitively priced with transparent fee structure — no hidden costs",
      "Trained and accredited pharmacist immunisers with enhanced DBS checks",
      "Family appointments available — vaccinate multiple family members in one visit",
    ],
    whatToExpect: [
      "A brief pre-vaccination health screen to check for contraindications",
      "The vaccine is administered quickly and painlessly by our trained pharmacist",
      "15-minute observation period after the injection for safety",
      "A full vaccination record card is issued at the end of the appointment",
    ],
    suitableFor: [
      "Children and adults needing chickenpox (Varicella) vaccination",
      "Adults over 50 seeking the Shingrix (Recombivax) shingles vaccine",
      "Women and girls seeking HPV vaccination outside the NHS school programme",
      "Anyone requiring an MMR booster for work, university, or travel purposes",
    ],
    faqs: [
      {
        q: "Is the Shingrix shingles vaccine better than the NHS Zostavax vaccine?",
        a: "Shingrix (recombinant adjuvanted vaccine) provides over 97% protection and is considered superior to the older Zostavax vaccine. It is given as a 2-dose course 2–6 months apart.",
      },
      {
        q: "At what age can children have the chickenpox vaccine?",
        a: "The varicella vaccine can be given from 12 months of age as a 2-dose course. It is particularly recommended for non-immune adults, healthcare workers, and those in close contact with immunocompromised patients.",
      },
      {
        q: "Can I get an HPV vaccine as an adult?",
        a: "Yes. HPV vaccination is effective at any age in people who have not already been infected. We offer the Gardasil 9 vaccine protecting against 9 HPV strains.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1598300188480-626f2f79ab8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Private vaccination being administered by a pharmacist",
  },

  "Weight Management": {
    headline: "Medical Weight Management — GLP-1 Injections & Clinical Support",
    intro:
      "Achieve sustainable weight loss with expert clinical guidance. We offer the full range of evidence-based weight management treatments including Wegovy (semaglutide), Mounjaro (tirzepatide), Saxenda (liraglutide), and Orlistat, alongside personalised diet and lifestyle counselling. All treatments are prescribed following a thorough clinical assessment.",
    benefits: [
      "Access to licensed GLP-1 receptor agonist injections (Wegovy, Mounjaro, Saxenda)",
      "Clinical assessment by a pharmacist prescriber — no GP referral needed",
      "Ongoing monitoring and dose titration throughout your programme",
      "Integrated diet and lifestyle coaching for long-term success",
      "Discreet, confidential consultations in a private consultation room",
    ],
    whatToExpect: [
      "A comprehensive medical and lifestyle history review",
      "BMI, blood pressure, and baseline health checks",
      "Discussion of suitable treatment options and expected outcomes",
      "Prescription issued and medication dispensed at the same appointment if appropriate",
      "Regular monthly follow-up consultations to monitor progress and titrate dosage",
    ],
    suitableFor: [
      "Adults with a BMI of 30+ (or 27.5+ with a weight-related health condition)",
      "People who have tried diet and exercise but struggle to maintain weight loss",
      "Patients with type 2 diabetes who would benefit from weight reduction",
      "Anyone seeking a medically supervised alternative to crash diets",
    ],
    faqs: [
      {
        q: "What is the difference between Wegovy and Mounjaro?",
        a: "Wegovy (semaglutide) is a GLP-1 agonist injected weekly that reduces appetite and caloric intake. Mounjaro (tirzepatide) is a dual GIP/GLP-1 agonist showing even greater weight loss in clinical trials, with average losses of 20–22% body weight.",
      },
      {
        q: "How quickly will I lose weight on a GLP-1 medication?",
        a: "Most patients see meaningful weight loss within 4–8 weeks. Clinical trials show average losses of 15–22% of body weight over 68 weeks with consistent use and lifestyle changes.",
      },
      {
        q: "Are there any side effects with weight loss injections?",
        a: "The most common side effects are nausea, vomiting, and constipation, particularly during dose titration. These typically improve after the first few weeks. Our pharmacist will guide you through managing any side effects.",
      },
      {
        q: "Can I get Wegovy or Mounjaro on the NHS?",
        a: "Mounjaro is now available on the NHS via specialist weight management services for eligible patients. Wegovy is also being rolled out. Our pharmacist can advise on NHS vs private eligibility at your consultation.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1516763562359-cae9ea43851f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Healthy lifestyle and weight management programme",
  },

  "Hair Loss": {
    headline: "Effective Hair Loss Treatments — Finasteride, Minoxidil & More",
    intro:
      "Hair loss affects millions of men and women in the UK, yet effective treatments are widely available. Our pharmacist prescribers provide discreet consultations for androgenetic alopecia (male and female pattern hair loss), and can prescribe clinically proven treatments including Finasteride and Minoxidil — often on the same day.",
    benefits: [
      "Same-day prescriptions for clinically proven hair loss treatments",
      "Prescriber pharmacist — no GP referral or waiting list",
      "Completely confidential — online or face-to-face consultations available",
      "Personalised treatment plans combining topical and oral therapies",
      "Ongoing monitoring to track your hair regrowth progress",
    ],
    whatToExpect: [
      "A confidential consultation reviewing your hair loss history and current health",
      "Assessment of hair loss pattern and severity",
      "Discussion of treatment options including efficacy, costs, and side effects",
      "Prescription issued and product dispensed at the same appointment",
      "Follow-up review after 3–6 months to assess progress",
    ],
    suitableFor: [
      "Men aged 18+ experiencing male pattern baldness (androgenetic alopecia)",
      "Women experiencing female pattern hair loss or diffuse thinning",
      "Patients who have tried over-the-counter products without success",
      "Anyone seeking a medically supervised hair restoration programme",
    ],
    faqs: [
      {
        q: "How effective is Finasteride for hair loss?",
        a: "Clinical studies show that Finasteride (1mg daily) stops hair loss in 83% of men and promotes regrowth in around 66% of users. Results are typically seen after 3–6 months of consistent use.",
      },
      {
        q: "Can women use Finasteride or Minoxidil?",
        a: "Minoxidil (topical 2% or 5%) is safe and effective for women. Finasteride is generally not recommended for women of childbearing age due to teratogenic risk, though it can be considered in post-menopausal women.",
      },
      {
        q: "How long does it take to see results from hair loss treatment?",
        a: "Most patients notice a reduction in hair shedding within 3 months, with visible regrowth typically appearing after 6 months. Maximum results are usually seen at 12 months.",
      },
      {
        q: "Will my hair fall out again if I stop treatment?",
        a: "Yes. Hair loss treatments work by managing the underlying cause and must be continued to maintain results. Stopping treatment typically leads to a return of hair loss within 6–12 months.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1773078280516-df823e1c9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Hair loss treatment consultation and scalp care",
  },

  "Skin & Dermatology": {
    headline: "Private Skin & Dermatology Treatments from Your Pharmacist",
    intro:
      "From acne and eczema to rosacea and fungal infections, our pharmacist prescribers offer fast-access consultations and same-day prescriptions for a wide range of skin conditions. Avoid long NHS dermatology waiting lists with affordable private treatment tailored to your skin type and needs.",
    benefits: [
      "Same-day prescription for acne, eczema, rosacea, psoriasis, and more",
      "Pharmacist prescriber — no GP or dermatologist referral needed",
      "Prescription-strength topicals and oral treatments unavailable over the counter",
      "Personalised skincare regimen advice alongside clinical treatment",
      "Follow-up consultations included to monitor treatment response",
    ],
    whatToExpect: [
      "A thorough skin history review and assessment of your condition",
      "Visual examination of affected areas in our private consultation room",
      "Discussion of treatment options including topical, oral, and combination therapies",
      "Prescription issued and product dispensed on the same day",
      "Advice on skincare routine, triggers, and lifestyle factors",
    ],
    suitableFor: [
      "Adults and teenagers struggling with persistent or moderate-to-severe acne",
      "Patients with eczema, psoriasis, or rosacea seeking prescription-strength treatments",
      "Anyone with a fungal nail infection that hasn't responded to OTC treatments",
      "Patients wanting to avoid long NHS dermatology waiting times",
    ],
    faqs: [
      {
        q: "What prescription acne treatments are available at the pharmacy?",
        a: "We can prescribe topical retinoids (Tretinoin, Adapalene), antibiotic gels (Clindamycin), combination products, and oral antibiotics such as Lymecycline or Doxycycline for moderate-to-severe cases.",
      },
      {
        q: "How is eczema managed at the pharmacy?",
        a: "We offer a range of emollient prescriptions, topical corticosteroids of varying potencies, and topical calcineurin inhibitors (Tacrolimus). We also provide trigger identification and daily skincare routine advice.",
      },
      {
        q: "Can fungal nail treatment be prescribed at the pharmacy?",
        a: "Yes. For stubborn nail infections, we can prescribe oral antifungals such as Terbinafine or Itraconazole, which are significantly more effective than topical treatments alone.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1680128435283-ba681c370008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Skin dermatology treatment and facial skincare consultation",
  },

  "Ear Health": {
    headline: "Professional Ear Wax Removal & Ear Infection Treatment",
    intro:
      "Blocked ears caused by wax build-up affect 1 in 10 adults in the UK. Our trained clinicians provide safe, effective ear wax removal using the gold-standard microsuction technique — providing immediate relief for muffled hearing, tinnitus, and earache. We also assess and treat ear infections without a GP appointment.",
    benefits: [
      "Instant results — most patients notice a dramatic improvement immediately",
      "Microsuction method: safer and more comfortable than ear syringing",
      "No messy pre-softening drops required for microsuction (though recommended)",
      "Assessment and treatment of ear infections with same-day antibiotic prescriptions where needed",
      "Short waiting times — often seen within 24–48 hours",
    ],
    whatToExpect: [
      "Use olive oil or ear drops for 5–7 days before the appointment if possible (softens wax for easier removal)",
      "The clinician will examine both ears with an otoscope",
      "Microsuction uses a gentle vacuum to remove wax safely under direct visualisation",
      "The procedure typically takes 15–30 minutes and is virtually painless",
      "Your clinician will discuss findings and any further action required",
    ],
    suitableFor: [
      "Anyone experiencing muffled hearing, blocked sensation, or tinnitus due to wax",
      "Patients who have previously had unsuccessful ear syringing or irrigation",
      "People with narrow ear canals, hearing aids, or previous ear surgery",
      "Anyone with ear pain, discharge, or suspected outer ear infection",
    ],
    faqs: [
      {
        q: "Is microsuction ear wax removal better than syringing?",
        a: "Yes. Microsuction is widely considered the gold standard as it uses direct visualisation, carries a lower risk of perforation, and is suitable for patients who cannot have ear irrigation.",
      },
      {
        q: "Do I need to use ear drops before the appointment?",
        a: "We recommend using olive oil or sodium bicarbonate drops twice daily for 5–7 days before your appointment to soften the wax. This makes removal quicker and more comfortable.",
      },
      {
        q: "How often should I have my ears cleaned?",
        a: "Most people's ears are self-cleaning and never need intervention. If you are prone to build-up, we recommend a check every 12 months or when symptoms recur.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Ear health consultation and ear wax removal service",
  },

  "Diagnostic & Testing": {
    headline: "Private Blood Tests & Diagnostic Screening — Fast Results",
    intro:
      "Get clarity about your health with our comprehensive private blood testing and diagnostic screening service. From cholesterol and HbA1c to full thyroid panels, vitamin D, and allergy testing, results are typically available within 24–72 hours with a full pharmacist consultation to explain your findings.",
    benefits: [
      "Comprehensive blood test panels covering 50+ health markers",
      "Fast turnaround — results in 24–72 hours via online portal",
      "Results explained in a follow-up consultation with our pharmacist",
      "No GP referral needed — self-refer for any test",
      "Significantly faster than NHS waiting times for blood test results",
    ],
    whatToExpect: [
      "Book a convenient morning appointment (fasting tests require 8–12 hours without food)",
      "A trained phlebotomist or pharmacist takes a small venous or finger-prick blood sample",
      "Your sample is sent to a UKAS-accredited laboratory on the same day",
      "Results are available online within 24–72 hours",
      "A pharmacist consultation is included to review your results and recommend next steps",
    ],
    suitableFor: [
      "Anyone wanting a comprehensive health MOT or baseline screening",
      "Patients monitoring a known condition such as thyroid disease or diabetes",
      "People with a family history of cardiovascular disease or diabetes",
      "Those checking nutrient levels such as Vitamin D, B12, iron, or ferritin",
    ],
    faqs: [
      {
        q: "Do I need to fast before a blood test?",
        a: "Fasting is required for cholesterol, glucose, HbA1c, and liver function tests. Fast for 8–12 hours (water is fine). Other tests such as Vitamin D or thyroid function do not require fasting.",
      },
      {
        q: "How accurate are the results from your laboratory?",
        a: "All samples are analysed by a UKAS (ISO 15189) accredited laboratory using the same equipment and standards as NHS hospitals. Results are clinically equivalent to those from a GP-ordered test.",
      },
      {
        q: "What happens if my results are abnormal?",
        a: "Our pharmacist will contact you to discuss any abnormal results and recommend appropriate next steps, which may include GP referral, lifestyle changes, or further testing.",
      },
      {
        q: "Can I get a COVID-19 PCR test for international travel?",
        a: "Yes. We offer COVID-19 PCR tests with certified results accepted for travel to most destinations. Results are issued within 24 hours.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1768498993096-6db9950eeb1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Blood test and diagnostic laboratory testing at pharmacy",
  },

  "Lifestyle Treatments": {
    headline: "Private Prescription Treatments for Everyday Health Conditions",
    intro:
      "Our pharmacist prescribers can quickly assess and treat a wide range of common conditions that affect daily life — from hay fever and migraines to cystitis, acid reflux, and IBS. Save time with a private prescription consultation and get the right treatment without a GP appointment.",
    benefits: [
      "Same-day prescriptions for common conditions including hay fever, cystitis, and migraines",
      "Access to prescription-strength treatments not available OTC",
      "Convenient online or face-to-face consultation options",
      "Transparent pricing — no hidden consultation fees",
      "Expert pharmacist prescribers with clinical training in primary care",
    ],
    whatToExpect: [
      "A brief 10–15 minute consultation to discuss your symptoms and medical history",
      "Assessment of suitability for prescription treatment",
      "Prescription issued and medication dispensed at the same appointment",
      "Advice on managing your condition and preventing recurrence",
      "Follow-up consultation available if symptoms persist or worsen",
    ],
    suitableFor: [
      "Adults with recurring hay fever symptoms needing prescription-strength antihistamines",
      "Women with uncomplicated urinary tract infections (cystitis)",
      "Patients with diagnosed migraines needing triptan prescriptions",
      "Anyone managing IBS, acid reflux, or GERD with lifestyle modifications",
    ],
    faqs: [
      {
        q: "Can I get prescription antihistamines for hay fever from a pharmacist?",
        a: "Yes. Our pharmacist prescribers can issue prescriptions for prescription-strength antihistamines and corticosteroid nasal sprays such as Avamys or Dymista that aren't available over the counter.",
      },
      {
        q: "How quickly can I get treatment for a UTI?",
        a: "In most cases, we can prescribe antibiotic treatment for an uncomplicated UTI on the same day. You'll need to provide a urine sample for dipstick testing during the consultation.",
      },
      {
        q: "Can I get migraine treatment without seeing a neurologist?",
        a: "Yes. If you have a confirmed migraine diagnosis, our pharmacist prescribers can issue triptans (e.g., Sumatriptan, Rizatriptan) for acute migraine attacks and refer appropriately if preventative treatment is needed.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Private lifestyle treatment consultation at community pharmacy",
  },

  "Aesthetic & Cosmetic": {
    headline: "Professional Aesthetic & Cosmetic Treatments at Our Clinic",
    intro:
      "Our qualified aesthetic practitioners offer a range of non-surgical cosmetic treatments including anti-wrinkle injections, dermal fillers, chemical peels, microneedling, and IV vitamin drips — all administered in a clinical setting with the highest standards of safety and aftercare.",
    benefits: [
      "Treatments performed by medically qualified practitioners",
      "Full clinical consultation and patch testing before all aesthetic procedures",
      "Natural, subtle results tailored to your facial anatomy and goals",
      "CQC-compliant clinical environment with full aftercare support",
      "Competitive pricing with bespoke treatment packages available",
    ],
    whatToExpect: [
      "A thorough consultation to discuss your goals, medical history, and any contraindications",
      "Photographs taken before treatment for before-and-after comparison",
      "Treatment performed in a clean, clinical environment using sterile, approved products",
      "Detailed aftercare instructions and a follow-up review appointment",
    ],
    suitableFor: [
      "Adults aged 18+ seeking non-surgical facial rejuvenation",
      "People wanting to address fine lines, wrinkles, or volume loss",
      "Those seeking skin texture improvement through peels or microneedling",
      "Anyone interested in vitamin infusion therapies for energy and wellness",
    ],
    faqs: [
      {
        q: "How long do anti-wrinkle injections (Botox) last?",
        a: "Results from botulinum toxin injections typically last 3–4 months. With regular treatment, results may last longer as the muscles relax over time. We recommend a review at 2 weeks after first treatment.",
      },
      {
        q: "Are dermal fillers safe?",
        a: "Yes, when administered by a qualified medical professional in a clinical setting. We use only CE-marked, hyaluronic acid-based fillers (e.g., Juvederm, Belotero) which are biodegradable and reversible.",
      },
      {
        q: "What is the recovery time after a chemical peel?",
        a: "This depends on the peel depth. Superficial peels (lactic, glycolic) have minimal downtime. Medium-depth peels may cause redness and peeling for 3–7 days. Your practitioner will advise on the most suitable option.",
      },
      {
        q: "How does IV vitamin drip therapy work?",
        a: "IV infusions deliver vitamins, minerals, and antioxidants directly into the bloodstream for 100% bioavailability — compared to approximately 50% from oral supplements. Popular formulations include immune boost, energy, and skin brightening infusions.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1761718209708-9ab9ba1c7252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    imageAlt: "Aesthetic and cosmetic clinic treatment at pharmacy",
  },
};

// Service-level overrides for specific high-traffic services
export const serviceOverrides: Record<string, Partial<ServiceContent>> = {
  "nhs-flu": {
    headline: "NHS Flu Vaccination — Free for Eligible Patients",
    intro:
      "Protect yourself and those around you with the free NHS Flu vaccination. Influenza causes over 20,000 hospital admissions in England each year. Our pharmacists administer the flu jab quickly and safely — no GP appointment needed, and no waiting room.",
  },
  "nhs-pfs": {
    headline: "NHS Pharmacy First — Treat 7 Conditions Without a GP",
    intro:
      "Under the NHS Pharmacy First programme, our pharmacists are clinically trained and authorised to assess and treat seven common conditions directly — without a GP appointment. Same-day treatment available, including antibiotic prescriptions where clinically appropriate.",
  },

  // Pharmacy First conditions — condition-specific safety-netting (red-flag) advice.
  "nhs-pf-sinusitis": {
    safetyNetting:
      "Seek urgent help if you develop swelling or redness around the eye, double or blurred vision, a severe or worsening headache, a stiff neck, or confusion — call 111, or 999 if symptoms are severe.",
  },
  "nhs-pf-sore-throat": {
    safetyNetting:
      "Seek urgent help if you have difficulty breathing or swallowing, are drooling, can't open your mouth, or develop a high fever or a rash — call 111 or 999.",
  },
  "nhs-pf-earache": {
    safetyNetting:
      "Seek urgent help if there is swelling, redness or tenderness behind the ear, facial weakness or drooping, a severe headache, a stiff neck, or your child becomes very unwell or floppy — call 111, or 999 in an emergency.",
  },
  "nhs-pf-insect-bite": {
    safetyNetting:
      "Seek urgent help if redness spreads quickly, you develop a high fever or feel very unwell, or you have swelling of the face, lips or tongue, a widespread rash, or difficulty breathing — call 999 if you struggle to breathe, otherwise 111.",
  },
  "nhs-pf-impetigo": {
    safetyNetting:
      "Seek urgent help if the infection spreads rapidly, you develop a fever or feel generally unwell, the blisters become large or widespread, or symptoms don't improve after treatment — call 111.",
  },
  "nhs-pf-shingles": {
    safetyNetting:
      "Seek urgent help if the rash is near your eye or affects your vision, you have a severe headache, stiff neck or confusion, the rash becomes widespread, or you have a weakened immune system — call 111, or 999 if symptoms are severe.",
  },
  "nhs-pf-uti": {
    safetyNetting:
      "Seek urgent help if you develop a high temperature, shivering or chills, pain in your back or side, nausea or vomiting, confusion, or blood in your urine — call 111, or 999 if you feel very unwell.",
  },
  "nhs-bp": {
    headline: "Free NHS Blood Pressure Check — Detect Hypertension Early",
    intro:
      "High blood pressure affects 1 in 4 adults in the UK and is a leading risk factor for heart attacks and strokes. Our free NHS Blood Pressure Check service takes just 5 minutes and is available to all adults aged 40+ — no appointment or GP referral needed.",
  },
  "prv-wegovy": {
    headline: "Wegovy (Semaglutide) Weight Loss Injections — Clinically Proven",
    intro:
      "Wegovy (semaglutide 2.4mg) is a once-weekly injectable GLP-1 receptor agonist approved for chronic weight management. Clinical trials show an average weight loss of 15% of body weight over 68 weeks. Our pharmacist prescribers can assess your eligibility and start your programme immediately.",
  },
  "prv-mounjaro": {
    headline: "Mounjaro (Tirzepatide) — The Most Effective Weight Loss Injection",
    intro:
      "Mounjaro (tirzepatide) is a revolutionary dual GIP/GLP-1 receptor agonist demonstrating unprecedented weight loss results in clinical trials — average losses of 20–22% body weight. Our pharmacist prescribers will assess your suitability and provide ongoing clinical support throughout your treatment.",
  },
  "prv-ear-wax": {
    headline: "Microsuction Ear Wax Removal — Instant Relief, No Mess",
    intro:
      "Blocked ears from wax build-up can cause muffled hearing, tinnitus, and discomfort. Our trained clinicians use the gold-standard microsuction technique for safe, fast, and effective ear wax removal — providing immediate relief in a single 20-minute appointment.",
  },
  "prv-travel-consult": {
    headline: "Travel Health Consultation — Complete Pre-Travel Risk Assessment",
    intro:
      "Our travel health consultation covers everything you need before your trip abroad — from destination-specific vaccination requirements to antimalarial prescriptions, food and water safety advice, and altitude sickness prevention. Ideally booked 6–8 weeks before departure.",
  },
  "prv-yellowfever": {
    headline: "Yellow Fever Vaccination — Certified Yellow Fever Centre",
    intro:
      "We are a registered Yellow Fever vaccination centre authorised to administer the live attenuated Yellow Fever vaccine and issue the official International Certificate of Vaccination or Prophylaxis (ICVP). Required for entry to over 40 countries in Africa and South America.",
  },
};

export function getServiceContent(serviceId: string, category: string): ServiceContent {
  const categoryBase = categoryContent[category] ?? categoryContent["Medication Support"];
  const override = serviceOverrides[serviceId] ?? {};
  return { ...categoryBase, ...override };
}
