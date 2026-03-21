import { memo, useCallback, useEffect, useRef, useState } from "react"
import { getAllTasks } from "../api/todoApi"
import AddTaskForm from "../components/AddTaskForm"
import TodoList from "../components/TodoList"
import TodoMenu from "../components/TodoMenu"
import "./TodosPage.scss"

const TodosPage = () => {
  const [tasks, setTasks] = useState([])

  const [editingTaskId, setEditingTaskId] = useState(null)
  const [taskCounts, setTaskCounts] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  })

  const newTaskInputRef = useRef(null)
  const [currentFilter, setCurrentFilter] = useState("all")

  const updateTasks = useCallback(async () => {
    try {
      const response = await getAllTasks(currentFilter)

      setTasks(response.data)

      if (response?.info) {
        setTaskCounts({
          all: response.info.all || 0,
          inWork: response.info.inWork || 0,
          completed: response.info.completed || 0,
        })
      }
    } catch (error) {
      console.error("Error fetching tasks, error")
      setTasks([])
    }
  }, [currentFilter])

  const handleFilterChange = (filter) => {
    setEditingTaskId(null)
    setCurrentFilter(filter)
    if (newTaskInputRef?.current) {
      newTaskInputRef.current.focus()
    }
  }

  useEffect(() => {
    updateTasks()
  }, [updateTasks])

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        updateTasks={updateTasks}
        taskCounts={taskCounts}
        tasks={tasks}
        setTasks={setTasks}
        setTaskCounts={setTaskCounts}
      />
      <TodoMenu
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        todosAllCount={taskCounts.all}
        todosInWorkCount={taskCounts.inWork}
        todosCompletedCount={taskCounts.completed}
      />
      <TodoList
        tasks={tasks}
        setTasks={setTasks}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        updateTasks={updateTasks}
        taskCounts={taskCounts}
        setTaskCounts={setTaskCounts}
        currentFilter={currentFilter}
      />
    </div>
  )
}

export default memo(TodosPage)
