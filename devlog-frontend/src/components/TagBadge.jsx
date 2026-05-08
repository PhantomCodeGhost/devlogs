import {

    SiReact,
    SiNextdotjs,
    SiVite,
    SiJavascript,
    SiTypescript,

    SiHtml5,
    SiTailwindcss,
    SiBootstrap,

    SiSpringboot,
    SiNodedotjs,
    SiExpress,

    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiFirebase,

    SiDocker,
    SiKubernetes,

    SiGit,
    SiGithub,

    SiRedis,

    SiPython,
    SiCplusplus,
    SiC,

    SiFlutter

} from "react-icons/si"

import {

    FaJava,
    FaCss3Alt,
    FaAws

} from "react-icons/fa"


const tagMap = {

    react: {
        icon: <SiReact />,
        color: "bg-blue-100/70 text-blue-700"
    },

    nextjs: {
        icon: <SiNextdotjs />,
        color: "bg-gray-200/70 text-black"
    },

    vite: {
        icon: <SiVite />,
        color: "bg-purple-100/70 text-purple-700"
    },

    javascript: {
        icon: <SiJavascript />,
        color: "bg-yellow-100/70 text-yellow-800"
    },

    typescript: {
        icon: <SiTypescript />,
        color: "bg-blue-100/70 text-blue-700"
    },

    html: {
        icon: <SiHtml5 />,
        color: "bg-orange-100/70 text-orange-700"
    },

    css: {
        icon: <FaCss3Alt />,
        color: "bg-sky-100/70 text-sky-700"
    },

    tailwind: {
        icon: <SiTailwindcss />,
        color: "bg-cyan-100/70 text-cyan-700"
    },

    bootstrap: {
        icon: <SiBootstrap />,
        color: "bg-violet-100/70 text-violet-700"
    },

    springboot: {
        icon: <SiSpringboot />,
        color: "bg-green-100/70 text-green-700"
    },

    java: {
        icon: <FaJava />,
        color: "bg-red-100/70 text-red-700"
    },

    nodejs: {
        icon: <SiNodedotjs />,
        color: "bg-green-100/70 text-green-700"
    },

    express: {
        icon: <SiExpress />,
        color: "bg-gray-200/70 text-gray-800"
    },



    postgres: {
        icon: <SiPostgresql />,
        color: "bg-indigo-100/70 text-indigo-700"
    },

    mysql: {
        icon: <SiMysql />,
        color: "bg-blue-100/70 text-blue-700"
    },

    mongodb: {
        icon: <SiMongodb />,
        color: "bg-green-100/70 text-green-700"
    },

    firebase: {
        icon: <SiFirebase />,
        color: "bg-yellow-100/70 text-yellow-700"
    },

    docker: {
        icon: <SiDocker />,
        color: "bg-cyan-100/70 text-cyan-700"
    },

    kubernetes: {
        icon: <SiKubernetes />,
        color: "bg-blue-100/70 text-blue-700"
    },

    git: {
        icon: <SiGit />,
        color: "bg-orange-100/70 text-orange-700"
    },

    github: {
        icon: <SiGithub />,
        color: "bg-gray-200/70 text-gray-800"
    },

    aws: {
        icon: <FaAws />,
        color: "bg-yellow-100/70 text-yellow-800"
    },

    redis: {
        icon: <SiRedis />,
        color: "bg-red-100/70 text-red-700"
    },

    python: {
        icon: <SiPython />,
        color: "bg-yellow-100/70 text-blue-700"
    },

    cpp: {
        icon: <SiCplusplus />,
        color: "bg-blue-100/70 text-blue-700"
    },

    c: {
        icon: <SiC />,
        color: "bg-gray-200/70 text-gray-800"
    },

    flutter: {
        icon: <SiFlutter />,
        color: "bg-sky-100/70 text-sky-700"
    }
}

export default function TagBadge({

    tag

}) {

    const normalized =
        tag.toLowerCase()

    const data =
        tagMap[normalized]

    return (

        <span
            className={`
                flex items-center gap-2
                px-3 py-1 rounded-full
                text-xs font-medium
                ${data?.color || "bg-pastelBlue text-gray-800"}
            `}
        >

            {data?.icon}

            {tag}

        </span>
    )
}