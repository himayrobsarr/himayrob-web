import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import DemoCard from "../../components/demos/DemoCard";
import { demoAgents, demoHomeContent } from "../../data/demos";

export default function DemoAgentsSection() {
  return (
    <section id="demos-ia" className="bg-slate-950 py-20 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            badge={demoHomeContent.badge}
            title={demoHomeContent.title}
            description={demoHomeContent.subtitle}
          />

          <Button
            type="button"
            variant="primary"
            onClick={() => {
              window.location.href = "/demos";
            }}
          >
            {demoHomeContent.cta}
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {demoAgents.map((demo) => (
            <DemoCard
              key={demo.id}
              title={demo.cardTitle}
              description={demo.cardDescription}
              href={`/demos#${demo.anchor}`}
              accent={demo.accent}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
