import { useRef, useReducer } from "react";
import { Medal } from "lucide-react";
import type { Producer } from "../../types/producer";
import { EditableFieldsSection } from "./EditableFieldsSection";
import { producerService } from "../../services/producersService";

interface Props {
  producer?: Producer | null;
  onClose: () => void;
  onSuccess: () => void;
  onDelete?: () => void;
}

type ProducerWithLegacyDate = Partial<Producer> & {
  created_at?: string;
};

const initialProducerState = (producer: Producer | null | undefined) => ({
  loading: false,
  showDeleteConfirm: false,
  localData: producer ?? {
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
  showErrors: false,
  errors: {},
});

interface ProducerModalState {
  loading: boolean;
  showDeleteConfirm: boolean;
  localData: Partial<Producer>;
  showErrors: boolean;
  errors: Record<string, string>;
}

type ProducerModalAction =
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_DELETE_CONFIRM"; value: boolean }
  | { type: "SET_LOCAL_DATA"; value: Partial<Producer> }
  | { type: "SET_ERRORS"; value: Record<string, string> }
  | { type: "SET_SHOW_ERRORS"; value: boolean };

function producerReducer(
  state: ProducerModalState,
  action: ProducerModalAction,
) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.value };
    case "SET_DELETE_CONFIRM":
      return { ...state, showDeleteConfirm: action.value };
    case "SET_LOCAL_DATA":
      return { ...state, localData: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.value };
    case "SET_SHOW_ERRORS":
      return { ...state, showErrors: action.value };
    default:
      return state;
  }
}

export function ProducerModal({
  producer,
  onClose,
  onSuccess,
  onDelete,
}: Props) {
  const [state, dispatch] = useReducer(
    producerReducer,
    initialProducerState(producer),
  );

  const formRef = useRef<HTMLFormElement | null>(null);

  const localDataWithLegacyDate = state.localData as ProducerWithLegacyDate;
  const producerWithLegacyDate = producer as
    | ProducerWithLegacyDate
    | null
    | undefined;
  const rawCreatedAt =
    state.localData.createdAt ??
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
    const validate = formRef.current?.validate;
    const validationErrors = validate ? validate() : {};
    if (Object.keys(validationErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", value: validationErrors });
      dispatch({ type: "SET_SHOW_ERRORS", value: true });
      return;
    }
    dispatch({ type: "SET_SHOW_ERRORS", value: false });
    dispatch({ type: "SET_ERRORS", value: {} });
    try {
      dispatch({ type: "SET_LOADING", value: true });
      // Remove campos vazios do payload
      const payload = Object.fromEntries(
        Object.entries(state.localData).filter(
          ([, v]) => v !== undefined && v !== null && v !== "",
        ),
      );
      if (producer?.id) {
        await producerService.update(producer.id, payload);
        onSuccess();
        onClose();
      } else {
        await producerService.create(payload);
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      let errorMsg = "Erro ao criar produtor";
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      // Se for um erro de fetch, tente extrair mais detalhes
      if (error && error.response) {
        try {
          const text = await error.response.text();
          errorMsg += `: ${text}`;
        } catch {}
      }
      onSuccess(new Error(errorMsg));
      // Não fecha a modal em caso de erro
      console.error("Erro ao salvar produtor:", error);
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  }

  async function handleDelete() {
    if (!producer?.id) return;
    try {
      dispatch({ type: "SET_LOADING", value: true });
      await producerService.delete(producer.id);
      if (onDelete) {
        onDelete();
      } else {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error("Erro ao excluir produtor:", error);
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
      dispatch({ type: "SET_DELETE_CONFIRM", value: false });
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-[min(95vw,760px)] max-h-[92vh] overflow-hidden rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/10 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4 min-w-0">
            {state.localData.imageUrl && (
              <img
                src={state.localData.imageUrl}
                alt={
                  state.localData.name
                    ? `Foto de ${state.localData.name}`
                    : "Foto do produtor"
                }
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
            )}
            <div className="min-w-0">
              <h2 className="text-xl font-bold truncate">
                {producer ? state.localData.name : "Novo Produtor"}
              </h2>
              <p
                className="mt-0.5 font-light leading-tight tracking-[0.02em] text-slate-500 truncate"
                style={{ fontSize: "15.4px" }}
              >
                {producer
                  ? state.localData.email
                  : "Cadastro de parceiro Greenn"}
              </p>
              {producer && (
                <p
                  className="mt-0.5 font-light leading-tight tracking-[0.02em] text-slate-600 truncate"
                  style={{ fontSize: "14px" }}
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
              {state.localData.relevance_score ?? 0}
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4">
          <EditableFieldsSection
            ref={formRef}
            localData={state.localData}
            onDataChange={(data) =>
              dispatch({ type: "SET_LOCAL_DATA", value: data })
            }
            showErrors={state.showErrors}
            errors={state.errors}
          />
        </div>
        <div className="flex justify-between items-center border-t border-white/10 pt-5 mt-5">
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={state.loading}
              className="px-4 py-2 rounded-xl bg-[#14916A] hover:bg-[#0f7c59] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.loading ? "Salvando..." : "Salvar"}
            </button>
            {producer?.id && (
              <button
                onClick={() =>
                  dispatch({ type: "SET_DELETE_CONFIRM", value: true })
                }
                disabled={state.loading}
                className="px-4 py-2 rounded-xl bg-red-800 hover:bg-red-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Excluir
              </button>
            )}
          </div>
          <div>
            <button
              onClick={onClose}
              disabled={state.loading}
              className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
      {state.showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white">
              Confirmar exclusão
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Esta ação remove o produtor permanentemente. Deseja continuar?
            </p>
            <div className="mt-6 flex w-full items-center">
              <button
                onClick={handleDelete}
                disabled={state.loading}
                className="px-4 py-2 rounded-xl bg-red-800 hover:bg-red-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? "Excluindo..." : "Excluir produtor"}
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "SET_DELETE_CONFIRM", value: false })
                }
                disabled={state.loading}
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
