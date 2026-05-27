import type { ConsultingOption } from "../types/consulting";

export const durationOptions = [
  {
    hours: 1,
    label: "1 hora",
    price: "$75.000",
    description: "Ideal para resolver una duda puntual o una clase enfocada.",
  },
  {
    hours: 2,
    label: "2 horas",
    price: "$150.000",
    description: "Buen espacio para revisar, practicar y dejar tareas claras.",
  },
  {
    hours: 3,
    label: "3 horas",
    price: "$225.000",
    description: "Bloque profundo para avanzar en proyecto o aprendizaje.",
  },
];

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
  { label: "Clase de IA", value: "clase-ia" },
  { label: "Consultoría para proyecto", value: "consultoria-proyecto" },
  { label: "Automatización con n8n", value: "automatizacion-n8n" },
  { label: "Desarrollo web", value: "desarrollo-web" },
  { label: "Diagnóstico técnico", value: "diagnostico-tecnico" },
  { label: "Otro", value: "otro" },
];

export const projectStageOptions: ConsultingOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Quiero aprender desde cero", value: "aprendizaje-cero" },
  { label: "Tengo una idea", value: "idea" },
  { label: "Ya empecé pero necesito orden", value: "en-progreso" },
  { label: "Ya tengo algo funcionando", value: "funcionando" },
  { label: "Necesito mejorar o escalar", value: "mejorar-escalar" },
];

export const consultingContent = {
  badge: "Agenda por horas",
  title: "Sesiones 1 a 1 para proyectos, IA y automatización",
  subtitle: "$75.000 COP por hora. Elige 1, 2 o 3 horas y reserva tu espacio.",
  description:
    "Un espacio práctico para aprender, resolver bloqueos, revisar un proyecto o avanzar con IA, n8n y desarrollo web con acompañamiento directo.",
  price: "$75.000 COP / hora",
  duration: "1 a 3 horas",
  highlights: [
    "Paga primero y reserva un horario disponible con enlace de Meet",
    "Puedes usar la sesión para clases de IA, automatización, diagnóstico o acompañamiento de proyecto",
    "Horarios por horas exactas desde lunes 00:00 hasta sábado 14:00, según agenda real",
  ],
  includes: [
    "Acompañamiento 1 a 1 por videollamada",
    "Revisión de tu necesidad, clase o proyecto actual",
    "Explicación paso a paso con enfoque práctico",
    "Definición de tareas, herramientas o siguiente paso",
  ],
  afterPayment: [
    "Tu reserva queda registrada en la agenda",
    "Recibes correo de confirmación",
    "Recibes mensaje por WhatsApp con los datos principales",
    "Se crea el evento en Google Calendar con enlace de Meet",
  ],
  faq: [
    {
      question: "¿Cuántas horas puedo reservar?",
      answer:
        "Puedes reservar 1, 2 o 3 horas seguidas. Para una cuarta hora se debe dejar al menos una hora de tolerancia antes de crear otro bloque.",
    },
    {
      question: "¿Cuál es el valor?",
      answer: "El valor actual es de $75.000 COP por hora.",
    },
    {
      question: "¿En qué horarios puedo agendar?",
      answer:
        "Los horarios se toman desde Google Calendar. En general, hay disponibilidad desde lunes 00:00 hasta sábado 14:00. Desde sábado 14:00 hasta lunes 00:00 no se agenda.",
    },
    {
      question: "¿Puedo reagendar?",
      answer:
        "Sí, puedes solicitar reagendamiento con mínimo 6 horas de anticipación.",
    },
    {
      question: "¿Qué pasa después del pago?",
      answer:
        "Se confirma tu reserva, se crea el evento en Calendar con enlace de Meet y recibes los datos por correo y WhatsApp.",
    },
  ],
  trustBlockTitle: "Cómo funciona",
  trustBlockText:
    "Elige la cantidad de horas, revisa horarios disponibles, deja tus datos y paga. La reserva se confirma automáticamente cuando Wompi aprueba el pago.",
  whatsappMessage:
    "Hola Himayrob, me interesa reservar una sesión 1 a 1 por horas y quiero más información.",
};
