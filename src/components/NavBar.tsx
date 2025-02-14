import React from "react";
import {LinkProps, NavLink} from "react-router-dom";
import {Euro, GaugeCircle, ShoppingCart} from "lucide-react";

const MenuLink: React.FC<LinkProps> = (props) => (
    <NavLink {...props} className="nav-link text-white px-8 pt-4 pb-8"/>
)

export const NavBar: React.FC = () => (
    <nav className="fixed bottom-0 w-screen z-20 flex justify-evenly bg-purple-800">
        <MenuLink to="/"><GaugeCircle/></MenuLink>
        <MenuLink to="/sales"><Euro/></MenuLink>
        <MenuLink to="/purchases"><ShoppingCart/></MenuLink>
    </nav>
)
