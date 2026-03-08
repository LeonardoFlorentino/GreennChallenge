import {
  Bug,
  CheckCircle,
  Code,
  Database,
  Github,
  Layout,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import type { CSSProperties, RefObject } from "react";
import { Link } from "react-router-dom";

const highlights = [
  {
    icon: Code,
    text: "Análise técnica dos problemas de renderização e fluidez no carrossel original.",
  },
  {
    icon: RefreshCw,
    text: "Implementação de carrossel infinito com animação contínua e comportamento previsível.",
  },
  {
    icon: Database,
    text: "Estrutura de API para produtores com CRUD, seeding e testes automatizados.",
  },
  {
    icon: Layout,
    text: "Painel administrativo com edição em modal, ordenação por score e ajustes de UX.",
  },
  {
    icon: Zap,
    text: "Cálculo de relevância no backend e integração completa com frontend tipado.",
  },
];

const achievements = [
  {
    icon: Code,
    text: "Arquitetura fullstack escalável com Laravel (API REST + seeding + testes) e React com TypeScript tipado.",
  },
  {
    icon: RefreshCw,
    text: "Integração frontend-backend robusta com comunicação assíncrona e tratamento de estados complexos.",
  },
  {
    icon: Database,
    text: "Modelagem e manutenção de dados com foco em performance e consistência para cenários de produção.",
  },
  {
    icon: Zap,
    text: "Aplicação de estratégias de cache em memória e otimização de fluxos para reduzir latência.",
  },
  {
    icon: CheckCircle,
    text: "Código limpo, revisão técnica colaborativa e alinhamento com UI/UX, QA e DevOps para entregas confiáveis.",
  },
];

const logos = [
  { name: "React Router", src: "/tech-logos/react-router-logo.png" },
  { name: "PHP", src: "/tech-logos/php-logo.png" },
  { name: "Vite", src: "/tech-logos/vitejs-logo.png" },
  { name: "CSS", src: "/tech-logos/css-logo.png" },
  { name: "Laravel", src: "/tech-logos/laravel-logo.png" },
  { name: "React", src: "/tech-logos/react-logo.png" },
  { name: "JavaScript", src: "/tech-logos/js-logo.png" },
  { name: "TypeScript", src: "/tech-logos/typescript-logo.png" },
  { name: "Tailwind", src: "/tech-logos/tailwind-logo.png" },
  { name: "HTML", src: "/tech-logos/html-logo.png" },
];

interface IntroOverviewSectionProps {
  orbitRef: RefObject<HTMLDivElement | null>;
  reactLogoRef: RefObject<HTMLImageElement | null>;
  laravelLogoRef: RefObject<HTMLImageElement | null>;
  centerLogoRef: RefObject<HTMLImageElement | null>;
  centerGlowRef: RefObject<HTMLDivElement | null>;
}

export function IntroOverviewSection({
  orbitRef,
  reactLogoRef,
  laravelLogoRef,
  centerLogoRef,
  centerGlowRef,
}: IntroOverviewSectionProps) {
  return (
    <section className="intro-overview rounded-2xl border border-white/20 bg-slate-950/40 p-5 backdrop-blur min-[1800px]:p-7">
      <div className="intro-overview-grid">
        <div className="intro-overview-content">
          <div className="intro-overview-brand inline-flex items-center gap-3 rounded-full border border-white/20 bg-slate-950/40 px-4 py-2 backdrop-blur">
            <img
              src="/greenn-logo.ico"
              alt="Logo Greenn"
              className="h-5 w-5 rounded-sm object-cover"
            />
            <span className="intro-overview-brand-label text-sm uppercase tracking-[0.2em] text-emerald-200/85">
              Greenn Challenge
            </span>
          </div>

          <h1 className="intro-overview-title mt-5 max-w-4xl text-[clamp(2.2rem,3.3vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.015em] min-[1800px]:text-[clamp(2.8rem,2.6vw,4rem)]">
            Análise técnica e refatoração
            <span className="block text-emerald-100/95">
              da arquitetura do carrossel da Greenn
            </span>
          </h1>
        </div>

        <div className="intro-overview-details">
          <p className="intro-overview-lead max-w-4xl text-[clamp(1rem,1.12vw,1.25rem)] leading-relaxed text-slate-200/85 min-[1800px]:text-[clamp(1.1rem,1vw,1.45rem)]">
            Projeto técnico criado para investigar falhas no carrossel de
            produtores digitais, do site oficial da Greenn e evoluir para uma
            solução full stack com foco em estabilidade e fluidez.
          </p>

          <p className="intro-overview-goal mt-3 max-w-4xl text-[clamp(0.86rem,0.95vw,1.08rem)] leading-relaxed text-emerald-100/90 min-[1800px]:text-[clamp(0.95rem,0.9vw,1.25rem)]">
            Objetivo: conquistar a vaga de{" "}
            <a
              href="https://vagas.solides.com.br/vaga/771877/desenvolvedor28a29-fullstack-pleno-28laravel-e-react29-bluee"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-emerald-300/60 underline-offset-4 hover:text-emerald-100"
            >
              Desenvolvedor(a) Fullstack Pleno (Laravel e React) na Greenn
            </a>
            , contribuindo no projeto com IA Bluee.ai.
          </p>

          <div className="intro-overview-actions mt-6 flex flex-wrap gap-3 min-[1800px]:mt-8 min-[1800px]:gap-4">
            <Link
              to="/home"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#14916A] px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(20,145,106,0.32)] transition hover:-translate-y-0.5 hover:bg-[#0f7c59] min-[1800px]:h-14 min-[1800px]:px-7 min-[1800px]:text-lg"
            >
              Ir para o carrossel
            </Link>
            <Link
              to="/admin"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/25 bg-slate-900/70 px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(2,8,23,0.35)] transition hover:-translate-y-0.5 hover:bg-slate-800/85 min-[1800px]:h-14 min-[1800px]:px-7 min-[1800px]:text-lg"
            >
              Abrir painel administrativo
            </Link>
          </div>

          <div className="intro-overview-badges mt-4 flex flex-wrap gap-2 text-xs min-[1800px]:mt-6 min-[1800px]:text-sm">
            <span className="rounded-full border border-white/15 bg-slate-950/40 px-3 py-1 text-slate-200/90">
              Diagnóstico de renderização
            </span>
            <span className="rounded-full border border-white/15 bg-slate-950/40 px-3 py-1 text-slate-200/90">
              Refatoração full stack
            </span>
            <span className="rounded-full border border-white/15 bg-slate-950/40 px-3 py-1 text-slate-200/90">
              Foco em performance
            </span>
          </div>
        </div>

        <div className="intro-overview-orbit relative mx-auto flex w-full max-w-[280px] items-center justify-center min-[1800px]:max-w-[320px]">
          <div
            ref={orbitRef}
            className="tech-orbit relative aspect-square w-full max-w-[clamp(10.5rem,12vw,15rem)] rounded-full min-[1800px]:max-w-[clamp(11.5rem,10vw,16rem)]"
          >
            <div className="absolute inset-4 rounded-full border border-dashed border-emerald-200/35" />
            <div
              ref={centerGlowRef}
              className="tech-orbit-center-glow absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-md"
            />
            <img
              ref={centerLogoRef}
              src="/greenn-logo.png"
              alt="Greenn"
              className="tech-orbit-center-logo absolute left-1/2 top-1/2 h-8 w-8 object-contain"
            />

            <div className="tech-orbit-track">
              <img
                ref={reactLogoRef}
                src="/tech-logos/react-logo.png"
                alt="React"
                className="tech-orbit-logo tech-orbit-logo-react tech-orbit-planet object-contain"
              />
              <img
                ref={laravelLogoRef}
                src="/tech-logos/laravel-logo.png"
                alt="Laravel"
                className="tech-orbit-logo tech-orbit-logo-laravel tech-orbit-planet object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IntroVideoSection() {
  return (
    <section className="intro-video rounded-2xl border border-red-200/20 bg-slate-950/45 p-2.5 backdrop-blur sm:p-3">
      <div className="flex items-center gap-2">
        <Bug className="h-[25px] w-[25px] shrink-0 text-slate-300/70" />
        <p className="text-sm font-semibold tracking-wide text-slate-100/90">
          Problemas identificados no carrossel original
        </p>
      </div>
      <div className="mt-3 space-y-2.5">
        <div className="rounded-lg border border-white/12 bg-slate-900/40 px-3 py-2.5">
          <p className="text-sm font-semibold text-slate-100/95">
            Duplicação de produtores digitais
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-slate-200/80">
            Cartões de produtores aparecem repetidos em sequência, indicando
            falhas na lógica de rotação e controle dos dados renderizados.
          </p>
        </div>
        <div className="rounded-lg border border-white/12 bg-slate-900/40 px-3 py-2.5">
          <p className="text-sm font-semibold text-slate-100/95">
            Colisões visuais e <em>lag</em> perceptível
          </p>
          <p className="mt-1 text-[14px] leading-relaxed text-slate-200/80">
            Durante a rolagem, cartões colidem visualmente e a interface
            apresenta travamentos momentâneos, afetando a fluidez da
            experiência.
          </p>
        </div>
      </div>
      <p className="mt-3 text-xs tracking-wide text-slate-300/75">
        Dados do vídeo coletados no site oficial da Greenn em 22 de fevereiro de
        2026.
      </p>

      <div className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 p-1">
        <video
          className="aspect-video w-full rounded-lg object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/demos/greenn-carousel-duplicate-cards-and-swipe-lag-bug.mp4"
            type="video/mp4"
          />
          Seu navegador não suporta reprodução de vídeo.
        </video>
      </div>

      <a
        href="https://github.com/LeonardoFlorentino/GreennChallenge"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-200/90 underline decoration-emerald-300/60 underline-offset-4 hover:text-emerald-100"
      >
        <Github size={14} />
        Ver projeto no GitHub
      </a>
    </section>
  );
}

export function IntroSolutionsSection() {
  return (
    <section className="intro-solutions rounded-2xl border border-emerald-200/20 bg-slate-950/45 p-4 backdrop-blur sm:p-5">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-[18px] w-[18px] shrink-0 text-emerald-200/70" />
        <p className="intro-section-title text-sm font-semibold tracking-wide text-emerald-200/85">
          Soluções implementadas
        </p>
      </div>
      <div className="mt-3 grid gap-3">
        {highlights.map((item) => (
          <div
            key={item.text}
            className="flex items-start gap-2.5 rounded-xl border border-white/12 bg-slate-900/40 px-3 py-2"
          >
            <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300/60" />
            <span className="intro-section-item-text text-[15px] leading-relaxed text-slate-100/90">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IntroResultsSection() {
  return (
    <section className="intro-results rounded-2xl border border-emerald-200/15 bg-emerald-950/25 p-4 backdrop-blur sm:p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-[18px] w-[18px] shrink-0 text-emerald-200/70" />
        <p className="intro-section-title text-sm font-semibold tracking-wide text-emerald-200/85">
          Competências fullstack demonstradas
        </p>
      </div>
      <ul className="intro-results-list mt-4 grid gap-2 text-[15px] leading-relaxed text-emerald-50/90">
        {achievements.map((item) => (
          <li
            key={item.text}
            className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-slate-950/20 px-3 py-2"
          >
            <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300/65" />
            <span className="intro-section-item-text">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface IntroTechSectionProps {
  techViewportRef: RefObject<HTMLDivElement | null>;
  techBaseSetRef: RefObject<HTMLDivElement | null>;
  techCopies: number;
  techMarqueeStyle: CSSProperties;
}

export function IntroTechSection({
  techViewportRef,
  techBaseSetRef,
  techCopies,
  techMarqueeStyle,
}: IntroTechSectionProps) {
  return (
    <section className="intro-tech rounded-2xl border border-emerald-200/15 bg-emerald-950/25 p-4 backdrop-blur sm:p-6">
      <p className="text-sm font-semibold tracking-wide text-emerald-200/85">
        Tecnologias utilizadas
      </p>
      <div
        ref={techViewportRef}
        className="tech-marquee-shell mt-3 overflow-hidden rounded-xl border border-white/10 bg-slate-950/30 py-3"
      >
        <div
          className="tech-marquee-track flex w-max items-center"
          style={techMarqueeStyle}
        >
          {Array.from({ length: techCopies }).map((_, copyIndex) => (
            <div
              key={`tech-copy-${copyIndex}`}
              ref={copyIndex === 0 ? techBaseSetRef : null}
              className="flex shrink-0 items-center gap-7 pr-7"
            >
              {logos.map((logo) => (
                <img
                  key={`${copyIndex}-${logo.name}`}
                  src={logo.src}
                  alt={`Logo ${logo.name}`}
                  title={logo.name}
                  className="tech-marquee-logo shrink-0 opacity-95"
                  loading="eager"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
