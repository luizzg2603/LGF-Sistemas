import { useEffect, useRef } from 'react';
import { Cloud, Users, Package, BookOpen, Globe, ArrowUpRight } from 'lucide-react';

const solutions = [
  {
    icon: Cloud,
    title: 'SaaS Sob Medida',
    description:
      'Plataformas em nuvem escaláveis e personalizadas, construídas para crescer junto com o seu negócio. Arquitetura moderna, multi-tenant e alta disponibilidade.',
    tags: ['Nuvem', 'Escalável', 'Multi-tenant'],
  },
  {
    icon: Users,
    title: 'CRM Personalizado',
    description:
      'Gestão completa de clientes, funil de vendas automatizado e fluxos de processo adaptados à sua operação comercial.',
    tags: ['Vendas', 'Automação', 'Pipeline'],
  },
  {
    icon: Package,
    title: 'Controle de Estoque & Gestão',
    description:
      'Sistemas integrados para logística, inventário e operações. Relatórios em tempo real, alertas automáticos e rastreabilidade total.',
    tags: ['Logística', 'Inventário', 'Relatórios'],
  },
  {
    icon: BookOpen,
    title: 'Portais de Conhecimento',
    description:
      'Wikis corporativas internas para documentação, onboarding e treinamentos. Organização intuitiva e controle de acesso por equipe.',
    tags: ['Documentação', 'Wikis', 'Treinamento'],
  },
  {
    icon: Globe,
    title: 'Websites & Landing Pages',
    description:
      'Sites institucionais e landing pages focados em conversão e autoridade de marca. Design estratégico, SEO otimizado e performance máxima.',
    tags: ['SEO', 'Conversão', 'Institucional'],
  },
];

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[0];
  index: number;
}) {
  const Icon = solution.icon;

  return (
    <div
      className="glass-card glass-card-hover rounded-2xl p-7 flex flex-col gap-5 group cursor-default"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.1] transition-colors duration-300">
          <Icon size={22} className="text-white/70" strokeWidth={1.5} />
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/[0.08]">
          <ArrowUpRight size={14} className="text-white/60" />
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-white mb-2 tracking-tight">{solution.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed font-light">{solution.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {solution.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide text-white/40 bg-white/[0.04] border border-white/[0.06] uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.card-reveal').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('opacity-100', 'translate-y-0');
                el.classList.remove('opacity-0', 'translate-y-8');
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="solucoes" ref={sectionRef} className="py-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,255,255,0.015),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-6 inline-flex">
            <span className="glow-dot" />
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient tracking-tight mt-4 mb-5">
            Soluções Completas para
            <br />
            <span className="text-white/40 font-light">a Sua Empresa</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Do back-end ao front-end, do conceito ao deploy — entregamos sistemas robustos que resolvem problemas reais.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.slice(0, 3).map((solution, i) => (
            <div
              key={solution.title}
              className="card-reveal opacity-0 translate-y-8 transition-all duration-500"
            >
              <SolutionCard solution={solution} index={i} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-2xl lg:max-w-none mx-auto lg:w-2/3 lg:mx-auto">
          {solutions.slice(3).map((solution, i) => (
            <div
              key={solution.title}
              className="card-reveal opacity-0 translate-y-8 transition-all duration-500"
            >
              <SolutionCard solution={solution} index={i + 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
