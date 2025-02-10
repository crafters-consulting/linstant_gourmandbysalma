import React from "react";
import {Link} from "react-router-dom";
import {LayoutDashboard} from "lucide-react";

export const NavBar: React.FC = () => (
    <nav className="navbar">
        <Link to="/">
            <LayoutDashboard size={24}/>
        </Link>
        <Link to="/">Dashboard</Link>
        <Link to="/sales">Sales</Link>
        <Link to="/purchases">Purchases</Link>
    </nav>
)