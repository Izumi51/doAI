import { NavLink } from "react-router";

function NavBar() {
    return (
        <nav className="flex gap-20 items-center">
            <NavLink to="/" end>Início</NavLink>
            <NavLink to="/About" end>Sobre</NavLink>
            <NavLink to="/Donations">Doações!</NavLink>
            <NavLink to="Donate">Doe!</NavLink>
            <NavLink to="Login">Login</NavLink>
        </nav>
    )
}

export default NavBar