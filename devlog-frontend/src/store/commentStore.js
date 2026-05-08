import { create } from "zustand"

import api from "../services/api"

export const useCommentStore = create((set) => ({

    comments: {},

    fetchComments: async (logId) => {

        try {

            const response =
                await api.get(
                    `/comments/${logId}`
                )

            set((state) => ({

                comments: {

                    ...state.comments,

                    [logId]: response.data
                }
            }))

        } catch (error) {

            console.error(error)
        }
    },

    addComment: async (
        logId,
        content
    ) => {

        try {

            await api.post(
                `/comments/${logId}`,
                { content }
            )

            const response =
                await api.get(
                    `/comments/${logId}`
                )

            set((state) => ({

                comments: {

                    ...state.comments,

                    [logId]: response.data
                }
            }))

        } catch (error) {

            console.error(error)
        }
    }
}))