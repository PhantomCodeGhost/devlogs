import { useEffect, useState } from "react"

import { FaPlus } from "react-icons/fa"

import DevLogCard from "../components/DevLogCard"

import CreateLogModal
from "../components/CreateLogModal"

import {
    useDevLogStore
} from "../store/devlogStore"

export default function DashboardPage() {

    const {
        logs,
        fetchLogs,
        loading
    } = useDevLogStore()

    const [openModal, setOpenModal] =
        useState(false)

    useEffect(() => {

        fetchLogs()

    }, [])

    if (loading) {

        return (

            <div
                className="
                    text-center
                    text-xl
                    dark:text-white
                "
            >
                Loading...
            </div>
        )
    }

    return (

        <>

            <div
                className="
                    flex items-center
                    justify-between

                    mb-8
                "
            >

                <div>

                    <h1
                        className="
                            text-4xl font-bold
                            dark:text-white
                        "
                    >
                        Dev Feed
                    </h1>

                    <p
                        className="
                            text-gray-500 mt-2
                        "
                    >
                        Share your daily developer journey
                    </p>

                </div>

                <button

                    onClick={() =>
                        setOpenModal(true)
                    }

                    className="
                        flex items-center gap-2

                        px-5 py-3 rounded-2xl

                        bg-pastelPink
                        hover:bg-pastelCandy

                        shadow-md
                        hover:shadow-xl

                        hover:scale-105

                        transition-all duration-300
                    "
                >

                    <FaPlus />

                    New DevLog

                </button>

            </div>

            <div
                className="
                    grid grid-cols-1
                    xl:grid-cols-2
                    2xl:grid-cols-3

                    gap-8

                    items-start
                "
            >

                {logs.map((log) => (

                    <DevLogCard
                        key={log.id}
                        log={log}
                    />
                ))}

            </div>

            <CreateLogModal

                open={openModal}

                onClose={() =>
                    setOpenModal(false)
                }

                onCreated={fetchLogs}
            />

        </>
    )
}