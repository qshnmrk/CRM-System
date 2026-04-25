import { memo, useCallback, useEffect, useRef, useState } from "react"
import { deleteTodo, updateTodo } from "../api/todoApi.js"
import { validateNewTodoTitle } from "../helpers/validateNewTodoTitle.js"
import "../pages/TodosPage.scss"
import { type ValidationResult } from "../types/todo.ts"
import Field from "../ui/Field.tsx"
import IconButton from "../ui/IconButton.tsx"
import "./TodoItem.scss"

interface Props {
  id: number
  title: string
  isDone: boolean
  updateTodos: () => void
  isEditing: boolean
  setEditingTodoId: (id: number | null) => void
}

const TodoItem = ({
  id,
  title,
  isDone,
  updateTodos,
  isEditing,
  setEditingTodoId,
}: Props) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>(title)
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

  const handleTitleInput = (
    event: React.InputEvent<HTMLInputElement>
  ): void => {
    const { value } = event.currentTarget

    validateAndSetError(value)
    setNewTodoTitle(value)
  }

  const handleTitleBlur = (): void => {
    setError(null)
  }

  const handleSaveTodoTitle = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>): void => {
      event.preventDefault()

      handleConfirmEdit()
    },
    [newTodoTitle]
  )

  const handleConfirmEdit = async (): Promise<void> => {
    const validationResult = validateNewTodoTitle(newTodoTitle)

    if (!validationResult.isValid) {
      setError(validationResult.error || null)
      return
    }

    const newTitle = validationResult.value

    if (title === newTitle) {
      handleCloseEdit()
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

      handleCloseEdit()
      await updateTodos()
    } catch (error) {
      setError(
        "Не удалось отредактировать задачу. Пожалуйста, попробуйте снова."
      )
      handleStartEdit(id)
      await updateTodos()
    }
  }

  const handleCloseEdit = (): void => {
    setNewTodoTitle(title)
    setError(null)
    setEditingTodoId(null)
  }

  const handleDeleteTodo = async (): Promise<void> => {
    try {
      await deleteTodo(id)
      await updateTodos()
    } catch (error) {
      await updateTodos()
    }
  }

  const handleToggleStatus = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
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

  const handleStartEdit = (todoId: number): void => {
    setEditingTodoId(todoId)
  }

  return (
    <li className={`todo-item todo__item`}>
      <input
        type="checkbox"
        id={String(id)}
        checked={isDone}
        className="todo-item__checkbox"
        onChange={handleToggleStatus}
      />
      {isEditing ? (
        <>
          <form
            className="todo-item__edit-form"
            onSubmit={handleSaveTodoTitle}
          >
            <Field
              className="todo-item__field-edit"
              placeholder="Редактирование задачи..."
              value={newTodoTitle}
              onTitleInput={handleTitleInput}
              ref={newTodoInputRef}
              id={String(id)}
              error={error}
              onTitleBlur={handleTitleBlur}
            />
          </form>
          <IconButton
            className="primary"
            title="Подтвердить"
            ariaLabel="Подтвердить"
            iconType="admit"
            onClick={handleConfirmEdit}
          />

          <IconButton
            className="secondary"
            title="Закрыть"
            ariaLabel="Закрыть"
            iconType="close"
            onClick={handleCloseEdit}
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
            ariaLabel="Редактировать"
            iconType="edit"
            onClick={() => handleStartEdit(id)}
          />
          <IconButton
            className="secondary"
            title="Удалить"
            ariaLabel="Удалить"
            iconType="delete"
            onClick={handleDeleteTodo}
          />
        </>
      )}
    </li>
  )
}

export default memo(TodoItem)
