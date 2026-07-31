import { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  CheckCircle2,
} from "lucide-react";

const projectOptions = [
  "Plataforma SaaS",
  "CRM Personalizado",
  "Controle de Estoque",
  "Portal de Conhecimento",
  "Website / Landing Page",
  "Outro",
];

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
};

export default function ContactFooter() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Número do WhatsApp da LGF Sistemas (55 + DDD + Número)
    const phoneNumber = "5548999726678";

    // Formatação da mensagem enviada no WhatsApp
    const messageText =
      `*Novo Contato - LGF Sistemas*\n\n` +
      `*Nome:* ${form.name}\n` +
      `*E-mail:* ${form.email}\n` +
      `*Empresa:* ${form.company || "Não informada"}\n` +
      `*Tipo de Projeto:* ${form.projectType || "Não selecionado"}\n` +
      `*Mensagem:* ${form.message}`;

    const encodedText = encodeURIComponent(messageText);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Redireciona o cliente diretamente para o seu WhatsApp
      window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
    }, 1000);
  };

  const isValid =
    form.name.trim() && form.email.includes("@") && form.message.trim();

  return (
    <>
      {/* Contact Section */}
      <section id="contato" className="py-28 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left info column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="section-label mb-6 inline-flex">
                  <span className="glow-dot" />
                  Fale Conosco
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gradient tracking-tight mt-5 mb-5 leading-tight">
                  Vamos construir
                  <br />
                  <span className="text-white">algo juntos</span>
                </h2>
                <p className="text-white/50 text-lg font-light leading-relaxed">
                  Conte-nos sobre o seu projeto. Respondemos em até 24 horas
                  úteis com uma análise preliminar e próximos passos.
                </p>
              </div>

              <div className="space-y-4">
                <ContactInfo icon={Mail} text="contato@lgfsistemas.com" />
                <ContactInfo icon={Phone} text="+55 (48) 99972-6678" />
                <ContactInfo icon={MapPin} text="Santa Catarina, SC — Brasil" />
              </div>

              <div className="flex items-center gap-3">
                <SocialLink
                  icon={Linkedin}
                  href="https://www.linkedin.com/in/luiz-gustavo-floriano"
                  label="LinkedIn"
                />
                <SocialLink
                  icon={Instagram}
                  href="https://www.instagram.com/lluizz.g"
                  label="Instagram"
                />
              </div>
            </div>

            {/* Right form column */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-8 md:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                    <div className="w-16 h-16 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                      <CheckCircle2
                        size={32}
                        className="text-white/70"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Redirecionando para o WhatsApp...
                    </h3>
                    <p className="text-white/50 text-sm max-w-xs font-light leading-relaxed">
                      Sua mensagem foi formatada com sucesso e a conversa no WhatsApp foi iniciada!
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm(INITIAL);
                      }}
                      className="btn-secondary text-sm mt-2"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="Nome *"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                      />
                      <FormField
                        label="E-mail *"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="Empresa"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Nome da empresa"
                      />
                      <div>
                        <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                          Tipo de Projeto
                        </label>
                        <select
                          name="projectType"
                          value={form.projectType}
                          onChange={handleChange}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all appearance-none"
                        >
                          <option value="" className="bg-[#121212]">
                            Selecione...
                          </option>
                          {projectOptions.map((opt) => (
                            <option
                              key={opt}
                              value={opt}
                              className="bg-[#121212]"
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Descreva brevemente o que você precisa..."
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!isValid || loading}
                      className="btn-primary w-full justify-center text-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                          Iniciando WhatsApp...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Enviar Mensagem
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="sobre" className="border-t border-white/[0.06] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                <span className="text-black font-black text-[10px] tracking-tight">
                  LGF
                </span>
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                LGF <span className="text-white/40">Sistemas</span>
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {["Início", "Soluções", "Recursos", "Sobre Nós", "Contato"].map(
                (item, i) => {
                  const hrefs = [
                    "#inicio",
                    "#solucoes",
                    "#recursos",
                    "#sobre",
                    "#contato",
                  ];
                  return (
                    <a
                      key={item}
                      href={hrefs[i]}
                      className="text-xs text-white/35 hover:text-white/70 transition-colors font-medium"
                    >
                      {item}
                    </a>
                  );
                },
              )}
            </nav>

            {/* Copyright */}
            <p className="text-xs text-white/25 text-center">
              © {new Date().getFullYear()} LGF Sistemas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
      />
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-white/50" strokeWidth={1.5} />
      </div>
      <span className="text-sm text-white/60 font-light">{text}</span>
    </div>
  );
}

function SocialLink({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.08] hover:border-white/15 transition-all duration-200"
    >
      <Icon size={15} strokeWidth={1.5} />
    </a>
  );
}