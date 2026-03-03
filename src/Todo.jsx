import { useState } from "react"
import "./Todo.scss"
import AddTaskForm from "./components/AddTaskForm"
import Menu from "./components/Menu"
import TodoList from "./components/TodoList"

const Todo = () => {
  const [tasks, setTasks] = useState([])
  const [newTitle, setNewTitle] = useState("")

  const addTask = () => {}

  const getAllTasks = () => {}

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        newTitle={newTitle}
        setNewTitle={setNewTitle}
      />
      <Menu tasks={tasks} />
      <TodoList />
    </div>
  )
}

export default Todo
