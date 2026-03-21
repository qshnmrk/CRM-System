const BASE_URL = "https://easydev.club/api/v1"

export const getAllTasks = (filter) => {
  let url = `${BASE_URL}/todos`
  if (filter) {
    url = `${url}?filter=${filter}`
  }

  return fetch(url).then((response) => response.json())
}

export const addTask = (data) =>
  fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then()

export const updateTask = (taskId, data) =>
  fetch(`${BASE_URL}/todos/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then()

export const deleteTask = (taskId) =>
  fetch(`${BASE_URL}/todos/${taskId}`, {
    method: "DELETE",
  }).then()
