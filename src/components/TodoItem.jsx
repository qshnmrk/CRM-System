import { memo, useCallback, useEffect, useRef, useState } from "react"
import { deleteTask, updateTask } from "../api/todoApi"
import { validateNewTaskTitle } from "../helpers/validateNewTaskTitle"
import "../pages/TodosPage.scss"
import IconButton from "./IconButton"
import Field from "./Field"
import "./TodoItem.scss"
const TodoItem = (props) => {
  const {
    className = "",
    id,
    title,
    isDone,
    updateTasks,
    isEditing,
    tasks,
    setTasks,
    setTaskCounts,
    setEditingTaskId,
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState(title)
  const [error, setError] = useState(null)
  const newTaskInputRef = useRef(null)

  useEffect(() => {
    if (!isEditing) {
      setNewTaskTitle(title)
      setError(null)
    }
  }, [title, isEditing])

  const validateAndSetError = (value) => {
    const result = validateNewTaskTitle(value)

    if (!result.isValid) {
      setError(result.error)
    } else {
      setError(null)
    }

    return result
  }

  const onInput = (event) => {
    const { value } = event.target

    validateAndSetError(value)
    setNewTaskTitle(value)
  }

  const onBlur = () => {
    setError(null)
  }

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      handleAdmitClick()
    },
    [newTaskTitle]
  )

  const handleAdmitClick = async () => {
    const validationResult = validateNewTaskTitle(newTaskTitle)

    if (!validationResult.isValid) {
      setError(validationResult.error)
      return
    }

    const newTitle = validationResult.value
    const originalTask = tasks.find((task) => task.id === id)
    const originalTitle = originalTask.title

    if (originalTitle === newTitle) {
      handleCloseClick()
      return
    }

    try {
      await updateTask(id, {
        title: newTitle,
        isDone: isDone,
      })

      handleCloseClick()
      await updateTasks()
    } catch (error) {
      setError("Failed to update task. Please try again.")
      handleEditClick(id)
      await updateTasks()
    }
  }

  const handleCloseClick = () => {
    setNewTaskTitle(title)
    setError(null)
    setEditingTaskId(null)
  }

  const handleDeleteClick = async () => {
    try {
      await deleteTask(id)
      await updateTasks()
    } catch (error) {
      await updateTasks()
    }
  }

  const handleToggleComplete = async (event) => {
    const newIsDone = event.target.checked

    try {
      await updateTask(id, {
        title: title,
        isDone: newIsDone,
      })

      await updateTasks()
    } catch (error) {
      setTasks(originalTasks)
      setTaskCounts(originalCounts)
      await updateTasks()
    }
  }

  const handleEditClick = (todoId) => {
    setEditingTaskId(todoId)
  }

  const currentTask = tasks.find((task) => task.id === id) || {
    title,
    isDone,
  }
  const displayTitle = currentTask.title
  const displayIsDone = currentTask.isDone

  return (
    <li className={`todo-item ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={displayIsDone}
        className="todo-item__checkbox"
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <>
          <form
            className="todo-item__edit-form"
            onSubmit={onSubmit}
          >
            <Field
              className="todo-item__field-edit"
              placeholder="Task to be edited..."
              value={newTaskTitle}
              onInput={onInput}
              ref={newTaskInputRef}
              error={error}
              onBlur={onBlur}
            />
          </form>
          <IconButton
            className="todo__item-button-admit"
            title="Admit"
            ariaDescription="Admit"
            id={id}
            iconType="admit"
            onClick={handleAdmitClick}
          />

          <IconButton
            className="todo__item-button-close"
            title="Close"
            ariaDescription="Close"
            id={id}
            iconType="close"
            onClick={handleCloseClick}
          />
        </>
      ) : (
        <>
          <label
            className="todo-item__label"
            htmlFor={id}
            tabIndex={0}
          >
            {displayTitle}
          </label>
          <IconButton
            className="todo__item-button-edit"
            title="Edit"
            ariaDescription="Edit"
            id={id}
            iconType="edit"
            onClick={() => handleEditClick(id)}
          />
          <IconButton
            className="todo__item-button-delete"
            title="Delete"
            ariaDescription="Delete"
            id={id}
            iconType="delete"
            onClick={handleDeleteClick}
          />
        </>
      )}
    </li>
  )
}

export default memo(TodoItem)
