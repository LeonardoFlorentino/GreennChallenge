import { ServerCrash, RotateCcw } from "lucide-react";

interface ConnectionErrorProps {
  code: string;
  onRetry: () => void;
  loading?: boolean;
}

export function ConnectionError({
  code,
  onRetry,
  loading = false,
}: ConnectionErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 sm:px-12 md:px-16">
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
            <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

            <div className="relative">
              <ServerCrash
                className="w-48 h-48 text-emerald-400 animate-float animate-icon-glow"
                strokeWidth={1.5}
              />
              <div className="absolute -bottom-2 right-0 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-sm px-3 py-1.5 rounded-md shadow-lg border border-emerald-300/50 animate-float">
                {code}
              </div>
            </div>
          </div>

          {/* Texto e Botão */}
          <div className="flex flex-col justify-center">
            <div className="space-y-2 mb-4">
              <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full" />
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent mb-6 leading-tight animate-glow">
              Servidor
              <br />
              Indisponível
            </h2>

            <p className="text-white/70 mb-10 text-lg leading-relaxed">
              O servidor não está respondendo no momento. Isso pode ser
              temporário. Por favor, tente novamente.
            </p>

            <div className="flex justify-center">
              <button
                onClick={onRetry}
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
  );
}
