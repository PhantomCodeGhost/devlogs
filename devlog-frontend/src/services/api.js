import axios from "axios"

const api = axios.create({
    baseURL: "https://devlogs-j594.onrender.com/api",  // ✅ Added /api
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token")

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`
    }

    return config
})

export default api
