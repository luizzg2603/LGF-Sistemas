import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const stats = [
  { value: '100+', label: 'Projetos Entregues' },
  { value: '2 anos', label: 'de Experiência' },
  { value: '98%', label: 'Satisfação dos Clientes' },
  { value: '24/7', label: 'Suporte Dedicado' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSolutions = () => {
    document.querySelector('#solucoes')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSimulator = () => {
    document.querySelector('#simulador')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.05),transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Label badge */}
        <div className="reveal opacity-0 animate-fade-in-up flex justify-center mb-8">
          <span className="section-label">
            <span className="glow-dot" />
            Desenvolvimento de Software B2B
          </span>
        </div>

        {/* Main heading */}
        <div className="reveal opacity-0 animate-fade-in-up delay-100 text-center max-w-5xl mx-auto mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
            <span className="text-gradient">Sistemas Sob Medida</span>
            <br />
            <span className="text-white/30 text-4xl md:text-5xl lg:text-6xl font-light">e</span>
            <br />
            <span className="text-gradient">Presença Digital</span>
            <br />
            <span className="text-white text-3xl md:text-4xl lg:text-5xl font-medium mt-2 block">
              para Impulsionar o Seu Negócio
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="reveal opacity-0 animate-fade-in-up delay-200 text-center max-w-2xl mx-auto mb-12">
          <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light">
            Desenvolvemos softwares, plataformas SaaS, CRMs e sites estratégicos para empresas de todos os portes e segmentos.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="reveal opacity-0 animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button onClick={scrollToSimulator} className="btn-primary text-base px-8 py-4">
            Iniciar Projeto
            <ArrowRight size={16} />
          </button>
          <button onClick={scrollToSolutions} className="btn-secondary text-base px-8 py-4">
            Ver Soluções
          </button>
        </div>

        {/* Stats bar */}
        <div className="reveal opacity-0 animate-fade-in-up delay-400 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#0d0d0d] px-6 py-8 text-center hover:bg-[#111] transition-colors duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/40 font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToSolutions}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 hover:text-white/50 transition-colors duration-300"
        aria-label="Rolar para baixo"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Explorar</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
