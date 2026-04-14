import axios from "axios"
import type { FilterType, Todo } from "../types/todo.ts"

const BASE_URL = "https://easydev.club/api/v1"

export const getAllTodos = (filter: FilterType): Promise<Todo[]> => {
  let url = `${BASE_URL}/todos`
  if (filter) {
    url = `${url}?filter=${filter}`
  }

  return axios.get(url).then((response) => response.data)
}

export const addTodo = (todo: Omit<Todo, "id">): Promise<Todo> =>
  axios
    .post(`${BASE_URL}/todos`, todo)
    .then((response) => response.data)

export const updateTodo = (
  todoId: number,
  todo: Partial<Omit<Todo, "id">>
): Promise<Todo> =>
  axios
    .put(`${BASE_URL}/todos/${todoId}`, todo)
    .then((response) => response.data)

export const deleteTodo = (todoId: number): Promise<void> =>
  axios.delete(`${BASE_URL}/todos/${todoId}`).then(() => undefined)
