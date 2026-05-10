import type { ConsultingOption } from "../types/consulting";

export const businessTypeOptions: ConsultingOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Emprendimiento personal", value: "emprendimiento-personal" },
  { label: "Negocio pequeño", value: "negocio-pequeno" },
  { label: "Empresa", value: "empresa" },
  { label: "Institución educativa", value: "institucion-educativa" },
  { label: "Profesional independiente", value: "profesional-independiente" },
  { label: "Otro", value: "otro" },
];

export const needTypeOptions: ConsultingOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Desarrollo web", value: "desarrollo-web" },
  { label: "Automatización con IA", value: "automatizacion-ia" },
  { label: "Implementación con n8n", value: "implementacion-n8n" },
  { label: "Formación / capacitación", value: "formacion" },
  { label: "Diagnóstico técnico", value: "diagnostico-tecnico" },
  { label: "Otro", value: "otro" },
];

export const projectStageOptions: ConsultingOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Solo tengo la idea", value: "idea" },
  { label: "Ya empecé pero necesito orden", value: "en-progreso" },
  { label: "Ya tengo algo funcionando", value: "funcionando" },
  { label: "Necesito mejorar o escalar", value: "mejorar-escalar" },
];

export const consultingContent = {
  badge: "Sesión estratégica",
  title: "Sesión estratégica 1 a 1",
  subtitle:
    "60 minutos para aterrizar tu idea, resolver dudas y definir el mejor siguiente paso.",
  description:
    "Una sesión pensada para personas, emprendedores y negocios que necesitan claridad antes de construir, automatizar o implementar.",
  price: "$75.000 COP",
  duration: "60 minutos",
  highlights: [
    "Espacio útil para revisar tu caso con enfoque técnico y estratégico",
    "Ideal para ideas, proyectos en marcha o procesos que necesitan orden",
    "Después de la sesión podrás tener más claridad sobre herramientas, opciones y ruta de implementación",
  ],
  includes: [
    "Revisión de tu necesidad, idea o proceso actual",
    "Orientación sobre herramientas, arquitectura o enfoque recomendado",
    "Definición del mejor siguiente paso",
    "Posible ruta hacia desarrollo, automatización o formación",
  ],
  afterPayment: [
    "Recibes confirmación de tu solicitud",
    "Tu pago queda registrado",
    "Puedes escribirme por WhatsApp para agilizar la coordinación",
    "Yo también podré contactarte para definir el horario",
  ],
  faq: [
    {
      question: "¿Cuánto dura la sesión?",
      answer: "La sesión estratégica tiene una duración de 60 minutos.",
    },
    {
      question: "¿Cuál es el valor?",
      answer: "El valor actual de la sesión es de $75.000 COP.",
    },
    {
      question: "¿La sesión es virtual?",
      answer: "Sí. La sesión está pensada en modalidad virtual.",
    },
    {
      question: "¿Qué pasa después del pago?",
      answer:
        "Se confirma tu solicitud y coordinamos el horario contigo. En una fase posterior este proceso podrá automatizarse.",
    },
  ],
  trustBlockTitle: "Qué puedes esperar",
  trustBlockText:
    "No se trata de vender por vender. Esta sesión está pensada para entender bien tu caso y darte claridad real sobre el mejor camino a seguir.",
  whatsappMessage:
    "Hola Himayrob, me interesa la Sesión estratégica 1 a 1 y quiero más información.",
};