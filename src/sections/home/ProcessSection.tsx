import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import ProcessStepCard from "../../components/ui/ProcessStepCard";
import { processContent } from "../../data/processData";

export default function ProcessSection() {
  return (
    <section id="process" className="bg-slate-950 py-20 lg:py-24">
      <Container>
        <SectionHeading
          badge={processContent.badge}
          title={processContent.title}
          description={processContent.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processContent.steps.map((step) => (
            <ProcessStepCard
              key={step.id}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}