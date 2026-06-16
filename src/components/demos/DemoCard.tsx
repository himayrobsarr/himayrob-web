import type { DemoAccent } from "../../types/demo";

interface DemoCardProps {
  title: string;
  description: string;
  href: string;
  accent?: DemoAccent;
}

const accentClasses: Record<DemoAccent, string> = {
  red: "hover:border-red-400/40",
  cyan: "hover:border-cyan-400/40",
  violet: "hover:border-violet-400/40",
};

const dotClasses: Record<DemoAccent, string> = {
  red: "bg-red-500",
  cyan: "bg-cyan-400",
  violet: "bg-violet-400",
};

export default function DemoCard({
  title,
  description,
  href,
  accent = "cyan",
}: DemoCardProps) {
  return (
    <a
      href={href}
      className={`group block rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${accentClasses[accent]}`}
    >
      <span className={`block h-2.5 w-2.5 rounded-full ${dotClasses[accent]}`} />
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
      <span className="mt-5 inline-flex text-sm font-semibold text-red-300 transition group-hover:text-red-200">
        Ver demo
      </span>
    </a>
  );
}
