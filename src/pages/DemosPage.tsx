import Navbar from "../components/layout/Navbar";
import Container from "../components/ui/Container";
import SectionBadge from "../components/ui/SectionBadge";
import DemoCard from "../components/demos/DemoCard";
import LeadsDemoForm from "../components/demos/LeadsDemoForm";
import NutritionDemoForm from "../components/demos/NutritionDemoForm";
import QuoteDemoForm from "../components/demos/QuoteDemoForm";
import { demoAgents, demoPageContent } from "../data/demos";

const whatsappUrl = `https://wa.me/573213619143?text=${encodeURIComponent(
  "Hola Himayrob, quiero un agente IA para mi negocio.",
)}`;

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_28%)]" />

          <Container className="relative">
            <div className="max-w-4xl">
              <SectionBadge text={demoPageContent.badge} />

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
                {demoPageContent.title}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                {demoPageContent.subtitle}
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                {demoPageContent.supportText}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-w-[240px] items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-red-900/30 transition hover:bg-red-500"
                >
                  {demoPageContent.cta}
                </a>

                <a
                  href="#captador-leads"
                  className="inline-flex min-w-[240px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
                >
                  Probar demos
                </a>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {demoAgents.map((demo) => (
                <DemoCard
                  key={demo.id}
                  title={demo.cardTitle}
                  description={demo.cardDescription}
                  href={`#${demo.anchor}`}
                  accent={demo.accent}
                />
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-slate-900 py-20 lg:py-24">
          <Container className="space-y-8">
            <LeadsDemoForm />
            <NutritionDemoForm />
            <QuoteDemoForm />
          </Container>
        </section>
      </main>
    </div>
  );
}
