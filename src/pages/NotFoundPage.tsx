import { Button, Layout, Result } from "antd"
import { Link } from "react-router-dom"

const { Content } = Layout

const NotFoundPage = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Result
          status="404"
          title="404"
          subTitle="Извините, страница не найдена"
          extra={
            <Link to="/">
              <Button type="primary">Вернуться на главную</Button>
            </Link>
          }
        />
      </Content>
    </Layout>
  )
}

export default NotFoundPage
