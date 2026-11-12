import { useEffect, useState } from "react";
import { AlertTriangle, CalendarDays, CheckCircle, Clock, Home, Info, MapPin, Phone, Users, LogOut, FastForward } from "lucide-react";
import type { PharmacyLocation } from "../data/locations";
import {
  estimatedWait, formatWait, getTicketStatus, isUrgentQueueService, leaveQueue,
  type QueueDemo, type QueueSnapshot, type QueueTicket,
} from "../data/liveQueue";

/**
 * Live walk-in queue for the NHS contraception services (shared booking page,
 * every brand). Colours come from the brand's --brand-* tokens.
 */

export type BookMode = "queue" | "time";

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

function UrgentNote() {
  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[0.85rem] text-gray-700 flex items-start gap-2.5">
      <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
      <p>Emergency contraception works best the sooner it's taken. If you're worried about the time, call us or come straight in.</p>
    </div>
  );
}

/** "Join the live queue" or "Book a time": shown first on the date & time step. */
export function QueueChoice({ serviceId, mode, onMode, snapshot, demo, onDemo }: {
  serviceId: string;
  mode: BookMode | null;
  onMode: (m: BookMode) => void;
  snapshot: QueueSnapshot;
  demo: QueueDemo;
  onDemo: (d: QueueDemo) => void;
}) {
  const wait = estimatedWait(snapshot.waiting, snapshot.minutesEach);
  const card = (on: boolean) =>
    `relative text-left rounded-xl border-2 p-5 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${on ? "border-brand-primary bg-brand-primary/5" : "border-gray-100 bg-white hover:border-gray-300"}`;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
      {/* Demo-only: preview queue states. Drop when the real queue API is wired in. */}
      <div className="rounded-lg border border-dashed border-brand-primary/40 bg-brand-light/40 p-3 mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2 text-[0.78rem] text-brand-primary" style={{ fontWeight: 600 }}><Info size={14} /> Demo</div>
        <p className="text-[0.78rem] text-gray-600 flex-1">Simulate the live queue:</p>
        <div className="flex gap-2">
          {(["quiet", "busy", "closed"] as const).map((d) => (
            <button key={d} type="button" onClick={() => onDemo(d)} className={`px-3 py-1.5 rounded-md text-[0.78rem] border transition-colors cursor-pointer capitalize ${demo === d ? "border-brand-primary bg-brand-primary text-white" : "border-brand-primary/30 text-gray-700 bg-white hover:border-brand-primary/60"}`} style={{ fontWeight: 500 }}>{d}</button>
          ))}
        </div>
      </div>

      <h3 className="text-gray-900 text-[1rem] mb-1" style={{ fontWeight: 600 }}>How would you like to be seen?</h3>
      <p className="text-[0.85rem] text-gray-500 mb-4">Join today's walk-in queue from home, or book a time that suits you.</p>

      <div role="radiogroup" aria-label="How would you like to be seen?" className="grid sm:grid-cols-2 gap-3">
        <button type="button" role="radio" aria-checked={mode === "queue"} disabled={!snapshot.open} onClick={() => onMode("queue")} className={card(mode === "queue")}>
          <span className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              {snapshot.open && <span className="absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-60 motion-safe:animate-ping" />}
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${snapshot.open ? "bg-brand-secondary" : "bg-gray-300"}`} />
            </span>
            <span className="text-[0.75rem] text-brand-primary" style={{ fontWeight: 600 }}>{snapshot.open ? "Live now" : "Queue closed"}</span>
          </span>
          <span className="block text-gray-900 text-[1rem]" style={{ fontWeight: 700 }}>Join the live queue</span>
          {snapshot.open ? (
            <span className="block text-[0.85rem] text-gray-600 mt-1">
              {snapshot.waiting === 0 ? "No one waiting, you'd be next." : `${snapshot.waiting} ${snapshot.waiting === 1 ? "person" : "people"} waiting. Estimated wait ${formatWait(wait)}.`}
            </span>
          ) : (
            <span className="block text-[0.85rem] text-gray-500 mt-1">The queue runs while we're open. You can still book a time.</span>
          )}
        </button>

        <button type="button" role="radio" aria-checked={mode === "time"} onClick={() => onMode("time")} className={card(mode === "time")}>
          <span className="flex items-center gap-2 mb-2 text-gray-400"><CalendarDays size={16} /><span className="text-[0.75rem]" style={{ fontWeight: 600 }}>Plan ahead</span></span>
          <span className="block text-gray-900 text-[1rem]" style={{ fontWeight: 700 }}>Book a time</span>
          <span className="block text-[0.85rem] text-gray-600 mt-1">Choose a date and time, and we'll have a room ready for you.</span>
        </button>
      </div>

      {isUrgentQueueService(serviceId) && <div className="mt-4"><UrgentNote /></div>}
    </div>
  );
}

/** The queue option, chosen: what joining means, then continue to patient details. */
export function QueueJoinPanel({ branch, snapshot, onContinue }: { branch: PharmacyLocation; snapshot: QueueSnapshot; onContinue: () => void }) {
  const wait = estimatedWait(snapshot.waiting, snapshot.minutesEach);
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-brand-light to-brand-light-alt p-4">
          <p className="text-[0.75rem] text-gray-500" style={{ fontWeight: 500 }}>Waiting now</p>
          <p className="text-[1.6rem] text-gray-900 leading-tight tabular-nums" style={{ fontWeight: 700 }}>{snapshot.waiting}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-brand-light to-brand-light-alt p-4">
          <p className="text-[0.75rem] text-gray-500" style={{ fontWeight: 500 }}>Estimated wait</p>
          <p className="text-[1.15rem] text-gray-900 leading-tight mt-1" style={{ fontWeight: 700 }}>{formatWait(wait)}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2.5 text-[0.88rem] text-gray-700">
        <li className="flex gap-2.5"><CheckCircle size={17} className="text-brand-secondary shrink-0 mt-0.5" /> Add your details and we'll check them against your NHS record.</li>
        <li className="flex gap-2.5"><CheckCircle size={17} className="text-brand-secondary shrink-0 mt-0.5" /> Your place in the queue updates live. Keep this page open.</li>
        <li className="flex gap-2.5"><CheckCircle size={17} className="text-brand-secondary shrink-0 mt-0.5" /> Head to {branch.shortName} when you're next. It's free on the NHS.</li>
      </ul>
      <div className="mt-8 flex justify-end">
        <button onClick={onContinue} className="cta cta-primary bg-brand-primary text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all cursor-pointer" style={{ fontWeight: 600 }}>
          Continue
        </button>
      </div>
    </div>
  );
}

/** Small reminder on the details and contact steps, in queue mode. */
export function QueueSummary({ branch, snapshot }: { branch: PharmacyLocation; snapshot: QueueSnapshot }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-3">
      <span className="w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary grid place-items-center shrink-0"><Users size={19} /></span>
      <p className="text-[0.88rem] text-gray-700">
        You're joining the <span style={{ fontWeight: 600 }}>live queue</span> at {branch.shortName}. {snapshot.waiting === 0 ? "You'd be next." : `${snapshot.waiting} ahead of you right now.`}
      </p>
    </div>
  );
}

/** After joining: live place in the queue. */
export function LiveQueueScreen({ ticket, branch, serviceName, onLeave, onHome }: {
  ticket: QueueTicket;
  branch: PharmacyLocation;
  serviceName: string;
  onLeave: () => void;
  onHome: () => void;
}) {
  const [skip, setSkip] = useState(0); // demo only
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 5000);
    return () => clearInterval(id);
  }, []);
  const status = getTicketStatus(ticket, skip);
  const progress = Math.min(1, (ticket.startPosition - status.position) / Math.max(1, ticket.startPosition));
  const ordinal = (n: number) => `${n}${n % 10 === 1 && n % 100 !== 11 ? "st" : n % 10 === 2 && n % 100 !== 12 ? "nd" : n % 10 === 3 && n % 100 !== 13 ? "rd" : "th"}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-lg w-full">
      <p className="text-[0.8rem] text-gray-500 flex items-center gap-2" style={{ fontWeight: 500 }}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-secondary" />
        </span>
        Live queue, {serviceName}
      </p>

      <div aria-live="polite" className="mt-4">
        {status.state === "called" ? (
          <>
            <h2 className="text-[1.6rem] text-gray-900 leading-tight" style={{ fontWeight: 700 }}>It's your turn, {ticket.firstName}</h2>
            <p className="text-gray-600 mt-2">Please come to the counter at {branch.shortName} and give your ticket number.</p>
          </>
        ) : status.state === "next" ? (
          <>
            <h2 className="text-[1.6rem] text-gray-900 leading-tight" style={{ fontWeight: 700 }}>You're next. Please head in now.</h2>
            <p className="text-gray-600 mt-2">We'll see you in {formatWait(status.waitMinutes)}.</p>
          </>
        ) : (
          <>
            <h2 className="text-[1.6rem] text-gray-900 leading-tight" style={{ fontWeight: 700 }}>You're {ordinal(status.position)} in the queue</h2>
            <p className="text-gray-600 mt-2">Estimated wait {formatWait(status.waitMinutes)}.</p>
          </>
        )}
      </div>

      <div className="mt-5 h-2 rounded-full bg-gray-100 overflow-hidden" aria-hidden="true">
        <div className="h-full rounded-full bg-brand-secondary transition-[width] duration-700 ease-out" style={{ width: `${Math.max(6, progress * 100)}%` }} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-[0.88rem]">
        <div className="rounded-xl bg-gradient-to-br from-brand-light to-brand-light-alt p-4">
          <p className="text-[0.75rem] text-gray-500" style={{ fontWeight: 500 }}>Ticket</p>
          <p className="text-[1.3rem] text-gray-900 tabular-nums" style={{ fontWeight: 700 }}>{ticket.id}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-brand-light to-brand-light-alt p-4">
          <p className="text-[0.75rem] text-gray-500" style={{ fontWeight: 500 }}>Joined</p>
          <p className="text-[1.3rem] text-gray-900 tabular-nums" style={{ fontWeight: 700 }}>{new Date(ticket.joinedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-[0.88rem] text-gray-700">
        <p className="flex gap-2.5"><MapPin size={16} className="text-brand-accent shrink-0 mt-0.5" /> {branch.address}</p>
        <p className="flex gap-2.5"><Phone size={16} className="text-brand-accent shrink-0 mt-0.5" /> <a href={tel(branch.phone)} className="text-brand-primary underline underline-offset-2">{branch.phone}</a></p>
        <p className="flex gap-2.5"><Clock size={16} className="text-brand-accent shrink-0 mt-0.5" /> Keep this page open. Your place updates by itself.</p>
      </div>

      {isUrgentQueueService(ticket.serviceId) && status.state === "waiting" && <div className="mt-5"><UrgentNote /></div>}

      <div className="mt-7 grid sm:grid-cols-2 gap-3">
        <button type="button" onClick={() => { leaveQueue(ticket); onLeave(); }} className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-2 text-[0.9rem]" style={{ fontWeight: 500 }}>
          <LogOut size={16} /> Leave the queue
        </button>
        <button type="button" onClick={onHome} className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-2 text-[0.9rem]" style={{ fontWeight: 500 }}>
          <Home size={16} /> Back to home
        </button>
      </div>

      {/* Demo-only: move the simulated queue forward */}
      {status.state !== "called" && (
        <button type="button" onClick={() => setSkip((s) => s + 1)} className="mt-4 w-full rounded-lg border border-dashed border-brand-primary/40 bg-brand-light/40 py-2 text-[0.78rem] text-brand-primary cursor-pointer flex items-center justify-center gap-1.5" style={{ fontWeight: 600 }}>
          <FastForward size={13} /> Demo: move the queue forward
        </button>
      )}
    </div>
  );
}
