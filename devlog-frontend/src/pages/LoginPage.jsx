import { useState } from "react"

import {
    useAuthStore
} from "../store/authStore"

export default function LoginPage() {

    const {

        login,
        register

    } = useAuthStore()

    const [isLogin, setIsLogin] =
        useState(true)

    const [username, setUsername] =
        useState("")

    const [email, setEmail] =
        useState("")

    const [password, setPassword] =
        useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (isLogin) {

            await login(
                email,
                password
            )

        } else {

            await register(
                username,
                email,
                password
            )
        }
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
                                setUsername(
                                    e.target.value
                                )
                            }

                            className="
                                p-4 rounded-2xl

                                border border-gray-200

                                dark:bg-gray-800
                            "
                        />
                    )}

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }

                        className="
                            p-4 rounded-2xl

                            border border-gray-200

                            dark:bg-gray-800
                        "
                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }

                        className="
                            p-4 rounded-2xl

                            border border-gray-200

                            dark:bg-gray-800
                        "
                    />

                    <button

                        type="submit"

                        className="
                            py-4 rounded-2xl

                            bg-pastelPink

                            font-semibold

                            hover:scale-[1.02]

                            transition-all
                        "
                    >

                        {isLogin
                            ? "Login"
                            : "Create Account"}

                    </button>

                </form>

                <button

                    onClick={() =>
                        setIsLogin(
                            !isLogin
                        )
                    }

                    className="
                        mt-6

                        text-sm text-gray-500

                        hover:underline
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