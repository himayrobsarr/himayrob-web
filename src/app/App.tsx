import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ConsultingPage from "../pages/ConsultingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/consultoria" element={<ConsultingPage />} />
      </Routes>
    </BrowserRouter>
  );
}