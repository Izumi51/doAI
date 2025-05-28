import { NavLink } from "react-router";

function NavBar() {
    return (
        <nav><section>
        <h1>Login</h1>
    </section>
            <NavLink to="/" end>Início</NavLink>
            <NavLink to="/About" end>Sobre</NavLink>
            <NavLink to="/Donations">Doações!</NavLink>
            <NavLink to="Donate">Doe!</NavLink>
            <NavLink to="Login">Login</NavLink>
        </nav>
    )
}

export default NavBar