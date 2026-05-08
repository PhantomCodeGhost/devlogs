import { useEffect, useState } from "react"

import api from "../services/api"

import DevLogCard from "../components/DevLogCard"

export default function ProfilePage() {

    const [logs, setLogs] =
        useState([])

    useEffect(() => {

        fetchMyLogs()

    }, [])

    const fetchMyLogs = async () => {

        try {

            const response =
                await api.get(
                    "/logs/my"
                )

            setLogs(response.data)

        } catch (error) {

            console.error(error)
        }
    }

    return (

        <div>

            <h1
                className="
                    text-4xl font-bold
                    mb-8

                    dark:text-white
                "
            >
                My DevLogs
            </h1>

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
    )
}