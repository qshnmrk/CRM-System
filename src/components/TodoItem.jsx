import ButtonDelete from "./ButtonDelete"
import ButtonEdit from "./ButtonEdit"

const TodoItem = () => {
  return (
    <li className="todo__item">
      <input
        type="checkbox"
        name=""
        id=""
        className="todo__item-checkbox"
      />
      <p className="todo__item-title">Task</p>
      <ButtonEdit />
      <ButtonDelete />
    </li>
  )
}

export default TodoItem
