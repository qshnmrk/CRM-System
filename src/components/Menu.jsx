const Menu = (tasks) => {
  return (
    <nav className="todo__menu">
      <ul className="todo__menu-list">
        <li className="todo__menu-item">
          <a
            className="todo__menu-link"
            href=""
          >
            All ({tasks.length})
          </a>
        </li>
        <li className="todo__menu-item">
          <a
            className="todo__menu-link"
            href=""
          >
            In Work ({/*tasks.length - isDone.length*/})
          </a>
        </li>
        <li className="todo__menu-item">
          <a
            className="todo__menu-link"
            href=""
          >
            Done ({/*isDone.length*/})
          </a>
        </li>
      </ul>
    </nav>
  )
}
export default Menu
