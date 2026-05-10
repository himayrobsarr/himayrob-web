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
  title: "Aprende a usar IA en tu trabajo sin enredarte",
  description:
    "Una sesión práctica para entender cómo usar IA como asistente, organizar tareas y empezar a aplicar herramientas reales.",
  highlights: [
    "Explicación clara, sin tecnicismos innecesarios",
    "Ejemplos útiles para trabajo, estudio o negocio",
    "Aviso directo cuando se abra la próxima fecha",
  ],
  trustNote:
    "Te escribiré cuando esté disponible la próxima clase gratuita.",
  ctaNote:
    "Registro sujeto a disponibilidad según la fecha programada.",
};
