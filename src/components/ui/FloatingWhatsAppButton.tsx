const phoneNumber = "573213619143";
const defaultMessage =
  "Hola Himayrob, quiero hablar contigo sobre tus servicios.";

export default function FloatingWhatsAppButton() {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage,
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a Himayrob por WhatsApp"
      title="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl shadow-emerald-950/40 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-[#25d366]/35 md:bottom-7 md:right-7 md:h-16 md:w-16"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 md:h-9 md:w-9"
        fill="currentColor"
      >
        <path d="M16.02 3.2A12.6 12.6 0 0 0 5.28 22.38L3.6 28.8l6.58-1.63A12.6 12.6 0 1 0 16.02 3.2Zm0 22.97c-1.9 0-3.76-.52-5.38-1.51l-.39-.23-3.9.96 1-3.8-.25-.4a10.36 10.36 0 1 1 8.92 4.98Zm5.68-7.76c-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.71.16-.21.31-.82 1.01-1 1.22-.18.21-.37.24-.68.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.23 3.4 5.39 4.77.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.84-.76 2.1-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" />
      </svg>
    </a>
  );
}
