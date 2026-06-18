import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import SectionBadge from "../components/ui/SectionBadge";

const contactEmail = "redmoonbyhimayrob@gmail.com";

const privacySections = [
  {
    title: "Qué es MAIA",
    content:
      "MAIA ayuda a generar ideas de diseño, buscar inspiración de mercado, estructurar propuestas, analizar tendencias, crear prompts de imagen, validar criterios de seguridad infantil y preparar información de diseño para revisión.",
  },
  {
    title: "Datos que pueden procesarse",
    content:
      "MAIA puede procesar información ingresada voluntariamente por el usuario, como consultas de inspiración, línea de producto, talla, género visual, estilo o tema de diseño, descripciones de prendas, colecciones, estampados, bordados o apliques, información técnica o comercial entregada por el usuario y datos generados durante la conversación para apoyar el proceso creativo.",
  },
  {
    title: "Uso de la información",
    content:
      "La información se usa únicamente para responder solicitudes del usuario, buscar patrones de inspiración, generar propuestas de diseño, validar criterios de seguridad y apoyar la documentación de diseños.",
  },
  {
    title: "Servicios externos",
    content:
      "Algunas solicitudes pueden enviarse a servicios externos conectados mediante acciones, como flujos automatizados en n8n bajo el dominio n8n.himayrob.com. Estos servicios procesan la información necesaria para devolver resultados estructurados al asistente.",
  },
  {
    title: "Retención de información",
    content:
      "La información puede quedar registrada temporalmente en sistemas técnicos para operación, depuración o mejora del servicio. Cuando se conecten funciones de guardado, los diseños podrán almacenarse en herramientas autorizadas por el cliente, como Google Drive, Google Sheets u otros sistemas acordados.",
  },
  {
    title: "Seguridad",
    content:
      "Se aplican medidas razonables para proteger la información y limitar el acceso a los sistemas conectados. Sin embargo, el usuario debe evitar compartir datos sensibles innecesarios dentro de las consultas.",
  },
  {
    title: "No venta de datos",
    content:
      "No vendemos datos personales ni información de diseño a terceros.",
  },
];

export default function MaiaPrivacyPage() {
  useEffect(() => {
    document.title = "Política de privacidad — MAIA | Himayrob";

    let descriptionMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.name = "description";
      document.head.appendChild(descriptionMeta);
    }

    descriptionMeta.content =
      "Política de privacidad para el asistente MAIA y sus acciones conectadas a servicios externos.";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_30%)]" />

          <Container className="relative">
            <div className="mx-auto max-w-4xl">
              <SectionBadge text="Privacidad y datos" />

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
                Política de privacidad — MAIA
              </h1>

              <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
                MAIA es un asistente de diseño creado para apoyar procesos
                creativos, comerciales y técnicos relacionados con ropa bebé e
                infantil para MA&amp;JU y Confecciones Julis.
              </p>

              <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 md:p-8">
                <div className="space-y-8">
                  {privacySections.map((section) => (
                    <section key={section.title}>
                      <h2 className="text-xl font-semibold text-white">
                        {section.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                        {section.content}
                      </p>
                    </section>
                  ))}

                  <section>
                    <h2 className="text-xl font-semibold text-white">
                      Contacto
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                      Para preguntas sobre esta política de privacidad, puedes
                      escribir a:
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-3 inline-flex break-all text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 md:text-base"
                    >
                      {contactEmail}
                    </a>
                  </section>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
