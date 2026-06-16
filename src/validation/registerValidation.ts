const MAX_INPUT_LENGTH = 60
const MIN_USERNAME_LENGTH = 1
const MIN_LOGIN_LENGTH = 2
const MIN_PASSWORD_LENGTH = 6

const latinLetters = /^[a-zA-Z]+$/
const russianAndLatinLetters = /^[a-zA-Zа-яА-Я]+$/
const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
const phoneRegex = /^\+?[0-9]{10,15}$/

export const usernameRules = [
  { required: true, message: "Введите имя пользователя" },
  {
    min: MIN_USERNAME_LENGTH,
    message: `Имя пользователя должно быть не менее ${MIN_USERNAME_LENGTH} символа`,
  },
  {
    max: MAX_INPUT_LENGTH,
    message: `Имя пользователя должно быть не более ${MAX_INPUT_LENGTH} символов`,
  },
  {
    pattern: russianAndLatinLetters,
    message:
      "Имя пользователя может содержать только буквы русского или латинского алфавита",
  },
]

export const loginRules = [
  { required: true, message: "Введите логин" },
  {
    min: MIN_LOGIN_LENGTH,
    message: `Логин должен быть не менее ${MIN_LOGIN_LENGTH} символов`,
  },
  {
    max: MAX_INPUT_LENGTH,
    message: `Логин должен быть не более ${MAX_INPUT_LENGTH} символов`,
  },
  {
    pattern: latinLetters,
    message: "Логин может содержать только буквы латинского алфавита",
  },
]

export const passwordRules = [
  { required: true, message: "Введите пароль" },
  {
    min: MIN_PASSWORD_LENGTH,
    message: `Пароль должен быть не менее ${MIN_PASSWORD_LENGTH} символов`,
  },
  {
    max: MAX_INPUT_LENGTH,
    message: `Пароль должен быть не более ${MAX_INPUT_LENGTH} символов`,
  },
]

export const confirmPasswordRules = (
  getFieldValue: (name: string) => any
) => [
  { required: true, message: "Повторите пароль" },
  {
    validator: (_: any, value: string) => {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error("Пароли не совпадают"))
    },
  },
]

export const emailRules = [
  { required: true, message: "Введите email" },
  {
    pattern: emailRegex,
    message: "Введите корректный email",
  },
]

export const phoneRules = [
  {
    pattern: phoneRegex,
    message: `Формат номера: +79999999999`,
  },
]
