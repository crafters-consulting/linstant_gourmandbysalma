import React from "react"
import { Euro, GaugeCircle, Landmark, ShoppingCart } from "lucide-react"
import { MenuLink } from "./MenuLink.tsx"

export const NavBar: React.FC = () => (
    <footer className="fixed bottom-0 w-screen z-20 bg-purple-800">
        <nav className="flex justify-evenly">
            <MenuLink
                to="/"
                icon={<GaugeCircle />}
            />
            <MenuLink
                to="/sales"
                icon={<Euro />}
            />
            <MenuLink
                to="/purchases"
                icon={<ShoppingCart />}
            />
            <MenuLink
                to="/report-taxes"
                icon={<Landmark />}
            />
        </nav>
    </footer>
)
