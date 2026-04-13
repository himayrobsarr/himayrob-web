import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import PortfolioCard from "../../components/ui/PortfolioCard";
import { portfolioContent } from "../../data/portfolioData";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-slate-950 py-20 lg:py-24">
      <Container>
        <SectionHeading
          badge={portfolioContent.badge}
          title={portfolioContent.title}
          description={portfolioContent.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portfolioContent.items.map((project) => (
            <PortfolioCard
              key={project.id}
              category={project.category}
              title={project.title}
              description={project.description}
              problem={project.problem}
              solution={project.solution}
              stack={project.stack}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}