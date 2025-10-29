import type React from "react"
import { type LinkProps, NavLink } from "react-router"

type MenuLinkProps = LinkProps & {
    icon: React.ReactNode
    label?: string
}

export const MenuLink: React.FC<MenuLinkProps> = ({ icon, label, ...props }) => (
    <NavLink {...props} className={({ isActive }) => isActive ? "dock-active" : ""}>
        {icon}
        {label && <span className="dock-label">{label}</span>}
    </NavLink>
)
