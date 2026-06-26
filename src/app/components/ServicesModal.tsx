import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { X, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import type { Brand } from "../branding";
import { nhsServices, privateServices, getServiceCategories, type Service } from "../data/services";

type Props = { brand: Brand; open: boolean; onClose: () => void };

const formatPrice = (s: Service) => (s.price ? s.price.replace(/From\s*(\d)/, "From £$1") : "Private");

/** Full service picker — clearly split into Free · NHS and Private clinics. */
export function ServicesModal({ brand, open, onClose }: Props) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"nhs" | "private">("nhs");
  if (!open) return null;

  const list = tab === "nhs" ? nhsServices : privateServices;
  const categories = getServiceCategories(list);

  const pick = (id: string) => { onClose(); navigate(`${brand.basePath}/book/${id}`); };

  const Tab = ({ id, label, count }: { id: "nhs" | "private"; label: string; count: number }) => (
    <button
      onClick={() => setTab(id)}
      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[0.9rem] cursor-pointer transition-colors ${tab === id ? "bg-brand-primary text-white" : "text-brand-primary/70 hover:text-brand-primary"}`}
      style={{ fontWeight: 600 }}
    >
      {id === "nhs" ? <ShieldCheck size={16} /> : <Tag size={16} />}
      {label}
      <span className={`text-[0.72rem] px-1.5 py-0.5 rounded-full ${tab === id ? "bg-white/20" : "bg-brand-primary/10"}`}>{count}</span>
    </button>
  );

  return createPortal(
    <div className={`fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-4 bg-brand-primary/40 backdrop-blur-sm overflow-y-auto ${brand.themeClass}`} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b" style={{ borderColor: "var(--icare-line)" }}>
          <div className="flex items-center gap-3">
            <img src={brand.logoMark ?? brand.logo} alt="" className="w-10 h-10 object-contain" />
            <div>
              <h3 className="font-display text-[1.15rem] text-brand-primary" style={{ fontWeight: 700 }}>Book an appointment</h3>
              <p className="text-[0.84rem] text-brand-primary/55">Choose a service to continue — we'll confirm pricing as you book.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-brand-primary/40 hover:text-brand-primary cursor-pointer p-1 shrink-0" aria-label="Close">
            <X size={22} />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-3 sm:p-4">
          <div className="flex gap-2 p-1 rounded-2xl" style={{ backgroundColor: "var(--icare-paper, #eaf2ed)" }}>
            <Tab id="nhs" label="Free · NHS" count={nhsServices.length} />
            <Tab id="private" label="Private" count={privateServices.length} />
          </div>
        </div>

        {/* List */}
        <div className="px-3 sm:px-4 pb-4 overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat} className="mb-5 last:mb-1">
              <p className="px-2 mb-2 text-[0.72rem] uppercase tracking-[0.14em] text-brand-primary/45" style={{ fontWeight: 700 }}>{cat}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {list.filter((s) => s.category === cat).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => pick(s.id)}
                    className="group text-left flex items-center gap-3 p-3 rounded-2xl border hover:border-brand-secondary/50 hover:bg-brand-light/40 transition-colors cursor-pointer"
                    style={{ borderColor: "var(--icare-line)" }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.9rem] text-brand-primary truncate" style={{ fontWeight: 600 }}>{s.name}</p>
                      <p className="text-[0.78rem] text-brand-primary/55 truncate">{s.description}</p>
                    </div>
                    <span
                      className={`shrink-0 text-[0.72rem] px-2 py-1 rounded-full ${tab === "nhs" ? "bg-brand-secondary text-white" : "bg-brand-primary/8 text-brand-primary"}`}
                      style={{ fontWeight: 700 }}
                    >
                      {tab === "nhs" ? "Free" : formatPrice(s)}
                    </span>
                    <ArrowRight size={15} className="text-brand-primary/25 group-hover:text-brand-secondary transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
