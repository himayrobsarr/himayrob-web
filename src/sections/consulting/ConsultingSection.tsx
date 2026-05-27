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
  durationOptions,
  needTypeOptions,
  projectStageOptions,
} from "../../data/consultingData";
import type { ConsultingFormValues, ConsultingSlot } from "../../types/consulting";

const PRICE_PER_HOUR_COP = 75000;
const TIMEZONE = "America/Bogota";

const initialValues: ConsultingFormValues = {
  fullName: "",
  email: "",
  phone: "",
  durationHours: "1",
  selectedDate: "",
  selectedStart: "",
  selectedEnd: "",
  businessType: "",
  needType: "",
  projectStage: "",
  message: "",
  source: "web-consultoria-horas",
};

function getTodayDateValue() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function formatSlotLabel(slot: ConsultingSlot) {
  if (slot.label) return slot.label;

  const start = new Date(slot.start);
  const end = new Date(slot.end);
  const formatter = new Intl.DateTimeFormat("es-CO", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function isRestDay(dateValue: string) {
  if (!dateValue) return false;

  const date = new Date(`${dateValue}T12:00:00-05:00`);
  const day = date.getDay();

  return day === 0;
}

export default function ConsultingSection() {
  const [formValues, setFormValues] =
    useState<ConsultingFormValues>(initialValues);
  const [slots, setSlots] = useState<ConsultingSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotsMessage, setSlotsMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const selectedHours = Number(formValues.durationHours);
  const totalAmount = selectedHours * PRICE_PER_HOUR_COP;
  const todayDateValue = useMemo(() => getTodayDateValue(), []);
  const availabilityWebhookUrl = useMemo(
    () => import.meta.env.VITE_N8N_CONSULTING_AVAILABILITY_WEBHOOK || "",
    []
  );

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

  useEffect(() => {
    async function loadSlots() {
      setSlots([]);
      setSlotsMessage("");

      if (!formValues.selectedDate) return;

      if (isRestDay(formValues.selectedDate)) {
        setSlotsMessage("Los domingos no están disponibles para agendar.");
        return;
      }

      if (!availabilityWebhookUrl) {
        setSlotsMessage(
          "Falta configurar el webhook de disponibilidad en n8n."
        );
        return;
      }

      setIsLoadingSlots(true);

      try {
        const response = await fetch(availabilityWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: formValues.selectedDate,
            durationHours: selectedHours,
            timezone: TIMEZONE,
            source: formValues.source,
          }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.ok) {
          throw new Error(
            data?.message || "No fue posible consultar la disponibilidad."
          );
        }

        const nextSlots = Array.isArray(data.slots) ? data.slots : [];
        setSlots(nextSlots);
        setSlotsMessage(
          nextSlots.length
            ? ""
            : "No hay horarios libres para esa fecha y duracion."
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Ocurrió un error al consultar la disponibilidad.";
        setSlotsMessage(message);
      } finally {
        setIsLoadingSlots(false);
      }
    }

    loadSlots();
  }, [
    availabilityWebhookUrl,
    formValues.selectedDate,
    formValues.source,
    selectedHours,
  ]);

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
      ...(name === "selectedDate" || name === "durationHours"
        ? { selectedStart: "", selectedEnd: "" }
        : {}),
    }));
  }

  function handleDurationChange(hours: number) {
    setFormValues((prev) => ({
      ...prev,
      durationHours: String(hours),
      selectedStart: "",
      selectedEnd: "",
    }));
  }

  function handleSlotSelect(slot: ConsultingSlot) {
    setFormValues((prev) => ({
      ...prev,
      selectedStart: slot.start,
      selectedEnd: slot.end,
    }));
  }

  async function handleOpenWompiCheckout(data: {
    reference: string;
    amountInCents: number;
    currency: string;
    redirectUrl: string;
    integrity: string;
    publicKey?: string;
    paymentUrl?: string;
  }) {
    if (data.paymentUrl) {
      window.location.assign(data.paymentUrl);
      return;
    }

    const publicKey =
      data.publicKey || import.meta.env.VITE_WOMPI_PUBLIC_KEY || "";

    if (!publicKey || !data.integrity) {
      setSubmitStatus("error");
      setSubmitMessage("Faltan datos seguros de Wompi desde n8n.");
      return;
    }

    const WidgetCheckout = window.WidgetCheckout;

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
        integrity: data.integrity,
      },
      customerData: {
        email: formValues.email,
        fullName: formValues.fullName,
        phoneNumber: formValues.phone,
        phoneNumberPrefix: "+57",
      },
    });

    checkout.open((result) => {
      console.info("Wompi checkout result:", result);
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitStatus("idle");
    setSubmitMessage("");

    const webhookUrl =
      import.meta.env.VITE_N8N_CONSULTING_INIT_PAYMENT_WEBHOOK || "";

    if (!formValues.selectedStart || !formValues.selectedEnd) {
      setSubmitStatus("error");
      setSubmitMessage("Selecciona un horario disponible antes de pagar.");
      return;
    }

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
        body: JSON.stringify({
          ...formValues,
          durationHours: selectedHours,
          amountInCents: totalAmount * 100,
          currency: "COP",
          timezone: TIMEZONE,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || "No fue posible preparar el pago.");
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Reserva temporal creada. Continúa con el pago para confirmar tu horario."
      );

      await handleOpenWompiCheckout({
        reference: data.reference,
        amountInCents: Number(data.amountInCents),
        currency: data.currency || "COP",
        redirectUrl: data.redirectUrl,
        integrity: data.integrity,
        publicKey: data.publicKey,
        paymentUrl: data.paymentUrl,
      });
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
                  Valor
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
                Agendar y pagar
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
                Reserva tu sesión
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Elige horas, horario y paga
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                El horario se confirma cuando Wompi aprueba el pago. n8n se
                encarga de Calendar, Meet, correo, WhatsApp y registro.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="mb-3 block text-sm font-medium text-slate-200">
                  Duración
                </span>
                <div className="grid gap-3 md:grid-cols-3">
                  {durationOptions.map((option) => {
                    const isSelected =
                      formValues.durationHours === String(option.hours);

                    return (
                      <button
                        key={option.hours}
                        type="button"
                        onClick={() => handleDurationChange(option.hours)}
                        className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                          isSelected
                            ? "border-red-400 bg-red-500/15 text-white"
                            : "border-white/10 bg-slate-900/70 text-slate-300 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <span className="block text-base font-semibold">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-sm text-cyan-300">
                          {option.price}
                        </span>
                        <span className="mt-2 block text-xs leading-5 text-slate-400">
                          {option.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="Fecha"
                  name="selectedDate"
                  type="date"
                  value={formValues.selectedDate}
                  min={todayDateValue}
                  required
                  onChange={handleInputChange}
                />

                <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/5 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    Total a pagar
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    ${totalAmount.toLocaleString("es-CO")} COP
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {selectedHours} hora{selectedHours > 1 ? "s" : ""} a
                    $75.000 COP.
                  </p>
                </div>
              </div>

              <div>
                <span className="mb-3 block text-sm font-medium text-slate-200">
                  Horarios disponibles
                </span>
                <div className="min-h-[72px] rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                  {isLoadingSlots && (
                    <p className="px-2 py-3 text-sm text-slate-300">
                      Consultando Google Calendar...
                    </p>
                  )}

                  {!isLoadingSlots && slots.length > 0 && (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {slots.map((slot) => {
                        const isSelected =
                          formValues.selectedStart === slot.start;

                        return (
                          <button
                            key={`${slot.start}-${slot.end}`}
                            type="button"
                            onClick={() => handleSlotSelect(slot)}
                            className={`rounded-xl border px-3 py-3 text-sm transition-all duration-300 ${
                              isSelected
                                ? "border-cyan-300 bg-cyan-400/15 text-white"
                                : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/40"
                            }`}
                          >
                            {formatSlotLabel(slot)}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {!isLoadingSlots && slots.length === 0 && (
                    <p className="px-2 py-3 text-sm leading-6 text-slate-400">
                      {slotsMessage ||
                        "Selecciona una fecha para consultar horarios."}
                    </p>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Disponible desde lunes 00:00 hasta sábado 14:00. Horarios en
                  horas exactas, zona Colombia.
                </p>
              </div>

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
                placeholder="Describe qué quieres aprender, resolver o construir"
                required
                rows={5}
                onChange={handleInputChange}
              />

              <div className="grid gap-3 md:grid-cols-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Preparando pago..." : "Pagar y reservar"}
                </Button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
                >
                  Resolver dudas por WhatsApp
                </a>
              </div>

              <div className="rounded-2xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm leading-6 text-slate-300">
                El pago confirma la reserva. Puedes solicitar reagendamiento
                con mínimo 6 horas de anticipación.
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
            title="Después del pago"
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
