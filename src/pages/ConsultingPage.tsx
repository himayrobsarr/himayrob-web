import Navbar from "../components/layout/Navbar";
import ConsultingSection from "../sections/consulting/ConsultingSection";

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <ConsultingSection />
      </main>
    </div>
  );
}