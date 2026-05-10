import { useEffect, useMemo, useState } from "react";
import Container from "../../components/ui/Container";
import SectionBadge from "../../components/ui/SectionBadge";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";
import FormTextarea from "../../components/ui/FormTextarea";
import FeatureListCard from "../../components/ui/FeatureListCard";
import FaqList from "../../components/ui/FaqList";
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
  const [paymentData, setPaymentData] = useState<null | {
    reference: string;
    amountInCents: number;
    currency: string;
    redirectUrl: string;
  }>(null);

  const whatsappUrl = useMemo(() => {
    const encodedMessage = encodeURIComponent(
      consultingContent.whatsappMessage
    );

    return `https://wa.me/573213619143?text=${encodedMessage}`;
  }, []);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.wompi.co/widget.js"]'
    );

    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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

  async function sha256(text: string) {
    const encodedText = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function handleOpenWompiCheckout(data: {
    reference: string;
    amountInCents: number;
    currency: string;
    redirectUrl: string;
  }) {
    const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY || "";
    const integritySecret = import.meta.env.VITE_WOMPI_INTEGRITY_SECRET || "";

    if (!publicKey || !integritySecret) {
      setSubmitStatus("error");
      setSubmitMessage("Faltan variables de entorno de Wompi.");
      return;
    }

    const concatenated = `${data.reference}${data.amountInCents}${data.currency}${integritySecret}`;
    const integrity = await sha256(concatenated);

    const WidgetCheckout = (window as any).WidgetCheckout;

    if (!WidgetCheckout) {
      setSubmitStatus("error");
      setSubmitMessage("No fue posible cargar el checkout de Wompi.");
      return;
    }

    const checkout = new WidgetCheckout({
      currency: data.currency,
      amountInCents: data.amountInCents,
      reference: data.reference,
      publicKey,
      redirectUrl: data.redirectUrl,
      signature: {
        integrity,
      },
      customerData: {
        email: formValues.email,
        fullName: formValues.fullName,
        phoneNumber: formValues.phone,
        phoneNumberPrefix: "+57",
      },
    });

    checkout.open((result: any) => {
      console.log("Wompi result:", result);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitStatus("idle");
    setSubmitMessage("");

    const webhookUrl =
      import.meta.env.VITE_N8N_CONSULTING_INIT_PAYMENT_WEBHOOK || "";

    if (!webhookUrl) {
      setSubmitStatus("error");
      setSubmitMessage("Falta configurar la URL del init de pago.");
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

      if (!response.ok || !data?.ok) {
        throw new Error(
          data?.message || "No fue posible preparar el pago."
        );
      }

      const nextPaymentData = {
        reference: data.reference,
        amountInCents: Number(data.amountInCents),
        currency: data.currency,
        redirectUrl: data.redirectUrl,
      };

      setPaymentData(nextPaymentData);
      setSubmitStatus("success");
      setSubmitMessage(
        "Solicitud guardada correctamente. Ahora continúa con el pago."
      );

      await handleOpenWompiCheckout(nextPaymentData);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocurrió un error al preparar el pago.";

      setSubmitStatus("error");
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]" />

      <Container className="relative space-y-12">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="max-w-2xl">
            <SectionBadge text={consultingContent.badge} />

            <h1 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-5xl">
              {consultingContent.title}
            </h1>

            <p className="mt-4 text-lg font-medium text-cyan-300">
              {consultingContent.subtitle}
            </p>

            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              {consultingContent.description}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-red-500/15 bg-red-500/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                  Inversión
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {consultingContent.price}
                </p>
              </div>

              <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Duración
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {consultingContent.duration}
                </p>
              </div>
            </div>

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

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                type="button"
                variant="primary"
                className="min-w-[220px]"
                onClick={() => {
                  const target = document.getElementById("consultoria-form");
                  target?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Continuar al formulario
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-[220px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                Escribirme por WhatsApp
              </a>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                {consultingContent.trustBlockTitle}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {consultingContent.trustBlockText}
              </p>
            </div>
          </div>

          <div
            id="consultoria-form"
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8 scroll-mt-28"
          >
            <div className="mb-6">
              <p className="text-sm font-medium text-cyan-300">
                Solicitud de sesión
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Cuéntame tu caso
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Déjame tus datos para revisar tu necesidad y dejar lista tu
                solicitud antes del pago.
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

              <div className="grid gap-3 md:grid-cols-2">
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={isSubmitting}
                  className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Enviando solicitud..."
                    : "Guardar mi solicitud"}
                </Button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-red-500"
                >
                  Ir por WhatsApp
                </a>
              </div>

              <div className="rounded-2xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm leading-6 text-slate-300">
                Después de guardar tu solicitud, el siguiente paso será el pago
                de la sesión. Luego verás una confirmación y podrás coordinar el
                horario por WhatsApp.
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
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FeatureListCard
            title="Qué incluye"
            items={consultingContent.includes}
            accent="cyan"
          />

          <FeatureListCard
            title="Qué pasa después"
            items={consultingContent.afterPayment}
            accent="red"
          />
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Preguntas frecuentes
          </h2>
          <FaqList items={consultingContent.faq} />
        </div>
      </Container>
    </section>
  );
}