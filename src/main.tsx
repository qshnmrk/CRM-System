import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.js"

createRoot(document.getElementById("root") as HTMLElement).render(
  //<StrictMode>
  <App />
  //</StrictMode>
)
