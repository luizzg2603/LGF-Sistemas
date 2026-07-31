import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Sobre Nós', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNavClick('#inicio'); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <span className="text-black font-black text-xs tracking-tight">LGF</span>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              LGF <span className="text-white/50">Sistemas</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#simulador"
              onClick={(e) => { e.preventDefault(); handleNavClick('#simulador'); }}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-px"
            >
              Solicitar Orçamento
              <ArrowRight size={14} />
            </a>

            <button
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0d0d0d]/98 backdrop-blur-xl border-t border-white/[0.06] px-6 py-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="block py-3 text-sm font-medium text-white/70 hover:text-white border-b border-white/[0.05] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#simulador"
              onClick={(e) => { e.preventDefault(); handleNavClick('#simulador'); }}
              className="btn-primary w-full justify-center"
            >
              Solicitar Orçamento <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
