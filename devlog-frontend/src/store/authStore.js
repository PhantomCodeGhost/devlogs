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

            return response.data

        } catch (error) {

            console.error(error)
            // Re-throw error so LoginPage can handle it
            throw error
        }
    },

    register: async (
        username,
        email,
        password
    ) => {

        try {

            const response = 
                await api.post(
                    "/auth/register",
                    {
                        username,
                        email,
                        password
                    }
                )

            // After successful registration, log the user in
            await get().login(
                email,
                password
            )

            return response.data

        } catch (error) {

            console.error(error)
            // Re-throw error so LoginPage can handle it
            throw error
        }
    }

}))
