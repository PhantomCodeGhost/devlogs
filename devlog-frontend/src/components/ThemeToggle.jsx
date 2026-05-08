import { useThemeStore } from "../store/themeStore"

export default function ThemeToggle() {

    const {
        darkMode,
        toggleTheme
    } = useThemeStore()

    return (

        <button
            onClick={toggleTheme}

            className="
                px-4 py-2 rounded-2xl
                bg-pastelPink hover:bg-pastelCandy
                dark:bg-pastelLavender
                transition-all duration-300
                shadow-sm hover:shadow-md
                font-medium
            "
        >

            {darkMode ? "Light" : "Dark"}

        </button>
    )
}