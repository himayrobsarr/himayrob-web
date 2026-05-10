import type { PortfolioContent } from "../types/portfolio";

export const portfolioContent: PortfolioContent = {
  badge: "Casos y proyectos",
  title: "Proyectos creados para resolver problemas reales",
  description:
    "Ejemplos de soluciones web, automatización y formación aplicadas a necesidades concretas de negocio.",
  items: [
    {
      id: 1,
      title: "Landing para software POS",
      category: "Desarrollo web",
      description:
        "Página comercial para presentar un software ERP/POS de forma clara y profesional.",
      problem:
        "El producto necesitaba explicar mejor su valor y generar más confianza comercial.",
      solution:
        "Se creó una landing moderna con beneficios, módulos, precios y llamados a la acción.",
      stack: ["React", "Vite", "Tailwind"],
    },
    {
      id: 2,
      title: "Automatización de procesos",
      category: "Automatización e IA",
      description:
        "Flujos para conectar formularios, bases de datos, IA y tareas repetitivas.",
      problem:
        "El equipo invertía tiempo en tareas manuales que podían automatizarse.",
      solution:
        "Se diseñaron flujos con n8n para capturar datos, procesarlos y activar acciones.",
      stack: ["n8n", "Postgres", "Google Sheets", "IA"],
    },
    {
      id: 3,
      title: "Capacitaciones en IA",
      category: "Formación",
      description:
        "Clases prácticas para personas y equipos que quieren aplicar IA en su trabajo.",
      problem:
        "Muchas personas quieren aprender IA, pero se pierden entre teoría y herramientas.",
      solution:
        "Se diseñaron sesiones prácticas con casos reales, ejercicios guiados y aplicación inmediata.",
      stack: ["ChatGPT", "n8n", "Herramientas IA", "Metodología práctica"],
    },
  ],
};
