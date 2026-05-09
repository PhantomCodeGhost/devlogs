import { useState } from "react"

import {
    useAuthStore
} from "../store/authStore"

export default function LoginPage() {

    const {
        login,
        register
    } = useAuthStore()

    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)

        try {
            if (isLogin) {
                await login(email, password)
                setSuccess("Login successful!")
                // Token update triggers navigation in App.jsx
            } else {
                await register(username, email, password)
                setSuccess("Account created and logged in!")
                // Token update triggers navigation in App.jsx
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 
                                err.message || 
                                "Something went wrong"
            setError(errorMessage)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const toggleAuthMode = () => {
        setIsLogin(!isLogin)
        setError("")
        setSuccess("")
        setUsername("")
        setEmail("")
        setPassword("")
    }

    return (
        <div
            className="
                min-h-screen
                flex items-center justify-center
                bg-[#eef2f7]
                dark:bg-[#111827]
                p-6
            "
        >
            <div
                className="
                    w-full max-w-md
                    bg-white
                    dark:bg-darkCard
                    rounded-3xl
                    p-8
                    shadow-xl
                "
            >
                <h1
                    className="
                        text-4xl font-bold
                        mb-2
                        dark:text-white
                    "
                >
                    DevLogs
                </h1>

                <p
                    className="
                        text-gray-500
                        mb-8
                    "
                >
                    Share your developer journey
                </p>

                {/* Error Message */}
                {error && (
                    <div
                        className="
                            mb-4 p-3 rounded-lg
                            bg-red-50 dark:bg-red-900/20
                            border border-red-200 dark:border-red-800
                            text-red-700 dark:text-red-200
                            text-sm
                        "
                    >
                        ❌ {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div
                        className="
                            mb-4 p-3 rounded-lg
                            bg-green-50 dark:bg-green-900/20
                            border border-green-200 dark:border-green-800
                            text-green-700 dark:text-green-200
                            text-sm
                        "
                    >
                        ✓ {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="
                        flex flex-col gap-4
                    "
                >
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            disabled={loading}
                            className="
                                p-4 rounded-2xl
                                border border-gray-200
                                dark:bg-gray-800
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        disabled={loading}
                        className="
                            p-4 rounded-2xl
                            border border-gray-200
                            dark:bg-gray-800
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        disabled={loading}
                        className="
                            p-4 rounded-2xl
                            border border-gray-200
                            dark:bg-gray-800
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            py-4 rounded-2xl
                            bg-pastelPink
                            font-semibold
                            hover:scale-[1.02]
                            transition-all
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            disabled:hover:scale-100
                            flex items-center justify-center gap-2
                        "
                    >
                        {loading && (
                            <svg
                                className="w-4 h-4 animate-spin"
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
                        )}
                        {isLogin
                            ? loading ? "Logging in..." : "Login"
                            : loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <button
                    onClick={toggleAuthMode}
                    disabled={loading}
                    className="
                        mt-6
                        text-sm text-gray-500
                        hover:underline
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >
                    {isLogin
                        ? "Need an account? Register"
                        : "Already have an account? Login"}
                </button>
            </div>
        </div>
    )
}
