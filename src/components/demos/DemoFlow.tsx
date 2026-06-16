import type { DemoAccent } from "../../types/demo";

interface DemoFlowProps {
  steps: string[];
  accent?: DemoAccent;
}

const accentClasses: Record<DemoAccent, string> = {
  red: "border-red-400/30 bg-red-500/10 text-red-200",
  cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
};

export default function DemoFlow({ steps, accent = "cyan" }: DemoFlowProps) {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {steps.map((step, index) => (
        <div
          key={step}
          className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
        >
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${accentClasses[accent]}`}
          >
            {index + 1}
          </span>
          <p className="mt-3 text-sm leading-6 text-slate-300">{step}</p>
        </div>
      ))}
    </div>
  );
}
