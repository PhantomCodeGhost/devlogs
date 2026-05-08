import { create } from "zustand"

import api from "../services/api"

export const useDevLogStore = create((set) => ({

    logs: [],

    loading: false,

    fetchLogs: async () => {

        set({ loading: true })

        try {

            const response =
                await api.get("/logs")

            set({

                logs: response.data,
                loading: false
            })

        } catch (error) {

            console.error(error)

            set({ loading: false })
        }
    },

    toggleLike: async (id) => {

        try {

            await api.post(
                `/logs/${id}/like`
            )

            const response =
                await api.get("/logs")

            set({
                logs: response.data
            })

        } catch (error) {

            console.error(error)
        }
    }

}))