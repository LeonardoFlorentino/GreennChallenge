import type { ReactNode, ReactElement, FocusEvent } from "react";
import { useState, cloneElement, isValidElement } from "react";
import "./Field.css";

interface FieldProps {
  label: string;
  children: ReactNode;
  error?: string;
}

type InputElement = ReactElement<{
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}>;

export function Field({ label, children, error }: FieldProps) {
  const [focused, setFocused] = useState(false);
  // Só mostra erro se houver erro, não estiver focado e o campo estiver vazio
  const showError = !!error && !focused;

  // Clona o input para adicionar onFocus/onBlur
  const childWithFocus = isValidElement(children)
    ? cloneElement(children as InputElement, {
        onFocus: (e: FocusEvent<HTMLInputElement>) => {
          setFocused(true);
          const child = children as InputElement;
          if (child.props.onFocus) child.props.onFocus(e);
        },
        onBlur: (e: FocusEvent<HTMLInputElement>) => {
          setFocused(false);
          const child = children as InputElement;
          if (child.props.onBlur) child.props.onBlur(e);
        },
      })
    : children;

  return (
    <div className="field-wrapper">
      <div className={`field-container${error ? " field-error" : ""}`}>
        <label className="field-label">{label}</label>
        <div className="field-input">
          {childWithFocus}
          {showError && (
            <div className="field-error-message">
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// ...existing code...
