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
  title: "Reserva tu cupo para la próxima clase gratuita de IA aplicada al trabajo",
  description:
    "Una sesión práctica para entender cómo usar IA como asistente laboral y empezar a aplicar herramientas reales en productividad, organización y trabajo diario.",
  highlights: [
    "Enfoque práctico, claro y útil desde la primera sesión",
    "Ideal para emprendedores, equipos y personas que quieren empezar bien",
    "Te avisaré la fecha más cercana y los detalles de acceso",
  ],
  trustNote:
    "Al registrarte, quedarás en la lista de interesados para recibir la información de la próxima clase gratuita.",
  ctaNote:
    "Cupos sujetos a disponibilidad según la fecha programada.",
};