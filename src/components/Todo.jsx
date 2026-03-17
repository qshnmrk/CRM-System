import { useCallback, useEffect, useRef, useState } from "react"
import { todoApi } from "../api/todoApi"
import AddTaskForm from "./AddTaskForm"
import Menu from "./Menu"
import "./Todo.scss"
import TodoList from "./TodoList"

const Todo = () => {
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

  const updateTasks = useCallback(async () => {
    try {
      const response = await todoApi.getAllTasks(currentFilter)

      if (response?.data && Array.isArray(response.data)) {
        setTasks(response.data)

        if (response?.info) {
          setTaskCounts({
            all: response.info.all || 0,
            inWork: response.info.inWork || 0,
            completed: response.info.completed || 0,
          })
        }
      } else {
        console.error("Unexpected API response:", response)
        setTasks([])
      }
    } catch (error) {
      console.error("Error fetching tasks, error")
      setTasks([])
    }
  }, [currentFilter])

  const handleFilterChange = (filter) => {
    closeEdit()
    setCurrentFilter(filter)
  }

  useEffect(() => {
    if (newTaskInputRef?.current) {
      newTaskInputRef.current.focus()
    }
    updateTasks()
  }, [updateTasks])

  const closeEdit = useCallback(() => {
    setEditingTaskId(null)
  }, [])

  // const addTask = useCallback(
  //   (title) => {
  //     const tempId = crypto?.randomUUID?.() ?? `temp-${Date.now()}`

  //     const optimisticTask = {
  //       id: tempId,
  //       title,
  //       isDone: false,
  //     }

  //     setTasks((prevTasks) => [...prevTasks, optimisticTask])

  //     setNewTaskTitle("")

  //     const newTask = {
  //       title,
  //       isDone: false,
  //     }

  //     fetch(`${BASE_URL}/todos`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newTask),
  //     })
  //       .then((response) => response.json())
  //       .then((addedTaskResponse) => {
  //         console.log("Add task response:", addedTaskResponse)

  //         fetchTasks(currentFilter)

  //         setNewTaskTitle("")

  //         if (newTaskInputRef?.current) {
  //           newTaskInputRef.current.focus()
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error adding task:", error)
  //         setTasks((prevTasks) =>
  //           prevTasks.filter((task) => task.id !== tempId)
  //         )
  //         setNewTaskTitle(title)
  //       })
  //   },
  //   [fetchTasks, currentFilter]
  // )

  // const deleteTask = useCallback(
  //   (taskId) => {
  //     let previousTasks = []

  //     setTasks((prevTasks) => {
  //       previousTasks = prevTasks
  //       return prevTasks.filter((task) => task.id !== taskId)
  //     })

  //     fetch(`${BASE_URL}/todos/${taskId}`, {
  //       method: "DELETE",
  //     })
  //       .then(() => {
  //         fetchTasks(currentFilter)
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting task:", error)

  //         setTasks(previousTasks)

  //         fetchTasks(currentFilter)
  //       })
  //   },
  //   [fetchTasks, currentFilter]
  // )

  // const admitEdit = useCallback(
  //   (taskId, newTitle) => {
  //     const origTask = tasks.find((task) => task.id === taskId)
  //     const origTaskTitle = origTask.title

  //     if (origTaskTitle === newTitle) {
  //       setEditingTaskId(null)
  //       return
  //     }

  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === taskId ? { ...task, title: newTitle } : task
  //       )
  //     )

  //     setEditingTaskId(null)

  //     fetch(`${BASE_URL}/todos/${taskId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title: newTitle }),
  //     })
  //       .then(() => {
  //         fetchTasks(currentFilter)
  //       })
  //       .catch((error) => {
  //         console.error("Error editing task:", error)
  //         setTasks((prevTasks) =>
  //           prevTasks.map((task) =>
  //             task.id === taskId
  //               ? { ...task, title: origTaskTitle }
  //               : task
  //           )
  //         )
  //         fetchTasks(currentFilter)
  //       })
  //   },
  //   [fetchTasks, currentFilter, tasks]
  // )

  // const editTask = useCallback((taskId) => {
  //   setEditingTaskId(taskId)
  // }, [])

  // const toggleTaskComplete = useCallback(
  //   (taskId, isDone) => {
  //     let previousState = null

  //     setTasks((prevTasks) => {
  //       const taskToUpdate = prevTasks.find(
  //         (task) => task.id === taskId
  //       )
  //       previousState = taskToUpdate?.isDone

  //       return prevTasks.map((task) =>
  //         task.id === taskId ? { ...task, isDone } : task
  //       )
  //     })

  //     fetch(`${BASE_URL}/todos/${taskId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ isDone }),
  //     })
  //       .then(() => {
  //         fetchTasks(currentFilter)
  //       })
  //       .catch((error) => {
  //         console.error("Error toggling task:", error)

  //         setTasks((prevTasks) =>
  //           prevTasks.map((task) =>
  //             task.id === taskId
  //               ? { ...task, isDone: prevState }
  //               : task
  //           )
  //         )
  //         fetchTasks(currentFilter)
  //       })
  //   },
  //   [fetchTasks, currentFilter]
  // )

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
        updateTasks={updateTasks}
        taskCounts={taskCounts}
        tasks={tasks}
        setTasks={setTasks}
        setTaskCounts={setTaskCounts}
      />
      <Menu
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        totalCount={totalCount}
        inWorkCount={inWorkCount}
        isDoneCount={isDoneCount}
      />
      <TodoList
        tasks={tasks}
        setTasks={setTasks}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        onEditTaskButtonClick={setEditingTaskId}
        onCloseTaskButtonClick={closeEdit}
        newTaskInputRef={newTaskInputRef}
        updateTasks={updateTasks}
        taskCounts={taskCounts}
        setTaskCounts={setTaskCounts}
        currentFilter={currentFilter}
      />
    </div>
  )
}

export default Todo
