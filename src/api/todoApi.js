const BASE_URL = "https://easydev.club/api/v1"

const checkResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    )
  }

  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }

  return { success: true }
}

export const todoApi = {
  getAllTasks: (filter) => {
    let url = `${BASE_URL}/todos`
    if (filter === "inWork") {
      url = `${BASE_URL}/todos?filter=inWork`
    } else if (filter === "isDone") {
      url = `${BASE_URL}/todos?filter=completed`
    }

    return fetch(url).then(checkResponse)
  },

  addTask: (data) =>
    fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(checkResponse),

  updateTask: (taskId, data) =>
    fetch(`${BASE_URL}/todos/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(checkResponse),

  deleteTask: (taskId) =>
    fetch(`${BASE_URL}/todos/${taskId}`, {
      method: "DELETE",
    }).then(checkResponse),
}
