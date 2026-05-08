import { create } from "zustand"

export const useUIStore =
    create((set) => ({

        currentPage: "feed",

        setCurrentPage: (page) =>

            set({
                currentPage: page
            })
    }))