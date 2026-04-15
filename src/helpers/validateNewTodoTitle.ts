import type { ValidationResult } from "../types/todo.ts"

export const validateNewTodoTitle = (
  title: string
): ValidationResult => {
  const clearTitle: string = title.trim()
  const hasOnlySpaces: boolean =
    title.length > 0 && clearTitle.length === 0
  const shortTitle: boolean = clearTitle.length < 2
  const longTitle: boolean = clearTitle.length > 64

  if (hasOnlySpaces) {
    return {
      isValid: false,
      error: `Текст задачи не может быть пустым.`,
    }
  }

  if (shortTitle) {
    return {
      isValid: false,
      error: "Минимальная длина текста задачи - 2 символа!",
    }
  }

  if (longTitle) {
    return {
      isValid: false,
      error: "Максимальная длина текста задачи - 64 символа!",
    }
  }

  return { isValid: true, value: clearTitle }
}
