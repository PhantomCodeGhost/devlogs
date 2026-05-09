import { useEffect, useState } from "react"

import api from "../services/api"

import DevLogCard from "../components/DevLogCard"

export default function ProfilePage() {

    const [logs, setLogs] = useState([])
    const [userStats, setUserStats] = useState({
        username: "",
        streaks: 0,
        totalLogs: 0,
        totalLikes: 0,
        totalComments: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchMyLogs()
    }, [])

    const fetchMyLogs = async () => {

        try {

            setLoading(true)
            setError("")

            const response =
                await api.get("/logs/my")

            const logsData = response.data || []
            setLogs(logsData)

            // Extract user info from first log (they're all the same user)
            if (logsData.length > 0) {
                const firstLog = logsData[0]
                const totalLikes = logsData.reduce((sum, log) => sum + (log.likesCount || 0), 0)
                const totalComments = logsData.reduce((sum, log) => sum + (log.commentsCount || 0), 0)

                setUserStats({
                    username: firstLog.user?.username || "Developer",
                    streaks: firstLog.user?.streaks || 0,
                    totalLogs: logsData.length,
                    totalLikes: totalLikes,
                    totalComments: totalComments
                })
            } else {
                // No logs, set default stats
                setUserStats(prev => ({
                    ...prev,
                    totalLogs: 0,
                    totalLikes: 0,
                    totalComments: 0
                }))
            }

        } catch (err) {

            console.error("Error fetching logs:", err)
            setError("Failed to load your dev logs. Please try again.")
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

                <div className="flex items-center justify-between flex-wrap gap-6">

                    <div>

                        <h1
                            className="
                                text-4xl font-bold
                                mb-2
                                dark:text-white
                            "
                        >
                            {userStats.username}
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

                        <div className="text-5xl font-bold mb-1">
                            🔥
                        </div>

                        <div className="text-3xl font-bold text-pastelPink mb-1">
                            {userStats.streaks}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Current Streak
                        </p>

                    </div>

                </div>

                {/* Stats Row */}
                <div
                    className="
                        grid grid-cols-3 gap-4 mt-8
                        text-center
                    "
                >

                    <div className="bg-white/40 dark:bg-gray-700/40 rounded-2xl p-4">

                        <div className="text-3xl font-bold dark:text-white">
                            {userStats.totalLogs}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Dev Logs
                        </p>

                    </div>

                    <div className="bg-white/40 dark:bg-gray-700/40 rounded-2xl p-4">

                        <div className="text-3xl font-bold dark:text-white">
                            {userStats.totalLikes}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Total Likes
                        </p>

                    </div>

                    <div className="bg-white/40 dark:bg-gray-700/40 rounded-2xl p-4">

                        <div className="text-3xl font-bold dark:text-white">
                            {userStats.totalComments}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
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
                    <p className="text-gray-500 text-lg mb-4">
                        No dev logs yet. Start sharing your journey! ✍️
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="
                            px-6 py-3 rounded-2xl
                            bg-pastelPink
                            text-white font-semibold
                            hover:opacity-90
                            transition-all
                        "
                    >
                        Go to Dashboard
                    </button>
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
                            />
                        ))}

                    </div>

                </div>
            )}

        </div>
    )
}
