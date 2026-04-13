import type { PortfolioContent } from "../types/portfolio";

export const portfolioContent: PortfolioContent = {
  badge: "Casos y proyectos",
  title: "Proyectos pensados para resolver necesidades reales",
  description:
    "Una muestra de soluciones construidas para convertir ideas, procesos y necesidades comerciales en herramientas funcionales y escalables.",
  items: [
    {
      id: 1,
      title: "Landing comercial para software POS",
      category: "Desarrollo web",
      description:
        "Diseño y desarrollo de una landing orientada a presentar un software ERP/POS de forma clara, comercial y profesional.",
      problem:
        "El producto necesitaba una presentación más clara para captar interés comercial y explicar mejor su propuesta de valor.",
      solution:
        "Se construyó una landing moderna con estructura comercial, secciones de beneficios, módulos, precios y llamados a la acción.",
      stack: ["React", "Vite", "Tailwind"],
    },
    {
      id: 2,
      title: "Automatización de procesos con n8n",
      category: "Automatización e IA",
      description:
        "Diseño de flujos para conectar formularios, bases de datos, agentes de IA y procesos operativos repetitivos.",
      problem:
        "Había tareas manuales, repetitivas y poco escalables que consumían tiempo y generaban fricción operativa.",
      solution:
        "Se estructuraron automatizaciones con n8n e integraciones para capturar datos, procesarlos y activar acciones de manera más eficiente.",
      stack: ["n8n", "Postgres", "Google Sheets", "IA"],
    },
    {
      id: 3,
      title: "Capacitaciones prácticas en IA y automatización",
      category: "Formación",
      description:
        "Espacios de formación dirigidos a personas, equipos y organizaciones que necesitan entender y aplicar IA de forma útil.",
      problem:
        "Muchas personas y equipos necesitan aprender tecnología sin quedarse solo en la teoría o en conceptos demasiado técnicos.",
      solution:
        "Se diseñaron clases prácticas y orientadas a casos reales para facilitar adopción, comprensión e implementación.",
      stack: ["ChatGPT", "n8n", "Herramientas IA", "Metodología práctica"],
    },
  ],
};