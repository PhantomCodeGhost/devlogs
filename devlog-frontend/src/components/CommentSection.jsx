import { useEffect, useState } from "react"

import {
    useCommentStore
} from "../store/commentStore"

export default function CommentSection({

    logId

}) {

    const {

        comments,
        fetchComments,
        addComment

    } = useCommentStore()

    const [content, setContent] =
        useState("")

    useEffect(() => {

        fetchComments(logId)

    }, [logId])

    const handleComment = async () => {

        if (!content.trim()) return

        await addComment(
            logId,
            content
        )

        setContent("")
    }

    return (

        <div
            className="
                mt-4
                border-t border-gray-200
                pt-4
            "
        >

            <div
                className="
                    space-y-3 mb-4
                "
            >

                {comments[logId]?.map(
                    (comment) => (

                    <div
                        key={comment.id}

                        className="
                            bg-pastelGray/40
                            dark:bg-gray-700
                            rounded-2xl
                            p-3
                        "
                    >

                        <p
                            className="
                                text-sm font-semibold
                                dark:text-white
                            "
                        >
                            @{comment.user.username}
                        </p>

                        <p
                            className="
                                text-sm
                                text-gray-700
                                dark:text-gray-300
                            "
                        >
                            {comment.content}
                        </p>

                    </div>
                ))}

            </div>

            <div
                className="
                    flex flex-col gap-2
                "
            >

                <input
                    type="text"

                    placeholder="Write a comment..."

                    value={content}

                    onChange={(e) =>
                        setContent(
                            e.target.value
                        )
                    }

                    className="
                        flex-1
                        p-3 rounded-2xl
                        border border-pastelGray
                    "
                />

                <button

                    onClick={handleComment}

                    className="
                        w-full py-3 rounded-2xl
                        bg-pastelLavender
                        hover:opacity-90
                    "
                >
                    Post
                </button>

            </div>

        </div>
    )
}