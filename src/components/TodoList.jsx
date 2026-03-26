import { memo } from "react"
import TodoEmpty from "./TodoEmpty"
import TodoItem from "./TodoItem"

const TodoList = (props) => {
  const {
    todos = [],
    editingTodoId,
    setEditingTodoId,
    updateTodos,
  } = props

  if (todos.length === 0) {
    return <TodoEmpty />
  }

  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <TodoItem
          className="todo__item"
          key={todo.id}
          {...todo}
          isEditing={editingTodoId === todo.id}
          setEditingTodoId={setEditingTodoId}
          updateTodos={updateTodos}
          todos={todos}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
