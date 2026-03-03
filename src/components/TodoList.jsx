import TodoEmpty from "./TodoEmpty"
import TodoItem from "./TodoItem"

const TodoList = () => {
  const hasTasks = true

  if (!hasTasks) {
    return <TodoEmpty />
  }

  return (
    <ul className="todo__list">
      <TodoItem />
    </ul>
  )
}

export default TodoList
