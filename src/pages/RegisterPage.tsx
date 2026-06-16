import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons"
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Typography,
  message,
} from "antd"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../api/authApi.ts"
import {
  confirmPasswordRules,
  emailRules,
  loginRules,
  passwordRules,
  phoneRules,
  usernameRules,
} from "../validation/registerValidation.ts"

const { Title, Text } = Typography

const RegisterPage = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      const userData = {
        username: values.username,
        login: values.login,
        password: values.password,
        email: values.email,
        phoneNumber: values.phone || "",
      }

      await registerUser(userData)

      message.success(
        "Регистрация прошла успешно! Теперь вы можете войти в систему."
      )

      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error: any) {
      if (error.response?.status === 409) {
        message.error(
          "Пользователь с таким логином или email уже существует"
        )
      } else if (error.response?.status === 400) {
        message.error(
          "Неверно заполнены данные. Проверьте правильность ввода."
        )
      } else {
        message.error(
          "Ошибка регистрации. Пожалуйста, попробуйте позже."
        )
      }
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
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
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: 8, textAlign: "center" }}>
          <img
            src="/src/assets/auth-icon.svg"
            alt="auth-icon"
            style={{ width: 48, height: 48 }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <Title
            level={1}
            style={{ marginBottom: 0, textAlign: "center" }}
          >
            Регистрация
          </Title>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            label={
              <span style={{ fontSize: 16 }}>Имя пользователя</span>
            }
            rules={usernameRules}
            style={{ marginBottom: 10 }}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Ivan Ivanov"
            />
          </Form.Item>

          <Form.Item
            name="login"
            label={<span style={{ fontSize: 16 }}>Логин</span>}
            rules={loginRules}
            style={{ marginBottom: 10 }}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="ivan"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontSize: 16 }}>Пароль</span>}
            rules={passwordRules}
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="*sTr0nG/PasSw0rD()"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={
              <span style={{ fontSize: 16 }}>Повторите пароль</span>
            }
            rules={confirmPasswordRules(form.getFieldValue)}
            style={{ marginBottom: 10 }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="*sTr0nG/PasSw0rD()"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ fontSize: 16 }}>Почта</span>}
            rules={emailRules}
            style={{ marginBottom: 10 }}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="ivan1@example.com"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<span style={{ fontSize: 16 }}>Телефон</span>}
            rules={phoneRules}
            style={{ marginBottom: 10 }}
          >
            <Input
              prefix={<PhoneOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="+79999999999"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#7F265B" }}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 0 }}>
          <Text type="secondary">
            Уже есть аккаунт?{" "}
            <Link
              to="/login"
              style={{ color: "#7F265B" }}
            >
              Войти
            </Link>
          </Text>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default RegisterPage
