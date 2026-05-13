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

export const getAllTodos = async (
  filter: Filter
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await axios.get(TODOS_URL, { params: { filter } })
  return response.data
}

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
  const response = await axios.post(TODOS_URL, todo)
  return response.data
}

export const updateTodo = async (
  todoId: number,
  todo: TodoRequest
): Promise<Todo> => {
  const response = await axios.put(`${TODOS_URL}/${todoId}`, todo)
  return response.data
}

export const deleteTodo = async (todoId: number): Promise<void> => {
  await axios.delete(`${TODOS_URL}/${todoId}`)
  return undefined
}
