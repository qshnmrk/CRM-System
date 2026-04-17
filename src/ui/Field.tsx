import { forwardRef } from "react"
import "./Field.scss"

interface Props {
  className?: string
  id: string
  placeholder?: string
  label?: string
  value?: string | number
  onTitleInput?: (event: React.InputEvent<HTMLInputElement>) => void
  onTitleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  error?: string | null
}

const Field = forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "",
      id,
      placeholder,
      label,
      value,
      onTitleInput,
      onTitleBlur,
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
          type="text"
          placeholder={placeholder}
          value={value}
          onInput={onTitleInput}
          onBlur={onTitleBlur}
          ref={ref}
        />
        {error && <span className="field__error">{error}</span>}
      </div>
    )
  }
)

export default Field
