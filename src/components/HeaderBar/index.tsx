import { ArrowLeft, Plus } from "lucide-react"
import type React from "react"
import { Link } from "react-router"

type HeaderBarProps = {
    title: string
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => (
    <header className="navbar bg-base-100 shadow-md fixed top-0 z-50 min-h-16">
        <h1 className="text-2xl font-bold px-2">{title}</h1>
    </header>
)
