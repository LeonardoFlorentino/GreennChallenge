import { useState } from "react";
import { Medal } from "lucide-react";
import type { Producer } from "../../types/producer";
import { EditableFieldsSection } from "./EditableFieldsSection";
import { producerService } from "../../services/producersService";

interface Props {
  producer?: Producer | null;
  onClose: () => void;
  onSuccess: () => void; // recarrega lista no componente pai
}

type ProducerWithLegacyDate = Partial<Producer> & {
  created_at?: string;
};

export function ProducerModal({ producer, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [localData, setLocalData] = useState<Partial<Producer>>(
    producer ?? {
      name: "",
      email: "",
      document: "",
      status: "active",
      commission: 0,
      imageUrl: "",
      followers_instagram: 0,
      relevance_score: 0,
      is_trending: false,
      category: "",
      direct_sales_last_year: 0,
      indirect_sales_last_year: 0,
      direct_sales_last_month: 0,
      indirect_sales_last_month: 0,
    },
  );

  const localDataWithLegacyDate = localData as ProducerWithLegacyDate;
  const producerWithLegacyDate = producer as
    | ProducerWithLegacyDate
    | null
    | undefined;
  const rawCreatedAt =
    localData.createdAt ??
    localDataWithLegacyDate.created_at ??
    producerWithLegacyDate?.created_at;

  const formatDate = (value?: string) => {
    if (!value) return "-";

    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) return value;

    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
    }).format(parsedDate);
  };

  async function handleSave() {
    try {
      setLoading(true);

      if (producer?.id) {
        await producerService.update(producer.id, localData);
      } else {
        await producerService.create(localData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar produtor:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!producer?.id) return;

    try {
      setLoading(true);
      await producerService.delete(producer.id);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao excluir produtor:", error);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-[min(95vw,760px)] max-h-[92vh] overflow-hidden rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/10 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4 min-w-0">
            {localData.imageUrl && (
              <img
                src={localData.imageUrl}
                alt={
                  localData.name
                    ? `Foto de ${localData.name}`
                    : "Foto do produtor"
                }
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
            )}

            <div className="min-w-0">
              <h2 className="text-xl font-bold truncate">
                {producer ? localData.name : "Novo Produtor"}
              </h2>
              <p
                className="mt-0.5 font-light leading-tight tracking-[0.02em] text-slate-500 truncate"
                style={{ fontSize: "11px" }}
              >
                {producer ? localData.email : "Cadastro de parceiro Greenn"}
              </p>
              {producer && (
                <p
                  className="mt-0.5 font-light leading-tight tracking-[0.02em] text-slate-600 truncate"
                  style={{ fontSize: "10px" }}
                >
                  {"\u{1F4C5}"} criado em {formatDate(rawCreatedAt)}
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-yellow-400/15 border border-yellow-300/30 px-3 py-2 text-right">
            <div className="flex items-center justify-end gap-2 text-yellow-300">
              <Medal size={16} />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Score
              </span>
            </div>
            <p className="text-lg font-bold text-yellow-200 leading-none mt-1">
              {localData.relevance_score ?? 0}
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
          <EditableFieldsSection
            localData={localData}
            onDataChange={setLocalData}
          />
        </div>

        <div className="flex justify-between items-center border-t border-white/10 pt-5 mt-5">
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="
                px-4
                py-2
                rounded-xl
                bg-[#14916A]
                hover:bg-[#0f7c59]
                transition
                cursor-pointer
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            {producer?.id && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-red-800
                  hover:bg-red-900
                  transition
                  cursor-pointer
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                Excluir
              </button>
            )}
          </div>

          <div>
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white">
              Confirmar exclus�o
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Esta a��o remove o produtor permanentemente. Deseja continuar?
            </p>

            <div className="mt-6 flex w-full items-center">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-red-800 hover:bg-red-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Excluindo..." : "Excluir produtor"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
                className="ml-auto px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
