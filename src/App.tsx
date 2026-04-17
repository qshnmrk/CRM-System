import {
  MailOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons"

import type { MenuProps } from "antd"
import { Layout, Menu } from "antd"
import { useState } from "react"
import ProfilePage from "./pages/ProfilePage.tsx"
import TodosPage from "./pages/TodosPage.tsx"

type MenuItem = "todos" | "profile"

const App = () => {
  const [currentPage, setCurrentPage] = useState<MenuItem>("todos")

  const items: MenuProps["items"] = [
    {
      key: "sub1",
      label: "Навигация",
      icon: <MailOutlined />,
      children: [
        {
          key: "todos",
          icon: <UnorderedListOutlined />,
          label: "Список задач",
        },
        {
          key: "profile",
          icon: <UserOutlined />,
          label: "Профиль",
        },
      ],
    },
  ]

  const handleMenuClick: MenuProps["onClick"] = (event) => {
    setCurrentPage(event.key as MenuItem)
  }

  const renderContent = () => {
    switch (currentPage) {
      case "todos":
        return <TodosPage />
      case "profile":
        return <ProfilePage />
      default:
        return <TodosPage />
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {renderContent()}
      <Menu
        mode="inline"
        items={items}
        onClick={handleMenuClick}
        style={{ height: "100%", borderRight: 0 }}
      />
    </Layout>
  )
}

export default App
