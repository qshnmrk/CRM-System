import { LockOutlined, MailOutlined } from "@ant-design/icons"
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Typography,
  message,
} from "antd"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../api/authApi.ts"

const { Title, Text } = Typography

const LoginPage = () => {
  const navigate = useNavigate()

  const onFinish = async (values: {
    login: string
    password: string
    remember: boolean
  }) => {
    try {
      const response = await loginUser({
        login: values.login,
        password: values.password,
      })

      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)

      message.success("Вход выполнен успешно")
      navigate("/todos")
    } catch (error: any) {
      if (error.response?.status === 401) {
        message.error("Неверные логин или пароль")
      } else {
        message.error("Ошибка входа. Пожалуйста, попробуйте позже.")
      }
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: "#7F265B",
            colorPrimaryHover: "#9e3070",
          },
          Input: {
            hoverBorderColor: "#E5AC62",
            activeBorderColor: "#E5AC62",
          },
          InputNumber: {
            hoverBorderColor: "#E5AC62",
            activeBorderColor: "#E5AC62",
          },
        },
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
        }}
      >
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <img
            src="/src/assets/auth-icon.svg"
            alt="auth-icon"
            style={{ width: 72, height: 72 }}
          />
        </div>

        <div style={{ marginBottom: 32 }}>
          <Title
            level={1}
            style={{ marginBottom: 8, textAlign: "center" }}
          >
            Вход в аккаунт
          </Title>
          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Узнайте, что происходит в вашем бизнесе
          </Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="login"
            label={<span style={{ fontSize: 16 }}>Логин</span>}
            rules={[{ required: true, message: "Введите логин" }]}
            style={{ marginBottom: 16 }}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="ivan"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span style={{ fontSize: 16, paddingBottom: 0 }}>
                Пароль
              </span>
            }
            rules={[{ required: true, message: "Введите пароль" }]}
            style={{ marginBottom: 0 }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="*sTr0nG/PasSw0rD()"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <Checkbox style={{ fontSize: 14 }}>
                  Запомнить меня
                </Checkbox>
              </Form.Item>
              <Button
                type="link"
                style={{ padding: 0, color: "#7F265B", fontSize: 14 }}
              >
                Забыли пароль?
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#7F265B" }}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div
          style={{
            textAlign: "center",
            marginTop: 24,
          }}
        >
          <Text type="secondary">
            Ещё нет аккаунта?{" "}
            <Link
              to="/register"
              style={{ color: "#7F265B" }}
            >
              Создать аккаунт
            </Link>
          </Text>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default LoginPage
