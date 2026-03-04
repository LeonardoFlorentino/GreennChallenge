import type { Producer } from "../../types/producer";
import { Field } from "./Field";

interface Props {
  localData: Producer;
  onDataChange: (data: Producer) => void;
}

export function EditableFieldsSection({ localData, onDataChange }: Props) {
  const handleFollowersChange = (value: number) => {
    onDataChange({
      ...localData,
      followers_instagram: value,
    });
  };

  const handleScoreChange = (value: number) => {
    onDataChange({
      ...localData,
      relevance_score: value,
    });
  };

  const handleTrendingChange = (checked: boolean) => {
    onDataChange({
      ...localData,
      is_trending: checked,
    });
  };

  return (
    <div className="flex flex-col gap-3 mb-10">
      <Field label="Seguidores">
        <input
          type="number"
          value={localData.followers_instagram}
          onChange={(e) => handleFollowersChange(Number(e.target.value))}
        />
      </Field>

      <Field label="Score">
        <input
          type="number"
          step="0.1"
          value={localData.relevance_score}
          onChange={(e) => handleScoreChange(Number(e.target.value))}
        />
      </Field>

      <Field label="Trending">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={localData.is_trending}
            onChange={(e) => handleTrendingChange(e.target.checked)}
          />
          Ativo
        </label>
      </Field>
    </div>
  );
}
