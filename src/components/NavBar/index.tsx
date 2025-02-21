import React from 'react'
import { LinkProps, NavLink } from 'react-router'
import { Euro, GaugeCircle, Landmark, ShoppingCart } from 'lucide-react'

const MenuLink: React.FC<LinkProps> = (props) => (
    <NavLink
        {...props}
        className="nav-link text-white px-8 py-4"
    />
)

export const NavBar: React.FC = () => (
    <footer className="fixed bottom-0 w-screen z-20 bg-purple-800">
        <nav className="flex justify-evenly">
            <MenuLink to="/">
                <GaugeCircle />
            </MenuLink>
            <MenuLink to="/sales">
                <Euro />
            </MenuLink>
            <MenuLink to="/purchases">
                <ShoppingCart />
            </MenuLink>
            <MenuLink to="/report-taxes">
                <Landmark />
            </MenuLink>
        </nav>
    </footer>
)
