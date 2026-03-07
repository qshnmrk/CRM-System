import { createRoot } from "react-dom/client"
import App from "./components/App.jsx"
import "./styles"

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <App />
  //</StrictMode>
)
