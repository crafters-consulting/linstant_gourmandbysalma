import React from "react"
import { LinkProps, NavLink } from "react-router"

type MenuLinkProps = LinkProps & {
    icon: React.ReactNode
}

export const MenuLink: React.FC<MenuLinkProps> = ({ icon, ...props }) => (
    <NavLink {...props} className="nav-link text-white px-8 py-4">
        {icon}
    </NavLink>
)
