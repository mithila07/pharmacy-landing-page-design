import type { ComponentType } from "react";
import { Plane, Scale, Syringe, Calendar, Activity, HeartPulse, Pill, ShieldCheck, Sparkles, Clock, type LucideIcon } from "lucide-react";
import { Activity as IcActivity, Airplane, ChatBubble, ClipboardCheck, HealthShield, Heart, NoSmokingCircle, PharmacyCrossCircle, Sparks } from "iconoir-react";
import travelImg from "../../assets/travel.jpeg";
import weightImg from "../../assets/weight-loss.jpeg";
import throatImg from "../../assets/sorethroat.jpg";
import heroImg from "../../assets/hero-bg.jpeg";
import imageBg from "../../assets/image-bg.jpeg";
import adviceImg from "../../assets/about-1.jpeg";
import bpImg from "../../assets/about-2.jpeg";
import { DMP_IMG } from "./dewsbury";
import counterImg from "../../assets/about-bg.jpeg";

/**
 * Per-brand content for the three Kepple-Lane-template builds (J Morris, Acre,
 * Meadows). One shared template (hero, landing, about, contact) reads this by
 * brand id, so the three sites differ only by data — logo, colours, font and
 * the content below. Where the client didn't specify, standard templated
 * pharmacy copy is used, positioning each as a trusted NHS & private provider.
 */

export type HeroSlide = { id: string; name: string; tag: string; desc: string; icon: LucideIcon; img: string };

/** Matches LandingPageSimple's CardItem shape (private-services cards). */
export type TemplateCard = {
  id: string;
  imageUrl: string;
  ctaLabel: string;
  accent: "private";
  highlight?: { icon: LucideIcon; label: string };
};

export type TemplateConfig = {
  hero: { eyebrow: string; title1: string; title2: string; subtitle: string; slides: HeroSlide[] };
  privateCards: TemplateCard[];
  about: { accent: string; subtitle: string; story: string[]; stats: { value: string; label: string }[] };
  /**
   * Repeat-prescription nomination: adds the home-page banner and the contact
   * page's nomination + enquiry forms. Requested by J Morris.
   */
  nomination?: boolean;
  /** Where contact-page forms POST to. Leave unset and the forms run in preview (nothing is sent). */
  forms?: { endpoint?: string };
  /**
   * Optional sections inspired by pharmappy.com's design suite, so a template
   * site can look its own. Requested for Dewsbury Moor; other brands leave it unset.
   *  - bookingGroups: the services in the full-page booking overlay, grouped by need
   *  - bento: a bento grid of everyday services, with its own heading
   *  - closingCta: a last "book or call" band above the footer
   */
  extras?: { bookingGroups?: QuickPathway[]; bento?: BentoTile[]; bentoHeading?: { lead: string; accent: string; intro: string; id?: string }; closingCta?: { title: string; subtitle: string; img?: string } };
  /** Replacement photos for the Pharmacy First cards, keyed by service id. */
  pfImages?: Record<string, string>;
  /** The home page's questions, when the shared set mentions services this pharmacy doesn't offer. */
  faqs?: { q: string; a: string }[];
};

/** Any icon component (Lucide or Iconoir) — sized with width/height. */
export type IconType = ComponentType<{ className?: string; width?: number | string; height?: number | string; strokeWidth?: number | string }>;

/** How a patient gets a service: book a time online, or just come in. */
export type Access = "book" | "walk-in";
export type QuickService = { id: string; name: string; note: string; access: Access };
export type QuickPathway = { id: string; label: string; intro: string; icon: IconType; services: QuickService[] };

/** A bento tile: a bookable service (`serviceId`), a walk-in service, or a link (`href`). */
export type BentoTile = {
  title: string;
  desc: string;
  img: string;
  icon: IconType;
  tag: string;
  size?: "lg";
  serviceId?: string;
  href?: string;
  cta: string;
};

const card = (id: string, imageUrl: string, label: string, icon: LucideIcon): TemplateCard => ({
  id, imageUrl, ctaLabel: "Book this service", accent: "private", highlight: { icon, label },
});

// Reusable Unsplash imagery for the private-service cards (matches the rest of the site).
const IMG = {
  weight: "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  travel: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  b12: "https://images.unsplash.com/photo-1608326389386-0305acbe600f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  period: "https://images.unsplash.com/photo-1631815589068-dc4b0b2e0d43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  flu: "https://images.unsplash.com/photo-1584362917165-526a968579e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  bp: "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  yellow: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
  ed: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
};

