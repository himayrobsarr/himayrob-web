interface PortfolioCardProps {
  category: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
}

export default function PortfolioCard({
  category,
  title,
  description,
  problem,
  solution,
  stack,
}: PortfolioCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
      <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
        {category}
      </span>

      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-sm font-medium text-white">Problema</p>
          <p className="mt-1 text-sm leading-7 text-slate-300">{problem}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-white">Solución</p>
          <p className="mt-1 text-sm leading-7 text-slate-300">{solution}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}