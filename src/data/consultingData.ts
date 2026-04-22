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
  badge: "Consultoría",
  title: "Solicita una consultoría para revisar tu caso, tu proceso o tu idea",
  description:
    "Un espacio para entender tu necesidad, aterrizar opciones y definir una ruta clara antes de construir, automatizar o implementar.",
  highlights: [
    "Ideal para proyectos que necesitan claridad antes de ejecutar",
    "Pensado para negocios, emprendedores y equipos",
    "Luego podrás pasar a implementación, formación o desarrollo según el caso",
  ],
  trustBlockTitle: "Qué puedes esperar",
  trustBlockText:
    "Primero revisamos el contexto, la necesidad real y el mejor siguiente paso. No se trata de vender por vender, sino de definir una solución útil.",
};