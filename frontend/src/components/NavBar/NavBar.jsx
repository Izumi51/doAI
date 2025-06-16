import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../auth/AuthContext.jsx"
import UserMenu from "../User/UserMenu";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function navLinkClass(isActive) {
  return isActive
    ? "text-blue-700 font-bold"
    : "text-gray-950 hover:text-blue-700";
}

function navLinkClassLogin() {
  return "px-4 py-2 text-white font-normal rounded-xl hover:text-blue-700 bg-blue-700 border hover:bg-white hover:border border-blue-700 transition-all duration-300 text-sm lg:text-base";
}

function mobileNavLinkClass(isActive) {
  return isActive
    ? "block px-3 py-2 text-blue-700 font-bold border-l-4 border-blue-700 bg-blue-50"
    : "block px-3 py-2 text-gray-950 hover:text-blue-700 hover:bg-blue-50";
}

function NavBar() {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-8 items-center">
                <div className="h-full flex items-center group relative p-2">
                    <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>Início</NavLink>
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
                
                <div className="h-fit flex items-center group relative p-2">
                    {isAuthenticated ? (
                        <UserMenu user={user} logout={logout} />
                    ) : (
                        <NavLink to="/Login" className={() => navLinkClassLogin()}>
                            Entrar
                        </NavLink>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
                {/* Mobile menu button */}
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Menu principal"
                >
                    {isMobileMenuOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>

                {/* Mobile menu dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute right-4 top-16 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <NavLink 
                            to="/" 
                            end 
                            className={({ isActive }) => mobileNavLinkClass(isActive)}
                            onClick={closeMobileMenu}
                        >
                            Início
                        </NavLink>
                        <NavLink 
                            to="/Donations" 
                            className={({ isActive }) => mobileNavLinkClass(isActive)}
                            onClick={closeMobileMenu}
                        >
                            Doações!
                        </NavLink>
                        <NavLink 
                            to="/Donate" 
                            className={({ isActive }) => mobileNavLinkClass(isActive)}
                            onClick={closeMobileMenu}
                        >
                            Doe!
                        </NavLink>
                        
                        <div className="border-t border-gray-100 mt-2 pt-2">
                            {isAuthenticated ? (
                                <div className="px-3 py-2">
                                    <UserMenu user={user} logout={logout} />
                                </div>
                            ) : (
                                <NavLink 
                                    to="/Login" 
                                    className="block mx-3 my-2 px-4 py-2 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Entrar
                                </NavLink>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default NavBar;