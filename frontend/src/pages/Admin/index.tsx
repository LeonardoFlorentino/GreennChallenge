import { useCallback, useEffect, useState } from "react";
import { OpenCreateProducerModalListener } from "./OpenCreateProducerModalListener";
import { Plus } from "lucide-react";
import { producerService } from "../../services/producersService";
import type { Producer } from "../../types/producer";
import { ProducerCard } from "../../components/ProducerCard";
import { ProducerCardSkeleton } from "../../components/ProducerCardSkeleton";
import { ProducerModal } from "../../components/ProducerModal";
import { Toast } from "../../components/Toast";
import { LeftArrowButton } from "../../components/LeftArrowButton";
import { NavButton } from "../../components/NavButton";
import { ConnectionError } from "../../components/ConnectionError";

function sortByScoreDesc(items: Producer[]) {
  return [...items].sort((a, b) => b.relevance_score - a.relevance_score);
}

interface ErrorState {
  message: string;
  code: string;
}

export default function Admin() {
  // Ouve erros detalhados da modal para exibir no toast
  useEffect(() => {
    function handleModalError(e: Event) {
      const { message, type, isHtml } = (e as CustomEvent).detail || {};
      setToast({ message, type, isHtml });
    }
    window.addEventListener("producer-modal-error", handleModalError);
    return () =>
      window.removeEventListener("producer-modal-error", handleModalError);
  }, []);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntroButton, setShowIntroButton] = useState(true);
  const [error, setError] = useState<ErrorState | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);

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

  async function handleCreateSuccess(error?: Error) {
    if (error) {
      // Se a mensagem contém tags HTML, ativa isHtml
      const isHtml = /<\/?[a-z][\s\S]*>/i.test(error.message || "");
      setToast({
        message: error.message || "Erro ao criar produtor",
        type: "error",
        isHtml,
      });
      return;
    }
    try {
      const data = await producerService.getAll();
      setProducers(sortByScoreDesc(data as Producer[]));
      setToast({ message: "Produtor criado com sucesso", type: "success" });
    } catch (err) {
      setToast({ message: "Erro ao recarregar produtores", type: "error" });
      console.error("Erro ao recarregar produtores:", err);
    }
  }

  const handleDelete = useCallback(async () => {
    try {
      const data = await producerService.getAll();
      setProducers(sortByScoreDesc(data as Producer[]));
      setToast({ message: "Produtor excluído com sucesso", type: "success" });
    } catch (err) {
      setToast({ message: "Erro ao recarregar produtores", type: "error" });
      console.error("Erro ao recarregar produtores:", err);
    }
  }, []);

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
          <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="bg-gradient-to-r from-white via-green-300 to-emerald-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                Painel de Produtores
              </h1>

              <p className="mt-3 text-lg text-white/60">
                Gestão estratégica de performance e relevância digital
              </p>
            </div>

            {!loading && producers.length > 0 && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="
                  flex items-center gap-2
                  px-5 py-3
                  rounded-2xl
                  bg-[#14916A]
                  hover:bg-[#0f7c59]
                  text-white font-semibold
                  transition-all duration-200
                  hover:scale-[1.03]
                  cursor-pointer
                  shadow-lg shadow-emerald-900/30
                  shrink-0
                "
              >
                <Plus size={20} />
                Novo Produtor
              </button>
            )}
          </div>
        )}

        <div
          className={
            error
              ? "flex items-center justify-center min-h-[calc(100vh-120px)] -mt-16"
              : "grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] max-w-full"
          }
        >
          {error ? (
            <ConnectionError
              code={error.code}
              onRetry={handleRetry}
              loading={loading}
            />
          ) : loading && producers.length === 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-center place-items-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProducerCardSkeleton key={i} />
              ))}
            </div>
          ) : producers.length > 0 ? (
            producers.map((producer) => (
              <ProducerCard
                key={producer.id}
                producer={producer}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full absolute inset-0 flex flex-col items-center justify-center gap-4 translate-y-[90%]">
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-emerald-400 opacity-80"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 0v8m0 4h.01"
                />
              </svg>
              <p className="text-2xl font-semibold text-white/80 text-center">
                Nenhum produtor encontrado
              </p>
              <span className="text-base text-white/50 text-center max-w-xs">
                Cadastre um produtor para começar a usar o painel.
              </span>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              >
                Adicionar produtor
              </button>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <ProducerModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* Ouve evento global para abrir modal de criar produtor (usado pelo carrossel) */}
      <OpenCreateProducerModalListener
        setShowCreateModal={setShowCreateModal}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          isHtml={toast.isHtml}
        />
      )}
    </div>
  );
}
