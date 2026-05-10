import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import Navbar from "../components/layout/Navbar";

const whatsappUrl =
  "https://wa.me/573213619143?text=Hola%20Himayrob,%20ya%20pagu%C3%A9%20la%20Sesi%C3%B3n%20estrat%C3%A9gica%201%20a%201%20y%20quiero%20coordinar%20el%20horario.";

export default function ConsultingThanksPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/20 md:p-10">
            <p className="text-sm font-medium text-cyan-300">
              Solicitud recibida
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
              Gracias por avanzar con tu sesión estratégica
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              Si ya realizaste el pago, puedes escribirme por WhatsApp para
              coordinar el horario. También podré comunicarme contigo con la
              información que registraste.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-[240px] items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-red-500"
              >
                Ir a WhatsApp
              </a>

              <Link
                to="/consultoria"
                className="inline-flex min-w-[240px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10"
              >
                Volver a consultoría
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}