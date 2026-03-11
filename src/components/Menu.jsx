import { memo } from "react"
const Menu = (props) => {
  const {
    totalCount,
    inWorkCount,
    isDoneCount,
    currentFilter,
    onFilterChange,
  } = props

  return (
    <nav className="todo__menu">
      <ul className="todo__menu-list">
        <li className="todo__menu-item">
          <a
            className={`todo__menu-link ${currentFilter === "all" ? "is-active" : ""}`}
            aria-description='Show Section "All"'
            onClick={() => onFilterChange("all")}
            tabIndex={0}
          >
            All ({totalCount})
          </a>
        </li>
        <li className="todo__menu-item">
          <a
            className={`todo__menu-link ${currentFilter === "inWork" ? "is-active" : ""}`}
            aria-description='Show Section "In Work"'
            onClick={() => onFilterChange("inWork")}
            tabIndex={0}
          >
            In Work ({inWorkCount})
          </a>
        </li>
        <li className="todo__menu-item">
          <a
            className={`todo__menu-link ${currentFilter === "isDone" ? "is-active" : ""}`}
            aria-description='Show Section "Done"'
            onClick={() => onFilterChange("isDone")}
            tabIndex={0}
          >
            Done ({isDoneCount})
          </a>
        </li>
      </ul>
    </nav>
  )
}
export default memo(Menu)
