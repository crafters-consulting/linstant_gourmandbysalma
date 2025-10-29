import { ArrowLeft, Plus } from "lucide-react"
import type React from "react"
import { Link } from "react-router"

type HeaderBarProps = {
    title: string
    backUrl?: string
    createUrl?: string
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
    title,
    backUrl,
    createUrl,
}) => (
    <header className="navbar bg-base-100 shadow-md fixed top-0 z-50 min-h-16">
        {backUrl && (
            <div className="navbar-start">
                <Link to={backUrl} className="btn btn-ghost btn-circle">
                    <ArrowLeft size={24} />
                </Link>
            </div>
        )}

        <div className={backUrl ? "navbar-center" : "navbar-start"}>
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        {createUrl && (
            <div className="navbar-end">
                <Link to={createUrl} className="btn btn-primary gap-2">
                    <Plus size={20} />
                    Ajouter
                </Link>
            </div>
        )}
    </header>
)
