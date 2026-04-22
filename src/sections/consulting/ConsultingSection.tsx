import { useMemo, useState } from "react";
import Container from "../../components/ui/Container";
import SectionBadge from "../../components/ui/SectionBadge";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";
import FormTextarea from "../../components/ui/FormTextarea";
import {
  businessTypeOptions,
  consultingContent,
  needTypeOptions,
  projectStageOptions,
} from "../../data/consultingData";
import type { ConsultingFormValues } from "../../types/consulting";

const initialValues: ConsultingFormValues = {
  fullName: "",
  email: "",
  phone: "",
  businessType: "",
  needType: "",
  projectStage: "",
  message: "",
  source: "web-consultoria",
};

export default function ConsultingSection() {
  const [formValues, setFormValues] =
    useState<ConsultingFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const webhookUrl = useMemo(
    () => import.meta.env.VITE_N8N_CONSULTING_WEBHOOK || "",
    []
  );

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitStatus("idle");
    setSubmitMessage("");

    if (!webhookUrl) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Falta configurar la URL del webhook de consultoría."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "No fue posible enviar la solicitud."
        );
      }

      setSubmitStatus("success");
      setSubmitMessage(
        data?.message ||
          "Tu solicitud fue enviada correctamente. Pronto revisaré tu caso."
      );
      setFormValues(initialValues);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error al enviar el formulario.";

      setSubmitStatus("error");
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]" />

      <Container className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="max-w-2xl">
          <SectionBadge text={consultingContent.badge} />

          <h1 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-5xl">
            {consultingContent.title}
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
            {consultingContent.description}
          </p>

          <ul className="mt-8 space-y-4">
            {consultingContent.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-7 text-slate-300"
              >
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              {consultingContent.trustBlockTitle}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {consultingContent.trustBlockText}
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
          <div className="mb-6">
            <p className="text-sm font-medium text-cyan-300">
              Solicitud de consultoría
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Cuéntame tu caso
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Déjame tus datos y una breve descripción para revisar tu necesidad
              y proponerte el mejor siguiente paso.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                label="Nombre completo"
                name="fullName"
                value={formValues.fullName}
                placeholder="Tu nombre completo"
                required
                onChange={handleInputChange}
              />

              <FormInput
                label="Correo"
                name="email"
                type="email"
                value={formValues.email}
                placeholder="tu@email.com"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                label="Teléfono o WhatsApp"
                name="phone"
                value={formValues.phone}
                placeholder="3001234567"
                required
                onChange={handleInputChange}
              />

              <FormSelect
                label="Tipo de negocio o perfil"
                name="businessType"
                value={formValues.businessType}
                required
                options={businessTypeOptions}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormSelect
                label="¿Qué necesitas?"
                name="needType"
                value={formValues.needType}
                required
                options={needTypeOptions}
                onChange={handleInputChange}
              />

              <FormSelect
                label="Etapa actual"
                name="projectStage"
                value={formValues.projectStage}
                required
                options={projectStageOptions}
                onChange={handleInputChange}
              />
            </div>

            <FormTextarea
              label="Cuéntame brevemente tu caso"
              name="message"
              value={formValues.message}
              placeholder="Describe tu necesidad, problema o idea"
              required
              rows={6}
              onChange={handleInputChange}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? "Enviando solicitud..."
                  : "Solicitar consultoría"}
              </Button>
            </div>

            {submitStatus !== "idle" && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                  submitStatus === "success"
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                    : "border-red-400/20 bg-red-400/10 text-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}