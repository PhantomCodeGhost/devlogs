import MainLayout from "./layouts/MainLayout"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage
from "./pages/ProfilePage"

import {
    useUIStore
} from "./store/uiStore"

import { useThemeStore } from "./store/themeStore"
import { useAuthStore } from "./store/authStore"

export default function App() {

    const {
        currentPage
    } = useUIStore()

  const { darkMode } =
    useThemeStore()

  const { token } =
    useAuthStore()

  return (

    <div className={darkMode ? "dark" : ""}>

      {token ? (

        <MainLayout>

         {currentPage === "feed"

             ? <DashboardPage />

             : <ProfilePage />
         }

        </MainLayout>

      ) : (

        <LoginPage />
      )}

    </div>
  )
}