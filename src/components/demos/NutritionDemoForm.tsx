import { useMemo, useState } from "react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import DemoFlow from "./DemoFlow";
import DemoResultCard from "./DemoResultCard";
import {
  countryCodeOptions,
  nutritionDemoAgent,
  nutritionGoalOptions,
  sexOptions,
} from "../../data/demos";
import {
  buildHimayrobWhatsappUrl,
  getSummaryText,
  getSummaryValue,
  safeText,
  submitOptionalDemoWebhook,
} from "./demoFormUtils";
import type { DemoResultField } from "../../types/demo";

interface NutritionFormValues {
  fullName: string;
  country: string;
  phonePrefix: string;
  whatsapp: string;
  age: string;
  sex: string;
  weightKg: string;
  heightCm: string;
  goal: string;
}

interface NutritionDemoResult {
  fields: DemoResultField[];
  status: string;
  summary: string;
  whatsappUrl?: string;
  webhookMessage: string;
  technicalResponse?: unknown;
}

const initialValues: NutritionFormValues = {
  fullName: "",
  country: "Colombia",
  phonePrefix: "+57",
  whatsapp: "",
  age: "",
  sex: "",
  weightKg: "",
  heightCm: "",
  goal: "",
};

function classifyBmi(bmi: number) {
  if (bmi < 18.5) return "Bajo peso";
  if (bmi < 25) return "Peso saludable";
  if (bmi < 30) return "Sobrepeso";
  return "Obesidad";
}

function buildRecommendation(classification: string, goal: string) {
  if (goal === "Bajar grasa") {
    return `Priorizar control de porciones, proteína suficiente y seguimiento semanal. Clasificación actual: ${classification}.`;
  }

  if (goal === "Ganar masa muscular") {
    return `Revisar entrenamiento de fuerza, proteína diaria y superávit moderado. Clasificación actual: ${classification}.`;
  }

  if (goal === "Mantener peso") {
    return `Mantener hábitos sostenibles y monitorear medidas cada 2 a 4 semanas. Clasificación actual: ${classification}.`;
  }

  return `Empezar con hábitos simples, hidratación, sueño y registro de comidas. Clasificación actual: ${classification}.`;
}

function formatSex(value: unknown, fallback: string) {
  const text = safeText(value, fallback);
  const normalizedText = text.toLowerCase();

  if (normalizedText === "male" || normalizedText === "hombre") {
    return "Hombre";
  }

  if (normalizedText === "female" || normalizedText === "mujer") {
    return "Mujer";
  }

  return text;
}

function formatKcal(value: unknown, fallback: number) {
  const text = safeText(value, String(fallback));

  if (text.toLowerCase().includes("kcal")) return text;

  return `${text} kcal/día`;
}

