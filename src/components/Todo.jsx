import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import AddTaskForm from "./AddTaskForm"
import Menu from "./Menu"
import "./Todo.scss"
import TodoList from "./TodoList"

const Todo = () => {
  const BASE_URL = "https://easydev.club/api/v1"

  const [tasks, setTasks] = useState([])

  const [newTaskTitle, setNewTaskTitle] = useState("")

  const [editingTaskId, setEditingTaskId] = useState(null)

  const doneTasks = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length
  }, [tasks])

  const newTaskInputRef = useRef(null)

  useEffect(() => {
    newTaskInputRef.current.focus()

    fetch(`${BASE_URL}/todos`)
      .then((response) => response.json())
      .then((apiResponse) => {
        console.log("API Response:", apiResponse)

        if (
          apiResponse &&
          apiResponse.data &&
          Array.isArray(apiResponse.data)
        ) {
          setTasks(apiResponse.data)
        } else {
          console.error(
            "Unexpected API response structure:",
            apiResponse
          )
          setTasks([])
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error)
        setTasks([])
      })
  }, [])

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
            setTasks((prevTasks) => [
              ...prevTasks,
              addedTaskResponse.data,
            ])
          } else if (addedTaskResponse && addedTaskResponse.id) {
            setTasks((prevTasks) => [...prevTasks, addedTaskResponse])
          } else {
            console.error(
              "Unexpected add task response:",
              addedTaskResponse
            )
          }

          setNewTaskTitle("")
          newTaskInputRef.current.focus()
        })
        .catch((error) => {
          console.error("Error adding task:", error)
          setTasks([])
        })
    },
    [newTaskTitle]
  )

  const deleteTask = useCallback((taskId) => {
    fetch(`${BASE_URL}/todos/${taskId}`, {
      method: "DELETE",
    }).then(() => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      )
    })
  }, [])

  // const closeEdit = useCallback((taskId) => {
  //   setEditingTaskId(null)
  // }, [])

  // const admitEdit = useCallback((taskId, newTitle) => {
  //   setTasks((prevTasks) =>
  //     prevTasks.map((task) => {
  //       if (task.id === taskId) {
  //         return { ...task, title: newTitle }
  //       }

  //       return task
  //     })
  //   )
  //   setEditingTaskId(null)
  // }, [])

  // const editTask = useCallback((taskId) => {
  //   setEditingTaskId(taskId)
  // }, [])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    fetch(`${BASE_URL}/todos/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone }),
    }).then(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone }
          }

          return task
        })
      )
    })
  }, [])

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
        total={tasks.length}
        done={doneTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        // editingTaskId={editingTaskId}
        // onEditTaskButtonClick={editTask}
        onTaskCompleteChange={toggleTaskComplete}
        // onCloseTaskButtonClick={closeEdit}
        // onAdmitTaskButtonClick={admitEdit}
      />
    </div>
  )
}

export default Todo
