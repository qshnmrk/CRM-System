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
  message,
  type CheckboxChangeEvent,
} from "antd"
import { memo, useEffect } from "react"
import { deleteTodo, updateTodo } from "../api/todoApi.js"
import "../pages/TodosPage.scss"
import { todoTitleRules } from "../validation/todoValidation.ts"
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
      message.success("Задача успешно обновлена")
    } catch (error) {
      message.error(
        "Не удалось обновить задачу. Пожалуйста, попробуйте снова."
      )
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
          <>
            <Form
              form={form}
              onFinish={handleConfirmEdit}
              id={`edit-form-${id}`}
              style={{ flex: 1, height: 50 }}
            >
              <Form.Item
                name="title"
                validateFirst
                rules={todoTitleRules}
                style={{ marginBottom: 0, flex: 1 }}
              >
                <Input
                  className="todo-item__field-edit"
                  placeholder="Редактирование задачи..."
                  id={String(id)}
                  size="large"
                  autoFocus
                />
              </Form.Item>
            </Form>

            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                form={`edit-form-${id}`}
                title="Подтвердить"
                shape="square"
                size="large"
                icon={<CheckOutlined />}
                style={{ flexShrink: 0, marginRight: 10 }}
              />

              <Button
                color="red"
                variant="solid"
                title="Закрыть"
                shape="square"
                size="large"
                icon={<CloseOutlined />}
                onClick={handleCloseEdit}
                style={{ flexShrink: 0 }}
              />
            </div>
          </>
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