export const templateSites: Record<string, TemplateConfig> = {
  jmorris: {
    nomination: true,
    forms: { endpoint: undefined }, // TODO: set to the pharmacy's form handler before launch
    hero: {
      eyebrow: "NHS & private pharmacy — Ashton-in-Makerfield",
      title1: "Trusted local care,",
      title2: "the easy way.",
      subtitle: "NHS Pharmacy First, dispensing and private clinics on Wigan Road — book a same-day pharmacist appointment online.",
      slides: [
        { id: "prv-weight-consult", name: "Weight management", tag: "From £30", desc: "A private plan built around you, including weight-loss injections where they're suitable.", icon: Scale, img: weightImg },
        { id: "prv-travel-consult", name: "Travel clinic", tag: "From £25", desc: "Pre-travel advice and vaccinations, all in one visit.", icon: Plane, img: travelImg },
        { id: "prv-vitamin-injection", name: "Vitamin B12 injections", tag: "From £30", desc: "Quick, energising B12 injections by appointment.", icon: Syringe, img: imageBg },
        { id: "prv-period-delay", name: "Period delay", tag: "From £15", desc: "Delay your period for a holiday or a special event.", icon: Calendar, img: heroImg },
      ],
    },
    privateCards: [
      card("prv-weight-consult", IMG.weight, "Injections available", Sparkles),
      card("prv-travel-consult", IMG.travel, "Full travel clinic", ShieldCheck),
      card("prv-vitamin-injection", IMG.b12, "By appointment", Clock),
      card("prv-period-delay", IMG.period, "Ideal before a holiday", Calendar),
    ],
    about: {
      accent: "close to home.",
      subtitle: "J Morris Pharmacy on Wigan Road brings NHS and private care together under one roof — friendly, reliable and close to home in Ashton-in-Makerfield.",
      story: [
        "J Morris Pharmacy is a trusted community pharmacy in Ashton-in-Makerfield. From everyday prescriptions to NHS Pharmacy First and private clinics, our team is here to help you get seen and treated without the wait.",
        "Under NHS Pharmacy First our pharmacists can assess and treat a range of everyday conditions without a GP appointment, and our private services cover travel health, weight management, vitamin B12 injections and more — all in a dedicated consultation room.",
      ],
      stats: [
        { value: "7", label: "NHS conditions treated free" },
        { value: "NHS", label: "& private, one roof" },
        { value: "1:1", label: "Private consultation room" },
        { value: "WN4", label: "Wigan Road, Ashton" },
      ],
    },
  },

  acre: {
    hero: {
      eyebrow: "NHS & private healthcare — Huddersfield",
      title1: "Trusted healthcare,",
      title2: "on your doorstep.",
      subtitle: "NHS Pharmacy First, dispensing, vaccinations and private clinics on New Hey Road — book online in minutes.",
      slides: [
        { id: "prv-weight-consult", name: "Weight management", tag: "From £30", desc: "A private weight-management plan, including weight-loss injections where suitable.", icon: Scale, img: weightImg },
        { id: "prv-flu-private", name: "Private flu jab", tag: "£20", desc: "For anyone not eligible on the NHS — no appointment needed for most patients.", icon: Syringe, img: throatImg },
        { id: "nhs-bp", name: "Blood pressure check", tag: "Free · NHS", desc: "A free NHS blood pressure check for adults over 40.", icon: Activity, img: heroImg },
        { id: "nhs-pf-sore-throat", name: "Pharmacy First", tag: "Free · NHS", desc: "Assessment and treatment for common conditions — no GP appointment needed.", icon: HeartPulse, img: imageBg },
      ],
    },
    privateCards: [
      card("prv-weight-consult", IMG.weight, "Injections available", Sparkles),
      card("prv-flu-private", IMG.flu, "For non-NHS patients", ShieldCheck),
    ],
    about: {
      accent: "you can trust.",
      subtitle: "Acre Pharmacy on New Hey Road brings NHS and private care together for Huddersfield — an accredited Healthy Living Pharmacy dedicated to your wellbeing.",
      story: [
        "Trading as Acre Pharmacy, Dickinsons Chemist is a trusted community pharmacy in Huddersfield. Alongside NHS dispensing and repeat prescriptions, we offer NHS Pharmacy First treatment for common conditions and a growing range of private services.",
        "As a Healthy Living Pharmacy, our team is trained to support your health and wellbeing — from blood pressure checks and vaccinations to weight management and self-care advice, all close to home.",
      ],
      stats: [
        { value: "7", label: "NHS conditions treated free" },
        { value: "NHS", label: "& private, one roof" },
        { value: "HLP", label: "Healthy Living Pharmacy" },
        { value: "HD3", label: "New Hey Road, Huddersfield" },
      ],
    },
  },

  meadows: {
    hero: {
      eyebrow: "Your community pharmacy — Maghull",
      title1: "Friendly, reliable care,",
      title2: "for all of Maghull.",
      subtitle: "A true community pharmacy on Liverpool Road South — NHS Pharmacy First, private clinics and a full travel service, all easy to book online.",
      slides: [
        { id: "prv-weight-consult", name: "Weight management", tag: "From £30", desc: "A private plan built around you, including weight-loss injections where they're suitable.", icon: Scale, img: weightImg },
        { id: "prv-travel-consult", name: "Travel clinic", tag: "From £25", desc: "Travel vaccinations, yellow fever and antimalarials — all in one visit.", icon: Plane, img: travelImg },
        { id: "prv-vitamin-injection", name: "Vitamin B12 injections", tag: "From £30", desc: "Quick, energising B12 injections by appointment.", icon: Syringe, img: imageBg },
        { id: "prv-yellowfever", name: "Yellow fever", tag: "From £65", desc: "A designated yellow fever centre — certificate issued on the day.", icon: ShieldCheck, img: heroImg },
      ],
    },
    privateCards: [
      card("prv-weight-consult", IMG.weight, "Injections available", Sparkles),
      card("prv-travel-consult", IMG.travel, "Full travel clinic", ShieldCheck),
      card("prv-vitamin-injection", IMG.b12, "By appointment", Clock),
      card("prv-yellowfever", IMG.yellow, "Certificate on the day", ShieldCheck),
      card("prv-period-delay", IMG.period, "Ideal before a holiday", Calendar),
      card("prv-ed", IMG.ed, "Discreet & confidential", Pill),
    ],
    about: {
      accent: "for our community.",
      subtitle: "A true community pharmacy in Maghull with a loyal patient base, dedicated to friendly, reliable care and easy access to the services that support your health.",
      story: [
        "We are a true community pharmacy located in Maghull with a loyal patient base. We are dedicated to providing friendly and reliable care to our patients and will do our best to ensure everybody has equal and easy access to services that support their health and wellbeing.",
        "From NHS Pharmacy First and Care at the Chemist to a full range of private clinics — travel health, vaccinations, women's and men's health and more — our team is here to help you get seen and treated close to home.",
      ],
      stats: [
        { value: "7", label: "NHS conditions treated free" },
        { value: "NHS", label: "& private, one roof" },
        { value: "1:1", label: "Private consultation room" },
        { value: "L31", label: "Liverpool Road South, Maghull" },
      ],
    },
  },

  dewsbury: {
    pfImages: DMP_IMG,
    faqs: [
      { q: "Do I need an appointment, or can I just walk in?", a: "You can walk in during opening hours to see a pharmacist. Booking ahead means we'll have the consultation room ready for you, so you won't wait as long." },
      { q: "Is NHS Pharmacy First really free?", a: "Yes. The consultation is free on the NHS. If the pharmacist gives you a medicine, the usual prescription charge applies unless you're exempt." },
      { q: "Can I talk to someone in private?", a: "Of course. Just ask at the counter and we'll take you into our consultation room, where no one else can hear." },
      { q: "How do I get my repeat prescriptions from you?", a: "Choose Dewsbury Moor Pharmacy as your nominated pharmacy, using our online form, the NHS App or at your GP surgery. Your GP then sends your prescriptions straight to us." },
      { q: "Who can have a free NHS flu jab?", a: "Usually people aged 65 and over, pregnant women and people with certain long-term health conditions. If you don't qualify, you can book a private flu jab with us." },
      { q: "Is my information kept confidential?", a: "Always. We handle your information in line with NHS confidentiality and data protection rules, and only share what's needed for your care, with your consent." },
    ],
    hero: {
      eyebrow: "Your community pharmacy, Dewsbury Moor",
      title1: "Friendly local care,",
      title2: "on Heckmondwike Road.",
      subtitle: "See a pharmacist today without a GP appointment, collect your prescriptions, or book a flu jab.",
      slides: [
        { id: "nhs-pf-sore-throat", name: "NHS Pharmacy First", tag: "Free on the NHS", desc: "Help with sore throats, earache, urine infections and more, without waiting for your GP.", icon: HeartPulse, img: adviceImg },
        { id: "nhs-flu", name: "Flu jabs", tag: "Free if you're eligible", desc: "NHS flu vaccinations, plus a private flu jab if you don't qualify.", icon: Syringe, img: heroImg },
        { id: "nhs-bp", name: "Blood pressure check", tag: "Free on the NHS", desc: "A quick, free check for adults aged 40 and over.", icon: Activity, img: bpImg },
      ],
    },
    privateCards: [
      card("prv-flu-private", IMG.flu, "For non-NHS patients", ShieldCheck),
    ],
    about: {
      accent: "who knows you.",
      subtitle: "Dewsbury Moor Pharmacy on Heckmondwike Road looks after local families with prescriptions, NHS services and friendly advice, close to home.",
      story: [
        "Dewsbury Moor Pharmacy is an independent community pharmacy on Heckmondwike Road. Alongside your NHS prescriptions, we offer free NHS services such as Pharmacy First, flu jabs and blood pressure checks, plus a small range of private services.",
        "Our team has time to talk. If you'd rather speak in private, just ask at the counter and we'll take you into our consultation room. We stock a wide range of over-the-counter and pharmacy medicines, and we're happy to help you choose.",
      ],
      stats: [
        { value: "7", label: "Conditions treated free on the NHS" },
        { value: "1:1", label: "Private consultation room" },
        { value: "Mon–Fri", label: "Open 9am to 6pm" },
        { value: "WF13", label: "Heckmondwike Road, Dewsbury" },
      ],
    },
    extras: {
      bookingGroups: [
        {
          id: "unwell",
          label: "I'm feeling unwell",
          intro: "See a pharmacist today with NHS Pharmacy First. It's free, and you don't need a GP appointment.",
          icon: Heart,
          services: [
            { id: "nhs-pf-sore-throat", name: "Sore throat", note: "Age 5 and over", access: "book" },
            { id: "nhs-pf-earache", name: "Earache", note: "Age 1 to 17", access: "book" },
            { id: "nhs-pf-sinusitis", name: "Sinusitis", note: "Age 12 and over", access: "book" },
            { id: "nhs-pf-uti", name: "Urine infection", note: "Women aged 16 to 64", access: "book" },
            { id: "nhs-pf-insect-bite", name: "Infected insect bite", note: "Age 1 and over", access: "book" },
            { id: "nhs-pf-impetigo", name: "Impetigo", note: "Age 1 and over", access: "book" },
            { id: "nhs-pf-shingles", name: "Shingles", note: "Age 18 and over", access: "book" },
          ],
        },
        {
          id: "nhs",
          label: "Free NHS checks and jabs",
          intro: "Free NHS services for people who qualify. We'll check you're eligible when you come in.",
          icon: HealthShield,
          services: [
            { id: "nhs-flu", name: "Flu jab", note: "Free if you're eligible", access: "book" },
            { id: "nhs-bp", name: "Blood pressure check", note: "Adults aged 40 and over", access: "book" },
            { id: "nhs-smoking", name: "Stop smoking support", note: "Weekly help to quit", access: "book" },
            { id: "nhs-nms", name: "New Medicine Service", note: "Support when you start a new medicine", access: "book" },
            { id: "nhs-contraception", name: "Contraception", note: "Start or continue the pill", access: "book" },
            { id: "nhs-sti", name: "Emergency contraception", note: "Book or join the live queue", access: "book" },
            { id: "inhaler-check", name: "Inhaler check", note: "Just ask at the counter", access: "walk-in" },
          ],
        },
        {
          id: "private",
          label: "Private services",
          intro: "Quick, confidential care that isn't covered by the NHS.",
          icon: Sparks,
          services: [
            { id: "prv-weight-consult", name: "Weight loss clinic", note: "A confidential consultation", access: "book" },
            { id: "prv-ear-wax", name: "Ear wax removal", note: "Both ears checked first", access: "book" },
            { id: "prv-flu-private", name: "Private flu jab", note: "If you don't qualify on the NHS", access: "book" },
            { id: "prv-chicken-pox", name: "Chickenpox vaccine", note: "For children and adults", access: "book" },
            { id: "prv-hpv", name: "HPV vaccine", note: "Protection against HPV", access: "book" },
            { id: "prv-period-delay", name: "Period delay", note: "For holidays and special occasions", access: "book" },
            { id: "prv-hayfever", name: "Hay fever", note: "When remedies aren't enough", access: "book" },
            { id: "prv-cold-sore", name: "Cold sores", note: "Treatment to shorten an outbreak", access: "book" },
            { id: "prv-migraine", name: "Migraine", note: "A review of your options", access: "book" },
            { id: "prv-fungal", name: "Fungal nail", note: "Discoloured or thickened nails", access: "book" },
            { id: "prv-vitamin-injection", name: "Vitamin B12 service", note: "A consultation to check it suits you", access: "book" },
            { id: "prv-ehc", name: "Emergency contraception", note: "Just ask at the counter", access: "walk-in" },
            { id: "pregnancy-test", name: "Pregnancy test", note: "Just ask at the counter", access: "walk-in" },
          ],
        },
        {
          id: "travel",
          label: "Travel clinic",
          intro: "Vaccines and advice for your trip. Book six to eight weeks before you travel.",
          icon: Airplane,
          services: [
            { id: "prv-travel-consult", name: "Travel consultation", note: "We'll plan what you need", access: "book" },
            { id: "prv-hep-a", name: "Hepatitis A", note: "Travel vaccine", access: "book" },
            { id: "prv-hep-b", name: "Hepatitis B", note: "Travel vaccine, given as a course", access: "book" },
            { id: "prv-typhoid", name: "Typhoid", note: "Travel vaccine", access: "book" },
            { id: "prv-cholera", name: "Cholera", note: "Travel vaccine", access: "book" },
            { id: "prv-rabies", name: "Rabies", note: "Travel vaccine", access: "book" },
            { id: "prv-meningitis", name: "Meningitis ACWY", note: "For Hajj, Umrah and some regions", access: "book" },
            { id: "prv-japanese-enc", name: "Japanese encephalitis", note: "Travel vaccine", access: "book" },
            { id: "prv-tickborne", name: "Tick-borne encephalitis", note: "Travel vaccine", access: "book" },
            { id: "prv-malaria", name: "Malaria prevention", note: "Advice and tablets if suitable", access: "book" },
            { id: "prv-altitude", name: "Altitude sickness", note: "Advice and treatment if suitable", access: "book" },
          ],
        },
      ],
      bentoHeading: { id: "more-nhs", lead: "More free NHS care,", accent: "right on your doorstep.", intro: "Checks, jabs and support with your medicines, all free on the NHS for people who qualify." },
      bento: [
        { size: "lg", title: "Your prescriptions, sorted", desc: "Choose us as your pharmacy in the NHS App or at your GP surgery, and your prescriptions come straight to us, ready to collect.", img: heroImg, icon: ClipboardCheck, tag: "NHS prescriptions", href: "https://www.nhs.uk/nhs-app/nhs-app-help-and-support/prescriptions-in-the-nhs-app/", cta: "How to choose us in the NHS App" },
        { title: "NHS flu jab", desc: "Free if you're 65 or over, pregnant or have certain health conditions.", img: DMP_IMG["nhs-flu"], icon: PharmacyCrossCircle, tag: "Free if you're eligible", serviceId: "nhs-flu", cta: "Book a flu jab" },
        { title: "Blood pressure check", desc: "A quick, free check for adults aged 40 and over.", img: bpImg, icon: IcActivity, tag: "Free on the NHS", serviceId: "nhs-bp", cta: "Book a check" },
        { title: "Stop smoking support", desc: "Friendly weekly support to help you quit for good.", img: imageBg, icon: NoSmokingCircle, tag: "Free on the NHS", serviceId: "nhs-smoking", cta: "Book a chat" },
        { title: "Help with your medicines", desc: "Extra support when you start a new medicine, and inhaler checks to make sure yours is working.", img: DMP_IMG["nhs-nms"], icon: ChatBubble, tag: "Free on the NHS", serviceId: "nhs-nms", cta: "Book a medicines chat" },
      ],
      closingCta: {
        title: "Not sure what you need?",
        subtitle: "Pop in, give us a call or book online. We'll point you in the right direction.",
        img: counterImg,
      },
    },
  },
};
