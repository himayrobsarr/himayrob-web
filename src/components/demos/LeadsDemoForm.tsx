import { useMemo, useState } from "react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import FormTextarea from "../ui/FormTextarea";
import DemoFlow from "./DemoFlow";
import DemoResultCard from "./DemoResultCard";
import {
  leadBusinessTypeOptions,
  leadServiceOptions,
  leadsDemoAgent,
} from "../../data/demos";
import {
  buildHimayrobWhatsappUrl,
  getSummaryText,
  getSummaryValue,
  safeText,
  submitOptionalDemoWebhook,
} from "./demoFormUtils";
import type { DemoResultField } from "../../types/demo";

interface LeadsFormValues {
  fullName: string;
  whatsapp: string;
  city: string;
  businessType: string;
  serviceNeeded: string;
  message: string;
}

interface LeadsDemoResult {
  fields: DemoResultField[];
  status: string;
  summary: string;
  whatsappUrl?: string;
  webhookMessage: string;
  technicalResponse?: unknown;
}

const initialValues: LeadsFormValues = {
  fullName: "",
  whatsapp: "",
  city: "",
  businessType: "",
  serviceNeeded: "",
  message: "",
};

export default function LeadsDemoForm() {
  const [formValues, setFormValues] = useState<LeadsFormValues>(initialValues);
  const [result, setResult] = useState<LeadsDemoResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const webhookUrl = useMemo(
    () => import.meta.env.VITE_N8N_DEMO_LEADS_WEBHOOK || "",
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
      formValues.businessType,
      formValues.serviceNeeded,
      formValues.message,
    ];

    if (requiredValues.some((value) => !value.trim())) {
      setErrorMessage("Completa todos los campos obligatorios del demo.");
      return;
    }

    const payload = {
      name: formValues.fullName,
      whatsapp: formValues.whatsapp,
      city: formValues.city,
      businessType: formValues.businessType,
      service: formValues.serviceNeeded,
      message: formValues.message,
      source: "web-demo-leads",
    };

    const localSummary = `${payload.name} tiene un negocio tipo ${payload.businessType} en ${payload.city} y está interesado en ${payload.service}. Mensaje: ${payload.message}`;

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
      leadsDemoAgent.statusLabel,
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
        label: "Tipo de negocio",
        value:
          getSummaryValue(n8nSummary, ["businessType", "tipoNegocio"]) ??
          payload.businessType,
      },
      {
        label: "Servicio",
        value:
          getSummaryValue(n8nSummary, ["service", "servicio"]) ??
          payload.service,
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
      whatsappUrl:
        webhookResult.whatsappUrl ||
        buildHimayrobWhatsappUrl(
          `Hola Himayrob, quiero un agente captador de leads para mi negocio.\n\n${summary}`,
        ),
      webhookMessage: webhookResult.message,
      technicalResponse:
        webhookResult.rawResponse ?? {
          mode: "local-demo",
          payload,
          summary: localSummary,
        },
    });
    setIsSubmitting(false);
  }

  return (
    <article
      id={leadsDemoAgent.anchor}
      className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 md:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <p className="text-sm font-medium text-red-300">
            {leadsDemoAgent.statusLabel}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {leadsDemoAgent.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {leadsDemoAgent.description}
          </p>

          <div className="mt-6">
            <DemoFlow steps={leadsDemoAgent.flow} accent={leadsDemoAgent.accent} />
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

          <div className="grid gap-5 md:grid-cols-2">
            <FormSelect
              label="Tipo de negocio"
              name="businessType"
              value={formValues.businessType}
              required
              options={leadBusinessTypeOptions}
              onChange={handleInputChange}
            />
            <FormSelect
              label="Servicio que necesita"
              name="serviceNeeded"
              value={formValues.serviceNeeded}
              required
              options={leadServiceOptions}
              onChange={handleInputChange}
            />
          </div>

          <FormTextarea
            label="Mensaje"
            name="message"
            value={formValues.message}
            placeholder="Cuéntame qué quiere resolver este cliente"
            required
            rows={4}
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Generando resumen..." : "Generar lead demo"}
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
          title="Ficha comercial del interesado"
          status={result.status}
          fields={result.fields}
          summary={result.summary}
          accent={leadsDemoAgent.accent}
          message={result.webhookMessage}
          whatsappUrl={result.whatsappUrl}
          technicalResponse={result.technicalResponse}
        />
      )}
    </article>
  );
}
