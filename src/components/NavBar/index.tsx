import { Euro, GaugeCircle, Landmark, ShoppingCart } from "lucide-react"
import type React from "react"
import { MenuLink } from "./MenuLink.tsx"

export const NavBar: React.FC = () => (
    <footer className="dock dock-md z-20">
        <MenuLink to="/" icon={<GaugeCircle />} label="Dashboard" />
        <MenuLink to="/sales" icon={<Euro />} label="Ventes" />
        <MenuLink to="/purchases" icon={<ShoppingCart />} label="Achats" />
        <MenuLink to="/report-taxes" icon={<Landmark />} label="Taxes" />
    </footer>
)
