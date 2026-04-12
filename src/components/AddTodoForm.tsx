import { useRef, useState } from "react"
import { addTodo } from "../api/todoApi.js"
import { validateNewTodoTitle } from "../helpers/validateNewTodoTitle.js"
import type { ValidationResult } from "../types/todo.ts"
import Button from "../ui/Button.tsx"
import Field from "../ui/Field.tsx"

interface AddTodoFormProps {
  updateTodos: () => void
}

const AddTodoForm = ({ updateTodos }: AddTodoFormProps) => {
  const [error, setError] = useState<string | null>(null)
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const newTodoInputRef = useRef<HTMLInputElement>(null)

  const clearNewTodoTitle = newTodoTitle.trim()
  const isNewTodoTitleEmpty = clearNewTodoTitle.length === 0

  const validateAndSetError = (value: string): ValidationResult => {
    const result = validateNewTodoTitle(value)

    if (!result.isValid) {
      setError(result.error || null)
    } else {
      setError(null)
    }

    return result
  }

  const onSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
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

  const onInput = (event: React.InputEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    validateAndSetError(value)
    setNewTodoTitle(value)
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
        placeholder="Задача, которую нужно сделать..."
        id="new-todo"
        label=""
        value={newTodoTitle}
        onInput={onInput}
        ref={newTodoInputRef}
        error={error}
        onBlur={onBlur}
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
