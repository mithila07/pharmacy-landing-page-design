/**
 * Live walk-in queue for the NHS contraception services.
 *
 * SIMULATED: there is no queue backend yet. Every call below stands in for an
 * API request; swap the bodies for real `fetch` calls (ConX or the pharmacy's
 * own system) and the screens keep working. Expected API shape:
 *
 *   GET    /queue/{branchId}?service={serviceId}  -> QueueSnapshot
 *   POST   /queue/{branchId}                      -> QueueTicket
 *          body { serviceId, patient: { firstName, lastName, dob, phone, email } }
 *   GET    /queue/tickets/{ticketId}              -> TicketStatus  (poll every ~5 s)
 *   DELETE /queue/tickets/{ticketId}              -> 204           (leave the queue)
 *
 * A joined ticket is kept in localStorage so a refresh or a closed tab doesn't
 * lose the patient's place.
 */

/** Services that offer "Join the live queue" alongside "Book a time". */
export const QUEUE_SERVICE_IDS = new Set(["nhs-contraception", "nhs-sti"]);
export const isQueueService = (id?: string) => !!id && QUEUE_SERVICE_IDS.has(id);
/** Emergency contraception works best taken as soon as possible, so it gets an urgency note. */
export const isUrgentQueueService = (id?: string) => id === "nhs-sti";

/** Demo scenarios for previewing the queue (shown in a demo-only box, like the NHS record toggle). */
export type QueueDemo = "quiet" | "busy" | "closed";

export type QueueSnapshot = {
  /** False when the branch isn't taking walk-ins right now (closed, or queue paused). */
  open: boolean;
  /** People waiting ahead of anyone who joins now. */
  waiting: number;
  /** Average minutes per patient, used for the estimated wait. */
  minutesEach: number;
};

export type QueueTicket = {
  id: string;
  branchId: string;
  serviceId: string;
  /** Place in the queue when joined (1 = next). */
  startPosition: number;
  minutesEach: number;
  joinedAt: number;
  firstName: string;
};

export type TicketStatus = {
  /** Current place (1 = next). 0 = it's their turn. */
  position: number;
  /** Estimated minutes until they're seen. */
  waitMinutes: number;
  state: "waiting" | "next" | "called";
};

const DEMO: Record<QueueDemo, QueueSnapshot> = {
  quiet: { open: true, waiting: 1, minutesEach: 10 },
  busy: { open: true, waiting: 6, minutesEach: 12 },
  closed: { open: false, waiting: 0, minutesEach: 10 },
};

/** How busy the queue is right now. `branchOpen` comes from the branch's opening hours. */
export function getQueueSnapshot(_branchId: string, _serviceId: string, branchOpen: boolean, demo: QueueDemo): QueueSnapshot {
  const s = DEMO[demo];
  return branchOpen ? s : { ...s, open: false };
}

export const estimatedWait = (people: number, minutesEach: number) => Math.max(0, people) * minutesEach;

/** "about 20 minutes", "less than 5 minutes", "about 1 hour 10 minutes". */
export function formatWait(minutes: number): string {
  if (minutes < 5) return "less than 5 minutes";
  const m = Math.round(minutes / 5) * 5;
  if (m < 60) return `about ${m} minutes`;
  const h = Math.floor(m / 60), r = m % 60;
  return `about ${h} hour${h > 1 ? "s" : ""}${r ? ` ${r} minutes` : ""}`;
}

const storeKey = (branchId: string, serviceId: string) => `queue-ticket:${branchId}:${serviceId}`;

export function joinQueue(snapshot: QueueSnapshot, branchId: string, serviceId: string, firstName: string): QueueTicket {
  const ticket: QueueTicket = {
    id: `Q${Math.floor(100 + Math.random() * 900)}`,
    branchId,
    serviceId,
    startPosition: snapshot.waiting + 1,
    minutesEach: snapshot.minutesEach,
    joinedAt: Date.now(),
    firstName,
  };
  try { localStorage.setItem(storeKey(branchId, serviceId), JSON.stringify(ticket)); } catch { /* storage blocked */ }
  return ticket;
}

/** A ticket the patient already holds for this branch and service, if any. */
export function loadTicket(branchId: string, serviceId: string): QueueTicket | null {
  try {
    const raw = localStorage.getItem(storeKey(branchId, serviceId));
    if (!raw) return null;
    const t = JSON.parse(raw) as QueueTicket;
    // Tickets expire after 4 hours (the pharmacy will have closed or seen them)
    return Date.now() - t.joinedAt < 4 * 60 * 60 * 1000 ? t : (leaveQueue(t), null);
  } catch { return null; }
}

export function leaveQueue(ticket: QueueTicket) {
  try { localStorage.removeItem(storeKey(ticket.branchId, ticket.serviceId)); } catch { /* storage blocked */ }
}

/**
 * Where the patient is now. Simulated: one person is seen every `minutesEach`
 * minutes since they joined. `skipAhead` lets the demo move them forward.
 */
export function getTicketStatus(ticket: QueueTicket, skipAhead = 0, now = Date.now()): TicketStatus {
  const seen = Math.floor((now - ticket.joinedAt) / (ticket.minutesEach * 60_000)) + skipAhead;
  const position = Math.max(0, ticket.startPosition - seen);
  const sinceLast = ((now - ticket.joinedAt) / 60_000) % ticket.minutesEach;
  const waitMinutes = position === 0 ? 0 : Math.max(1, (position - 1) * ticket.minutesEach + (ticket.minutesEach - sinceLast));
  return { position, waitMinutes, state: position === 0 ? "called" : position === 1 ? "next" : "waiting" };
}
