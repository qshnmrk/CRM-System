import { App, Button, Form, Input } from "antd"
import { addTodo } from "../api/todoApi.js"
import { todoTitleRules } from "../validation/todoValidation.ts"

interface AddTodoFormProps {
  updateTodos: () => void
}

const AddTodoForm = ({ updateTodos }: AddTodoFormProps) => {
  const [form] = Form.useForm()
  const { message } = App.useApp()

  const handleFormSubmit = async (values: {
    title: string
  }): Promise<void> => {
    const clearTitle = values.title.trim()

    if (!clearTitle) {
      message.error("Название задачи не может быть пустым")
      return
    }

    try {
      await addTodo({
        title: clearTitle,
        isDone: false,
      })

      await updateTodos()
      form.resetFields()

      message.success("Задача успешно добавлена")
    } catch (error) {
      message.error(
        "Не удалось добавить задачу. Пожалуйста, попробуйте снова."
      )
      await updateTodos()
    }
  }

  const handleFailedSubmit = (): void => {
    message.error("Пожалуйста, заполните поле корректно")
  }

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      onFinishFailed={handleFailedSubmit}
      layout="inline"
      className="todo__form"
    >
      <Form.Item
        name="title"
        validateFirst
        rules={todoTitleRules}
      >
        <Input
          placeholder="Задача, которую нужно сделать..."
          size="large"
          allowClear
        />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={
              !form.getFieldValue("title") ||
              form.getFieldValue("title")?.trim().length === 0
            }
          >
            Добавить
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddTodoForm
