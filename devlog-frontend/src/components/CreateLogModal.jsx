import { useState } from "react"

import api from "../services/api"

export default function CreateLogModal({

    open,
    onClose,
    onCreated

}) {

    const [title, setTitle] =
        useState("")

    const [content, setContent] =
        useState("")

    const [tags, setTags] =
        useState("")

    const [loading, setLoading] =
        useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)

            await api.post("/logs", {

                title,
                content,

                tags: tags
                    .split(",")
                    .map(tag => tag.trim())
            })

            setTitle("")
            setContent("")
            setTags("")

            onCreated()

            onClose()

        } catch (error) {

            console.error(error)

        } finally {

            setLoading(false)
        }
    }

    if (!open) return null

    return (

        <div
            className="
                fixed inset-0
                bg-black/40
                backdrop-blur-sm
                flex items-center justify-center
                z-50
            "
        >

            <div
                className="
                    w-full max-w-lg
                    bg-white dark:bg-darkCard
                    rounded-3xl
                    p-8
                    shadow-2xl
                "
            >

                <div
                    className="
                        flex items-center justify-between
                        mb-6
                    "
                >

                    <h2
                        className="
                            text-2xl font-bold
                            dark:text-white
                        "
                    >
                        Create DevLog
                    </h2>

                    <button
                        onClick={onClose}

                        className="
                            text-2xl
                            dark:text-white
                        "
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Title"

                        value={title}

                        onChange={(e) =>
                            setTitle(e.target.value)
                        }

                        className="
                            w-full mb-4
                            p-3 rounded-2xl
                            border border-pastelGray
                        "

                        required
                    />

                    <textarea
                        placeholder="What did you build today?"

                        value={content}

                        onChange={(e) =>
                            setContent(e.target.value)
                        }

                        rows={5}

                        className="
                            w-full mb-4
                            p-3 rounded-2xl
                            border border-pastelGray
                        "

                        required
                    />

                    <input
                        type="text"
                        placeholder="Tags (comma separated)"

                        value={tags}

                        onChange={(e) =>
                            setTags(e.target.value)
                        }

                        className="
                            w-full mb-6
                            p-3 rounded-2xl
                            border border-pastelGray
                        "
                    />

                    <button
                        type="submit"

                        disabled={loading}

                        className="
                            w-full
                            bg-pastelPink
                            hover:bg-pastelCandy
                            rounded-2xl
                            py-3
                            font-semibold
                            transition-all duration-300
                        "
                    >

                        {loading
                            ? "Posting..."
                            : "Publish DevLog"}

                    </button>

                </form>

            </div>

        </div>
    )
}