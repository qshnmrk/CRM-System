import { memo, useCallback, useEffect, useState } from "react"
import { getAllTodos } from "../api/todoApi.js"
import AddTodoForm from "../components/AddTodoForm.tsx"
import TodoList from "../components/TodoList.tsx"
import TodoMenu from "../components/TodoMenu.tsx"
import {
  type FilterType,
  type Todo,
  type TodoInfo,
} from "../types/todo.ts"
import "./TodosPage.scss"

const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const [editingTodoId, setEditingTodoId] = useState<number | null>(
    null
  )
  const [todoCounts, setTodoCounts] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  })

  const [currentFilter, setCurrentFilter] =
    useState<FilterType>("all")

  const updateTodos = useCallback(async () => {
    try {
      const response = await getAllTodos(currentFilter)

      setTodos(response.data)

      if (response?.info) {
        setTodoCounts({
          all: response.info.all || 0,
          inWork: response.info.inWork || 0,
          completed: response.info.completed || 0,
        })
      }
    } catch (error) {
      setTodos([])
    }
  }, [currentFilter])

  const handleFilterChange = (filter: FilterType) => {
    setEditingTodoId(null)
    setCurrentFilter(filter)
  }

  useEffect(() => {
    updateTodos()
  }, [updateTodos])

  return (
    <div className="todo">
      <h1 className="todo__title">Список задач</h1>
      <AddTodoForm updateTodos={updateTodos} />
      <TodoMenu
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        todosAllCount={todoCounts.all}
        todosInWorkCount={todoCounts.inWork}
        todosCompletedCount={todoCounts.completed}
      />
      <TodoList
        todos={todos}
        editingTodoId={editingTodoId}
        setEditingTodoId={setEditingTodoId}
        updateTodos={updateTodos}
      />
    </div>
  )
}

export default memo(TodosPage)
