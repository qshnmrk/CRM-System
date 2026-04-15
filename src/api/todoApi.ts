import type {
  FilterType,
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/todo.ts"

const BASE_URL = "https://easydev.club/api/v1"

export const getAllTodos = (
  filter: FilterType
): Promise<MetaResponse<Todo, TodoInfo>> => {
  let url = `${BASE_URL}/todos`
  if (filter) {
    url = `${url}?filter=${filter}`
  }

  return fetch(url).then((response) => response.json())
}

export const addTodo = (todo: TodoRequest): Promise<Todo> =>
  fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((response) => response.json())

export const updateTodo = (
  todoId: number,
  todo: TodoRequest
): Promise<Todo> =>
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((response) => response.json())

export const deleteTodo = (todoId: number): Promise<void> =>
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "DELETE",
  }).then(() => undefined)
