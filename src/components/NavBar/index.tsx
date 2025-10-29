import { Euro, GaugeCircle, Landmark, ShoppingCart } from "lucide-react"
import type React from "react"
import { MenuLink } from "./MenuLink.tsx"

export const NavBar: React.FC = () => (
    <footer className="btm-nav btm-nav-md z-20">
        <MenuLink to="/" icon={<GaugeCircle />} />
        <MenuLink to="/sales" icon={<Euro />} />
        <MenuLink to="/purchases" icon={<ShoppingCart />} />
        <MenuLink to="/report-taxes" icon={<Landmark />} />
    </footer>
)
