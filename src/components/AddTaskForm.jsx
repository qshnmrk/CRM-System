import { useState } from "react"
import { todoApi } from "../api/todoApi"
import { validateNewTaskTitle } from "../helpers/validateNewTaskTitle"
import Button from "./Button"
import Field from "./Field"

const AddTaskForm = (props) => {
  const {
    updateTasks,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    setTasks,
    tasks,
    taskCounts,
    setTaskCounts,
  } = props

  const [error, setError] = useState(null)

  const clearNewTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

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

    const clearNewTaskTitle = validationResult.value
    const tempId = crypto?.randomUUID?.() ?? `temp-${Date.now()}`

    const optimisticTask = {
      id: tempId,
      title: clearNewTaskTitle,
      isDone: false,
    }

    const originalTitle = newTaskTitle
    const originalTasks = tasks
    const originalCounts = taskCounts

    setTasks((prevTasks) => [...prevTasks, optimisticTask])
    setTaskCounts({
      all: taskCounts.all + 1,
      inWork: taskCounts.inWork + 1,
      completed: taskCounts.completed,
    })

    setNewTaskTitle("")
    setError(null)

    if (newTaskInputRef?.current) {
      newTaskInputRef.current.focus()
    }

    try {
      await todoApi.addTask({
        title: clearNewTaskTitle,
        isDone: false,
      })
      await updateTasks()
    } catch (error) {
      console.error("Error adding task:", error)
      setTasks(originalTasks)
      setTaskCounts(originalCounts)
      setNewTaskTitle(originalTitle)
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
