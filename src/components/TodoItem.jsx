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
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState(title)

  const handleAdmitClick = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      onAdmitTaskButtonClick(id, newTaskTitle)
    }
  }, [newTaskTitle])

  const handleCloseClick = () => {
    setNewTaskTitle(title)
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
            placeholder="Edit Task"
            value={newTaskTitle}
            onInput={(event) => setNewTaskTitle(event.target.value)}
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
