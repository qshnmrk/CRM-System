import { useCallback, useEffect, useRef, useState } from "react"
import AddTaskForm from "./AddTaskForm"
import Menu from "./Menu"
import "./Todo.scss"
import TodoList from "./TodoList"

const Todo = () => {
  const BASE_URL = "https://easydev.club/api/v1"

  const [tasks, setTasks] = useState([])

  const [newTaskTitle, setNewTaskTitle] = useState("")

  const [editingTaskId, setEditingTaskId] = useState(null)

  const [taskCounts, setTaskCounts] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  })

  const newTaskInputRef = useRef(null)

  const [currentFilter, setCurrentFilter] = useState("all")

  const totalCount = taskCounts.all
  const inWorkCount = taskCounts.inWork
  const isDoneCount = taskCounts.completed

  const fetchTasks = useCallback((filter) => {
    let url = `${BASE_URL}/todos`

    if (filter === "inWork") {
      url = `${BASE_URL}/todos?filter=inWork`
    } else if (filter === "isDone") {
      url = `${BASE_URL}/todos?filter=completed`
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((apiResponse) => {
        console.log("API Response:", apiResponse)

        if (apiResponse?.data && Array.isArray(apiResponse.data)) {
          setTasks(apiResponse.data)

          if (apiResponse.info) {
            setTaskCounts({
              all: apiResponse.info.all || 0,
              inWork: apiResponse.info.inWork || 0,
              completed: apiResponse.info.completed || 0,
            })
          }
        } else {
          console.error("Unexpected API response:", apiResponse)
          setTasks([])
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error)
        setTasks([])
      })
  }, [])

  const handleFilterChange = (filter) => {
    closeEdit()
    setCurrentFilter(filter)
  }

  useEffect(() => {
    if (newTaskInputRef?.current) {
      newTaskInputRef.current.focus()
    }
    fetchTasks(currentFilter)
  }, [fetchTasks, currentFilter])

  const addTask = useCallback(
    (title) => {
      const newTask = {
        title,
        isDone: false,
      }

      fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((addedTaskResponse) => {
          console.log("Add task response:", addedTaskResponse)

          if (addedTaskResponse && addedTaskResponse.data) {
            fetchTasks(currentFilter)
          } else if (addedTaskResponse && addedTaskResponse.id) {
            fetchTasks(currentFilter)
          }

          setNewTaskTitle("")
          if (newTaskInputRef?.current) {
            newTaskInputRef.current.focus()
          }
        })
        .catch((error) => {
          console.error("Error adding task:", error)
        })
    },
    [fetchTasks, currentFilter]
  )

  const deleteTask = useCallback(
    (taskId) => {
      fetch(`${BASE_URL}/todos/${taskId}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchTasks(currentFilter)
        })
        .catch((error) => {
          console.error("Error deleting task:", error)
        })
    },
    [fetchTasks, currentFilter]
  )

  const closeEdit = useCallback(() => {
    setEditingTaskId(null)
  }, [])

  const admitEdit = useCallback(
    (taskId, newTitle) => {
      fetch(`${BASE_URL}/todos/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      })
        .then(() => {
          fetchTasks(currentFilter)
          setEditingTaskId(null)
        })
        .catch((error) => {
          console.error("Error editing task:", error)
        })
    },
    [fetchTasks, currentFilter]
  )

  const editTask = useCallback((taskId) => {
    setEditingTaskId(taskId)
  }, [])

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      fetch(`${BASE_URL}/todos/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone }),
      })
        .then(() => {
          fetchTasks(currentFilter)
        })
        .catch((error) => {
          console.error("Error toggling task:", error)
        })
    },
    [fetchTasks, currentFilter]
  )

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
        addTask={addTask}
      />
      <Menu
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        totalCount={totalCount}
        inWorkCount={inWorkCount}
        isDoneCount={isDoneCount}
      />
      <TodoList
        BASE_URL={BASE_URL}
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        editingTaskId={editingTaskId}
        onEditTaskButtonClick={editTask}
        onTaskCompleteChange={toggleTaskComplete}
        onCloseTaskButtonClick={closeEdit}
        onAdmitTaskButtonClick={admitEdit}
        newTaskInputRef={newTaskInputRef}
      />
    </div>
  )
}

export default Todo
