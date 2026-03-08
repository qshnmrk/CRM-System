import { memo } from "react"
const Menu = (props) => {
  const { total, done } = props

  return (
    <nav className="todo__menu">
      <ul className="todo__menu-list">
        <li className="todo__menu-item">
          <a
            className="todo__menu-link"
            aria-description='Show Section "All"'
            href=""
          >
            All ({total})
          </a>
        </li>
        <li className="todo__menu-item">
          <a
            className="todo__menu-link"
            aria-description='Show Section "In Work"'
            href=""
          >
            In Work ({total - done})
          </a>
        </li>
        <li className="todo__menu-item">
          <a
            className="todo__menu-link"
            aria-description='Show Section "Done"'
            href=""
          >
            Done ({done})
          </a>
        </li>
      </ul>
    </nav>
  )
}
export default memo(Menu)
