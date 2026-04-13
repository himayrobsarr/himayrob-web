import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 focus:outline-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/30",
    secondary:
      "border border-white/15 bg-white/5 text-white hover:bg-white/10",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}