import Navbar from "../components/layout/Navbar";
import HeroSection from "../sections/home/HeroSection";
import ServicesSection from "../sections/home/ServicesSection";
import PortfolioSection from "../sections/home/PortfolioSection";
import ProcessSection from "../sections/home/ProcessSection";
import ExpertiseSection from "../sections/home/ExpertiseSection";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ExpertiseSection />
      </main>
    </div>
  );
}