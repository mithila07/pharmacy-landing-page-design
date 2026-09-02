import { Plane, Scale, Syringe, Calendar, Activity, HeartPulse, Pill, ShieldCheck, Sparkles, Clock, type LucideIcon } from "lucide-react";
import travelImg from "../../assets/travel.jpeg";
import weightImg from "../../assets/weight-loss.jpeg";
import throatImg from "../../assets/sorethroat.jpg";
import heroImg from "../../assets/hero-bg.jpeg";
import imageBg from "../../assets/image-bg.jpeg";

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
};
