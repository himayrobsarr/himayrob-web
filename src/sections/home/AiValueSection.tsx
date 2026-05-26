import Container from "../../components/ui/Container";

const aiBenefits = [
  {
    title: "Respuestas mas rapidas",
    description:
      "Mensajes, formularios y flujos pensados para responder mejor a quienes llegan desde la pagina.",
  },
  {
    title: "Leads mas ordenados",
    description:
      "Automatizaciones para guardar contactos, clasificar solicitudes y dar seguimiento sin depender de copiar datos a mano.",
  },
  {
    title: "Contenido con direccion",
    description:
      "Uso de IA para estructurar textos, preguntas frecuentes, servicios y mensajes comerciales mas claros.",
  },
];

export default function AiValueSection() {
  return (
    <section id="ia" className="border-y border-white/10 bg-slate-900 py-12">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              IA aplicada
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
              Una pagina puede hacer mas que verse bonita.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              La IA entra donde de verdad ayuda: responder mejor, ordenar
              clientes, automatizar tareas y convertir visitas en oportunidades.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {aiBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
