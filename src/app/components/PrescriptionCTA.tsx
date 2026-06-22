import { Upload, Truck, Clock, ShieldCheck } from "lucide-react";

export function PrescriptionCTA() {
  return (
    <section id="prescription" className="py-16 relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary-mid to-brand-secondary" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-accent/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-brand-darkest/40 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-accent/10 rounded-full blur-3xl rotate-12" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center text-white mb-10">
          <h2 className="text-[1.8rem] md:text-[2.2rem] mb-3" style={{ fontWeight: 700 }}>Order Your Prescription Online</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-[0.95rem]">Upload your prescription or nominate us as your pharmacy. We'll prepare your medicines and notify you when they're ready.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { icon: Upload, title: "Upload Prescription", desc: "Take a photo or upload your prescription" },
            { icon: Clock, title: "Quick Turnaround", desc: "Ready within 2 hours of receiving" },
            { icon: Truck, title: "Free Delivery", desc: "Free local delivery available" },
            { icon: ShieldCheck, title: "Safe & Secure", desc: "All data handled confidentially" },
          ].map((item) => (
            <div key={item.title} className="text-center text-white">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-white/10">
                <item.icon size={24} />
              </div>
              <h4 style={{ fontWeight: 600 }}>{item.title}</h4>
              <p className="text-white/55 text-[0.83rem] mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-white text-brand-primary px-8 py-3.5 rounded-lg text-[1rem] hover:shadow-xl hover:shadow-black/10 transition-all cursor-pointer" style={{ fontWeight: 600 }}>
            Send Your Prescription Now
          </button>
        </div>
      </div>
    </section>
  );
}
