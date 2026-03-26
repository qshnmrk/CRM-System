import { useRef, useState } from "react"
import { addTodo } from "../api/todoApi"
import { validateNewTodoTitle } from "../helpers/validateNewTodoTitle"
import Button from "../ui/Button"
import Field from "../ui/Field"

const AddTodoForm = (props) => {
  const { updateTodos } = props

  const [error, setError] = useState(null)
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const newTodoInputRef = useRef(null)

  const clearNewTodoTitle = newTodoTitle.trim()
  const isNewTodoTitleEmpty = clearNewTodoTitle.length === 0

  const validateAndSetError = (value) => {
    const result = validateNewTodoTitle(value)

    if (!result.isValid) {
      setError(result.error)
    } else {
      setError(null)
    }

    return result
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const validationResult = validateNewTodoTitle(newTodoTitle)
    if (!validationResult.isValid) {
      setError(validationResult.error)
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

  const onInput = (event) => {
    const { value } = event.target

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
