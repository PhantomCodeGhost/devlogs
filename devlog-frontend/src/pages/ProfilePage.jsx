import { useEffect, useState } from "react"

import api from "../services/api"

import DevLogCard from "../components/DevLogCard"
import { useAuthStore } from "../store/authStore"

export default function ProfilePage() {

    const [logs, setLogs] = useState([])
    const [userStats, setUserStats] = useState({
        username: "",
        streaks: 0,
        totalLogs: 0,
        totalLikes: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { token } = useAuthStore()

    useEffect(() => {

        fetchMyLogs()
        fetchUserStats()

    }, [])

    const fetchUserStats = async () => {

        try {

            const response =
                await api.get("/users/me")

            setUserStats({
                username: response.data.username,
                streaks: response.data.streaks || 0,
                totalLogs: 0,  // Will update from logs fetch
                totalLikes: 0  // Will update from logs fetch
            })

        } catch (err) {

            console.error("Error fetching user stats:", err)
            setError("Failed to load user stats")
        }
    }

    const fetchMyLogs = async () => {

        try {

            setLoading(true)
            setError("")

            const response =
                await api.get(
                    "/logs/my"
                )

            setLogs(response.data || [])

            // Calculate total likes from all logs
            const totalLikes = response.data.reduce((sum, log) => sum + (log.likesCount || 0), 0)
            
            setUserStats(prev => ({
                ...prev,
                totalLogs: response.data.length,
                totalLikes: totalLikes
            }))

        } catch (err) {

            console.error("Error fetching logs:", err)
            setError("Failed to load your dev logs")
            setLogs([])
        } finally {

            setLoading(false)
        }
    }

    return (

        <div>

            {/* User Stats Header */}
            <div
                className="
                    mb-12
                    bg-gradient-to-r from-pastelPink to-pastelLavender
                    rounded-3xl p-8
                    dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700
                    shadow-lg
                "
            >

                <div className="flex items-center justify-between">

                    <div>

                        <h1
                            className="
                                text-4xl font-bold
                                mb-2
                                dark:text-white
                            "
                        >
                            {userStats.username || "My Profile"}
                        </h1>

                        <p
                            className="
                                text-gray-600
                                dark:text-gray-300
                            "
                        >
                            Developer. Creator. Community Member.
                        </p>

                    </div>

                    {/* Streaks Badge */}
                    <div
                        className="
                            text-center
                            bg-white/60 dark:bg-gray-800/60
                            rounded-2xl p-6
                            backdrop-blur-sm
                        "
                    >

                        <div className="text-4xl font-bold text-pastelPink mb-1">
                            🔥 {userStats.streaks || 0}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Current Streak
                        </p>

                    </div>

                </div>

                {/* Stats Row */}
                <div
                    className="
                        grid grid-cols-3 gap-4 mt-6
                        text-center
                    "
                >

                    <div>

                        <div className="text-2xl font-bold dark:text-white">
                            {userStats.totalLogs}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Dev Logs
                        </p>

                    </div>

                    <div>

                        <div className="text-2xl font-bold dark:text-white">
                            {userStats.totalLikes}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Total Likes
                        </p>

                    </div>

                    <div>

                        <div className="text-2xl font-bold dark:text-white">
                            {logs.reduce((sum, log) => sum + (log.commentsCount || 0), 0)}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Comments
                        </p>

                    </div>

                </div>

            </div>

            {/* Error Message */}
            {error && (
                <div
                    className="
                        mb-6 p-4 rounded-lg
                        bg-red-50 dark:bg-red-900/20
                        border border-red-200 dark:border-red-800
                        text-red-700 dark:text-red-200
                    "
                >
                    ❌ {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin">
                        <svg
                            className="w-8 h-8 text-pastelPink"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                    <p className="mt-2 text-gray-500">Loading your dev logs...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && logs.length === 0 && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                        No dev logs yet. Start sharing your journey! ✍️
                    </p>
                </div>
            )}

            {/* Dev Logs Grid */}
            {!loading && logs.length > 0 && (
                <div>

                    <h2
                        className="
                            text-2xl font-bold
                            mb-6
                            dark:text-white
                        "
                    >
                        My Dev Logs
                    </h2>

                    <div
                        className="
                            grid grid-cols-1
                            xl:grid-cols-2
                            2xl:grid-cols-3

                            gap-8
                        "
                    >

                        {logs.map((log) => (

                            <DevLogCard
                                key={log.id}
                                log={log}
                                onCommentAdded={() => fetchMyLogs()}
                            />
                        ))}

                    </div>

                </div>
            )}

        </div>
    )
}
