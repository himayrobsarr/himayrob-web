interface ProcessStepCardProps {
  step: string;
  title: string;
  description: string;
}

export default function ProcessStepCard({
  step,
  title,
  description,
}: ProcessStepCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.07]">
      <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-red-300">
        Paso {step}
      </span>

      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
    </article>
  );
}