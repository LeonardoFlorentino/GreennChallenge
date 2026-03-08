import React from "react";

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  checkedLabel?: string;
  uncheckedLabel?: string;
  className?: string;
  inputClassName?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  checkedLabel = "Sim",
  uncheckedLabel = "Não",
  className = "",
  inputClassName = "",
}) => (
  <label className={`flex items-center gap-2 select-none ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={`w-5 h-5 accent-green-600 ${inputClassName}`}
    />
    <span className="ml-2">{checked ? checkedLabel : uncheckedLabel}</span>
    <span className="ml-2 font-medium">{label}</span>
  </label>
);
import React from "react";

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  checkedLabel?: string;
  uncheckedLabel?: string;
  className?: string;
  inputClassName?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  checkedLabel = "Sim",
  uncheckedLabel = "Não",
  className = "",
  inputClassName = "",
}) => (
  <label className={`flex items-center gap-2 select-none ${className}`}>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={`w-5 h-5 accent-green-600 ${inputClassName}`}
    />
    <span className="ml-2">{checked ? checkedLabel : uncheckedLabel}</span>
    <span className="ml-2 font-medium">{label}</span>
  </label>
);
