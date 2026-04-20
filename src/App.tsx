// import {
//   UnorderedListOutlined,
//   UserOutlined,
// } from "@ant-design/icons"

// import type { MenuProps } from "antd"
// import { Layout, Menu } from "antd"
// import { useState } from "react"
// import ProfilePage from "./pages/ProfilePage.tsx"
// import TodosPage from "./pages/TodosPage.tsx"

// const { Header, Sider, Content, Footer } = Layout

// const headerStyle: React.CSSProperties = {
//   textAlign: "center",
//   height: 64,
//   backgroundColor: "#fff",
// }

// const contentStyle: React.CSSProperties = {
//   textAlign: "center",
//   flex: 1,
//   padding: "24px",
//   backgroundColor: "#f1f1f1",
// }

// const siderStyle: React.CSSProperties = {
//   textAlign: "center",
//   width: 250,
//   minWidth: 250,
//   backgroundColor: "#fff",
// }

// const footerStyle: React.CSSProperties = {
//   textAlign: "center",
//   height: 64,
//   backgroundColor: "#fff",
// }

// const layoutStyle = {
//   minHeight: "100vh",
// }
// type MenuItem = "todos" | "profile"

// const App = () => {
//   const [currentPage, setCurrentPage] = useState<MenuItem>("todos")

//   const items: MenuProps["items"] = [
//     {
//       key: "grp",
//       label: "Навигация",
//       type: "group",
//       children: [
//         {
//           key: "todos",
//           icon: <UnorderedListOutlined />,
//           label: "Список задач",
//         },
//         {
//           key: "profile",
//           icon: <UserOutlined />,
//           label: "Профиль",
//         },
//       ],
//     },
//   ]

//   const handleMenuOptionChange: MenuProps["onClick"] = (
//     event
//   ): void => {
//     setCurrentPage(event.key as MenuItem)
//   }

//   const renderContent = () => {
//     switch (currentPage) {
//       case "todos":
//         return <TodosPage />
//       case "profile":
//         return <ProfilePage />
//       default:
//         return <TodosPage />
//     }
//   }

//   return (
//     <Layout style={layoutStyle}>
//       <Header style={headerStyle}></Header>
//       <Layout>
//         <Content style={contentStyle}>{renderContent()}</Content>
//         <Sider
//           width="25%"
//           style={siderStyle}
//         >
//           <Menu
//             mode="inline"
//             items={items}
//             onClick={handleMenuOptionChange}
//             selectedKeys={[currentPage]}
//             style={{ height: "100%", borderRight: 0 }}
//           />
//         </Sider>
//       </Layout>
//       <Footer style={footerStyle}></Footer>
//     </Layout>
//   )
// }

// export default App
