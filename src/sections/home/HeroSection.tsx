import Container from "../../components/ui/Container";
import SectionBadge from "../../components/ui/SectionBadge";
import Button from "../../components/ui/Button";
import { heroContent } from "../../data/heroData";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_30%)]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <div className="max-w-2xl">
          <SectionBadge text={heroContent.badge} />

          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
            {heroContent.title}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-300 md:text-lg">
            {heroContent.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={() => {
                const target = document.getElementById("paquetes-web");
                target?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {heroContent.primaryCta}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = "/consultoria";
              }}
            >
              {heroContent.secondaryCta}
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {heroContent.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-red-950/30">
            <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-auto rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                somicerpdemo.vercel.app
              </span>
            </div>

            <div className="relative bg-slate-950">
              <img
                src="/previews/somic-erp-demo.jpg.png"
                alt="Preview de una pagina web creada para Somic ERP"
                className="aspect-[16/11] w-full object-cover object-top"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-6 pt-20">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-cyan-300">
                      Proyecto real
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
                      Landing para software ERP/POS
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
                      Un ejemplo de como puede verse una pagina clara,
                      profesional y lista para generar conversaciones.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const target = document.getElementById("paginas-creadas");
                      target?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500"
                  >
                    Ver trabajos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
