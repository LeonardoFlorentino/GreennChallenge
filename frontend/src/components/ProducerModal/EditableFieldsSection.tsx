function validateFields(data: Partial<Producer>) {
  const newErrors: Record<string, string> = {};
  if (!data.name || !data.name.trim()) newErrors.name = "Nome é obrigatório";
  if (!data.email || !data.email.trim())
    newErrors.email = "E-mail é obrigatório";
  if (!data.document || !data.document.trim())
    newErrors.document = "Documento é obrigatório";
  // Os campos abaixo não são mais obrigatórios:
  // commission, followers_instagram, imageUrl, category
  return newErrors;
}
import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import type { Producer } from "../../types/producer";
import { Field } from "./Field";

interface Props {
  localData: Partial<Producer>;
  onDataChange: (data: Partial<Producer>) => void;
  showErrors?: boolean;
  errors?: Record<string, string>;
}

export const EditableFieldsSection = forwardRef(function EditableFieldsSection(
  { localData, onDataChange, showErrors = false, errors = {} }: Props,
  ref,
) {
  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const [localErrors, setLocalErrors] = useState(errors);

  useEffect(() => {
    setLocalErrors(errors);
  }, [errors]);

  // ...existing code...

  const handleChange = <K extends keyof Producer>(
    key: K,
    value: Producer[K],
  ) => {
    onDataChange({
      ...localData,
      [key]: value,
    });
    const isEmpty =
      value === undefined ||
      value === null ||
      value === "" ||
      (typeof value === "string" && value.trim() === "");
    setLocalErrors((prev) => {
      const next = { ...prev };
      if (isEmpty) {
        // Revalida só esse campo
        const fieldErrors = validateFields({ ...localData, [key]: value });
        if (fieldErrors[key as string]) {
          next[key as string] = fieldErrors[key as string];
        }
      } else {
        delete next[key as string];
      }
      return next;
    });
  };

  useImperativeHandle(ref, () => ({
    validate: () => validateFields(localData),
  }));

  // ...existing code...

  const statusValue = (localData.status ?? "active") as Producer["status"];
  const statusLabel = statusValue === "active" ? "Ativo" : "Inativo";
  const statusOptions: Array<{ value: Producer["status"]; label: string }> = [
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
  ];
  const availableStatusOptions = statusOptions.filter(
    (option) => option.value !== statusValue,
  );

  return (
    <div className="flex flex-col gap-3 pt-2">
      <Field label="Nome" error={showErrors ? localErrors.name : undefined}>
        <input
          type="text"
          value={localData.name ?? ""}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </Field>
      <div className={`status-field ${statusOpen ? "open" : ""}`}>
        <Field label="Status">
          <div className="status-select" ref={statusRef}>
            <button
              type="button"
              className={`status-select-trigger ${statusOpen ? "is-open" : ""}`}
              onClick={() => setStatusOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={statusOpen}
            >
              <span>{statusLabel}</span>
              <span className="status-select-right">
                <span className="status-select-divider" />
                <span
                  className={`status-select-chevron ${statusOpen ? "open" : ""}`}
                />
              </span>
            </button>
            {statusOpen && (
              <div className="status-select-menu" role="listbox">
                {availableStatusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={false}
                    className="status-select-option"
                    onClick={() => {
                      handleChange("status", option.value);
                      setStatusOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Field>
      </div>
      <Field label="E-mail" error={showErrors ? localErrors.email : undefined}>
        <input
          type="email"
          value={localData.email ?? ""}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </Field>
      <Field
        label="Documento"
        error={showErrors ? localErrors.document : undefined}
      >
        <input
          type="text"
          value={localData.document ?? ""}
          onChange={(e) => handleChange("document", e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </Field>
      <Field label="Imagem contém nome">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={!!localData.image_url_has_name}
            onChange={(e) =>
              handleChange("image_url_has_name", e.target.checked)
            }
            className="w-5 h-5 accent-green-600"
          />
          <span className="ml-2">
            {localData.image_url_has_name ? "Sim" : "Não"}
          </span>
        </div>
      </Field>
      <Field label="Trending">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!localData.is_trending}
            onChange={(e) => handleChange("is_trending", e.target.checked)}
          />
          Ativo
        </label>
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field
          label="Seguidores"
          error={showErrors ? localErrors.followers_instagram : undefined}
        >
          <input
            type="text"
            value={
              localData.followers_instagram !== undefined
                ? localData.followers_instagram.toLocaleString("pt-BR")
                : ""
            }
            onChange={(e) => {
              const numericValue = Number(e.target.value.replace(/\D/g, ""));
              handleChange("followers_instagram", numericValue);
            }}
            className="w-full bg-transparent outline-none"
          />
        </Field>
        <Field
          label="Comissão (%)"
          error={showErrors ? localErrors.commission : undefined}
        >
          <input
            type="number"
            min={0}
            step="0.01"
            value={localData.commission ?? ""}
            onChange={(e) => handleChange("commission", Number(e.target.value))}
            className="w-full bg-transparent outline-none"
          />
        </Field>
      </div>
      <Field
        label="Imagem (URL)"
        error={showErrors ? localErrors.imageUrl : undefined}
      >
        <input
          type="text"
          value={localData.imageUrl ?? ""}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </Field>
      <Field
        label="Categoria"
        error={showErrors ? localErrors.category : undefined}
      >
        <input
          type="text"
          value={localData.category ?? ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full bg-transparent outline-none"
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Vendas Diretas (último ano)">
          <input
            type="text"
            value={
              localData.direct_sales_last_year !== undefined
                ? localData.direct_sales_last_year.toLocaleString("pt-BR")
                : ""
            }
            onChange={(e) => {
              const numericValue = Number(e.target.value.replace(/\D/g, ""));
              handleChange("direct_sales_last_year", numericValue);
            }}
            className="w-full bg-transparent outline-none"
          />
        </Field>
        <Field label="Vendas Indiretas (último ano)">
          <input
            type="text"
            value={
              localData.indirect_sales_last_year !== undefined
                ? localData.indirect_sales_last_year.toLocaleString("pt-BR")
                : ""
            }
            onChange={(e) => {
              const numericValue = Number(e.target.value.replace(/\D/g, ""));
              handleChange("indirect_sales_last_year", numericValue);
            }}
            className="w-full bg-transparent outline-none"
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Vendas Diretas (último mês)">
          <input
            type="text"
            value={
              localData.direct_sales_last_month !== undefined
                ? localData.direct_sales_last_month.toLocaleString("pt-BR")
                : ""
            }
            onChange={(e) => {
              const numericValue = Number(e.target.value.replace(/\D/g, ""));
              handleChange("direct_sales_last_month", numericValue);
            }}
            className="w-full bg-transparent outline-none"
          />
        </Field>
        <Field label="Vendas Indiretas (último mês)">
          <input
            type="text"
            value={
              localData.indirect_sales_last_month !== undefined
                ? localData.indirect_sales_last_month.toLocaleString("pt-BR")
                : ""
            }
            onChange={(e) => {
              const numericValue = Number(e.target.value.replace(/\D/g, ""));
              handleChange("indirect_sales_last_month", numericValue);
            }}
            className="w-full bg-transparent outline-none"
          />
        </Field>
      </div>
    </div>
  );
});
