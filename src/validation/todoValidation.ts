const MIN_TITLE_LENGTH: number = 2
const MAX_TITLE_LENGTH: number = 64

export const todoTitleRules = [
  {
    required: true,
    message: "Введите текст задачи.",
  },
  {
    whitespace: true,
    message: "Текст задачи не может быть пустым.",
  },
  {
    min: MIN_TITLE_LENGTH,
    message: `Минимальная длина текста задачи - ${MIN_TITLE_LENGTH} символа.`,
  },
  {
    max: MAX_TITLE_LENGTH,
    message: `Максимальная длина текста задачи - ${MAX_TITLE_LENGTH} символа.`,
  },
]
