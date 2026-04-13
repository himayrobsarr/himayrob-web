interface InfoCardProps {
  title: string;
  description: string;
}

export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}