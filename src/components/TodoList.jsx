import { memo } from "react"
import TodoEmpty from "./TodoEmpty"
import TodoItem from "./TodoItem"

const TodoList = (props) => {
  const {
    tasks = [],
    onDeleteTaskButtonClick,
    onEditTaskButtonClick,
    onCloseTaskButtonClick,
    onAdmitTaskButtonClick,
    onTaskCompleteChange,
    editingTaskId,
  } = props

  const hasTasks = tasks.length > 0

  if (!hasTasks) {
    return <TodoEmpty />
  }

  return (
    <ul className="todo__list">
      {tasks.map((task) => (
        <TodoItem
          className="todo__item"
          key={task.id}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onEditTaskButtonClick={onEditTaskButtonClick}
          onCloseTaskButtonClick={onCloseTaskButtonClick}
          onAdmitTaskButtonClick={onAdmitTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
          isEditing={editingTaskId === task.id}
          {...task}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
