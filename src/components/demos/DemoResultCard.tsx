import { useState } from "react";
import type { DemoAccent, DemoResultField } from "../../types/demo";
import { safeText } from "./demoFormUtils";

interface DemoResultCardProps {
  title: string;
  status: unknown;
  fields: DemoResultField[];
  summary: unknown;
  accent?: DemoAccent;
  message?: string;
  notes?: unknown;
  whatsappUrl?: string;
  technicalResponse?: unknown;
}

const accentClasses: Record<
  DemoAccent,
  { card: string; pill: string; summary: string }
> = {
  red: {
    card: "border-red-400/20 bg-red-500/10",
    pill: "border-red-400/25 text-red-200",
    summary: "border-red-400/15 bg-red-500/10",
  },
  cyan: {
    card: "border-cyan-400/20 bg-cyan-400/10",
    pill: "border-cyan-400/25 text-cyan-200",
    summary: "border-cyan-400/15 bg-cyan-400/10",
  },
  violet: {
    card: "border-violet-400/20 bg-violet-400/10",
    pill: "border-violet-400/25 text-violet-200",
    summary: "border-violet-400/15 bg-violet-400/10",
  },
};

function formatTechnicalResponse(value: unknown) {
  if (value === undefined) return "";

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function DemoResultCard({
  title,
  status,
  fields,
  summary,
  accent = "cyan",
  message,
  notes,
  whatsappUrl,
  technicalResponse,
}: DemoResultCardProps) {
  const [showTechnicalResponse, setShowTechnicalResponse] = useState(false);
  const styles = accentClasses[accent];
  const technicalText = formatTechnicalResponse(technicalResponse);
  const hasTechnicalResponse = technicalText.trim().length > 0;

  return (
    <div className={`mt-8 rounded-3xl border p-5 ${styles.card}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white">{title}</p>
        <span
          className={`rounded-full border bg-slate-950/60 px-3 py-1 text-xs font-medium ${styles.pill}`}
        >
          {safeText(status)}
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <div
            key={field.label}
            className="rounded-2xl border border-white/10 bg-slate-950/65 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {field.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-100">
              {safeText(field.value)}
            </p>
          </div>
        ))}
      </div>

      <div className={`mt-5 rounded-2xl border p-4 ${styles.summary}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Resumen
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-100">
          {safeText(summary)}
        </p>
      </div>

      {safeText(notes, "") && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/65 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Notas
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            {safeText(notes)}
          </p>
        </div>
      )}

      {message && (
        <p className="mt-4 text-sm leading-6 text-slate-300">{message}</p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
          >
            Continuar por WhatsApp
          </a>
        )}

        {hasTechnicalResponse && (
          <button
            type="button"
            onClick={() => setShowTechnicalResponse((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            {showTechnicalResponse
              ? "Ocultar respuesta técnica"
              : "Ver respuesta técnica"}
          </button>
        )}
      </div>

      {showTechnicalResponse && hasTechnicalResponse && (
        <pre className="mt-4 max-h-80 overflow-auto rounded-2xl border border-white/10 bg-slate-950/90 p-4 text-xs leading-6 text-slate-300">
          {technicalText}
        </pre>
      )}
    </div>
  );
}
