const BASE_URL = "https://easydev.club/api/v1"

export const getAllTodos = (filter) => {
  let url = `${BASE_URL}/todos`
  if (filter) {
    url = `${url}?filter=${filter}`
  }

  return fetch(url).then((response) => response.json())
}

export const addTodo = (data) =>
  fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then()

export const updateTodo = (todoId, data) =>
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then()

export const deleteTodo = (todoId) =>
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "DELETE",
  }).then()
