import { memo, useCallback, useEffect, useState } from "react"
import { todoApi } from "../api/todoApi"
import { validateNewTaskTitle } from "../helpers/validateNewTaskTitle"
import Button from "./Button"
import Field from "./Field"
import "./Todo.scss"
import "./TodoItem.scss"
const TodoItem = (props) => {
  const {
    className = "",
    id,
    title,
    isDone,
    onEditTaskButtonClick,
    onCloseTaskButtonClick,
    updateTasks,
    isEditing,
    setEditingTaskId,
    newTaskInputRef,
    tasks,
    setTasks,
    taskCounts,
    setTaskCounts,
    currentFilter,
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState(title)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isEditing) {
      setNewTaskTitle(title)
      setError(null)
    }
  }, [title, isEditing])

  const validateAndSetError = (value) => {
    const result = validateNewTaskTitle(value)

    if (!result.isValid) {
      setError(result.error)
    } else {
      setError(null)
    }

    return result
  }

  const onInput = (event) => {
    const { value } = event.target

    validateAndSetError(value)
    setNewTaskTitle(value)
  }

  const onBlur = () => {
    setError(null)
  }

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()

      handleAdmitClick()
    },
    [newTaskTitle]
  )

  const handleAdmitClick = async () => {
    const validationResult = validateNewTaskTitle(newTaskTitle)

    if (!validationResult.isValid) {
      setError(validationResult.error)
      return
    }

    const newTitle = validationResult.value
    const originalTask = tasks.find((task) => task.id === id)
    const originalTitle = originalTask.title

    if (originalTitle === newTitle) {
      onCloseTaskButtonClick(id)
      return
    }

    const originalTasks = tasks

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    )

    onCloseTaskButtonClick(id)

    try {
      await todoApi.updateTask(id, {
        title: newTitle,
        isDone: isDone,
      })

      onCloseTaskButtonClick(id)
      await updateTasks()
    } catch (error) {
      console.error("Error updating task:", error)
      setTasks(originalTasks)
      setError("Failed to update task. Please try again.")
      onEditTaskButtonClick(id)
      await updateTasks()
    }
  }

  // const handleAdmitClick = async () => {
  //   const validationResult = validateNewTaskTitle(newTaskTitle)

  //   if (!validationResult.isValid) {
  //     setError(validationResult.error)
  //     return
  //   }

  //   onCloseTaskButtonClick(id)
  //   startTransition(async () => {
  //     addLocalOptimisticUpdate({ title: validationResult.value })

  //     try {
  //       await todoApi.updateTask(id, {
  //         title: validationResult.value,
  //         isDone: isDone,
  //       })

  //       await updateTasks()
  //       onCloseTaskButtonClick(id)
  //     } catch (error) {
  //       console.error("Error updating task:", error)
  //       setError("Failed to update task. Please try again.")
  //     }
  //   })
  // }

  const handleCloseClick = () => {
    setNewTaskTitle(title)
    setError(null)
    onCloseTaskButtonClick(id)
  }

  const handleDeleteClick = async () => {
    const originalTasks = tasks
    const originalCounts = taskCounts
    const originalTask = tasks.find((task) => task.id === id)

    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id)
    })

    setTaskCounts({
      all: taskCounts.all - 1,
      inWork: taskCounts.inWork - (originalTask?.isDone ? 0 : 1),
      completed:
        taskCounts.completed - (originalTask?.isDone ? 1 : 0),
    })

    try {
      await todoApi.deleteTask(id)
      await updateTasks()
    } catch (error) {
      console.error("Error deleting task:", error)
      setTasks(originalTasks)
      setTaskCounts(originalCounts)
      await updateTasks()
    }
  }

  const handleToggleComplete = async (event) => {
    const newIsDone = event.target.checked

    const originalTasks = tasks
    const originalCounts = taskCounts

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, isDone: newIsDone } : task
      )

      if (currentFilter === "isDone" && newIsDone === false) {
        return updatedTasks.filter((task) => task.id !== id)
      } else if (currentFilter === "inWork" && newIsDone === true) {
        return updatedTasks.filter((task) => task.id !== id)
      }

      return updatedTasks
    })

    setTaskCounts({
      all: taskCounts.all,
      inWork: taskCounts.inWork + (newIsDone ? -1 : 1),
      completed: taskCounts.completed + (newIsDone ? 1 : -1),
    })

    try {
      await todoApi.updateTask(id, {
        title: title,
        isDone: newIsDone,
      })

      await updateTasks()
    } catch (error) {
      console.error("Error toggling task:", error)
      setTasks(originalTasks)
      setTaskCounts(originalCounts)
      await updateTasks()
    }
  }

  const handleEditClick = () => {
    onEditTaskButtonClick(id)
  }

  const currentTask = tasks.find((task) => task.id === id) || {
    title,
    isDone,
  }
  const displayTitle = currentTask.title
  const displayIsDone = currentTask.isDone

  return (
    <li className={`todo-item ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={displayIsDone}
        className="todo-item__checkbox"
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <>
          <form
            className="todo-item__edit-form"
            onSubmit={onSubmit}
          >
            <Field
              className="todo-item__field-edit"
              placeholder="Task to be edited..."
              value={newTaskTitle}
              onInput={onInput}
              ref={newTaskInputRef}
              error={error}
              onBlur={onBlur}
            />
          </form>
          <Button
            className="todo__item-button-admit"
            title="Admit"
            ariaDescription="Admit"
            id={id}
            iconType="admit"
            onClick={handleAdmitClick}
          />

          <Button
            className="todo__item-button-close"
            title="Close"
            ariaDescription="Close"
            id={id}
            iconType="close"
            onClick={handleCloseClick}
          />
        </>
      ) : (
        <>
          <label
            className="todo-item__label"
            htmlFor={id}
            tabIndex={0}
          >
            {displayTitle}
          </label>
          <Button
            className="todo__item-button-edit"
            title="Edit"
            ariaDescription="Edit"
            id={id}
            iconType="edit"
            onClick={handleEditClick}
          />
          <Button
            className="todo__item-button-delete"
            title="Delete"
            ariaDescription="Delete"
            id={id}
            iconType="delete"
            onClick={handleDeleteClick}
          />
        </>
      )}
    </li>
  )
}

export default memo(TodoItem)
