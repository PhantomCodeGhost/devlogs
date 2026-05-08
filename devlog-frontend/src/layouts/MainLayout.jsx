import Sidebar from "../components/Sidebar"

import {
    useThemeStore
} from "../store/themeStore"

export default function MainLayout({

    children

}) {

    const {
        darkMode,
        toggleTheme
    } = useThemeStore()

    return (

        <div
            className={`
                min-h-screen

                flex

                transition-all duration-300

                ${darkMode
                    ? "bg-[#111827]"
                    : "bg-[#eef2f7]"
                }
            `}
        >

            <Sidebar />

            <main
                className="
                    flex-1
                    p-6 lg:p-8
                "
            >

                <div
                    className="
                        flex justify-end
                        mb-8
                    "
                >

                    <button

                        onClick={toggleTheme}

                        className={`
                            relative

                            w-16 h-9

                            rounded-full

                            transition-all duration-300

                            flex items-center

                            px-1

                            ${darkMode
                                ? "bg-gray-700"
                                : "bg-[#f6d365]"
                            }
                        `}
                    >

                        <div
                            className={`
                                absolute

                                w-7 h-7 rounded-full

                                bg-white/90
                                shadow-lg

                                shadow-md

                                flex items-center justify-center

                                transition-all duration-300

                                ${darkMode
                                    ? "translate-x-7"
                                    : "translate-x-0"
                                }
                            `}
                        >

                           <span className="text-sm">
                               {darkMode ? "🌙" : "☀️"}
                           </span>

                        </div>

                    </button>

                </div>

                {children}

            </main>

        </div>
    )
}