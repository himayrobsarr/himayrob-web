import { Link, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Navbar from "../components/layout/Navbar";

const whatsappUrl =
  "https://wa.me/573213619143?text=Hola%20Himayrob,%20ya%20realic%C3%A9%20el%20pago%20de%20mi%20sesi%C3%B3n%201%20a%201%20y%20quiero%20confirmar%20los%20datos.";

export default function ConsultingThanksPage() {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/20 md:p-10">
            <p className="text-sm font-medium text-cyan-300">
              Pago enviado a validación
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
              Gracias por reservar tu sesión 1 a 1
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
              Wompi está terminando de reportar el estado del pago. Cuando el
              pago quede aprobado, recibirás la confirmación por correo y
              WhatsApp con el enlace de Google Meet.
            </p>

            {transactionId && (
              <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-cyan-400/15 bg-cyan-400/5 px-4 py-3 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                  ID de transacción Wompi
                </p>
                <p className="mt-2 break-all text-sm text-slate-200">
                  {transactionId}
                </p>
              </div>
            )}

            <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm font-semibold text-white">
                  1. Validación
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Wompi confirma el estado final del pago.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm font-semibold text-white">2. Agenda</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Se crea el evento en Calendar con enlace de Meet.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm font-semibold text-white">
                  3. Confirmación
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Recibirás los datos por correo y WhatsApp.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-[240px] items-center justify-center rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-red-500"
              >
                Confirmar por WhatsApp
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
