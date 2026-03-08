import { useEffect, useState } from "react";
import { WifiOff, RotateCcw } from "lucide-react";
import { producerService } from "../../services/producersService";
import type { Producer } from "../../types/producer";
import { ProducerCard } from "../../components/ProducerCard";
import { ProducerCardSkeleton } from "../../components/ProducerCardSkeleton";
import { LeftArrowButton } from "../../components/LeftArrowButton";
import { NavButton } from "../../components/NavButton";

function sortByScoreDesc(items: Producer[]) {
  return [...items].sort((a, b) => b.relevance_score - a.relevance_score);
}

interface ErrorState {
  message: string;
  code: string;
}

export default function Admin() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntroButton, setShowIntroButton] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        setLoading(true);

        // Cria um timeout para mostrar erro após 10 segundos
        const timeoutId = setTimeout(() => {
          if (loading) {
            setError({
              message:
                "Não foi possível conectar ao servidor. Tente novamente.",
              code: "TIMEOUT",
            });
            setLoading(false);
          }
        }, 10000);

        const data = await producerService.getAll();
        clearTimeout(timeoutId);
        setProducers(sortByScoreDesc(data as Producer[]));
        setError(null);
        setLoading(false);
      } catch (err) {
        const errorCode =
          err instanceof Error && "status" in err
            ? String((err as any).status)
            : "UNKNOW";
        setError({
          message: "Não foi possível conectar ao servidor. Tente novamente.",
          code: errorCode || "UNKNOW",
        });
        setProducers([]);
        setLoading(false);
        console.error("Erro ao carregar produtores:", err);
      }
    }

    load();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowIntroButton(window.scrollY < 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleUpdate(updated: Producer) {
    setProducers((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      return sortByScoreDesc(next);
    });
  }

  async function handleRetry() {
    setError(null);
    setLoading(true);

    try {
      // Cria um timeout para mostrar erro após 10 segundos
      const timeoutId = setTimeout(() => {
        setError({
          message: "Não foi possível conectar ao servidor. Tente novamente.",
          code: "TIMEOUT",
        });
        setLoading(false);
      }, 10000);

      const data = await producerService.getAll();
      clearTimeout(timeoutId);
      setProducers(sortByScoreDesc(data as Producer[]));
      setError(null);
      setLoading(false);
    } catch (err) {
      const errorCode =
        err instanceof Error && "status" in err
          ? String((err as any).status)
          : "UNKNOW";
      setError({
        message: "Não foi possível conectar ao servidor. Tente novamente.",
        code: errorCode || "UNKNOW",
      });
      setProducers([]);
      setLoading(false);
      console.error("Erro ao carregar produtores:", err);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#019c7c] via-[#012e25] to-black" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <img
          src="/greenn-logo-background.webp"
          alt="Greenn Background"
          className="w-[1000px] max-w-none select-none opacity-[0.10] blur-sm mix-blend-lighten"
        />
      </div>

      <div className="relative z-20 p-6 pt-24 sm:p-10 sm:pt-28 lg:p-12 lg:pt-32">
        <NavButton
          to="/"
          position="left"
          className={`top-6 left-6 sm:top-10 sm:left-10 lg:top-12 lg:left-12 ${
            showIntroButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          Introdução
        </NavButton>
        <LeftArrowButton
          to="/home"
          className="top-6 right-6 sm:top-10 sm:right-10 lg:top-12 lg:right-12"
        />

        {!error && (
          <div className="mb-14">
            <h1 className="bg-gradient-to-r from-white via-green-300 to-emerald-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Painel de Produtores
            </h1>

            <p className="mt-3 text-lg text-white/60">
              Gestão estratégica de performance e relevância digital
            </p>
          </div>
        )}

        <div
          className={`${error ? "flex items-center justify-center min-h-[calc(100vh-120px)] -mt-16" : "grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"}`}
        >
          {error ? (
            <div className="flex flex-col items-center justify-center w-full px-4">
              <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-15px); }
                }
                @keyframes glow {
                  0%, 100% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
                  50% { text-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
                }
                @keyframes iconGlow {
                  0%, 100% { filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.6)); }
                  50% { filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.9)); }
                }
                .animate-float {
                  animation: float 4s ease-in-out infinite;
                }
                .animate-glow {
                  animation: glow 3s ease-in-out infinite;
                }
                .animate-icon-glow {
                  animation: iconGlow 3s ease-in-out infinite;
                }
              `}</style>
              <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center md:items-start">
                  {/* Ícone com decoração */}
                  <div className="flex flex-col items-center justify-center relative">
                    {/* Círculo de background */}
                    <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

                    <div className="relative">
                      <WifiOff
                        className="w-48 h-48 text-emerald-400 animate-float animate-icon-glow"
                        strokeWidth={1.5}
                      />
                      <div className="absolute -bottom-2 right-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-sm px-3 py-1.5 rounded-md shadow-lg border border-emerald-300/50 animate-float">
                        {error.code}
                      </div>
                    </div>
                  </div>

                  {/* Texto e Botão */}
                  <div className="flex flex-col justify-center">
                    <div className="space-y-2 mb-4">
                      <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full" />
                    </div>

                    <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent mb-6 leading-tight animate-glow">
                      Conexão
                      <br />
                      Indisponível
                    </h2>

                    <p className="text-white/70 mb-10 text-lg leading-relaxed">
                      Estamos precisando de mais tempo para conectar com o
                      servidor. Isso pode ser temporário. Por favor, tente
                      novamente.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleRetry}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 text-lg shadow-lg hover:shadow-emerald-500/50"
                      >
                        <RotateCcw className="w-6 h-6" />
                        {loading ? "Conectando..." : "Tentar Novamente"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ProducerCardSkeleton key={i} />
            ))
          ) : producers.length > 0 ? (
            producers.map((producer) => (
              <ProducerCard
                key={producer.id}
                producer={producer}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-16">
              <p className="text-lg text-white/60">
                Nenhum produtor encontrado
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
