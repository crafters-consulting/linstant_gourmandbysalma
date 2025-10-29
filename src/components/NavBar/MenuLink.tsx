import type React from "react"
import { type LinkProps, NavLink } from "react-router"

type MenuLinkProps = LinkProps & {
    icon: React.ReactNode
}

export const MenuLink: React.FC<MenuLinkProps> = ({ icon, ...props }) => (
    <NavLink {...props} className="nav-link">
        {icon}
    </NavLink>
)
