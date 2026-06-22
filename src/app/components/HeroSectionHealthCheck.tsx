import { useNavigate } from "react-router";
import { Calendar, Heartbeat, MapPin, Check, ShieldCheck, Clock, CaretRight, Stethoscope, IconContext } from "@phosphor-icons/react";
import { healthcheckBrand } from "../branding";

/**
 * HealthCheck — "Crisp Clinical" hero.
 *
 * Deliberately type-led (no stock photo, per the brand brief): a big Outfit
 * headline with the blue→cyan→green swoosh as the accent, two clear actions
 * (Book appointment / Explore services), a live opening-status trust row, and
 * a compact quick-actions card. Light mode, AA contrast.
 */

// Live open/closed from the Bradford hours (Mon–Fri 9–6, weekends closed).
function useOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 Sun … 6 Sat
  const hour = now.getHours();
  const isWeekday = day >= 1 && day <= 5;
  const open = isWeekday && hour >= 9 && hour < 18;
  if (open) return { open: true, label: "Open now · closes 6pm" };
  if (isWeekday && hour < 9) return { open: false, label: "Opens 9am today" };
  return { open: false, label: "Opens Mon 9am" };
}

export function HeroSectionHealthCheck() {
  const brand = healthcheckBrand;
  const navigate = useNavigate();
  const status = useOpenStatus();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const quickActions = [
    { icon: Calendar, label: "Book appointment", hint: "NHS & private", onClick: () => scrollTo("nhs-services") },
    { icon: Heartbeat, label: "Pharmacy First", hint: "No GP needed", onClick: () => scrollTo("nhs-services") },
    { icon: Stethoscope, label: "Private clinics", hint: "Skip the queue", onClick: () => scrollTo("private-services") },
    { icon: MapPin, label: "Find us", hint: "Bradford, BD7", onClick: () => navigate(brand.contactPath!) },
  ];

  return (
    <IconContext.Provider value={{ weight: "duotone" }}>
    <section className="relative overflow-hidden">
      {/* Calm brand mesh wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 12% 18%, rgba(0,93,230,0.16), transparent 70%), radial-gradient(55% 65% at 88% 24%, rgba(0,178,59,0.16), transparent 70%), #F2F7FD",
        }}
      />
      {/* Decorative swoosh shape, top-right */}
      <div
        aria-hidden="true"
        className="hc-swoosh-bar absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full opacity-[0.10] blur-2xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-14 lg:pt-20 lg:pb-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-10 items-center">
        {/* Left — type-led */}
        <div>
          {/* Eyebrow (styled span, not a heading) */}
          <p className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full pl-1.5 pr-3.5 py-1.5 shadow-sm border border-[#D0E0F2] mb-6">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-secondary text-white"><Check size={12} weight="bold" /></span>
            <span className="text-[0.8rem] text-[#4A5B72]" style={{ fontWeight: 600 }}>NHS &amp; private care under one roof — Bradford</span>
          </p>

          <h1 className="font-display text-[#111D30] text-[2.5rem] sm:text-[3rem] lg:text-[3.6rem] leading-[1.05] mb-5" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            Your local pharmacy and{" "}
            <span className="hc-swoosh-text">health clinic.</span>
          </h1>

          <p className="text-[#4A5B72] text-[1.1rem] leading-relaxed max-w-xl mb-8">
            Book an appointment or get treated for common conditions with NHS Pharmacy First — friendly, qualified clinicians, all in one place.
          </p>

          {/* Single clear action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("nhs-services")}
              className="hc-btn-gradient inline-flex items-center justify-center gap-2 px-7 rounded-xl text-[1rem] min-h-[48px] cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              <Stethoscope size={18} /> Explore our services
            </button>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-8 text-[0.85rem]">
            <span className="inline-flex items-center gap-2" style={{ fontWeight: 600 }}>
              <span className={`w-2.5 h-2.5 rounded-full ${status.open ? "bg-brand-secondary" : "bg-[#B5780A]"}`} />
              <span className="text-[#111D30]" style={{ fontVariantNumeric: "tabular-nums" }}>{status.label}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#4A5B72]">
              <ShieldCheck size={15} className="text-brand-primary" /> GPhC-registered pharmacy
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#4A5B72]">
              <MapPin size={15} className="text-brand-accent" /> 127 Great Horton Road, BD7
            </span>
          </div>
        </div>

        {/* Right — quick-actions card */}
        <div className="relative">
          <div className="rounded-2xl bg-white border border-[#D0E0F2] shadow-[0_1px_2px_rgba(17,29,48,0.04),0_8px_24px_rgba(17,29,48,0.06)] overflow-hidden">
            <div className="hc-swoosh-bar h-1.5 w-full" />
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={15} className="text-brand-primary" />
                <p className="text-[0.82rem] text-[#4A5B72]" style={{ fontWeight: 600 }}>What can we help with today?</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((a) => {
                  const inner = (
                    <>
                      <span className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3 group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                        <a.icon size={20} />
                      </span>
                      <span className="block text-[0.92rem] text-[#111D30] leading-tight" style={{ fontWeight: 600 }}>{a.label}</span>
                      <span className="block text-[0.76rem] text-[#4A5B72] mt-0.5">{a.hint}</span>
                    </>
                  );
                  const cls = "group text-left rounded-xl border border-[#D0E0F2] bg-white p-4 min-h-[64px] hover:-translate-y-0.5 hover:shadow-md hover:border-brand-primary/40 transition-all cursor-pointer no-underline";
                  return (
                    <button key={a.label} onClick={a.onClick} className={cls}>{inner}</button>
                  );
                })}
              </div>
              <button
                onClick={() => navigate(brand.contactPath!)}
                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-[0.85rem] text-brand-primary hover:gap-2.5 transition-all cursor-pointer"
                style={{ fontWeight: 600 }}
              >
                See opening hours &amp; directions <CaretRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swoosh divider into the next section */}
      <div aria-hidden="true" className="hc-swoosh-bar h-[3px] w-full opacity-80" />
    </section>
    </IconContext.Provider>
  );
}
