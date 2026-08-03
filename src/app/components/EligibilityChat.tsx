import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { X, ShieldCheck, AlertTriangle, Stethoscope, Leaf, Ban, ArrowRight, Phone, RotateCcw, MessageCircle, Check, Sparkles } from "lucide-react";
import type { Brand } from "../branding";
import { evalAuto, type EligibilityFlow, type EligOutcome, type OutcomeKind, type EligQuestion, type YesNoQuestion, type SingleQuestion, type MultiQuestion, type FlagOption } from "../data/eligibility";
import { privateServices } from "../data/services";

const priceFor = (id?: string) => {
  const s = id ? privateServices.find((p) => p.id === id) : undefined;
  return s?.price ? s.price.replace(/From\s*(\d)/, "From £$1") : undefined;
};
const nameFor = (id?: string) => (id ? privateServices.find((p) => p.id === id)?.name : undefined);
const isYesNo = (q: EligQuestion): q is YesNoQuestion => q.type === undefined || q.type === "yesno";

const KIND_STYLE: Record<OutcomeKind, { icon: typeof ShieldCheck; ring: string; chip: string; chipText: string; label: string }> = {
  eligible: { icon: ShieldCheck, ring: "bg-brand-secondary/12 text-brand-green-ink", chip: "bg-brand-secondary", chipText: "text-white", label: "Gateway reached" },
  urgent: { icon: AlertTriangle, ring: "bg-red-100 text-red-600", chip: "bg-red-500", chipText: "text-white", label: "Needs urgent care" },
  "refer-gp": { icon: Stethoscope, ring: "bg-amber-100 text-amber-600", chip: "bg-amber-500", chipText: "text-white", label: "See your GP" },
  "self-care": { icon: Leaf, ring: "bg-sky-100 text-sky-600", chip: "bg-sky-500", chipText: "text-white", label: "Self-care advised" },
  ineligible: { icon: Ban, ring: "bg-amber-100 text-amber-600", chip: "bg-amber-500", chipText: "text-white", label: "Not NHS-eligible" },
};

type Msg = { id: number; role: "bot" | "user" | "note"; text: string; help?: string };

