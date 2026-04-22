interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  onChange,
}: FormInputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>

      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
      />
    </label>
  );
}