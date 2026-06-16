import { Col, Row } from "antd"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col
        xs={0}
        md={13}
        style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/src/assets/auth-illustration.svg"
          alt="Illustration"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Col>

      <Col
        xs={24}
        md={11}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "48px",
            backgroundColor: "white",
          }}
        >
          <Outlet />
        </div>
      </Col>
    </Row>
  )
}

export default AuthLayout
