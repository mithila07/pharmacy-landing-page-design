import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { pharmacyInfo } from "../data/services";
import { carefirstBrand, type Brand } from "../branding";

export function ContactSection({ brand = carefirstBrand }: { brand?: Brand } = {}) {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[1.7rem] md:text-[2rem] text-brand-primary text-center mb-10" style={{ fontWeight: 700 }}>Find Us</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 h-[350px] bg-gray-100">
            <iframe
              src={pharmacyInfo.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pharmacy Location"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[1.2rem] text-brand-primary mb-4" style={{ fontWeight: 700 }}>{brand.name}</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin size={18} className="text-brand-accent mt-0.5 shrink-0" />
                  <span className="text-[0.9rem]">{pharmacyInfo.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-brand-accent shrink-0" />
                  <a href={`tel:${pharmacyInfo.phone}`} className="text-[0.9rem] hover:text-brand-primary">{pharmacyInfo.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-brand-accent shrink-0" />
                  <a href={`mailto:${pharmacyInfo.email}`} className="text-[0.9rem] hover:text-brand-primary">{pharmacyInfo.email}</a>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-brand-accent" />
                <h4 className="text-brand-primary" style={{ fontWeight: 600 }}>Opening Hours</h4>
              </div>
              <div className="bg-gradient-to-br from-brand-light via-brand-light-alt to-brand-secondary/10 rounded-lg p-4 space-y-2">
                {pharmacyInfo.openingHours.map((item) => (
                  <div key={item.day} className="flex justify-between text-[0.9rem]">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="text-brand-primary" style={{ fontWeight: 500 }}>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pharmacyInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-2.5 rounded-lg text-[0.9rem] hover:shadow-lg hover:shadow-emerald-900/20 transition-all"
            >
              <MapPin size={16} /> Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
