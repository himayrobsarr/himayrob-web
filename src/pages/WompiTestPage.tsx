import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";

type TestPaymentResponse = {
  ok: boolean;
  reference: string;
  amountInCents: number;
  currency: string;
  redirectUrl: string;
  integrity: string;
  publicKey: string;
  bookingId?: string;
  message?: string;
};

const TEST_PAYMENT_URL =
  "https://n8n.himayrob.com/webhook/consulting/wompi-smoke-test";

export default function WompiTestPage() {
  const [amountInCents, setAmountInCents] = useState(150000);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [lastPayment, setLastPayment] = useState<TestPaymentResponse | null>(
    null
  );

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.wompi.co/widget.js"]'
    );

    if (window.WidgetCheckout) {
      setIsWidgetReady(true);
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", () => setIsWidgetReady(true));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.async = true;
    script.onload = () => setIsWidgetReady(true);
    script.onerror = () => {
      setStatus("error");
      setMessage("No fue posible cargar el script de Wompi.");
    };
    document.body.appendChild(script);
  }, []);

  async function handleCreatePayment() {
    setStatus("loading");
    setMessage("");
    setLastPayment(null);

    try {
      const response = await fetch(TEST_PAYMENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testAmountInCents: amountInCents,
        }),
      });

      const rawResponse = await response.text();
      const data = (rawResponse ? JSON.parse(rawResponse) : null) as
        | TestPaymentResponse
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(
          data?.message ||
            `n8n no devolvio un pago valido. HTTP ${response.status}${
              rawResponse ? `: ${rawResponse}` : " con respuesta vacia"
            }.`,
        );
      }

      setLastPayment(data);

      const WidgetCheckout = window.WidgetCheckout;

      if (!WidgetCheckout) {
        throw new Error("El widget de Wompi no terminó de cargar.");
      }

      const checkout = new WidgetCheckout({
        currency: data.currency,
        amountInCents: data.amountInCents,
        reference: data.reference,
        publicKey: data.publicKey,
        redirectUrl: data.redirectUrl,
        signature: {
          integrity: data.integrity,
        },
        customerData: {
          email: "cliente.prueba@example.com",
          fullName: "Cliente Prueba Wompi",
          phoneNumber: "3001234567",
          phoneNumberPrefix: "+57",
        },
      });

      checkout.open((result) => {
        console.info("Wompi test result:", result);
      });
      setStatus("idle");
    } catch (error) {
      console.error("Wompi test error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : JSON.stringify(error);

      setStatus("error");
      setMessage(errorMessage || "Ocurrió un error preparando el pago.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 md:p-8">
            <p className="text-sm font-medium text-cyan-300">
              Prueba temporal
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Wompi test checkout
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Esta pantalla genera una reserva marcada como prueba y abre Wompi
              con un monto bajo. Usa llaves de producción, así que el cargo
              puede ser real.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { label: "$1.500 COP", value: 150000 },
                { label: "$1.000 COP", value: 100000 },
                { label: "$100 COP", value: 10000 },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAmountInCents(option.value)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                    amountInCents === option.value
                      ? "border-red-400 bg-red-500/15 text-white"
                      : "border-white/10 bg-slate-900/70 text-slate-300 hover:border-white/20"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="primary"
                disabled={status === "loading" || !isWidgetReady}
                className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                onClick={handleCreatePayment}
              >
                {status === "loading"
                  ? "Creando pago..."
                  : isWidgetReady
                  ? "Abrir Wompi"
                  : "Cargando Wompi..."}
              </Button>
            </div>

            {message && (
              <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {message}
              </div>
            )}

            {lastPayment && (
              <div className="mt-5 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 px-4 py-3 text-sm leading-6 text-slate-300">
                <p>
                  <span className="font-semibold text-white">Referencia:</span>{" "}
                  {lastPayment.reference}
                </p>
                <p>
                  <span className="font-semibold text-white">Booking:</span>{" "}
                  {lastPayment.bookingId}
                </p>
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
}
