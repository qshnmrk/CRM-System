import { memo, useCallback, useEffect, useRef, useState } from "react"
import { getAllTodos } from "../api/todoApi"
import AddTodoForm from "../components/AddTodoForm"
import TodoList from "../components/TodoList"
import TodoMenu from "../components/TodoMenu"
import "./TodosPage.scss"

const TodosPage = () => {
  const [todos, setTodos] = useState([])

  const [editingTodoId, setEditingTodoId] = useState(null)
  const [todoCounts, setTodoCounts] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  })

  const newTodoInputRef = useRef(null)
  const [currentFilter, setCurrentFilter] = useState("all")

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

  const handleFilterChange = (filter) => {
    setEditingTodoId(null)
    setCurrentFilter(filter)
    if (newTodoInputRef?.current) {
      newTodoInputRef.current.focus()
    }
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
        setTodos={setTodos}
        editingTodoId={editingTodoId}
        setEditingTodoId={setEditingTodoId}
        updateTodos={updateTodos}
        setTodoCounts={setTodoCounts}
      />
    </div>
  )
}

export default memo(TodosPage)
