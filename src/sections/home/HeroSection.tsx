import Container from "../../components/ui/Container";
import SectionBadge from "../../components/ui/SectionBadge";
import Button from "../../components/ui/Button";
import InfoCard from "../../components/ui/InfoCard";
import { heroContent } from "../../data/heroData";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_30%)]" />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <div className="max-w-2xl">
          <SectionBadge text={heroContent.badge} />

          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            {heroContent.title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
            {heroContent.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary">{heroContent.primaryCta}</Button>
            <Button variant="secondary">{heroContent.secondaryCta}</Button>
          </div>

          <ul className="mt-8 space-y-3">
            {heroContent.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-5">
          {heroContent.cards.map((card) => (
            <InfoCard
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}