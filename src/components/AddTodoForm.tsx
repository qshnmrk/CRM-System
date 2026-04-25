import { useRef, useState } from "react"
import { addTodo } from "../api/todoApi.js"
import { validateNewTodoTitle } from "../helpers/validateNewTodoTitle.js"
import type { ValidationResult } from "../types/todo.ts"
import Button from "../ui/Button.tsx"
import Field from "../ui/Field.tsx"

interface Props {
  updateTodos: () => void
}

const AddTodoForm = ({ updateTodos }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [newTodoTitle, setNewTodoTitle] = useState<string>("")
  const newTodoInputRef = useRef<HTMLInputElement>(null)

  const clearNewTodoTitle: string = newTodoTitle.trim()
  const isNewTodoTitleEmpty: boolean = clearNewTodoTitle.length === 0

  const validateAndSetError = (value: string): ValidationResult => {
    const result = validateNewTodoTitle(value)

    if (!result.isValid) {
      setError(result.error || null)
    } else {
      setError(null)
    }

    return result
  }

  const handleAddTodo = async (
    event: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    const validationResult = validateNewTodoTitle(newTodoTitle)
    if (!validationResult.isValid) {
      setError(validationResult.error || null)
      return
    }

    if (!validationResult.value) {
      setError("Некорректный заголовок задачи")
      return
    }

    try {
      await addTodo({
        title: validationResult.value,
        isDone: false,
      })
      await updateTodos()
      setNewTodoTitle("")
      if (newTodoInputRef?.current) {
        newTodoInputRef.current.focus()
      }
    } catch (error) {
      setError(
        "Не удалось добавить задачу. Пожалуйста, попробуйте снова."
      )
      await updateTodos()
    }
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

  return (
    <form
      className="todo__form"
      onSubmit={handleAddTodo}
    >
      <Field
        className="todo__field"
        placeholder="Задача, которую нужно сделать..."
        id="new-todo"
        label=""
        value={newTodoTitle}
        onTitleInput={handleTitleInput}
        ref={newTodoInputRef}
        error={error}
        onTitleBlur={handleTitleBlur}
      />
      <Button
        type="submit"
        isDisabled={isNewTodoTitleEmpty}
      >
        Добавить
      </Button>
    </form>
  )
}
export default AddTodoForm
