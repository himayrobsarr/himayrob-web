import Navbar from "../components/layout/Navbar";
import HeroSection from "../sections/home/HeroSection";
import ServicesSection from "../sections/home/ServicesSection";
import PortfolioSection from "../sections/home/PortfolioSection";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
      </main>
    </div>
  );
}