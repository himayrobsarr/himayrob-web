import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import { webOfferContent } from "../../data/webOfferData";

export default function WebsitePreviewsSection() {
  return (
    <section id="paginas-creadas" className="bg-slate-950 py-20 lg:py-24">
      <Container>
        <SectionHeading
          badge={webOfferContent.projects.badge}
          title={webOfferContent.projects.title}
          description={webOfferContent.projects.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {webOfferContent.projects.items.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ver pagina ${project.title}`}
                className={`group block border-b border-white/10 bg-slate-900 ${
                  project.url ? "" : "pointer-events-none"
                }`}
              >
                <div className="flex h-9 items-center gap-2 border-b border-white/10 px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-auto max-w-[60%] truncate text-xs text-slate-500">
                    {project.url?.replace("https://", "").replace("/", "")}
                  </span>
                </div>

                <div className="relative overflow-hidden">
                  {project.imageSrc ? (
                    <img
                      src={project.imageSrc}
                      alt={`Preview de ${project.title}`}
                      className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="aspect-[16/10] bg-[linear-gradient(135deg,#0f172a,#111827_45%,#7f1d1d)] p-5">
                      <div className="h-full rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                        <div className="h-5 w-28 rounded-full bg-red-500/80" />
                        <div className="mt-6 h-8 w-4/5 rounded-xl bg-white/80" />
                        <div className="mt-3 h-3 w-full rounded-full bg-white/20" />
                        <div className="mt-2 h-3 w-2/3 rounded-full bg-white/20" />
                        <div className="mt-6 grid grid-cols-3 gap-3">
                          <div className="h-16 rounded-2xl bg-white/10" />
                          <div className="h-16 rounded-2xl bg-white/10" />
                          <div className="h-16 rounded-2xl bg-white/10" />
                        </div>
                      </div>
                    </div>
                  )}

                  {project.url ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/55 group-hover:opacity-100">
                      <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-xl">
                        Ver pagina
                      </span>
                    </div>
                  ) : null}
                </div>
              </a>

              <div className="p-6">
                <p className="text-sm font-medium text-cyan-300">
                  {project.businessType}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {project.description}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  <span className="font-semibold text-white">Resultado: </span>
                  {project.result}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex text-sm font-semibold text-red-300 transition hover:text-red-200"
                  >
                    Ver pagina
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
