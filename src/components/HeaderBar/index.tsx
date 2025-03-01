import React from "react"
import { ArrowLeft, Plus } from "lucide-react"
import { Link } from "react-router"


type HeaderBarProps = {
    title: string
    backUrl?: string
    createUrl?: string
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ title, backUrl, createUrl }) => (
    <header className="flex items-center px-4 mb-8 gap-4 shadow-md fixed w-screen bg-white top-0 h-16">
        {backUrl && (
            <Link
                to={backUrl}
                className="text-purple-800">
                <ArrowLeft size={25} />
            </Link>
        )}

        <h1 className="text-3xl flex-grow text-purple-900">{title}</h1>

        {createUrl && (
            <Link
                to={createUrl}
                className="flex items-center gap-2 rounded-full px-4 py-2 bg-purple-800 text-white">
                <Plus size={20} /> Ajouter
            </Link>
        )}
    </header>
)
