import icareMark from "../../assets/icare Logo mark dark.svg";

/** Shared iCare surface gradients — subtle, on-brand mint depth instead of flat fills. */
export const GRAD_HERO = "linear-gradient(158deg, #f2f8f4 0%, #e6f0ea 55%, #dcebe2 100%)";
export const GRAD_MIST = "linear-gradient(180deg, #eef5f0 0%, #e6f0ea 100%)";
export const GRAD_DEEP = "linear-gradient(165deg, #e9f2ec 0%, #dde9e1 100%)";
export const GRAD_WHITE = "linear-gradient(180deg, #ffffff 0%, #f1f7f3 100%)";
export const GRAD_INK = "radial-gradient(125% 130% at 85% 0%, #2f3e47 0%, #1f2a31 50%, #141c21 100%)";

export const LINE = "#d3e3d8";

/** Faint iCare logo-mark watermark for section depth. `light` inverts it for dark backgrounds. */
export function Watermark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <img
      src={icareMark}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none select-none absolute z-0 ${className ?? ""}`}
      style={light ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}
