import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import ExpertiseCard from "../../components/ui/ExpertiseCard";
import { expertiseContent } from "../../data/expertiseData";

export default function ExpertiseSection() {
  return (
    <section id="training" className="bg-slate-950 py-20 lg:py-24">
      <Container>
        <SectionHeading
          badge={expertiseContent.badge}
          title={expertiseContent.title}
          description={expertiseContent.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {expertiseContent.items.map((item) => (
            <ExpertiseCard
              key={item.id}
              title={item.title}
              description={item.description}
              points={item.points}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}