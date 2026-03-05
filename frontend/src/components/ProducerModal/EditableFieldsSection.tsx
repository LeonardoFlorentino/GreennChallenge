import { useEffect, useRef, useState } from "react";
import type { Producer } from "../../types/producer";
import { Field } from "./Field";

interface Props {
  localData: Partial<Producer>;
  onDataChange: (data: Partial<Producer>) => void;
}

export function EditableFieldsSection({ localData, onDataChange }: Props) {
  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!statusRef.current) return;

      if (!statusRef.current.contains(event.target as Node)) {
        setStatusOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = <K extends keyof Producer>(
    key: K,
    value: Producer[K],
  ) => {
    onDataChange({
      ...localData,
      [key]: value,
    });
  };

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
        <Field label="Seguidores">
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
            className="w-full"
          />
        </Field>

        <Field label="Comissão (%)">
          <input
            type="number"
            min={0}
            step="0.01"
            value={localData.commission ?? 0}
            onChange={(e) => handleChange("commission", Number(e.target.value))}
            className="w-full"
          />
        </Field>
      </div>

      <Field label="Imagem (URL)">
        <input
          type="text"
          value={localData.imageUrl ?? ""}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          className="w-full"
        />
      </Field>

      <Field label="Categoria">
        <input
          type="text"
          value={localData.category ?? ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full"
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
            className="w-full"
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
            className="w-full"
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
            className="w-full"
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
            className="w-full"
          />
        </Field>
      </div>

      <Field label="Último valor de venda">
        <input
          type="text"
          value={
            localData.last_sale_value !== undefined
              ? localData.last_sale_value.toLocaleString("pt-BR")
              : ""
          }
          onChange={(e) => {
            const numericValue = Number(e.target.value.replace(/\D/g, ""));
            handleChange("last_sale_value", numericValue);
          }}
          className="w-full"
        />
      </Field>
    </div>
  );
}