export default function NutritionDemoForm() {
  const [formValues, setFormValues] =
    useState<NutritionFormValues>(initialValues);
  const [result, setResult] = useState<NutritionDemoResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const webhookUrl = useMemo(
    () => import.meta.env.VITE_N8N_DEMO_NUTRITION_WEBHOOK || "",
    [],
  );

  function handleInputChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
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

    const age = Number(formValues.age);
    const weightKg = Number(formValues.weightKg);
    const heightCm = Number(formValues.heightCm);

    const requiredValues = [
      formValues.fullName,
      formValues.country,
      formValues.phonePrefix,
      formValues.whatsapp,
      formValues.sex,
      formValues.goal,
    ];

    if (
      requiredValues.some((value) => !value.trim()) ||
      age <= 0 ||
      weightKg <= 0 ||
      heightCm <= 0
    ) {
      setErrorMessage("Completa todos los datos con valores válidos.");
      return;
    }

    const heightMeters = heightCm / 100;
    const bmi = weightKg / (heightMeters * heightMeters);
    const bmiRounded = Number(bmi.toFixed(1));
    const classification = classifyBmi(bmi);
    const bmr =
      formValues.sex === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    const bmrRounded = Math.round(bmr);
    const recommendation = buildRecommendation(classification, formValues.goal);
    const sexLabel = formValues.sex === "male" ? "Hombre" : "Mujer";

    const payload = {
      name: formValues.fullName,
      country: formValues.country,
      indicative: formValues.phonePrefix,
      whatsapp: formValues.whatsapp,
      age,
      sex: formValues.sex,
      weightKg,
      heightCm,
      goal: formValues.goal,
      source: "web-demo-nutrition",
    };

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
        ? getSummaryText(n8nSummary, recommendation, [
            "recommendation",
            "recomendacion",
            "resumen",
            "summary",
          ])
        : recommendation;
    const status = safeText(
      getSummaryValue(n8nSummary, ["status", "estado"]),
      nutritionDemoAgent.statusLabel,
    );
    const displaySex = formatSex(
      getSummaryValue(n8nSummary, ["sex", "sexo"]),
      sexLabel,
    );
    const displayBmi =
      getSummaryValue(n8nSummary, ["bmi", "imc"]) ?? bmiRounded;
    const displayBmiClassification =
      getSummaryValue(n8nSummary, [
        "bmiClassification",
        "classification",
        "clasificacion",
        "clasificacionImc",
      ]) ?? classification;
    const displayBmr = formatKcal(
      getSummaryValue(n8nSummary, [
        "bmr",
        "tmb",
        "tmbKcal",
        "bmrKcal",
        "basalMetabolicRate",
      ]),
      bmrRounded,
    );
    const fields: DemoResultField[] = [
      {
        label: "Nombre",
        value: getSummaryValue(n8nSummary, ["name", "nombre"]) ?? payload.name,
      },
      {
        label: "País",
        value:
          getSummaryValue(n8nSummary, ["country", "pais"]) ?? payload.country,
      },
      {
        label: "WhatsApp",
        value:
          getSummaryValue(n8nSummary, ["whatsapp", "phone", "telefono"]) ??
          `${payload.indicative} ${payload.whatsapp}`,
      },
      {
        label: "Edad",
        value: getSummaryValue(n8nSummary, ["age", "edad"]) ?? payload.age,
      },
      {
        label: "Sexo",
        value: displaySex,
      },
      {
        label: "Peso kg",
        value:
          getSummaryValue(n8nSummary, ["weightKg", "peso", "pesoKg"]) ??
          payload.weightKg,
      },
      {
        label: "Estatura cm",
        value:
          getSummaryValue(n8nSummary, ["heightCm", "estatura", "alturaCm"]) ??
          payload.heightCm,
      },
      {
        label: "IMC",
        value: displayBmi,
      },
      {
        label: "Clasificación IMC",
        value: displayBmiClassification,
      },
      {
        label: "TMB kcal/día",
        value: displayBmr,
      },
      {
        label: "Recomendación",
        value: summary,
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
          `Hola Himayrob, quiero un formulario inteligente parecido a este demo IMC/TMB.\n\n${summary}`,
        ),
      webhookMessage: webhookResult.message,
      technicalResponse:
        webhookResult.rawResponse ?? {
          mode: "local-demo",
          payload,
          summary: {
            bmi: bmiRounded,
            bmiClassification: classification,
            bmr: bmrRounded,
            recommendation,
          },
        },
    });
    setIsSubmitting(false);
  }

  return (
    <article
      id={nutritionDemoAgent.anchor}
      className="scroll-mt-28 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 md:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <p className="text-sm font-medium text-cyan-300">
            {nutritionDemoAgent.statusLabel}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {nutritionDemoAgent.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {nutritionDemoAgent.description}
          </p>

          <div className="mt-6">
            <DemoFlow
              steps={nutritionDemoAgent.flow}
              accent={nutritionDemoAgent.accent}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormInput
              label="Nombre"
              name="fullName"
              value={formValues.fullName}
              placeholder="Nombre del paciente"
              required
              onChange={handleInputChange}
            />
            <FormInput
              label="País"
              name="country"
              value={formValues.country}
              placeholder="Colombia"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-[0.75fr_1.25fr]">
            <FormSelect
              label="Indicativo"
              name="phonePrefix"
              value={formValues.phonePrefix}
              required
              options={countryCodeOptions}
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

          <div className="grid gap-5 md:grid-cols-3">
            <FormInput
              label="Edad"
              name="age"
              type="number"
              value={formValues.age}
              placeholder="30"
              min="1"
              required
              onChange={handleInputChange}
            />
            <FormSelect
              label="Sexo"
              name="sex"
              value={formValues.sex}
              required
              options={sexOptions}
              onChange={handleInputChange}
            />
            <FormInput
              label="Peso kg"
              name="weightKg"
              type="number"
              value={formValues.weightKg}
              placeholder="70"
              min="1"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormInput
              label="Estatura cm"
              name="heightCm"
              type="number"
              value={formValues.heightCm}
              placeholder="170"
              min="1"
              required
              onChange={handleInputChange}
            />
            <FormSelect
              label="Objetivo"
              name="goal"
              value={formValues.goal}
              required
              options={nutritionGoalOptions}
              onChange={handleInputChange}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Calculando..." : "Calcular demo IMC/TMB"}
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
          title="Ficha inteligente del paciente"
          status={result.status}
          fields={result.fields}
          summary={result.summary}
          accent={nutritionDemoAgent.accent}
          message={result.webhookMessage}
          whatsappUrl={result.whatsappUrl}
          technicalResponse={result.technicalResponse}
        />
      )}
    </article>
  );
}
