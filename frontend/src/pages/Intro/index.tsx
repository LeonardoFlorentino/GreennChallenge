import { Link } from "react-router-dom";

const highlights = [
  "API versionada de produtores com Laravel + Sanctum",
  "CRUD completo com validação, seed e testes automatizados",
  "Score de relevância calculado dinamicamente no backend",
  "Painel admin com edição em modal, ordenação por score e UX refinada",
  "Carrossel infinito com loading skeleton e filtro de imagem inválida",
];

const stack = [
  "PHP",
  "Laravel",
  "SQLite",
  "TypeScript",
  "React",
  "React Router",
  "Tailwind CSS",
  "Vite",
  "PHPUnit",
];

export default function Intro() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#019c7c] via-[#012e25] to-[#07132a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_42%)]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-14 sm:px-10">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/80">
          Greenn Challenge
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
          Visão geral do que foi desenvolvido no projeto
        </h1>
        <p className="mt-5 max-w-3xl text-base text-slate-200/80 sm:text-lg">
          Esta página resume as principais entregas até aqui, com base no
          histórico de commits: evolução da API, painel administrativo,
          algoritmo de score e experiência frontend.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/15 bg-slate-950/35 px-4 py-3 text-sm text-slate-100/90"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300/70">
            Stack utilizada
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-emerald-200/20 bg-emerald-950/35 px-3 py-1 text-xs text-emerald-100/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/home"
            className="rounded-2xl bg-[#14916A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f7c59]"
          >
            Ir para o carrossel
          </Link>
          <Link
            to="/admin"
            className="rounded-2xl border border-white/20 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800/70"
          >
            Abrir painel administrativo
          </Link>
        </div>
      </section>
    </main>
  );
}
