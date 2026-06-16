import { Segmented } from "antd"
import { memo } from "react"
import { type Filter } from "../types/todo.ts"

interface TodoMenuProps {
  todosAllCount: number
  todosInWorkCount: number
  todosCompletedCount: number
  currentFilter: Filter
  onFilterChange: (filter: Filter) => void
}

const TodoMenu = ({
  todosAllCount,
  todosInWorkCount,
  todosCompletedCount,
  currentFilter,
  onFilterChange,
}: TodoMenuProps) => {
  const options: { label: string; value: Filter }[] = [
    { label: `Все (${todosAllCount})`, value: "all" },
    { label: `В работе (${todosInWorkCount})`, value: "inWork" },
    { label: `Сделано (${todosCompletedCount})`, value: "completed" },
  ]
  return (
    <Segmented<Filter>
      options={options}
      value={currentFilter}
      onChange={onFilterChange}
      block
      size="large"
    />
  )
}
export default memo(TodoMenu)
