import { NavLink } from "react-router";

function navLinkClass(isActive) {
  return isActive
    ? "text-blue-700 font-bold"
    : "text-gray-950 hover:text-blue-700";
}

function NavBar() {
    return (
        <nav className="flex gap-15 items-center">
            <div className="h-full flex items-center group relative p-2">
                <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>Início</NavLink>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 group-hover:w-full"></span>
            </div>
            
            <div className="h-full flex items-center group relative p-2">
                <NavLink to="/About" end className={({ isActive }) => navLinkClass(isActive)}>Sobre</NavLink>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 group-hover:w-full"></span>
            </div>
            
            <div className="h-full flex items-center group relative p-2">
                <NavLink to="/Donations" className={({ isActive }) => navLinkClass(isActive)}>Doações!</NavLink>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 group-hover:w-full"></span>
            </div>
            
            <div className="h-full flex items-center group relative p-2">
                <NavLink to="/Donate" className={({ isActive }) => navLinkClass(isActive)}>Doe!</NavLink>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 group-hover:w-full"></span>
            </div>
            
            <div className="h-full flex items-center group relative p-2">
                <NavLink to="/Login" className={({ isActive }) => navLinkClass(isActive)}>Login</NavLink>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 group-hover:w-full"></span>
            </div>
        </nav>
    );
}

export default NavBar