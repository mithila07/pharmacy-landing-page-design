import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { PrescriptionCTA } from "../components/PrescriptionCTA";
import { ServiceSection } from "../components/ServiceSection";
import { ShopSection } from "../components/ShopSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { nhsServices, onlineDoctorServices, inPersonPrivateServices } from "../data/services";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PrescriptionCTA />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light/60 via-white to-white" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-brand-alt/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <ServiceSection
            id="online-doctor"
            title="Online Doctor"
            subtitle="Consult with our pharmacists online for lifestyle treatments, prescriptions and expert advice — from the comfort of your home."
            badge="Online Consultations"
            services={onlineDoctorServices}
            isNHS={false}
            accentColor="var(--brand-alt)"
          />
        </div>
      </div>
      <ServiceSection
        id="nhs-services"
        title="Free NHS Services"
        subtitle="Access these services at no cost through the NHS. No GP appointment needed for most services."
        badge="NHS Services"
        services={nhsServices}
        isNHS={true}
        accentColor="var(--brand-primary)"
      />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-light-alt/40 to-white" />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <ServiceSection
            id="private-services"
            title="Private Services"
            subtitle="In-person private consultations, vaccinations, diagnostics and specialist treatments. Book online or walk in."
            badge="Private Services"
            services={inPersonPrivateServices}
            isNHS={false}
            accentColor="var(--brand-secondary)"
          />
        </div>
      </div>
      <ShopSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}