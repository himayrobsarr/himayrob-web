import type { ServicesContent } from "../types/services";

export const servicesContent: ServicesContent = {
  badge: "Servicios principales",
  title: "Soluciones simples para vender, automatizar y aprender",
  description:
    "Trabajo con emprendedores, negocios y equipos que necesitan tecnología útil, clara y sostenible.",
  items: [
    {
      id: 1,
      title: "Desarrollo web",
      description:
        "Páginas y herramientas digitales pensadas para presentar, vender y captar clientes.",
      points: [
        "Landing pages comerciales",
        "Sitios web para servicios",
        "Formularios conectados",
        "Herramientas internas",
      ],
    },
    {
      id: 2,
      title: "Automatización con IA",
      description:
        "Flujos que conectan datos, formularios, IA y acciones para reducir trabajo manual.",
      points: [
        "Automatización con n8n",
        "Seguimiento de leads",
        "Agentes y asistentes con IA",
        "Integración con Sheets, CRM o WhatsApp",
      ],
    },
    {
      id: 3,
      title: "Formación práctica",
      description:
        "Clases para entender y aplicar IA sin quedarse solo en teoría.",
      points: [
        "Clases personalizadas",
        "Capacitaciones para equipos",
        "Casos reales paso a paso",
        "Uso práctico de herramientas IA",
      ],
    },
    {
      id: 4,
      title: "Consultoría tecnológica",
      description:
        "Acompañamiento para decidir qué construir, automatizar o mejorar primero.",
      points: [
        "Diagnóstico de procesos",
        "Ruta de implementación",
        "Revisión de herramientas",
        "Priorización técnica y comercial",
      ],
    },
  ],
};
