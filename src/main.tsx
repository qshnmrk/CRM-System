import { App as AntdApp } from "antd"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.js"

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AntdApp>
      <App />
    </AntdApp>
  </StrictMode>
)
