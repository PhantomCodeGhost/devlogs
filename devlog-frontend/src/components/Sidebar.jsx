import { useEffect, useState } from "react"
import {
    useUIStore
} from "../store/uiStore"
import api from "../services/api"

import {

    FaHome,
    FaUser

} from "react-icons/fa"

export default function Sidebar() {
    const {

        currentPage,
        setCurrentPage

    } = useUIStore()
    const [streak, setStreak] =
        useState(0)

    useEffect(() => {

        fetchStreak()

    }, [])

    const fetchStreak = async () => {

        try {

            const response =
                await api.get(
                    "/users/streak"
                )

            setStreak(response.data)

        } catch (error) {

            console.error(error)
        }
    }


    return (

        <aside
            className="
                hidden lg:flex

                flex-col justify-between

                w-64 min-h-screen

                bg-white/70
                dark:bg-darkCard/80

                backdrop-blur-xl

                border-r border-white/20

                p-6
            "
        >

            <div>

                <h1
                    className="
                        text-3xl font-bold
                        mb-10
                        dark:text-white
                    "
                >
                    DevLogs
                </h1>

                <nav
                    className="
                        flex flex-col gap-3
                    "
                >

                    <button

                        onClick={() =>
                            setCurrentPage("feed")
                        }

                        className={`
                            flex items-center gap-3

                            px-4 py-3 rounded-2xl

                            transition-all

                            ${currentPage === "feed"

                                ? "bg-pastelBlue/50"

                                : "hover:bg-white/50 dark:hover:bg-white/10"
                            }
                        `}
                    >
                        <FaHome />

                        Feed
                    </button>

                    <button

                        onClick={() =>
                            setCurrentPage("profile")
                        }

                        className={`
                            flex items-center gap-3

                            px-4 py-3 rounded-2xl

                            transition-all

                            ${currentPage === "profile"

                                ? "bg-pastelBlue/50"

                                : "hover:bg-white/50 dark:hover:bg-white/10"
                            }
                        `}
                    >
                        <FaUser />

                        Profile
                    </button>

                </nav>

            </div>

            <div
                className="
                    p-4 rounded-2xl

                    bg-gradient-to-br
                    from-pastelPink
                    to-pastelLavender
                "
            >

                <p
                    className="
                        font-semibold
                    "
                >
                    Developer Streak
                </p>

                <h2
                    className="
                        text-3xl font-bold
                    "
                >
                    🔥 {streak}
                </h2>

            </div>

        </aside>
    )
}