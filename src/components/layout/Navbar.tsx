import Container from "../ui/Container";
import Button from "../ui/Button";

const navLinks = [
  { label: "Servicios", href: "#services" },
  { label: "Portafolio", href: "#portfolio" },
  { label: "Proceso", href: "#process" },
  { label: "Formación y consultoría", href: "#training" },
  { label: "Contacto", href: "#contact" },
  { label: "Clase gratis", href: "#clase-gratis" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <a href="#" className="text-lg font-semibold tracking-tight text-white">
          himayrob<span className="text-red-500">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="primary">Hablemos</Button>
        </div>
      </Container>
    </header>
  );
}