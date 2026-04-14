import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons"
import { Button, Checkbox, Form, Input } from "antd"
import { memo, useEffect } from "react"
import { deleteTodo, updateTodo } from "../api/todoApi.js"
import "../pages/TodosPage.scss"
import { type Todo } from "../types/todo.ts"
import "./TodoItem.scss"

interface TodoItemProps {
  className: string
  id: number
  title: string
  isDone: boolean
  updateTodos: () => void
  isEditing: boolean
  todos: Todo[]
  setEditingTodoId: (id: number | null) => void
}

const TodoItem = ({
  className = "",
  id,
  title,
  isDone,
  updateTodos,
  isEditing,
  todos,
  setEditingTodoId,
}: TodoItemProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({ title: title })
    }
  }, [title, isEditing, form])

  const handleAdmitClick = async (values: { title: string }) => {
    const newTitle = values.title.trim()
    const originalTodo = todos.find((todo) => todo.id === id)
    if (!originalTodo) {
      return
    }
    const originalTitle = originalTodo.title

    if (originalTitle === newTitle) {
      handleCloseClick()
      return
    }

    if (!newTitle) {
      return
    }

    try {
      await updateTodo(id, {
        title: newTitle,
        isDone: isDone,
      })

      handleCloseClick()
      await updateTodos()
    } catch (error) {
      handleEditClick(id)
      await updateTodos()
    }
  }

  const handleCloseClick = () => {
    form.resetFields()
    setEditingTodoId(null)
  }

  const handleDeleteClick = async () => {
    try {
      await deleteTodo(id)
      await updateTodos()
    } catch (error) {
      await updateTodos()
    }
  }

  const handleToggleComplete = async (event: any) => {
    const checked = event.target.checked
    try {
      await updateTodo(id, {
        title: title,
        isDone: checked,
      })

      await updateTodos()
    } catch (error) {
      await updateTodos()
    }
  }

  const handleEditClick = (todoId: number) => {
    setEditingTodoId(todoId)
  }

  return (
    <li className={`todo-item ${className}`}>
      <Checkbox
        id={String(id)}
        checked={isDone}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <>
          <Form
            form={form}
            className="todo-item__edit-form"
            onFinish={handleAdmitClick}
          >
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Введите текст задачи.",
                },
                {
                  min: 2,
                  message:
                    "Минимальная длина текста задачи - 2 символа.",
                },
                {
                  max: 64,
                  message:
                    "Максимальная длина текста задачи - 64 символа.",
                },
                {
                  whitespace: true,
                  message: "Текст задачи не может быть пустым.",
                },
              ]}
            >
              <Input
                className="todo-item__field-edit"
                placeholder="Редактирование задачи..."
                onPressEnter={() => form.submit()}
                id={String(id)}
                size="large"
                autoFocus
              />
            </Form.Item>
          </Form>
          <Button
            type="primary"
            title="Подтвердить"
            shape="square"
            size="large"
            icon={<CheckOutlined />}
            onClick={() => form.submit()}
          />

          <Button
            color="red"
            variant="solid"
            title="Закрыть"
            shape="square"
            size="large"
            icon={<CloseOutlined />}
            onClick={handleCloseClick}
          />
        </>
      ) : (
        <>
          <label
            className={`todo-item__label ${isDone ? "completed" : ""}`}
            htmlFor={String(id)}
            tabIndex={0}
          >
            {title}
          </label>
          <Button
            type="primary"
            title="Редактировать"
            shape="square"
            size="large"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(id)}
          />
          <Button
            color="red"
            variant="solid"
            title="Удалить"
            shape="square"
            size="large"
            icon={<DeleteOutlined />}
            onClick={handleDeleteClick}
          />
        </>
      )}
    </li>
  )
}

export default memo(TodoItem)
