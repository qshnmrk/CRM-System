import { memo, useCallback, useState } from "react"
import Button from "./Button"
import Field from "./Field"
import "./Todo.scss"
import "./TodoItem.scss"
const TodoItem = (props) => {
  const {
    className = "",
    id,
    title,
    isDone,
    onDeleteTaskButtonClick,
    onEditTaskButtonClick,
    onCloseTaskButtonClick,
    onAdmitTaskButtonClick,
    onTaskCompleteChange,
    isEditing,
    newTaskInputRef,
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState(title)

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

  const onInput = (event) => {
    const { value } = event.target

    setError(null)
    validateNewTaskTitle(value)
    setNewTaskTitle(value)
  }

  const handleAdmitClick = useCallback(() => {
    if (validateNewTaskTitle(newTaskTitle)) {
      setError(null)
      onAdmitTaskButtonClick(id, newTaskTitle)
    }
  }, [newTaskTitle])

  const handleCloseClick = () => {
    setNewTaskTitle(title)
    setError(null)
    onCloseTaskButtonClick(id)
  }

  const handleDeleteClick = () => {
    onDeleteTaskButtonClick(id)
  }

  const handleEditClick = () => {
    onEditTaskButtonClick(id)
  }

  return (
    <li className={`todo-item ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={isDone}
        className="todo-item__checkbox"
        onChange={(event) =>
          onTaskCompleteChange(id, event.target.checked)
        }
      />
      {isEditing ? (
        <>
          <Field
            className="todo-item__field-edit"
            placeholder="Task to be edited..."
            value={newTaskTitle}
            onInput={onInput}
            ref={newTaskInputRef}
            error={error}
          />
          <Button
            className="todo__item-button-admit"
            title="Admit"
            ariaDescription="Admit"
            id={id}
            iconType="admit"
            onClick={handleAdmitClick}
          />
          <Button
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
            {title}
          </label>
          <Button
            className="todo__item-button-edit"
            title="Edit"
            ariaDescription="Edit"
            id={id}
            iconType="edit"
            onClick={handleEditClick}
          />
          <Button
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
