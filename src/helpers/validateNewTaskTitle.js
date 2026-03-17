export const validateNewTaskTitle = (title) => {
  const clearTitle = title.trim()
  const hasOnlySpaces = title.length > 0 && clearTitle.length === 0

  if (hasOnlySpaces) {
    return { isValid: false, error: `The task can't be empty` }
  } else if (clearTitle.length < 2) {
    return {
      isValid: false,
      error: "The minimum title length is 2 characters!",
    }
  } else if (clearTitle.length > 64) {
    return {
      isValid: false,
      error: "The maximum title length is 64 characters!",
    }
  } else {
    return { isValid: true, value: clearTitle }
  }
}
