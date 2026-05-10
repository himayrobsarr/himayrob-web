interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: FaqItem[];
}

export default function FaqList({ items }: FaqListProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <div
          key={item.question}
          className="rounded-3xl border border-white/10 bg-white/5 p-5"
        >
          <h3 className="text-base font-semibold text-white">{item.question}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}