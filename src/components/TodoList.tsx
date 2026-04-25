import { memo } from "react"
import { type Todo } from "../types/todo.js"
import TodoEmpty from "./TodoEmpty.tsx"
import TodoItem from "./TodoItem.tsx"

interface Props {
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
}: Props) => {
  if (todos.length === 0) {
    return <TodoEmpty />
  }

  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          isEditing={editingTodoId === todo.id}
          setEditingTodoId={setEditingTodoId}
          updateTodos={updateTodos}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
