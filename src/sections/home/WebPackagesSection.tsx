import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import { webOfferContent } from "../../data/webOfferData";

const whatsappMessage =
  "Hola Himayrob, quiero cotizar una pagina web para mi negocio.";
const whatsappUrl = `https://wa.me/573213619143?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export default function WebPackagesSection() {
  return (
    <section id="paquetes-web" className="bg-slate-950 py-20 lg:py-24">
      <Container>
        <SectionHeading
          badge={webOfferContent.packages.badge}
          title={webOfferContent.packages.title}
          description={webOfferContent.packages.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {webOfferContent.packages.items.map((item) => (
            <article
              key={item.id}
              className={`rounded-3xl border p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                item.featured
                  ? "border-red-400/40 bg-red-500/[0.08] shadow-2xl shadow-red-950/30"
                  : "border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-white/[0.07]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-cyan-300">
                    {item.featured ? "Mas recomendado" : "Paquete"}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {item.name}
                  </h3>
                </div>
                <p className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  {item.price}
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.summary}
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-white">Incluye</p>
                  <ul className="mt-3 space-y-2">
                    {item.includes.map((include) => (
                      <li
                        key={include}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500" />
                        <span>{include}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">Ideal para</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.bestFor.map((business) => (
                      <span
                        key={business}
                        className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs text-slate-300"
                      >
                        {business}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-sm font-semibold text-white">
                    Como explicarlo
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {item.clientPitch}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div>
            <p className="text-lg font-semibold text-white">
              Quieres vender una pagina con enfoque comercial?
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Lleva al cliente a WhatsApp, entiende su negocio y recomienda el
              paquete segun lo que necesita vender o mostrar.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
