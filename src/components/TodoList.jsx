import { memo } from "react"
import TodoEmpty from "./TodoEmpty"
import TodoItem from "./TodoItem"

const TodoList = (props) => {
  const {
    tasks = [],
    editingTaskId,
    setEditingTaskId,
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
          isEditing={editingTaskId === task.id}
          setEditingTaskId={setEditingTaskId}
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
