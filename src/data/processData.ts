import type { ProcessContent } from "../types/process";

export const processContent: ProcessContent = {
  badge: "Forma de trabajo",
  title: "Una forma de trabajar clara, práctica y enfocada en resultados",
  description:
    "Cada proyecto parte de entender bien la necesidad, proponer una solución viable y construir con orden para que la implementación tenga sentido desde lo técnico y lo comercial.",
  steps: [
    {
      id: 1,
      step: "01",
      title: "Entender la necesidad",
      description:
        "Primero analizo el contexto, el problema y el objetivo real del proyecto para evitar construir algo que se vea bien pero no resuelva nada.",
    },
    {
      id: 2,
      step: "02",
      title: "Definir una ruta clara",
      description:
        "Organizo el alcance, priorizo lo importante y planteo una solución que sea útil, entendible y viable según la etapa del negocio.",
    },
    {
      id: 3,
      step: "03",
      title: "Construir e implementar",
      description:
        "Desarrollo la solución con enfoque modular y escalable, cuidando tanto la parte visual como la funcionalidad y la integración entre piezas.",
    },
    {
      id: 4,
      step: "04",
      title: "Ajustar y acompañar",
      description:
        "Después de implementar, revisamos mejoras, afinamos detalles y dejamos base para evolucionar el proyecto sin empezar de cero.",
    },
  ],
};