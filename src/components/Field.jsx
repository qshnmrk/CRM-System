import "./Field.scss"
const Field = (props) => {
  const {
    className,
    id,
    placeholder,
    label,
    type = "text",
    value,
    onInput,
    ref,
    error,
  } = props

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
        ref={ref}
      />
      {error && <span className="field__error">{error}</span>}
    </div>
  )
}

export default Field
