import { memo } from "react"
import TodoEmpty from "./TodoEmpty"
import TodoItem from "./TodoItem"

const TodoList = (props) => {
  const {
    tasks = [],
    onEditTaskButtonClick,
    onCloseTaskButtonClick,
    editingTaskId,
    setEditingTaskId,
    newTaskInputRef,
    updateTasks,
    setTasks,
    taskCounts,
    setTaskCounts,
    currentFilter,
  } = props

  if (tasks.length === 0) {
    return <TodoEmpty />
  }

  return (
    <ul className="todo__list">
      {tasks.map((task) => (
        <TodoItem
          className="todo__item"
          key={task.id}
          {...task}
          onEditTaskButtonClick={onEditTaskButtonClick}
          onCloseTaskButtonClick={onCloseTaskButtonClick}
          isEditing={editingTaskId === task.id}
          setEditingTaskId={setEditingTaskId}
          newTaskInputRef={newTaskInputRef}
          updateTasks={updateTasks}
          tasks={tasks}
          setTasks={setTasks}
          taskCounts={taskCounts}
          setTaskCounts={setTaskCounts}
          currentFilter={currentFilter}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
