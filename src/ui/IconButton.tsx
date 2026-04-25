import "./IconButton.scss"

const ICONS = {
  admit: {
    element: (
      <>
        <path d="M9.172 18.657a1 1 0 0 1-.707-.293l-5.657-5.657a1 1 0 0 1 1.414-1.414l4.95 4.95L19.778 5.636a1 1 0 0 1 1.414 1.414L9.879 18.364a1 1 0 0 1-.707.293z" />
      </>
    ),
  },
  close: {
    element: (
      <>
        <path d="M13.414 12l4.95-4.95a1 1 0 0 0-1.414-1.414L12 10.586l-4.95-4.95A1 1 0 0 0 5.636 7.05l4.95 4.95-4.95 4.95a1 1 0 0 0 1.414 1.414l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414-1.414z" />
      </>
    ),
  },
  edit: {
    element: (
      <>
        <path d="M20.269 5.614l-1.883-1.883a2.5 2.5 0 0 0-3.531 0l-9.562 9.562a1 1 0 0 0-.242.391l-2 6a1 1 0 0 0 1.265 1.265l6-2a1 1 0 0 0 .391-.242l9.562-9.562a2.5 2.5 0 0 0 0-3.531zM7.414 14L14 7.414 16.586 10 10 16.586zm-.977 1.851l1.712 1.712-2.568.856zm12.417-8.12L18 8.586 15.414 6l.854-.854a.5.5 0 0 1 .7 0l1.883 1.883a.5.5 0 0 1 .003.702z" />
      </>
    ),
  },
  delete: {
    element: (
      <>
        <path d="M20 6h-3.155a.949.949 0 0 0-.064-.125l-1.7-2.124A1.989 1.989 0 0 0 13.519 3h-3.038a1.987 1.987 0 0 0-1.562.75l-1.7 2.125A.949.949 0 0 0 7.155 6H4a1 1 0 0 0 0 2h1v11a2 2 0 0 0 1.994 2h10.011A2 2 0 0 0 19 19V8h1a1 1 0 0 0 0-2zm-9.519-1h3.038l.8 1H9.681zm6.524 14H7V8h10z" />
        <path d="M14 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM10 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z" />
      </>
    ),
  },
}

type IconType = keyof typeof ICONS

interface Props {
  className: "primary" | "secondary"
  type?: "button"
  iconType: IconType
  title?: string
  ariaLabel?: string
  onClick?: () => void
  isDisabled?: boolean
}

const IconButton = ({
  className,
  type = "button",
  iconType,
  title,
  ariaLabel,
  onClick,
  isDisabled,
}: Props) => {
  return (
    <button
      className={`icon-button ${className}`}
      type={type}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={isDisabled}
    >
      <svg
        className="icon-button__icon"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {ICONS[iconType].element}
      </svg>
    </button>
  )
}

export default IconButton
