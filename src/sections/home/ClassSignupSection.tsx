import { useMemo, useState } from "react";
import Container from "../../components/ui/Container";
import SectionBadge from "../../components/ui/SectionBadge";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";
import FormTextarea from "../../components/ui/FormTextarea";
import { classSignupContent, roleOptions } from "../../data/classSignupData";
import type { ClassSignupFormValues } from "../../types/classSignup";

const initialValues: ClassSignupFormValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  role: "",
  interest: "",
  source: "web-clase-gratis",
};

export default function ClassSignupSection() {
  const [formValues, setFormValues] =
    useState<ClassSignupFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const webhookUrl = useMemo(
    () => import.meta.env.VITE_N8N_CLASS_WEBHOOK || "",
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
        "Falta configurar la URL del webhook en las variables de entorno."
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
          data?.message || "No fue posible completar el registro."
        );
      }

      setSubmitStatus("success");
      setSubmitMessage(
        data?.message ||
          "Tu registro fue enviado correctamente. Pronto recibirás información de la clase."
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
    <section
      id="class-signup"
      className="relative overflow-hidden bg-slate-950 py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_28%)]" />

      <Container className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="max-w-2xl">
          <SectionBadge text={classSignupContent.badge} />

          <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">
            {classSignupContent.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
            {classSignupContent.description}
          </p>

          <ul className="mt-8 space-y-4">
            {classSignupContent.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-7 text-slate-300"
              >
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl border border-cyan-400/15 bg-cyan-400/5 p-5">
            <p className="text-sm leading-7 text-slate-300">
              Esta inscripción está pensada para personas interesadas en la
              próxima clase gratuita. Luego podrás recibir información sobre
              fecha, acceso y próximos espacios relacionados.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm md:p-8">
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

              <FormInput
                label="Ciudad"
                name="city"
                value={formValues.city}
                placeholder="Medellín"
                required
                onChange={handleInputChange}
              />
            </div>

            <FormSelect
              label="¿Cuál es tu perfil?"
              name="role"
              value={formValues.role}
              required
              options={roleOptions}
              onChange={handleInputChange}
            />

            <FormTextarea
              label="¿Qué te gustaría aprender o resolver con IA?"
              name="interest"
              value={formValues.interest}
              placeholder="Cuéntame brevemente qué te interesa de esta clase"
              required
              rows={5}
              onChange={handleInputChange}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Enviando registro..." : "Reservar mi cupo"}
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