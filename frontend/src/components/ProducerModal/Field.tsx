import type { ReactNode } from "react";
import "./Field.css";

interface FieldProps {
  label: string;
  children: ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <div className="field-wrapper">
      <div className="field-container">
        <label className="field-label">{label}</label>
        <div className="field-input">{children}</div>
      </div>
    </div>
  );
}
