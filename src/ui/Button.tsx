import { type ReactNode } from "react"
import "./Button.scss"

interface ButtonProps {
  type?: "button" | "submit" | "reset"
  children: ReactNode
  title?: string
  ariaDescription?: string
  onClick?: () => void
  isDisabled?: boolean
}

const Button = ({
  type = "button",
  children,
  title,
  ariaDescription,
  onClick,
  isDisabled = false,
}: ButtonProps) => {
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
