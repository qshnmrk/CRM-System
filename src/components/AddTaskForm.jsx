import { useState } from "react"
import Button from "./Button"
import Field from "./Field"

const AddTaskForm = (props) => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    props

  const [error, setError] = useState(null)

  const validateNewTaskTitle = (title) => {
    const clearTitle = title.trim()
    const hasOnlySpaces = title.length > 0 && clearTitle.length === 0

    if (hasOnlySpaces) {
      return setError(`The task can't be empty`)
    } else if (clearTitle.length < 2) {
      return setError("The minimum title length is 2 characters!")
    } else if (clearTitle.length > 64) {
      return setError("The maximum title length is 64 characters!")
    } else {
      return clearTitle
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (validateNewTaskTitle(newTaskTitle)) {
      setError(null)
      addTask(clearNewTaskTitle)
    }
  }

  const onInput = (event) => {
    const { value } = event.target

    setError(null)
    validateNewTaskTitle(value)
    setNewTaskTitle(value)
  }

  const onBlur = () => {
    setError(null)
  }

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

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
