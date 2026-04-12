import { memo, useCallback, useEffect, useRef, useState } from "react"
import { deleteTodo, updateTodo } from "../api/todoApi.js"
import { validateNewTodoTitle } from "../helpers/validateNewTodoTitle.js"
import "../pages/TodosPage.scss"
import { type Todo, type ValidationResult } from "../types/todo.ts"
import Field from "../ui/Field.tsx"
import IconButton from "../ui/IconButton.tsx"
import "./TodoItem.scss"

interface TodoItemProps {
  className: string
  id: number
  title: string
  isDone: boolean
  updateTodos: () => void
  isEditing: boolean
  todos: Todo[]
  setEditingTodoId: (id: number | null) => void
}

const TodoItem = ({
  className = "",
  id,
  title,
  isDone,
  updateTodos,
  isEditing,
  todos,
  setEditingTodoId,
}: TodoItemProps) => {
  const [newTodoTitle, setNewTodoTitle] = useState(title)
  const [error, setError] = useState<string | null>(null)
  const newTodoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isEditing) {
      setNewTodoTitle(title)
      setError(null)
    } else if (isEditing && newTodoInputRef.current) {
      newTodoInputRef.current.focus()
    }
  }, [title, isEditing])

  const validateAndSetError = (value: string): ValidationResult => {
    const result = validateNewTodoTitle(value)

    if (!result.isValid) {
      setError(result.error || null)
    } else {
      setError(null)
    }

    return result
  }

  const onInput = (event: React.InputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    validateAndSetError(value)
    setNewTodoTitle(value)
  }

  const onBlur = () => {
    setError(null)
  }

  const onSubmit = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()

      handleAdmitClick()
    },
    [newTodoTitle]
  )

  const handleAdmitClick = async () => {
    const validationResult = validateNewTodoTitle(newTodoTitle)

    if (!validationResult.isValid) {
      setError(validationResult.error || null)
      return
    }

    const newTitle = validationResult.value
    const originalTodo = todos.find((todo) => todo.id === id)
    if (!originalTodo) {
      return
    }
    const originalTitle = originalTodo.title

    if (originalTitle === newTitle) {
      handleCloseClick()
      return
    }

    if (!newTitle) {
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

  const handleToggleComplete = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleEditClick = (todoId: number) => {
    setEditingTodoId(todoId)
  }

  return (
    <li className={`todo-item ${className}`}>
      <input
        type="checkbox"
        id={String(id)}
        checked={isDone}
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
              id={String(id)}
              error={error}
              onBlur={onBlur}
            />
          </form>
          <IconButton
            className="primary"
            title="Подтвердить"
            ariaDescription="Подтвердить"
            iconType="admit"
            onClick={handleAdmitClick}
          />

          <IconButton
            className="secondary"
            title="Закрыть"
            ariaDescription="Закрыть"
            iconType="close"
            onClick={handleCloseClick}
          />
        </>
      ) : (
        <>
          <label
            className={`todo-item__label ${isDone ? "completed" : ""}`}
            htmlFor={String(id)}
            tabIndex={0}
          >
            {title}
          </label>
          <IconButton
            className="primary"
            title="Редактировать"
            ariaDescription="Редактировать"
            iconType="edit"
            onClick={() => handleEditClick(id)}
          />
          <IconButton
            className="secondary"
            title="Удалить"
            ariaDescription="Удалить"
            iconType="delete"
            onClick={handleDeleteClick}
          />
        </>
      )}
    </li>
  )
}

export default memo(TodoItem)
