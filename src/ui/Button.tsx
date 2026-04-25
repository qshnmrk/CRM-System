import { type ReactNode } from "react"
import "./Button.scss"

interface Props {
  type?: "button" | "submit" | "reset"
  children: ReactNode
  title?: string
  ariaLabel?: string
  onClick?: () => void
  isDisabled?: boolean
}

const Button = ({
  type = "button",
  children,
  title,
  ariaLabel,
  onClick,
  isDisabled = false,
}: Props) => {
  return (
    <button
      className={`button`}
      type={type}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
