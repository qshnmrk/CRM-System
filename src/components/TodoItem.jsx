import { memo, useCallback, useEffect, useRef, useState } from "react"
import { deleteTodo, updateTodo } from "../api/todoApi"
import { validateNewTodoTitle } from "../helpers/validateNewTodoTitle"
import "../pages/TodosPage.scss"
import Field from "../ui/Field"
import IconButton from "../ui/IconButton"
import "./TodoItem.scss"
const TodoItem = (props) => {
  const {
    className = "",
    id,
    title,
    isDone,
    updateTodos,
    isEditing,
    todos,
    setEditingTodoId,
  } = props

  const [newTodoTitle, setNewTodoTitle] = useState(title)
  const [error, setError] = useState(null)
  const newTodoInputRef = useRef(null)

  useEffect(() => {
    if (!isEditing) {
      setNewTodoTitle(title)
      setError(null)
    } else if (isEditing && newTodoInputRef?.current) {
      newTodoInputRef.current.focus()
    }
  }, [title, isEditing])

  const validateAndSetError = (value) => {
    const result = validateNewTodoTitle(value)

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
    setNewTodoTitle(value)
  }

  const onBlur = () => {
    setError(null)
  }

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      handleAdmitClick()
    },
    [newTodoTitle]
  )

  const handleAdmitClick = async () => {
    const validationResult = validateNewTodoTitle(newTodoTitle)

    if (!validationResult.isValid) {
      setError(validationResult.error)
      return
    }

    const newTitle = validationResult.value
    const originalTodo = todos.find((todo) => todo.id === id)
    const originalTitle = originalTodo.title

    if (originalTitle === newTitle) {
      handleCloseClick()
      return
    }

    try {
      await updateTodo(id, {
        title: newTitle,
        isDone: isDone,
      })

      handleCloseClick()
      await updateTodos()
    } catch (error) {
      setError(
        "Не удалось отредактировать задачу. Пожалуйста, попробуйте снова."
      )
      handleEditClick(id)
      await updateTodos()
    }
  }

  const handleCloseClick = () => {
    setNewTodoTitle(title)
    setError(null)
    setEditingTodoId(null)
  }

  const handleDeleteClick = async () => {
    try {
      await deleteTodo(id)
      await updateTodos()
    } catch (error) {
      await updateTodos()
    }
  }

  const handleToggleComplete = async (event) => {
    const newIsDone = event.target.checked

    try {
      await updateTodo(id, {
        title: title,
        isDone: newIsDone,
      })

      await updateTodos()
    } catch (error) {
      await updateTodos()
    }
  }

  const handleEditClick = (todoId) => {
    setEditingTodoId(todoId)
  }

  const currentTodo = todos.find((todo) => todo.id === id) || {
    title,
    isDone,
  }
  const displayTitle = currentTodo.title
  const displayIsDone = currentTodo.isDone

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
              placeholder="Редактирование задачи..."
              value={newTodoTitle}
              onInput={onInput}
              ref={newTodoInputRef}
              error={error}
              onBlur={onBlur}
            />
          </form>
          <IconButton
            className="primary"
            title="Подтвердить"
            ariaDescription="Подтвердить"
            id={id}
            iconType="admit"
            onClick={handleAdmitClick}
          />

          <IconButton
            className="secondary"
            title="Закрыть"
            ariaDescription="Закрыть"
            id={id}
            iconType="close"
            onClick={handleCloseClick}
          />
        </>
      ) : (
        <>
          <label
            className={`todo-item__label ${displayIsDone ? "completed" : ""}`}
            htmlFor={id}
            tabIndex={0}
          >
            {displayTitle}
          </label>
          <IconButton
            className="primary"
            title="Редактировать"
            ariaDescription="Редактировать"
            id={id}
            iconType="edit"
            onClick={() => handleEditClick(id)}
          />
          <IconButton
            className="secondary"
            title="Удалить"
            ariaDescription="Удалить"
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
