import { forwardRef } from "react"
import "./Field.scss"

interface FieldProps {
  className?: string
  id: string
  placeholder?: string
  label?: string
  type?: "text" | "email" | "password"
  value?: string | number
  onInput?: (event: React.InputEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  error?: string | null
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      className = "",
      id,
      placeholder,
      label,
      type = "text",
      value,
      onInput,
      onBlur,
      error,
    },
    ref
  ) => {
    return (
      <div className={`field ${className}`}>
        <label
          className="field__label"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          id={id}
          className={`field__input ${error ? "is-invalid" : ""}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onInput={onInput}
          onBlur={onBlur}
          ref={ref}
        />
        {error && <span className="field__error">{error}</span>}
      </div>
    )
  }
)

export default Field
