import { memo } from "react"
import { type Todo } from "../types/todo.js"
import TodoEmpty from "./TodoEmpty.tsx"
import TodoItem from "./TodoItem.tsx"

interface TodoListProps {
  todos: Todo[]
  editingTodoId: number | null
  setEditingTodoId: (id: number | null) => void
  updateTodos: () => void
}
const TodoList = ({
  todos,
  editingTodoId,
  setEditingTodoId,
  updateTodos,
}: TodoListProps) => {
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
