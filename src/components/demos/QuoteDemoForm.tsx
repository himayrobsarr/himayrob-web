import { useMemo, useState } from "react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import DemoFlow from "./DemoFlow";
import DemoResultCard from "./DemoResultCard";
import {
  budgetOptions,
  quoteDemoAgent,
  quoteServiceOptions,
  urgencyOptions,
} from "../../data/demos";
import {
  buildHimayrobWhatsappUrl,
  getSummaryText,
  getSummaryValue,
  safeText,
  submitOptionalDemoWebhook,
} from "./demoFormUtils";
import type { DemoResultField } from "../../types/demo";

interface QuoteFormValues {
  fullName: string;
  whatsapp: string;
  city: string;
  serviceType: string;
  description: string;
  urgency: string;
  approximateBudget: string;
}

interface QuoteDemoResult {
  fields: DemoResultField[];
  status: string;
  summary: string;
  notes: string;
  whatsappUrl?: string;
  webhookMessage: string;
  technicalResponse?: unknown;
}

const initialValues: QuoteFormValues = {
  fullName: "",
  whatsapp: "",
  city: "",
  serviceType: "",
  description: "",
  urgency: "",
  approximateBudget: "",
};

function classifyUrgency(urgency: string) {
  if (urgency === "Alta") {
    return "Alta prioridad: responder lo antes posible y validar alcance.";
  }

  if (urgency === "Media") {
    return "Prioridad media: preparar propuesta y resolver dudas clave.";
  }

  return "Prioridad programable: ordenar requerimientos y agendar revisión.";
}

export default function QuoteDemoForm() {
  const [formValues, setFormValues] = useState<QuoteFormValues>(initialValues);
  const [result, setResult] = useState<QuoteDemoResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const webhookUrl = useMemo(
    () => import.meta.env.VITE_N8N_DEMO_QUOTE_WEBHOOK || "",
    [],
  );

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setResult(null);

    const requiredValues = [
      formValues.fullName,
      formValues.whatsapp,
      formValues.city,
      formValues.serviceType,
      formValues.description,
      formValues.urgency,
      formValues.approximateBudget,
    ];

    if (requiredValues.some((value) => !value.trim())) {
      setErrorMessage("Completa todos los campos para generar la cotización.");
      return;
    }

    const urgencyClassification = classifyUrgency(formValues.urgency);

    const payload = {
      name: formValues.fullName,
      whatsapp: formValues.whatsapp,
      city: formValues.city,
      serviceType: formValues.serviceType,
      description: formValues.description,
      urgency: formValues.urgency,
      budget: formValues.approximateBudget,
      source: "web-demo-quote",
    };

    const localSummary = `${payload.name} solicita cotización para ${payload.serviceType} en ${payload.city}. Descripción: ${payload.description}. Urgencia: ${payload.urgency}. Presupuesto aproximado: ${payload.budget}.`;

    setIsSubmitting(true);

    const webhookResult = await submitOptionalDemoWebhook(webhookUrl, payload);

    if (!webhookResult.ok) {
      setErrorMessage(webhookResult.message);
      setIsSubmitting(false);
      return;
    }

    const n8nSummary = webhookResult.summary;
    const summary =
      webhookResult.fromWebhook && n8nSummary !== undefined
        ? getSummaryText(n8nSummary, localSummary)
        : localSummary;
    const status = safeText(
      getSummaryValue(n8nSummary, ["status", "estado"]),
      quoteDemoAgent.statusLabel,
    );
    const notes = safeText(
      getSummaryValue(n8nSummary, [
        "notes",
        "notas",
        "observations",
        "observaciones",
      ]),
      urgencyClassification,
    );
    const fields: DemoResultField[] = [
      {
        label: "Nombre",
        value: getSummaryValue(n8nSummary, ["name", "nombre"]) ?? payload.name,
      },
      {
        label: "WhatsApp",
        value:
          getSummaryValue(n8nSummary, ["whatsapp", "phone", "telefono"]) ??
          payload.whatsapp,
      },
      {
        label: "Ciudad",
        value: getSummaryValue(n8nSummary, ["city", "ciudad"]) ?? payload.city,
      },
      {
        label: "Tipo de servicio",
        value:
          getSummaryValue(n8nSummary, ["serviceType", "tipoServicio"]) ??
          payload.serviceType,
      },
      {
        label: "Urgencia",
        value:
          getSummaryValue(n8nSummary, ["urgency", "urgencia"]) ??
          payload.urgency,
      },
      {
        label: "Presupuesto",
        value:
          getSummaryValue(n8nSummary, ["budget", "presupuesto"]) ??
          payload.budget,
      },
      {
        label: "Estado",
        value: status,
      },
    ];

    setResult({
      fields,
      status,
      summary,
      notes,
      whatsappUrl:
        webhookResult.whatsappUrl ||
        buildHimayrobWhatsappUrl(
          `Hola Himayrob, quiero un cotizador simple para mi negocio.\n\n${summary}`,
        ),
      webhookMessage: webhookResult.message,
      technicalResponse:
        webhookResult.rawResponse ?? {
          mode: "local-demo",
          payload,
          summary: {
            summary: localSummary,
            notes,
          },
        },
    });
    setIsSubmitting(false);
  }

  return (
    <article
      id={quoteDemoAgent.anchor}
      className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 md:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <p className="text-sm font-medium text-violet-300">
            {quoteDemoAgent.statusLabel}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {quoteDemoAgent.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {quoteDemoAgent.description}
          </p>

          <div className="mt-6">
            <DemoFlow steps={quoteDemoAgent.flow} accent={quoteDemoAgent.accent} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput
              label="Nombre"
              name="fullName"
              value={formValues.fullName}
              placeholder="Nombre del cliente"
              required
              onChange={handleInputChange}
            />
            <FormInput
              label="WhatsApp"
              name="whatsapp"
              value={formValues.whatsapp}
              placeholder="3001234567"
              required
              onChange={handleInputChange}
            />
          </div>

          <FormInput
            label="Ciudad"
            name="city"
            value={formValues.city}
            placeholder="Bucaramanga"
            required
            onChange={handleInputChange}
          />

          <FormSelect
            label="Tipo de servicio"
            name="serviceType"
            value={formValues.serviceType}
            required
            options={quoteServiceOptions}
            onChange={handleInputChange}
          />

          <FormTextarea
            label="Descripción"
            name="description"
            value={formValues.description}
            placeholder="Describe lo que necesita el cliente"
            required
            rows={4}
            onChange={handleInputChange}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <FormSelect
              label="Urgencia"
              name="urgency"
              value={formValues.urgency}
              required
              options={urgencyOptions}
              onChange={handleInputChange}
            />
            <FormSelect
              label="Presupuesto aproximado"
              name="approximateBudget"
              value={formValues.approximateBudget}
              required
              options={budgetOptions}
              onChange={handleInputChange}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Organizando solicitud..." : "Generar cotización demo"}
          </Button>

          {errorMessage && (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          )}
        </form>
      </div>

      {result && (
        <DemoResultCard
          title="Ficha comercial de cotización"
          status={result.status}
          fields={result.fields}
          summary={result.summary}
          notes={result.notes}
          accent={quoteDemoAgent.accent}
          message={result.webhookMessage}
          whatsappUrl={result.whatsappUrl}
          technicalResponse={result.technicalResponse}
        />
      )}
    </article>
  );
}
