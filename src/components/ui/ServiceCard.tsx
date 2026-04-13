interface ServiceCardProps {
  title: string;
  description: string;
  points: string[];
}

export default function ServiceCard({
  title,
  description,
  points,
}: ServiceCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.07]">
      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>

      <ul className="mt-5 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}