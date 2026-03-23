import { memo } from "react"
import TodoEmpty from "./TodoEmpty"
import TodoItem from "./TodoItem"

const TodoList = (props) => {
  const {
    todos = [],
    editingTodoId,
    setEditingTodoId,
    updateTodos,
    setTodos,
    todoCounts,
    setTodoCounts,
    currentFilter,
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
          setTodos={setTodos}
          todoCounts={todoCounts}
          setTodoCounts={setTodoCounts}
          currentFilter={currentFilter}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
