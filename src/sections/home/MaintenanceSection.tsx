import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import { webOfferContent } from "../../data/webOfferData";

export default function MaintenanceSection() {
  return (
    <section id="mantenimiento" className="bg-slate-900 py-20 lg:py-24">
      <Container>
        <SectionHeading
          badge={webOfferContent.maintenance.badge}
          title={webOfferContent.maintenance.title}
          description={webOfferContent.maintenance.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {webOfferContent.maintenance.items.map((plan) => (
            <article
              key={plan.id}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-3 text-lg font-semibold text-cyan-300">
                {plan.price}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.includes.map((include) => (
                  <li
                    key={include}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500" />
                    <span>{include}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
