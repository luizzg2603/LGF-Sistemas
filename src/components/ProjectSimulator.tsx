import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const projectTypes = [
  { id: 'saas', label: 'Plataforma SaaS', description: 'Sistema em nuvem com acesso por assinatura' },
  { id: 'crm', label: 'CRM Personalizado', description: 'Gestão de clientes e funil de vendas' },
  { id: 'estoque', label: 'Controle de Estoque', description: 'Inventário, logística e operações' },
  { id: 'wiki', label: 'Portal de Conhecimento', description: 'Wiki corporativa e documentação interna' },
  { id: 'site', label: 'Website / Landing Page', description: 'Site institucional ou de conversão' },
  { id: 'outro', label: 'Outro / Não sei ainda', description: 'Me ajude a definir a melhor solução' },
];

const budgetRanges = [
  { id: 'ate1k', label: 'Até R$ 1.000' },
  { id: '1k-5k', label: 'R$ 1.000 – R$ 5.000' },
  { id: '5k-10k', label: 'R$ 5.000 – R$ 10.000' },
  { id: 'acima10k', label: 'Acima de R$ 10.000' },
];

const timelines = [
  { id: '1m', label: '1 mês' },
  { id: '3m', label: '2–3 meses' },
  { id: '6m', label: '3–6 meses' },
  { id: 'flex', label: 'Flexível' },
];

const WHATSAPP_NUMBER = '48999726678';

function buildWhatsAppMessage(data: {
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  company: string;
}) {
  const type = projectTypes.find((p) => p.id === data.projectType)?.label ?? data.projectType;
  const budget = budgetRanges.find((b) => b.id === data.budget)?.label ?? data.budget;
  const timeline = timelines.find((t) => t.id === data.timeline)?.label ?? data.timeline;

  return encodeURIComponent(
    `Olá! Vim pelo site da LGF Sistemas e gostaria de um orçamento.\n\n` +
      `*Tipo de Projeto:* ${type}\n` +
      `*Orçamento Previsto:* ${budget}\n` +
      `*Prazo Desejado:* ${timeline}\n` +
      `*Nome:* ${data.name}\n` +
      `*Empresa:* ${data.company}`
  );
}

export default function ProjectSimulator() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const totalSteps = 4;

  const handleSend = () => {
    const msg = buildWhatsAppMessage({ projectType, budget, timeline, name, company });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const canAdvance = () => {
    if (step === 1) return !!projectType;
    if (step === 2) return !!budget;
    if (step === 3) return !!timeline;
    if (step === 4) return name.trim().length > 1;
    return false;
  };

  return (
    <section id="simulador" className="py-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.02),transparent)]" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-6 inline-flex">
            <span className="glow-dot" />
            Simulador de Projeto
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient tracking-tight mt-5 mb-5">
            Monte o Seu Projeto
          </h2>
          <p className="text-white/50 text-lg font-light">
            Responda 4 perguntas rápidas e receba uma proposta personalizada via WhatsApp.
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/[0.08]">
          {/* Progress bar */}
          <div className="h-1 bg-white/[0.05]">
            <div
              className="h-full bg-white/40 transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          <div className="p-8 md:p-10">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i + 1 <= step ? 'bg-white/60' : 'bg-white/10'
                  }`}
                />
              ))}
              <span className="text-white/30 text-xs font-medium ml-1 whitespace-nowrap">
                {step}/{totalSteps}
              </span>
            </div>

            {/* Step 1 — Project Type */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Que tipo de projeto você precisa?</h3>
                <p className="text-white/40 text-sm mb-6 font-light">Selecione a opção que melhor descreve o que você precisa.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setProjectType(type.id)}
                      className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                        projectType === type.id
                          ? 'border-white/30 bg-white/[0.07]'
                          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${
                        projectType === type.id ? 'border-white bg-white' : 'border-white/20'
                      }`} />
                      <div>
                        <div className="text-sm font-semibold text-white">{type.label}</div>
                        <div className="text-xs text-white/35 mt-0.5 font-light">{type.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Budget */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Qual o orçamento previsto?</h3>
                <p className="text-white/40 text-sm mb-6 font-light">Isso nos ajuda a propor a melhor solução dentro da sua realidade.</p>
                <div className="grid grid-cols-2 gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setBudget(range.id)}
                      className={`py-4 px-5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        budget === range.id
                          ? 'border-white/30 bg-white/[0.07] text-white'
                          : 'border-white/[0.07] bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white/70'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 — Timeline */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Qual o prazo ideal para entrega?</h3>
                <p className="text-white/40 text-sm mb-6 font-light">Assim conseguimos planejar os recursos necessários.</p>
                <div className="grid grid-cols-2 gap-3">
                  {timelines.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      className={`py-4 px-5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        timeline === t.id
                          ? 'border-white/30 bg-white/[0.07] text-white'
                          : 'border-white/[0.07] bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white/70'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 — Contact */}
            {step === 4 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Quase lá! Quem devo contatar?</h3>
                <p className="text-white/40 text-sm mb-6 font-light">Vamos enviar a proposta diretamente no WhatsApp.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Seu nome *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Empresa</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Empresa XYZ"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Resumo do Projeto</p>
                  <SummaryRow label="Tipo" value={projectTypes.find((p) => p.id === projectType)?.label ?? ''} />
                  <SummaryRow label="Orçamento" value={budgetRanges.find((b) => b.id === budget)?.label ?? ''} />
                  <SummaryRow label="Prazo" value={timelines.find((t) => t.id === timeline)?.label ?? ''} />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className={`text-sm font-medium text-white/40 hover:text-white/70 transition-colors flex items-center gap-1 ${
                  step === 1 ? 'invisible' : ''
                }`}
              >
                <ChevronRight size={14} className="rotate-180" />
                Voltar
              </button>

              {step < totalSteps ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canAdvance()}
                  className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continuar <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={!canAdvance()}
                  className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <CheckCircle2 size={14} />
                  Enviar via WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/30">{label}</span>
      <span className="text-xs font-semibold text-white/70">{value}</span>
    </div>
  );
}
