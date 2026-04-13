import Navbar from "../components/layout/Navbar";
import HeroSection from "../sections/home/HeroSection";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}