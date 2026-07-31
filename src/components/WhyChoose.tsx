import { useEffect, useRef } from 'react';
import { Zap, ShieldCheck, Layers, HeadphonesIcon, GitBranch, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Alta Escalabilidade',
    description:
      'Arquiteturas projetadas para crescer. Seus sistemas acompanham a expansão do negócio sem reescritas ou migrações traumáticas.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança de Dados',
    description:
      'Criptografia ponta a ponta, controle de acesso granular, backups automatizados e conformidade com as melhores práticas de segurança.',
  },
  {
    icon: Layers,
    title: 'Design Intuitivo',
    description:
      'Interfaces pensadas para o usuário final. Reduzimos a curva de aprendizado e aumentamos a adoção das ferramentas pela equipe.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Dedicado',
    description:
      'Canal direto com a equipe técnica. Monitoramento contínuo, atualizações proativas e SLA definido em contrato.',
  },
  {
    icon: GitBranch,
    title: 'Entregas Ágeis',
    description:
      'Sprints curtos, demos frequentes e feedback contínuo. Você acompanha cada etapa do desenvolvimento em tempo real.',
  },
  {
    icon: BarChart3,
    title: 'Análise & Métricas',
    description:
      'Dashboards e relatórios nativos em todos os sistemas. Tome decisões baseadas em dados, não em suposições.',
  },
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.why-card').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 70);
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
    <section id="recursos" ref={sectionRef} className="py-28 relative">
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column — text */}
          <div className="lg:sticky lg:top-32">
            <span className="section-label mb-6 inline-flex">
              <span className="glow-dot" />
              Por que a LGF?
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gradient tracking-tight mt-5 mb-6 leading-tight">
              Por que escolher a
              <br />
              <span className="text-white">LGF Sistemas?</span>
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-8">
              Não somos apenas uma fábrica de software. Somos parceiros estratégicos comprometidos com o sucesso do seu negócio — do briefing ao pós-lançamento.
            </p>

            {/* Quote */}
            <div className="glass-card rounded-2xl p-6 border-l-2 border-white/20">
              <p className="text-white/70 text-sm leading-relaxed italic font-light mb-3">
                "Cada projeto começa com a pergunta certa: qual problema real isso resolve? O código é só o meio — o resultado é o que importa."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white/60 text-xs font-bold">LG</span>
                </div>
                <div>
                  <div className="text-white/80 text-xs font-semibold">Luiz Gustavo</div>
                  <div className="text-white/35 text-xs">Fundador, LGF Sistemas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="why-card glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4"
                  style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center">
                    <Icon size={18} className="text-white/60" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{feature.title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed font-light">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
