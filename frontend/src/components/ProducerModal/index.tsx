import { useState } from "react";
import type { Producer } from "../../types/producer";
import { EditableFieldsSection } from "./EditableFieldsSection";

interface Props {
  producer: Producer;
  onClose: () => void;
  onUpdate: (updated: Producer) => void;
}

export function ProducerModal({ producer, onClose, onUpdate }: Props) {
  const [localData, setLocalData] = useState(producer);

  function handleSave() {
    onUpdate(localData);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9">
      <div className="bg-gray-900 text-white w-[600px] rounded-3xl p-8 shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={producer.imageUrl}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{producer.name}</h2>
            <p className="text-white/60">{producer.email}</p>
          </div>
        </div>

        {/* Campos editáveis */}
        <EditableFieldsSection
          localData={localData}
          onDataChange={setLocalData}
        />

        {/* Botões inferiores */}
        <div className="flex justify-end gap-4 border-t border-white/10 pt-6">
          <button
            onClick={handleSave}
            className="
            px-4 
            py-2 
            rounded-xl 
            bg-[#14916A]
            hover:bg-[#0f7c59]
            transition"
          >
            Salvar
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
