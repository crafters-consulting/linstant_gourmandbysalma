import type React from "react"
import { useMatch, useNavigate } from "react-router"

type MenuLinkProps = {
    to: string
    icon: React.ReactNode
    label?: string
}

export const MenuLink: React.FC<MenuLinkProps> = ({ to, icon, label }) => {
    const navigate = useNavigate()
    const isActive = useMatch({ path: to, end: to === "/" })

    const handleClick = () => {
        navigate(to)
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={isActive ? "dock-active" : ""}
        >
            {icon}
            {label && <span className="dock-label">{label}</span>}
        </button>
    )
}
