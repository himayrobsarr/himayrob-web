interface FeatureListCardProps {
  title: string;
  items: string[];
  accent?: "cyan" | "red" | "violet";
}

export default function FeatureListCard({
  title,
  items,
  accent = "cyan",
}: FeatureListCardProps) {
  const dotClass =
    accent === "red"
      ? "bg-red-500"
      : accent === "violet"
      ? "bg-violet-400"
      : "bg-cyan-400";

  const titleClass =
    accent === "red"
      ? "text-red-300"
      : accent === "violet"
      ? "text-violet-300"
      : "text-cyan-300";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${titleClass}`}>
        {title}
      </p>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-7 text-slate-300"
          >
            <span className={`mt-2 h-2.5 w-2.5 rounded-full ${dotClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}