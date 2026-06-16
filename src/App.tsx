import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import AuthLayout from "./layouts/AuthLayout.tsx"
import RootLayout from "./layouts/RootLayout.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import NotFoundPage from "./pages/NotFoundPage.tsx"
import ProfilePage from "./pages/ProfilePage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"
import TodosPage from "./pages/TodosPage.tsx"

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: "/todos", element: <TodosPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: (
      <Navigate
        to="/login"
        replace
      />
    ),
  },
  { path: "*", element: <NotFoundPage /> },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
