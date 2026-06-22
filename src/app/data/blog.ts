export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: { name: string; role: string };
  /** ISO date. */
  date: string;
  readMinutes: number;
  image: string;
  content: BlogBlock[];
};

// Covers use Unsplash; ImageWithFallback shows a placeholder if any fail to load.
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400`;

export const blogPosts: BlogPost[] = [
  {
    slug: "pharmacy-first-what-your-pharmacist-can-treat",
    title: "NHS Pharmacy First: 7 conditions your pharmacist can now treat",
    excerpt:
      "You no longer need a GP appointment for many common illnesses. Here's exactly what your local pharmacist can assess — and treat — under NHS Pharmacy First.",
    category: "NHS Services",
    author: { name: "James Okafor", role: "Independent Prescriber" },
    date: "2026-06-02",
    readMinutes: 6,
    image: img("1576091160550-2173dba999ef"),
    content: [
      {
        type: "paragraph",
        text: "Since the NHS Pharmacy First service launched, community pharmacists have been able to assess and treat seven common conditions directly — including supplying prescription-only medicines such as antibiotics where clinically appropriate. For most people, that means same-day treatment without the wait for a GP appointment.",
      },
      { type: "heading", text: "The seven conditions" },
      {
        type: "list",
        items: [
          "Sinusitis (adults and children aged 12+)",
          "Sore throat (aged 5+)",
          "Earache (children aged 1–17)",
          "Infected insect bites (aged 1+)",
          "Impetigo (aged 1+)",
          "Shingles (adults aged 18+)",
          "Uncomplicated urinary tract infections (women aged 16–64)",
        ],
      },
      { type: "heading", text: "What happens in a consultation?" },
      {
        type: "paragraph",
        text: "Your pharmacist will ask about your symptoms, how long you've had them, and your medical history. They follow the same clinical pathways a GP would, including clear safety-netting advice on when to seek urgent help. If treatment isn't appropriate, or your symptoms point to something more serious, they'll refer you on.",
      },
      {
        type: "quote",
        text: "Pharmacy First isn't a downgrade from seeing your GP — it's the right clinician, in the right place, at the right time.",
        cite: "James Okafor, Independent Prescriber",
      },
      { type: "heading", text: "Do I need to book?" },
      {
        type: "paragraph",
        text: "You can walk in, but booking ahead means we can have a private consultation room ready for you. If you complete the short pre-consultation questionnaire when you book, your pharmacist can review your details in advance and see you more quickly.",
      },
    ],
  },
  {
    slug: "weight-loss-injections-wegovy-vs-mounjaro",
    title: "Wegovy vs Mounjaro: which weight loss injection is right for you?",
    excerpt:
      "Both deliver impressive results, but they work differently. A clinical pharmacist breaks down how they compare on effectiveness, side effects and suitability.",
    category: "Weight Management",
    author: { name: "Daniel Brooks", role: "Clinical Pharmacist" },
    date: "2026-05-21",
    readMinutes: 7,
    image: img("1607619056574-7b8d3ee536b2"),
    content: [
      {
        type: "paragraph",
        text: "GLP-1 weight loss injections have transformed medical weight management. The two most talked-about options — Wegovy (semaglutide) and Mounjaro (tirzepatide) — both lead to significant, sustained weight loss when combined with diet and lifestyle changes. But they aren't identical.",
      },
      { type: "heading", text: "How they work" },
      {
        type: "paragraph",
        text: "Wegovy mimics a single gut hormone (GLP-1) that reduces appetite and slows digestion. Mounjaro is a dual agonist, acting on both GLP-1 and GIP receptors — which is why trials have shown even greater average weight loss.",
      },
      { type: "heading", text: "What the evidence shows" },
      {
        type: "list",
        items: [
          "Wegovy: average weight loss of around 15% of body weight over 68 weeks.",
          "Mounjaro: average weight loss of 20–22% in clinical trials.",
          "Both are once-weekly self-administered injections.",
          "Both require a clinical assessment and ongoing pharmacist support.",
        ],
      },
      {
        type: "quote",
        text: "The best injection is the one that's clinically right for you — and that you can stick with safely. That's what the consultation is for.",
        cite: "Daniel Brooks, Clinical Pharmacist",
      },
      { type: "heading", text: "Are they suitable for everyone?" },
      {
        type: "paragraph",
        text: "No. Eligibility depends on your BMI, medical history and current medications. Our pharmacist prescribers assess your suitability, explain the side effects, and provide ongoing reviews throughout your programme — never just hand over a pen and send you on your way.",
      },
    ],
  },
  {
    slug: "pre-travel-vaccination-checklist",
    title: "Travelling abroad? Your pre-trip vaccination checklist",
    excerpt:
      "From yellow fever certificates to antimalarials, here's how to plan your travel health so nothing derails your trip — ideally 6–8 weeks before you fly.",
    category: "Travel Health",
    author: { name: "Priya Nair", role: "Lead Travel Health Nurse" },
    date: "2026-05-09",
    readMinutes: 5,
    image: img("1488646953014-85cb44e25828"),
    content: [
      {
        type: "paragraph",
        text: "Travel health is about more than jabs. A good pre-travel consultation looks at where you're going, what you'll be doing, and your own health — then builds a plan around it. The earlier you book, the more options you have, as some vaccines need multiple doses.",
      },
      { type: "heading", text: "Start 6–8 weeks before you fly" },
      {
        type: "list",
        items: [
          "Check destination-specific vaccine requirements and recommendations.",
          "Allow time for multi-dose courses (e.g. hepatitis B, rabies).",
          "Arrange antimalarial tablets if you're heading to a malaria zone.",
          "Get your Yellow Fever certificate if your destination requires one.",
          "Pack a basic travel health kit and know the food and water rules.",
        ],
      },
      { type: "heading", text: "Left it late?" },
      {
        type: "paragraph",
        text: "Don't skip your consultation just because you're flying soon. Even a few days out, we can often still offer meaningful protection and practical advice — it's always better than travelling unprepared.",
      },
    ],
  },
  {
    slug: "beat-hay-fever-pharmacist-guide",
    title: "Beat hay fever this season: a pharmacist's guide",
    excerpt:
      "Streaming eyes and endless sneezing? You don't have to wait it out. Here's how to build a hay fever plan that actually works.",
    category: "Wellness",
    author: { name: "Aisha Strachan", role: "Superintendent Pharmacist" },
    date: "2026-04-24",
    readMinutes: 4,
    image: img("1502741224143-90386d7f8c82"),
    content: [
      {
        type: "paragraph",
        text: "Hay fever affects around one in four people in the UK, and symptoms can seriously dent your quality of life through spring and summer. The good news: with the right combination of treatments, most people can get on top of it.",
      },
      { type: "heading", text: "Build your layers of defence" },
      {
        type: "list",
        items: [
          "A daily non-drowsy antihistamine, started before the season peaks.",
          "A steroid nasal spray for congestion and a runny nose.",
          "Antihistamine eye drops for itchy, watering eyes.",
          "Simple habits: wraparound sunglasses, a balm around the nostrils, and a shower after being outdoors.",
        ],
      },
      {
        type: "quote",
        text: "Most hay fever 'failures' are really timing failures — start treatment before your symptoms do.",
        cite: "Aisha Strachan, Superintendent Pharmacist",
      },
      { type: "heading", text: "When to ask a pharmacist" },
      {
        type: "paragraph",
        text: "If over-the-counter options aren't cutting it, speak to us. We can recommend prescription-strength treatments and check there are no interactions with your other medicines — no GP appointment needed.",
      },
    ],
  },
  {
    slug: "ear-microsuction-vs-cotton-buds",
    title: "Why microsuction beats cotton buds every time",
    excerpt:
      "Cotton buds push wax deeper and can damage your ears. Here's why microsuction is the safe, fast way to clear blocked ears.",
    category: "Ear Care",
    author: { name: "Priya Nair", role: "Lead Travel Health Nurse" },
    date: "2026-04-08",
    readMinutes: 4,
    image: img("1559757175-080c2c66f6c8"),
    content: [
      {
        type: "paragraph",
        text: "Blocked ears from wax build-up are one of the most common — and most uncomfortable — minor complaints we see. They can cause muffled hearing, a feeling of fullness, and even tinnitus. But the way many people try to fix it at home often makes things worse.",
      },
      { type: "heading", text: "Put the cotton buds down" },
      {
        type: "paragraph",
        text: "Cotton buds tend to push wax further down the canal and compact it against the eardrum. At worst, they can scratch the delicate canal or perforate the eardrum. The ear is largely self-cleaning — it rarely needs help from anything you'd insert into it.",
      },
      { type: "heading", text: "How microsuction works" },
      {
        type: "list",
        items: [
          "A clinician uses a microscope and gentle suction — no water flushing.",
          "It's quick, usually taking around 15–20 minutes.",
          "You see (and feel) the results immediately.",
          "It's suitable for most people, including those with a perforated eardrum.",
        ],
      },
      {
        type: "paragraph",
        text: "If your ears feel blocked, book a microsuction appointment rather than reaching for a cotton bud. Your ears — and your hearing — will thank you.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
