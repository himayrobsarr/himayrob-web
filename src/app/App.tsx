import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ConsultingPage from "../pages/ConsultingPage";
import ConsultingThanksPage from "../pages/ConsultingThanksPage";
import WompiTestPage from "../pages/WompiTestPage";
import FloatingWhatsAppButton from "../components/ui/FloatingWhatsAppButton";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consultoria" element={<ConsultingPage />} />
        <Route
          path="/consultoria/gracias"
          element={<ConsultingThanksPage />}
        />
        <Route path="/wompi-test" element={<WompiTestPage />} />
      </Routes>
      <FloatingWhatsAppButton />
    </BrowserRouter>
  );
}
