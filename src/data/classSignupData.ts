import type { ClassSignupOption } from "../types/classSignup";

export const roleOptions: ClassSignupOption[] = [
  { label: "Selecciona una opción", value: "" },
  { label: "Emprendedor(a)", value: "Emprendedor" },
  { label: "Empleado(a)", value: "Empleado" },
  { label: "Freelancer", value: "Freelancer" },
  { label: "Estudiante", value: "Estudiante" },
  { label: "Docente", value: "Docente" },
  { label: "Otro", value: "Otro" },
];

export const classSignupContent = {
  badge: "Clase gratuita",
  title: "Inscríbete a la próxima clase gratuita de IA aplicada al trabajo",
  description:
    "Una sesión práctica para entender cómo usar IA como asistente laboral y empezar a aplicar herramientas reales en tu día a día.",
  highlights: [
    "Aprende usos prácticos de IA para trabajo y productividad",
    "Ideal para emprendedores, equipos y personas que quieren empezar",
    "Registra tus datos y te avisaré la fecha más cercana",
  ],
};