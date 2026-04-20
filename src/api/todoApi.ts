import axios from "axios"
import type {
  Filter,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/todo.ts"

const BASE_URL = "https://easydev.club/api/v1"
const TODOS_URL = `${BASE_URL}/todos`

export const getAllTodos = (
  filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> => {
  return axios
    .get(TODOS_URL, { params: { filter } })
    .then((response) => response.data)
}

export const addTodo = (todo: TodoRequest): Promise<Todo> =>
  axios.post(TODOS_URL, todo).then((response) => response.data)

export const updateTodo = (
  todoId: number,
  todo: TodoRequest
): Promise<Todo> =>
  axios
    .put(`${TODOS_URL}/${todoId}`, todo)
    .then((response) => response.data)

export const deleteTodo = (todoId: number): Promise<void> =>
  axios.delete(`${TODOS_URL}/${todoId}`).then(() => undefined)
