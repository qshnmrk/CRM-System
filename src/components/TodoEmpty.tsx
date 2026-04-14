import { Empty } from "antd"
const TodoEmpty = () => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Задач пока что нет :("
    />
  )
}

export default TodoEmpty
