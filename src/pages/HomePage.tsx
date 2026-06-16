import Navbar from "../components/layout/Navbar";
import HeroSection from "../sections/home/HeroSection";
import ServicesSection from "../sections/home/ServicesSection";
import PortfolioSection from "../sections/home/PortfolioSection";
import ProcessSection from "../sections/home/ProcessSection";
import ExpertiseSection from "../sections/home/ExpertiseSection";
import ClassSignupSection from "../sections/home/ClassSignupSection";
import WebPackagesSection from "../sections/home/WebPackagesSection";
import MaintenanceSection from "../sections/home/MaintenanceSection";
import WebsitePreviewsSection from "../sections/home/WebsitePreviewsSection";
import AiValueSection from "../sections/home/AiValueSection";
import DemoAgentsSection from "../sections/home/DemoAgentsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <AiValueSection />
        <DemoAgentsSection />
        <WebPackagesSection />
        <WebsitePreviewsSection />
        <MaintenanceSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ExpertiseSection />
        <ClassSignupSection />
      </main>
    </div>
  );
}
