import { Github } from "lucide-react";
import type { CSSProperties, RefObject } from "react";
import { Link } from "react-router-dom";

const highlights = [
  "Análise técnica dos problemas de renderização e fluidez no carrossel original.",
  "Implementação de carrossel infinito com animação contínua e comportamento previsível.",
  "Estrutura de API para produtores com CRUD, seeding e testes automatizados.",
  "Painel administrativo com edição em modal, ordenação por score e ajustes de UX.",
  "Cálculo de relevância no backend e integração completa com frontend tipado.",
];

const achievements = [
  "Redução de inconsistências visuais durante o carregamento com skeleton responsivo.",
  "Padronização de rotas, botões de navegação e hierarquia visual entre telas.",
  "Base pronta para evolução da lógica de rotação e validação de performance.",
];

const logos = [
  { name: "PHP", src: "/tech-logos/php-logo.png" },
  { name: "Laravel", src: "/tech-logos/laravel-logo.png" },
  { name: "TypeScript", src: "/tech-logos/typescript-logo.png" },
  { name: "React", src: "/tech-logos/react-logo.png" },
  { name: "React Router", src: "/tech-logos/react-router-logo.png" },
  { name: "Tailwind", src: "/tech-logos/tailwind-logo.png" },
  { name: "Vite", src: "/tech-logos/vitejs-logo.png" },
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
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-slate-950/40 px-4 py-2 backdrop-blur">
            <img
              src="/greenn-logo.ico"
              alt="Logo Greenn"
              className="h-5 w-5 rounded-sm object-cover"
            />
            <span className="text-sm uppercase tracking-[0.2em] text-emerald-200/85">
              Greenn Challenge
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl min-[1800px]:text-6xl">
            Visão geral do desafio para vaga na Greenn
          </h1>

          <p className="mt-5 max-w-4xl text-base text-slate-200/85 sm:text-lg min-[1800px]:text-[1.45rem] min-[1800px]:leading-relaxed">
            Projeto técnico criado para investigar falhas no carrossel original
            e evoluir para uma solução full stack com foco em estabilidade e
            fluidez.
          </p>

          <p className="mt-3 max-w-4xl text-sm text-emerald-100/90 min-[1800px]:text-xl">
            Objetivo: conquistar a vaga de{" "}
            <a
              href="https://vagas.solides.com.br/vaga/771877/desenvolvedor28a29-fullstack-pleno-28laravel-e-react29-bluee"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-emerald-300/60 underline-offset-4 hover:text-emerald-100"
            >
              Desenvolvedor(a) Fullstack Pleno (Laravel e React) na Bluee
            </a>
            .
          </p>

          <div className="mt-6 flex flex-wrap gap-3 min-[1800px]:mt-8 min-[1800px]:gap-4">
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

          <div className="mt-4 flex flex-wrap gap-2 text-xs min-[1800px]:mt-6 min-[1800px]:text-sm">
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

        <div className="intro-overview-orbit relative mx-auto flex min-h-[280px] w-full max-w-[360px] items-center justify-center">
          <div
            ref={orbitRef}
            className="tech-orbit relative w-full max-w-[clamp(16rem,22vw,24rem)] aspect-square rounded-full min-[1800px]:max-w-[clamp(22rem,20vw,30rem)]"
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
    <section className="intro-video rounded-2xl border border-red-200/20 bg-slate-950/45 p-4 sm:p-5">
      <p className="text-sm font-semibold tracking-wide text-red-200/85">
        Diagnóstico em vídeo do problema do carrossel
      </p>
      <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-100/90">
        <li>Produtores repetidos em sequência após algum tempo.</li>
        <li>Colisão visual entre cartões e lag durante a rolagem.</li>
      </ul>
      <p className="mt-3 text-xs tracking-wide text-slate-300/75">
        Dados do vídeo coletados no site da Greenn em 22 de fevereiro de 2026.
      </p>

      <div className="mx-auto mt-4 w-full rounded-xl border border-white/10 bg-black/40 p-2">
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
    <section className="intro-solutions rounded-2xl border border-emerald-200/20 bg-slate-950/45 p-4 sm:p-5">
      <p className="text-sm font-semibold tracking-wide text-emerald-200/85">
        Soluções implementadas
      </p>
      <div className="mt-3 grid gap-3">
        {highlights.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/12 bg-slate-900/40 px-3 py-2 text-[15px] leading-relaxed text-slate-100/90"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export function IntroResultsSection() {
  return (
    <section className="intro-results rounded-2xl border border-emerald-200/15 bg-emerald-950/25 p-4 sm:p-6">
      <p className="text-sm font-semibold tracking-wide text-emerald-200/85">
        Resultado alcançado até aqui
      </p>
      <ul className="mt-4 grid gap-2 text-[15px] leading-relaxed text-emerald-50/90">
        {achievements.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-white/10 bg-slate-950/20 px-3 py-2"
          >
            {item}
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
    <section className="intro-tech rounded-2xl border border-emerald-200/15 bg-emerald-950/25 p-4 sm:p-6">
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
