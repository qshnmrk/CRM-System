import { memo } from "react"
const TodoMenu = (props) => {
  const {
    todosAllCount,
    todosInWorkCount,
    todosCompletedCount,
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
            All ({todosAllCount})
          </a>
        </li>
        <li className="todo__menu-item">
          <a
            className={`todo__menu-link ${currentFilter === "inWork" ? "is-active" : ""}`}
            aria-description='Show Section "In Work"'
            onClick={() => onFilterChange("inWork")}
            tabIndex={0}
          >
            In Work ({todosInWorkCount})
          </a>
        </li>
        <li className="todo__menu-item">
          <a
            className={`todo__menu-link ${currentFilter === "completed" ? "is-active" : ""}`}
            aria-description='Show Section "Done"'
            onClick={() => onFilterChange("completed")}
            tabIndex={0}
          >
            Done ({todosCompletedCount})
          </a>
        </li>
      </ul>
    </nav>
  )
}
export default memo(TodoMenu)
