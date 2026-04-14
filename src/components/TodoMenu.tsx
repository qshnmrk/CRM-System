import { Segmented } from "antd"
import { memo } from "react"
import { type FilterType } from "../types/todo.ts"

interface TodoMenuProps {
  todosAllCount: number
  todosInWorkCount: number
  todosCompletedCount: number
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const TodoMenu = ({
  todosAllCount,
  todosInWorkCount,
  todosCompletedCount,
  currentFilter,
  onFilterChange,
}: TodoMenuProps) => {
  const options: { label: string; value: FilterType }[] = [
    { label: `Все (${todosAllCount})`, value: "all" },
    { label: `В работе (${todosInWorkCount})`, value: "inWork" },
    { label: `Сделано (${todosCompletedCount})`, value: "completed" },
  ]
  return (
    <Segmented<FilterType>
      options={options}
      value={currentFilter}
      onChange={onFilterChange}
      block
      size="large"
    />
  )
}
export default memo(TodoMenu)
