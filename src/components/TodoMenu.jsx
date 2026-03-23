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
          <button
            className={`todo__menu-link ${currentFilter === "all" ? "is-active" : ""}`}
            aria-description='Показать раздел "Все"'
            onClick={() => onFilterChange("all")}
            tabIndex={0}
          >
            Все ({todosAllCount})
          </button>
        </li>
        <li className="todo__menu-item">
          <button
            className={`todo__menu-link ${currentFilter === "inWork" ? "is-active" : ""}`}
            aria-description='Показать раздел "В работе"'
            onClick={() => onFilterChange("inWork")}
            tabIndex={0}
          >
            В работе ({todosInWorkCount})
          </button>
        </li>
        <li className="todo__menu-item">
          <button
            className={`todo__menu-link ${currentFilter === "completed" ? "is-active" : ""}`}
            aria-description='Показать раздел "Сделано"'
            onClick={() => onFilterChange("completed")}
            tabIndex={0}
          >
            Сделано ({todosCompletedCount})
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default memo(TodoMenu)
