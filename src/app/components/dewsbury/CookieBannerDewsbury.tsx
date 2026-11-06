import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Cookie } from "iconoir-react";

const KEY = "dmp-cookie-consent";
type Choice = "all" | "essential";

/** Read the saved choice; storage can be blocked (private mode), so never throw. */
function saved(): Choice | null {
  try { return (localStorage.getItem(KEY) as Choice | null) ?? null; } catch { return null; }
}

/**
 * Cookie notice, shown on first visit. Essential cookies (booking, remembering
 * this choice) always run; "Accept all" also allows analytics once they exist.
 * The choice is stored in localStorage and the banner stays away afterwards.
 */
export function CookieBannerDewsbury() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (saved()) return;
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  const choose = (c: Choice) => {
    try { localStorage.setItem(KEY, c); } catch { /* storage blocked: just close */ }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="dmp-cookie-title"
          aria-describedby="dmp-cookie-text"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed z-[70] bottom-4 left-4 right-4 sm:right-auto sm:max-w-md rounded-3xl bg-white/90 backdrop-blur-xl ring-1 ring-black/5 shadow-[0_24px_60px_-20px_rgba(2,32,28,0.45)] p-6"
        >
          <div className="flex items-start gap-3">
            <span className="w-11 h-11 rounded-2xl bg-brand-light text-brand-secondary grid place-items-center shrink-0">
              <Cookie width={22} height={22} />
            </span>
            <div>
              <h2 id="dmp-cookie-title" className="font-display text-slate-900 text-[1.2rem]" style={{ fontWeight: 700 }}>We use cookies</h2>
              <p id="dmp-cookie-text" className="text-slate-600 text-[0.92rem] leading-relaxed mt-1">
                Essential cookies keep booking working. With your permission, we'd also like to use analytics cookies to see how the site is used.{" "}
                <a href="#" className="text-brand-primary underline underline-offset-4" style={{ fontWeight: 600 }}>Cookie policy</a>
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => choose("essential")} className="dmp-btn dmp-btn--light">Essential only</button>
            <button type="button" onClick={() => choose("all")} className="dmp-btn">Accept all</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
