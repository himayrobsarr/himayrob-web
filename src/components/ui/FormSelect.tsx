import type { ClassSignupOption } from "../../types/classSignup";

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  options: ClassSignupOption[];
  onChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export default function FormSelect({
  label,
  name,
  value,
  required = false,
  options,
  onChange,
}: FormSelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>

      <select
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
      >
        {options.map((option) => (
          <option
            key={option.value || option.label}
            value={option.value}
            className="bg-slate-900 text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}