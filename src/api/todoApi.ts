import type { FilterType } from "../types/todo.ts"

const BASE_URL = "https://easydev.club/api/v1"

export const getAllTodos = (filter: FilterType) => {
  let url = `${BASE_URL}/todos`
  if (filter) {
    url = `${url}?filter=${filter}`
  }

  return fetch(url).then((response) => response.json())
}

export const addTodo = (todoTitle: string) =>
  fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoTitle),
  }).then()

export const updateTodo = (
  todoId: number,
  todo: { title: string; isDone: boolean }
) =>
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then()

export const deleteTodo = (todoId: number) =>
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "DELETE",
  }).then()
