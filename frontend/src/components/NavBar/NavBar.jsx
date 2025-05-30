import { NavLink } from "react-router";

function navLinkClass(isActive) {
  return isActive
    ? "text-blue-700 font-bold"
    : "text-gray-950 hover:text-blue-700";
}

function NavBar() {
    return (
        <nav className="flex gap-20 items-center">
            <div className="has-checked:bg-indigo-50 active:border-blue-700 h-full flex items-center hover:border-b-2 hover:border-blue-700">
                <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>Início</NavLink>
            </div>
            
            <div className="h-full flex items-center hover:border-b-2 hover:border-blue-700">
                <NavLink to="/About" end className={({ isActive }) => navLinkClass(isActive)}>Sobre</NavLink>
            </div>
            
            <div className="h-full flex items-center hover:border-b-2 hover:border-blue-700">
                <NavLink to="/Donations" className={({ isActive }) => navLinkClass(isActive)}>Doações!</NavLink>
            </div>
            
            <div className="h-full flex items-center hover:border-b-2 hover:border-blue-700">
                <NavLink to="/Donate" className={({ isActive }) => navLinkClass(isActive)}>Doe!</NavLink>
            </div>
            
            <div className="h-full flex items-center hover:border-b-2 hover:border-blue-700">
                <NavLink to="/Login" className={({ isActive }) => navLinkClass(isActive)}>Login</NavLink>
            </div>
            
        </nav>
    );
}

export default NavBar