interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export default function FormTextarea({
  label,
  name,
  value,
  placeholder,
  required = false,
  rows = 5,
  onChange,
}: FormTextareaProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={rows}
        onChange={onChange}
        className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
      />
    </label>
  );
}