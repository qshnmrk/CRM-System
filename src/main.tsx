import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/RootLayout.tsx"
import NotFoundPage from "./pages/NotFoundPage.tsx"
import ProfilePage from "./pages/ProfilePage.tsx"
import TodosPage from "./pages/TodosPage.tsx"
import "./styles/index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <TodosPage /> },
      { path: "todos", element: <TodosPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
])
createRoot(document.getElementById("root") as HTMLElement).render(
  //<StrictMode>
  <RouterProvider router={router} />

  //</StrictMode>
)
