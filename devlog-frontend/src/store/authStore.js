import { create } from "zustand"

import api from "../services/api"

export const useAuthStore = create((set, get) => ({

    token: localStorage.getItem("token"),

    setToken: (token) => {

        localStorage.setItem(
            "token",
            token
        )

        set({ token })
    },

    logout: () => {

        localStorage.removeItem("token")

        set({ token: null })
    },

    login: async (
        email,
        password
    ) => {

        try {

            const response =
                await api.post(
                    "/auth/login",
                    {
                        email,
                        password
                    }
                )

            const token =
                response.data.token

            localStorage.setItem(
                "token",
                token
            )

            set({ token })

        } catch (error) {

            console.error(error)
        }
    },

    register: async (
        username,
        email,
        password
    ) => {

        try {

            await api.post(
                "/auth/register",
                {
                    username,
                    email,
                    password
                }
            )

            await get().login(
                email,
                password
            )

        } catch (error) {

            console.error(error)
        }
    }

}))