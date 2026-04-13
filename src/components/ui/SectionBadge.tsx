interface SectionBadgeProps {
  text: string;
}

export default function SectionBadge({ text }: SectionBadgeProps) {
  return (
    <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium tracking-wide text-cyan-300">
      {text}
    </div>
  );
}