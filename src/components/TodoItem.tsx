import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons"
import {
  Button,
  Checkbox,
  Form,
  Input,
  type CheckboxChangeEvent,
} from "antd"
import { memo, useEffect } from "react"
import { deleteTodo, updateTodo } from "../api/todoApi.js"
import "../pages/TodosPage.scss"
import "./TodoItem.scss"

interface TodoItemProps {
  id: number
  title: string
  isDone: boolean
  updateTodos: () => void
  isEditing: boolean
  setEditingTodoId: (id: number | null) => void
}

const TodoItem = ({
  id,
  title,
  isDone,
  updateTodos,
  isEditing,
  setEditingTodoId,
}: TodoItemProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({ title: title })
    }
  }, [title, isEditing, form])

  const handleConfirmEdit = async (values: {
    title: string
  }): Promise<void> => {
    const newTitle = values.title.trim()

    if (title === newTitle) {
      handleCloseEdit()
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

      handleCloseEdit()
      await updateTodos()
    } catch (error) {
      handleStartEdit(id)
      await updateTodos()
    }
  }

  const handleCloseEdit = (): void => {
    form.resetFields()
    setEditingTodoId(null)
  }

  const handleDeleteTodo = async (): Promise<void> => {
    try {
      await deleteTodo(id)
      await updateTodos()
    } catch (error) {
      await updateTodos()
    }
  }

  const handleToggleStatus = async (
    event: CheckboxChangeEvent
  ): Promise<void> => {
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

  const handleStartEdit = (todoId: number): void => {
    setEditingTodoId(todoId)
  }

  return (
    <li className={`todo-item todo__item`}>
      <Checkbox
        id={String(id)}
        checked={isDone}
        onChange={handleToggleStatus}
      />
      {isEditing ? (
        <>
          <Form
            form={form}
            className="todo-item__edit-form"
            onFinish={handleConfirmEdit}
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
            onClick={handleCloseEdit}
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
            onClick={() => handleStartEdit(id)}
          />
          <Button
            color="red"
            variant="solid"
            title="Удалить"
            shape="square"
            size="large"
            icon={<DeleteOutlined />}
            onClick={handleDeleteTodo}
          />
        </>
      )}
    </li>
  )
}

export default memo(TodoItem)
