import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import ServiceCard from "../../components/ui/ServiceCard";
import { servicesContent } from "../../data/servicesData";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-slate-950 py-20 lg:py-24">
      <Container>
        <SectionHeading
          badge={servicesContent.badge}
          title={servicesContent.title}
          description={servicesContent.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {servicesContent.items.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              points={service.points}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}