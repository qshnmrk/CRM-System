import { useEffect, useRef, useState } from "react"
import { addTask } from "../api/todoApi"
import { validateNewTaskTitle } from "../helpers/validateNewTaskTitle"
import Button from "./Button"
import Field from "./Field"

const AddTaskForm = (props) => {
  const { updateTasks } = props

  const [error, setError] = useState(null)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const newTaskInputRef = useRef(null)

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

  useEffect(() => {
    if (newTaskInputRef?.current) {
      newTaskInputRef.current.focus()
    }
  }, [])

  const validateAndSetError = (value) => {
    const result = validateNewTaskTitle(value)

    if (!result.isValid) {
      setError(result.error)
    } else {
      setError(null)
    }

    return result
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const validationResult = validateNewTaskTitle(newTaskTitle)
    if (!validationResult.isValid) {
      setError(validationResult.error)
      return
    }

    try {
      await addTask({
        title: validationResult.value,
        isDone: false,
      })
      await updateTasks()
      setNewTaskTitle("")
      if (newTaskInputRef?.current) {
        newTaskInputRef.current.focus()
      }
    } catch (error) {
      setError("Failed to add task. Please try again.")
      await updateTasks()
    }
  }

  const onInput = (event) => {
    const { value } = event.target

    validateAndSetError(value)
    setNewTaskTitle(value)
  }

  const onBlur = () => {
    setError(null)
  }

  return (
    <form
      className="todo__form"
      onSubmit={onSubmit}
    >
      <Field
        className="todo__field"
        placeholder="Task to be done..."
        id="new-task"
        label=""
        value={newTaskTitle}
        onInput={onInput}
        ref={newTaskInputRef}
        error={error}
        onBlur={onBlur}
      />
      <Button
        className="todo__button-add"
        type="submit"
        isDisabled={isNewTaskTitleEmpty}
      >
        Add
      </Button>
    </form>
  )
}
export default AddTaskForm
