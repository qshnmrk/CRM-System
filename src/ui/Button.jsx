import "./Button.scss"

const Button = (props) => {
  const {
    type = "button",
    children,
    title,
    ariaDescription,
    onClick,
    isDisabled,
  } = props

  return (
    <button
      className={`button`}
      type={type}
      title={title}
      aria-description={ariaDescription}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
