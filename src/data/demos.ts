import type {
  DemoAgent,
  DemoHomeContent,
  DemoOption,
  DemoPageContent,
} from "../types/demo";

export const demoHomeContent: DemoHomeContent = {
  badge: "Agentes IA express",
  title: "Demos de agentes IA para negocios reales",
  subtitle:
    "Explora ejemplos sencillos de automatizaciones que pueden adaptarse a negocios de Bucaramanga, Santander y Colombia.",
  cta: "Ver demos disponibles",
};

export const demoPageContent: DemoPageContent = {
  badge: "Demos interactivos",
  title: "Demos de Agentes IA Express",
  subtitle:
    "Ejemplos prácticos de automatizaciones pequeñas para atender clientes, capturar datos, cotizar servicios y hacer seguimiento comercial.",
  supportText:
    "Estos demos están pensados para negocios locales que quieren empezar con algo útil, económico y replicable antes de construir sistemas grandes.",
  cta: "Quiero un agente para mi negocio",
};

export const leadsDemoAgent: DemoAgent = {
  id: "leads",
  anchor: "captador-leads",
  title: "Agente Captador de Leads",
  cardTitle: "Captador de leads",
  cardDescription:
    "Recibe interesados, organiza sus datos y deja listo el contacto por WhatsApp.",
  description:
    "Simula un flujo comercial para recibir interesados, ordenar la información y responder con un mensaje listo.",
  statusLabel: "Nuevo interesado",
  source: "Demo web - Agente Captador de Leads",
  accent: "red",
  flow: [
    "Cliente llena formulario",
    "n8n recibe datos",
    "Google Sheets guarda lead",
    "Se genera resumen",
    "WhatsApp queda listo",
  ],
};

export const nutritionDemoAgent: DemoAgent = {
  id: "nutrition",
  anchor: "formulario-inteligente",
  title: "Formulario Inteligente IMC/TMB",
  cardTitle: "Formulario inteligente",
  cardDescription:
    "Calcula, clasifica y registra información desde una landing conectada a automatización.",
  description:
    "Simula un formulario de captura para nutrición que calcula IMC, TMB y una recomendación básica.",
  statusLabel: "Evaluación generada",
  source: "Demo web - Formulario Inteligente IMC/TMB",
  accent: "cyan",
  flow: [
    "Paciente llena datos",
    "Sistema calcula IMC/TMB",
    "Registra información",
    "Genera recomendación",
    "WhatsApp queda listo",
  ],
};

export const quoteDemoAgent: DemoAgent = {
  id: "quote",
  anchor: "cotizador-simple",
  title: "Cotizador Simple",
  cardTitle: "Cotizador simple",
  cardDescription:
    "Recibe solicitudes, ordena los datos y genera un resumen comercial para responder más rápido.",
  description:
    "Simula un formulario de cotización que clasifica urgencia y prepara una respuesta comercial.",
  statusLabel: "Pendiente de revisión",
  source: "Demo web - Cotizador Simple",
  accent: "violet",
  flow: [
    "Cliente solicita cotización",
    "Sistema organiza datos",
    "Clasifica urgencia",
    "Genera resumen",
    "WhatsApp queda listo",
  ],
};

export const demoAgents: DemoAgent[] = [
  leadsDemoAgent,
  nutritionDemoAgent,
  quoteDemoAgent,
];

export const leadBusinessTypeOptions: DemoOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Emprendimiento", value: "Emprendimiento" },
  { label: "Negocio local", value: "Negocio local" },
  { label: "Profesional independiente", value: "Profesional independiente" },
  { label: "Empresa pequeña", value: "Empresa pequeña" },
  { label: "Otro", value: "Otro" },
];

export const leadServiceOptions: DemoOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Página web", value: "Página web" },
  { label: "Automatización con IA", value: "Automatización con IA" },
  { label: "Agente para WhatsApp", value: "Agente para WhatsApp" },
  { label: "Consultoría", value: "Consultoría" },
  { label: "Otro", value: "Otro" },
];

export const countryCodeOptions: DemoOption[] = [
  { label: "+57 Colombia", value: "+57" },
  { label: "+1 Estados Unidos", value: "+1" },
  { label: "+52 México", value: "+52" },
  { label: "+51 Perú", value: "+51" },
  { label: "+54 Argentina", value: "+54" },
];

export const sexOptions: DemoOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Hombre", value: "male" },
  { label: "Mujer", value: "female" },
];

export const nutritionGoalOptions: DemoOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Bajar grasa", value: "Bajar grasa" },
  { label: "Ganar masa muscular", value: "Ganar masa muscular" },
  { label: "Mantener peso", value: "Mantener peso" },
  { label: "Mejorar hábitos", value: "Mejorar hábitos" },
];

export const quoteServiceOptions: DemoOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Página web", value: "Página web" },
  { label: "Automatización", value: "Automatización" },
  { label: "Agente IA", value: "Agente IA" },
  { label: "Tienda online", value: "Tienda online" },
  { label: "Mantenimiento", value: "Mantenimiento" },
];

export const urgencyOptions: DemoOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Baja", value: "Baja" },
  { label: "Media", value: "Media" },
  { label: "Alta", value: "Alta" },
];

export const budgetOptions: DemoOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Menos de $800.000 COP", value: "Menos de $800.000 COP" },
  { label: "$800.000 a $1.500.000 COP", value: "$800.000 a $1.500.000 COP" },
  { label: "$1.500.000 a $3.000.000 COP", value: "$1.500.000 a $3.000.000 COP" },
  { label: "Más de $3.000.000 COP", value: "Más de $3.000.000 COP" },
  { label: "Aún no definido", value: "Aún no definido" },
];
