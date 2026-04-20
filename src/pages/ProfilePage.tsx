import { Layout } from "antd"

const { Content } = Layout

const ProfilePage = () => {
  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <h1>Привет!</h1>
      </Content>
    </Layout>
  )
}

export default ProfilePage