// ── Shared outcome actions ────────────────────────────────────────────────
function OutcomeActions({ outcome, brand, onEligible, onRetake, onClose }: { outcome: EligOutcome; brand: Brand; onEligible: () => void; onRetake: () => void; onClose: () => void }) {
  const navigate = useNavigate();
  const altName = nameFor(outcome.privateAlternative);
  const altPrice = priceFor(outcome.privateAlternative);

  if (outcome.kind === "eligible") {
    return (
      <button onClick={onEligible} className="cta cta-primary w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full cursor-pointer" style={{ fontWeight: 700 }}>
        Continue to booking <ArrowRight size={16} />
      </button>
    );
  }

  return (
    <div className="space-y-2.5">
      {outcome.kind === "urgent" && (
        <div className="flex gap-2.5">
          <a href="tel:111" className="cta cta-primary flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full no-underline" style={{ fontWeight: 700 }}><Phone size={15} /> Call 111</a>
          <a href="tel:999" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full no-underline bg-red-500 text-white hover:bg-red-600 transition-colors" style={{ fontWeight: 700 }}><Phone size={15} /> 999</a>
        </div>
      )}
      {outcome.privateAlternative && (
        <button
          onClick={() => navigate(`${brand.basePath}/book/${outcome.privateAlternative}`)}
          className="cta cta-primary w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full cursor-pointer"
          style={{ fontWeight: 700 }}
        >
          Book {altName} privately{altPrice ? ` · ${altPrice}` : ""} <ArrowRight size={15} />
        </button>
      )}
      <div className="flex gap-2.5">
        <button onClick={onRetake} className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border text-[0.88rem] cursor-pointer hover:bg-black/[0.03] transition-colors" style={{ borderColor: "var(--icare-line, #d3e3d8)", fontWeight: 600 }}>
          <RotateCcw size={14} /> Retake check
        </button>
        <button onClick={onClose} className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-brand-primary/60 hover:text-brand-primary text-[0.88rem] cursor-pointer" style={{ fontWeight: 600 }}>
          Finish consultation
        </button>
      </div>
    </div>
  );
}

function OutcomeCard({ outcome, brand, cautions, onEligible, onRetake, onClose }: { outcome: EligOutcome; brand: Brand; cautions: string[]; onEligible: () => void; onRetake: () => void; onClose: () => void }) {
  const s = KIND_STYLE[outcome.kind];
  const Icon = s.icon;
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${s.ring}`}><Icon size={22} /></span>
        <div>
          <span className={`inline-block text-[0.66rem] uppercase tracking-[0.12em] px-2 py-0.5 rounded-full ${s.chip} ${s.chipText}`} style={{ fontWeight: 700 }}>{s.label}</span>
          <h4 className="font-display text-brand-primary text-[1.15rem] leading-tight mt-1" style={{ fontWeight: 700 }}>{outcome.title}</h4>
        </div>
      </div>
      <p className="text-[0.9rem] text-brand-primary/70 leading-relaxed mb-4">{outcome.message}</p>

      {/* Cautions the pharmacist should review — only on the eligible path. */}
      {outcome.kind === "eligible" && cautions.length > 0 && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
          <p className="flex items-center gap-1.5 text-[0.82rem] text-amber-800 mb-1.5" style={{ fontWeight: 700 }}>
            <AlertTriangle size={14} /> The pharmacist will review these with you
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[0.82rem] text-amber-800/90 leading-snug">
            {cautions.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}

      <OutcomeActions outcome={outcome} brand={brand} onEligible={onEligible} onRetake={onRetake} onClose={onClose} />
    </div>
  );
}

// ── Chat modal ────────────────────────────────────────────────────────────
export function EligibilityChat({ flow, brand, open, onClose, onEligible, onOutcome, context }: {
  flow: EligibilityFlow;
  brand: Brand;
  open: boolean;
  onClose: () => void;
  onEligible: () => void;
  onOutcome?: (o: EligOutcome) => void;
  /** Data already known about the patient (e.g. age from their entered DOB). */
  context?: { age?: number };
}) {
  const idRef = useRef(0);
  const timers = useRef<number[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [currentQ, setCurrentQ] = useState<string | null>(null);
  const [multiSel, setMultiSel] = useState<Set<number>>(new Set());
  const [pendingSingle, setPendingSingle] = useState<number | null>(null); // single option awaiting "specify" text
  const [specifyText, setSpecifyText] = useState("");
  const [cautions, setCautions] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<EligOutcome | null>(null);
  const [typing, setTyping] = useState(false);

  const nextId = () => ++idRef.current;
  const pushBot = (text: string, help?: string) => setMessages((m) => [...m, { id: nextId(), role: "bot", text, help }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { id: nextId(), role: "user", text }]);
  const pushNote = (text: string) => setMessages((m) => [...m, { id: nextId(), role: "note", text }]);
  const addCaution = (note: string) => setCautions((c) => (c.includes(note) ? c : [...c, note]));
  const clearTimers = () => { timers.current.forEach((t) => clearTimeout(t)); timers.current = []; };
  const after = (ms: number, fn: () => void) => { const t = window.setTimeout(fn, ms); timers.current.push(t); };

  const ask = (qid: string) => {
    const q = flow.questions[qid];
    // Auto-resolve age questions when we already know the patient's age.
    if (isYesNo(q) && q.auto && context?.age != null) {
      setTyping(true);
      after(450, () => {
        setTyping(false);
        pushNote(`Age ${context.age} used from your details`);
        resolve(evalAuto(q.auto!, context.age!) ? q.yes : q.no);
      });
      return;
    }
    setTyping(true);
    after(650, () => {
      setTyping(false);
      pushBot(q.text, q.help);
      setMultiSel(new Set());
      setPendingSingle(null);
      setSpecifyText("");
      setCurrentQ(qid);
    });
  };

  const resolve = (target: string) => {
    if (flow.outcomes[target]) {
      setTyping(true);
      after(700, () => {
        setTyping(false);
        const o = flow.outcomes[target];
        setOutcome(o);
        onOutcome?.(o);
      });
    } else {
      ask(target);
    }
  };

  const answerYesNo = (val: "yes" | "no") => {
    if (!currentQ) return;
    const q = flow.questions[currentQ] as YesNoQuestion;
    pushUser(val === "yes" ? "Yes" : "No");
    setCurrentQ(null);
    // A flagged answer either hard-stops or records a caution before continuing.
    if (q.flag && q.flag.on === val) {
      if (q.flag.level === "stop") return resolve(flow.stop!);
      if (q.flag.level === "caution" && q.flag.note) addCaution(q.flag.note);
    }
    resolve(val === "yes" ? q.yes : q.no);
  };

  const chooseSingle = (opt: FlagOption, text?: string) => {
    const extra = text?.trim();
    pushUser(opt.label + (extra ? ` — ${extra}` : ""));
    setCurrentQ(null);
    setPendingSingle(null);
    if (opt.flag === "stop") return resolve(flow.stop!);
    if (opt.flag === "caution" && opt.note) addCaution(opt.note);
    resolve(opt.goto!);
  };

  const onSingleClick = (i: number) => {
    const q = flow.questions[currentQ!] as SingleQuestion;
    const opt = q.options[i];
    if (opt.specify) { setPendingSingle(i); setSpecifyText(""); }
    else chooseSingle(opt);
  };

  const toggleMulti = (i: number) => {
    const q = flow.questions[currentQ!] as MultiQuestion;
    const opt = q.options[i];
    setMultiSel((s) => {
      const n = new Set(s);
      if (n.has(i)) { n.delete(i); return n; }
      if (opt.exclusive) return new Set([i]); // "None of the above" clears the rest
      q.options.forEach((o, idx) => { if (o.exclusive) n.delete(idx); }); // any real answer clears "None"
      n.add(i);
      return n;
    });
  };

  const submitMulti = () => {
    if (!currentQ) return;
    const q = flow.questions[currentQ] as MultiQuestion;
    const selected = q.options.filter((_, i) => multiSel.has(i));
    const extra = specifyText.trim();
    pushUser((selected.length ? selected.map((o) => o.label).join(", ") : "None of these") + (extra ? ` — ${extra}` : ""));
    setCurrentQ(null);
    if (selected.some((o) => o.flag === "stop")) return resolve(flow.stop!);
    selected.forEach((o) => { if (o.flag === "caution" && o.note) addCaution(o.note); });
    const legacy = selected.find((o) => o.goto); // back-compat with goto-branching flows
    resolve(legacy?.goto ?? q.next);
  };

  const start = () => {
    clearTimers();
    idRef.current = 0;
    setOutcome(null);
    setCurrentQ(null);
    setMultiSel(new Set());
    setPendingSingle(null);
    setSpecifyText("");
    setCautions([]);
    setTyping(false);
    setMessages([{ id: nextId(), role: "bot", text: flow.intro }]);
    ask(flow.start);
  };

  useEffect(() => {
    if (open) start();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, flow.serviceId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, outcome]);

  // Lock background scroll while the modal is open, so the page behind can't
  // scroll instead of the modal's own scroll areas.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const q = currentQ ? flow.questions[currentQ] : null;
  const tag = flow.tag ?? "NHS Pharmacy First";
  const multiNeedsSpecify = q && q.type === "multi" && q.options.some((o, i) => multiSel.has(i) && o.specify);

  return createPortal(
    <div
      className={`elig-overlay fixed inset-0 z-[70] flex items-end justify-center bg-brand-primary/45 backdrop-blur-sm ${brand.themeClass}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${flow.condition} eligibility check`}
    >
      {/* Tall bottom-up drawer — a big container so the question and long option
          lists both have plenty of room, on mobile and desktop alike. */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="elig-panel bg-[#f6f8f8] flex flex-col overflow-hidden shadow-2xl w-full max-w-3xl h-[94dvh] rounded-t-3xl"
      >
        {/* Grab handle — signals the drawer */}
        <div className="flex justify-center pt-2.5 pb-1 shrink-0">
          <span className="h-1.5 w-10 rounded-full bg-brand-primary/15" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b bg-white shrink-0" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
          <span className="relative w-10 h-10 rounded-full bg-brand-light flex items-center justify-center shrink-0">
            <img src={brand.logoMark ?? brand.logo} alt="" className="w-7 h-7 object-contain" />
            <span className="absolute -bottom-0 -right-0 w-3 h-3 rounded-full bg-brand-secondary border-2 border-white" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-brand-primary text-[0.95rem] leading-tight" style={{ fontWeight: 700 }}>{brand.name} eligibility check</p>
            <p className="text-brand-primary/50 text-[0.78rem] truncate">{flow.condition} · {tag}</p>
          </div>
          <button onClick={onClose} className="text-brand-primary/40 hover:text-brand-primary cursor-pointer p-1 shrink-0" aria-label="Close"><X size={22} /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-3">
          {messages.map((m) => (
            m.role === "note" ? (
              <div key={m.id} className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 text-[0.74rem] text-brand-primary/45 bg-brand-secondary/8 rounded-full px-3 py-1"><Sparkles size={12} /> {m.text}</span>
              </div>
            ) : m.role === "bot" ? (
              <div key={m.id} className="flex items-end gap-2 max-w-[88%]">
                <span className="w-7 h-7 rounded-full bg-brand-light flex items-center justify-center shrink-0 mb-0.5">
                  <img src={brand.logoMark ?? brand.logo} alt="" className="w-5 h-5 object-contain" />
                </span>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm border" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
                  <p className="text-[0.92rem] text-brand-primary leading-relaxed">{m.text}</p>
                  {m.help && <p className="text-[0.78rem] text-brand-primary/50 mt-1.5 leading-snug">{m.help}</p>}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-end">
                <div className="bg-brand-secondary text-white rounded-2xl rounded-br-md px-4 py-2.5 shadow-sm max-w-[88%]" style={{ fontWeight: 600 }}>
                  <p className="text-[0.92rem]">{m.text}</p>
                </div>
              </div>
            )
          ))}

          {typing && (
            <div className="flex items-end gap-2">
              <span className="w-7 h-7 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                <img src={brand.logoMark ?? brand.logo} alt="" className="w-5 h-5 object-contain" />
              </span>
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border flex items-center gap-1" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 animate-bounce" style={{ animationDelay: "120ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 animate-bounce" style={{ animationDelay: "240ms" }} />
              </div>
            </div>
          )}

          {outcome && (
            <div className="pt-1">
              <OutcomeCard outcome={outcome} brand={brand} cautions={cautions} onEligible={onEligible} onRetake={start} onClose={onClose} />
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Answer dock — options are styled identically so we never suggest an answer */}
        <div className="shrink-0 border-t bg-white px-4 py-3 shadow-[0_-10px_24px_-16px_rgba(16,24,40,0.18)]" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
          {q && !typing ? (
            isYesNo(q) ? (
              <div className="flex gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button key={v} onClick={() => answerYesNo(v)} className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-full border-2 cursor-pointer transition-colors hover:bg-brand-secondary/5 text-brand-primary" style={{ borderColor: "var(--icare-line, #d3e3d8)", fontWeight: 700 }}>
                    {v === "yes" ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            ) : q.type === "single" ? (
              <div className="space-y-2">
                {/* Options scroll within the bar so long lists never crowd out the question. */}
                <div className="max-h-[50vh] overflow-y-auto space-y-2 -mr-1 pr-1 overscroll-contain">
                  {q.options.map((o, i) => {
                    const isPending = pendingSingle === i;
                    return (
                      <button
                        key={o.label}
                        onClick={() => onSingleClick(i)}
                        className={`w-full text-left px-4 py-3 rounded-2xl border-2 cursor-pointer transition-colors text-brand-primary ${isPending ? "border-brand-secondary bg-brand-secondary/8" : "hover:bg-brand-secondary/5"}`}
                        style={!isPending ? { borderColor: "var(--icare-line, #d3e3d8)", fontWeight: 600 } : { fontWeight: 600 }}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
                {pendingSingle != null && q.options[pendingSingle].specify && (
                  <div className="pt-1 space-y-2">
                    <input
                      value={specifyText}
                      onChange={(e) => setSpecifyText(e.target.value)}
                      autoFocus
                      placeholder="Please specify"
                      className="w-full px-4 py-2.5 rounded-2xl border-2 text-[0.9rem] text-brand-primary focus:outline-none focus:border-brand-secondary"
                      style={{ borderColor: "var(--icare-line, #d3e3d8)" }}
                    />
                    <button onClick={() => chooseSingle(q.options[pendingSingle], specifyText)} className="cta cta-primary w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full cursor-pointer" style={{ fontWeight: 700 }}>
                      Continue <ArrowRight size={15} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {/* Options scroll within the bar; the specify field + Continue stay pinned below. */}
                <div className="max-h-[50vh] overflow-y-auto space-y-2 -mr-1 pr-1 overscroll-contain">
                  {q.options.map((o, i) => {
                    const on = multiSel.has(i);
                    return (
                      <button
                        key={o.label}
                        onClick={() => toggleMulti(i)}
                        className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-2xl border-2 cursor-pointer transition-colors ${on ? "border-brand-secondary bg-brand-secondary/8" : "hover:bg-black/[0.02]"}`}
                        style={!on ? { borderColor: "var(--icare-line, #d3e3d8)" } : undefined}
                      >
                        <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${on ? "bg-brand-secondary border-brand-secondary text-white" : "border-brand-primary/30"}`}>{on && <Check size={13} />}</span>
                        <span className="text-[0.9rem] text-brand-primary" style={{ fontWeight: 600 }}>{o.label}</span>
                      </button>
                    );
                  })}
                </div>
                {multiNeedsSpecify && (
                  <input
                    value={specifyText}
                    onChange={(e) => setSpecifyText(e.target.value)}
                    placeholder="Please give details"
                    className="w-full px-4 py-2.5 rounded-2xl border-2 text-[0.9rem] text-brand-primary focus:outline-none focus:border-brand-secondary"
                    style={{ borderColor: "var(--icare-line, #d3e3d8)" }}
                  />
                )}
                <button onClick={submitMulti} className="cta cta-primary w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full cursor-pointer mt-1" style={{ fontWeight: 700 }}>
                  Continue <ArrowRight size={15} />
                </button>
              </div>
            )
          ) : (
            <p className="text-center text-[0.74rem] text-brand-primary/40 py-1.5">A pharmacist makes the final decision. Your answers stay private.</p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── Inline gate (shown in the booking page when triage hasn't been passed) ──
export function EligibilityGate({ flow, brand, outcome, onStart }: { flow: EligibilityFlow; brand: Brand; outcome: EligOutcome | null; onStart: () => void }) {
  const navigate = useNavigate();
  const blocked = outcome && outcome.kind !== "eligible";
  const free = flow.free !== false;

  if (blocked) {
    return (
      <div className="max-w-xl mx-auto">
        <OutcomeCard outcome={outcome!} brand={brand} cautions={[]} onEligible={onStart} onRetake={onStart} onClose={() => navigate(brand.basePath || "/")} />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl border shadow-sm p-6 sm:p-8 text-center" style={{ borderColor: "var(--icare-line, #d3e3d8)" }}>
      <span className="w-14 h-14 rounded-2xl bg-brand-secondary/12 text-brand-green-ink flex items-center justify-center mx-auto mb-4"><MessageCircle size={26} /></span>
      <h3 className="font-display text-brand-primary text-[1.4rem] leading-tight mb-2" style={{ fontWeight: 700 }}>Quick eligibility check</h3>
      <p className="text-brand-primary/60 text-[0.95rem] leading-relaxed max-w-md mx-auto mb-6">
        We ask a few quick questions about {flow.condition.toLowerCase()} before booking. It takes about a minute, runs as a private chat, and makes sure the pharmacist can actually help.
      </p>
      <button onClick={onStart} className="cta cta-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full cursor-pointer" style={{ fontWeight: 700 }}>
        Start eligibility check <ArrowRight size={16} />
      </button>
      <p className="text-[0.78rem] text-brand-primary/40 mt-4 flex items-center justify-center gap-1.5">
        <ShieldCheck size={13} /> {free ? "Free · no GP referral needed" : "Private · pharmacist-assessed"}
      </p>
    </div>
  );
}
