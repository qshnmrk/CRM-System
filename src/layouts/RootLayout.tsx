import {
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Layout, Menu } from "antd"
import { Link, Outlet, useLocation } from "react-router-dom"

const { Header, Sider, Content, Footer } = Layout

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  backgroundColor: "#fff",
  lineHeight: "64px",
}

const contentStyle: React.CSSProperties = {
  padding: "24px",
  backgroundColor: "#f0f2f5",
  flex: 1,
}

const siderStyle: React.CSSProperties = {
  width: 250,
  minWidth: 250,
  backgroundColor: "#fff",
}

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  backgroundColor: "#fff",
  lineHeight: "64px",
}

const layoutStyle = {
  minHeight: "100vh",
}

const RootLayout = () => {
  const location = useLocation()

  const items: MenuProps["items"] = [
    {
      key: "grp",
      label: "Навигация",
      type: "group",
      children: [
        {
          key: "/todos",
          icon: <UnorderedListOutlined />,
          label: <Link to="/todos">Список задач</Link>,
        },
        {
          key: "/profile",
          icon: <UserOutlined />,
          label: <Link to="/profile">Профиль</Link>,
        },
      ],
    },
  ]

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}></Header>
      <Layout style={{ flex: 1 }}>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Sider
          width={"25%"}
          style={siderStyle}
        >
          <Menu
            mode="inline"
            items={items}
            selectedKeys={[location.pathname]}
            style={{ height: "100%", borderRight: 0 }}
          />
        </Sider>
      </Layout>
      <Footer style={footerStyle}></Footer>
    </Layout>
  )
}

export default RootLayout
