import { create } from "zustand"

import api from "../services/api"

export const useCommentStore = create((set) => ({

    comments: {},

    fetchComments: async (logId) => {

        try {

            const response =
                await api.get(
                    `/logs/${logId}/comments`  // ✅ FIXED: Added /logs prefix
                )

            set((state) => ({

                comments: {

                    ...state.comments,

                    [logId]: response.data
                }
            }))

        } catch (error) {

            console.error("Error fetching comments:", error)
            // Set empty array if fetch fails
            set((state) => ({
                comments: {
                    ...state.comments,
                    [logId]: []
                }
            }))
        }
    },

    addComment: async (
        logId,
        content
    ) => {

        try {

            await api.post(
                `/logs/${logId}/comments`,  // ✅ FIXED: Added /logs prefix
                { content }
            )

            const response =
                await api.get(
                    `/logs/${logId}/comments`  // ✅ FIXED: Added /logs prefix
                )

            set((state) => ({

                comments: {

                    ...state.comments,

                    [logId]: response.data
                }
            }))

        } catch (error) {

            console.error("Error adding comment:", error)
        }
    }
}))
