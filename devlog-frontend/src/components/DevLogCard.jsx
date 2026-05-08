import { useState } from "react"
import CommentSection from "./CommentSection"
import {
    useDevLogStore
} from "../store/devlogStore"
import TagBadge from "./TagBadge"

export default function DevLogCard({

    log

}) {
    const [showComments, setShowComments] =
        useState(false)
    const { toggleLike } =
        useDevLogStore()

    return (

        <div
            className="
                h-full

                bg-white dark:bg-darkCard

                rounded-3xl
                p-6

                shadow-md

                hover:-translate-y-1
                hover:shadow-xl

                transition-all duration-300

                border border-white/20

                cursor-pointer
            "
        >

            <div
                className="
                    flex items-start justify-between gap-4
                    mb-4
                "
            >

                <div>

                    <h3
                        className="
                            text-xl font-bold
                            dark:text-white
                        "
                    >
                        {log.title}
                    </h3>

                    <p
                        className="
                            text-sm text-gray-500
                        "
                    >
                        @{log.user.username}
                    </p>

                </div>

                <div
                    className="
                        px-3 py-1 rounded-full
                        shrink-0
                        bg-pastelYellow
                        text-sm font-medium
                    "
                >
                    🔥 {log.user.streaks}
                </div>

            </div>

            <p
                className="
                    text-gray-700 dark:text-gray-300
                    mb-4
                "
            >
                {log.content}
            </p>

            <div
                className="
                    flex flex-wrap gap-2 mb-4
                "
            >

                {log.tags?.map((tag) => (

                    <TagBadge
                        key={tag}
                        tag={tag}
                    />
                ))}

            </div>

            <div
                className="
                    flex items-center gap-6
                    text-sm
                "
            >

                <button

                    onClick={() =>
                        toggleLike(log.id)
                    }

                    className="
                        px-4 py-2 rounded-xl
                        bg-pastelPink
                        hover:bg-pastelCandy

                        hover:scale-105

                        transition-all duration-300
                    "
                >
                    ❤️ {log.likesCount}
                </button>

                <button

                    onClick={() =>
                        setShowComments(
                            !showComments
                        )
                    }

                    className="
                        px-4 py-2 rounded-xl
                        bg-pastelLavender
                    "
                >
                    💬 {log.commentsCount}
                </button>


            </div>
            {showComments && (

                                <CommentSection
                                    logId={log.id}
                                />
                            )}

        </div>
    )


}
