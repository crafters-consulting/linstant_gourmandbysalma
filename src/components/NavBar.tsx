import React, {useEffect, useState} from "react";
import {Link, LinkProps, useLocation} from "react-router-dom";
import {Menu} from "lucide-react";

const MenuLink: React.FC<LinkProps> = (props) => (
    <Link {...props} className="text-purple-800 font-medium block py-4"/>
)

export const NavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => setMenuOpen(false), [location])

    return (
        <header>
            <div className="fixed w-screen flex items-center justify-between bg-purple-800 text-white p-4 z-20">
                <h1 className="text-2xl">L'instant Groumand by Salma</h1>
                <button onClick={() => setMenuOpen(!menuOpen)}><Menu/></button>
            </div>

            <nav className={`font-medium fixed bg-white top-0 left-0 w-screen p-4 pt-18 shadow-md transition duration-300 delay-100

 ${
                menuOpen ? '' : '-translate-y-full'
            }`}>
                <MenuLink to="/">Tableau de Board</MenuLink>
                <MenuLink to="/sales">Ventes</MenuLink>
                <MenuLink to="/purchases">Achats</MenuLink>
            </nav>
        </header>
    )
}