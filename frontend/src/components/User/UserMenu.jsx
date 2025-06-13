import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { 
    UserIcon, 
    Cog6ToothIcon, 
    ArrowRightOnRectangleIcon 
} from "@heroicons/react/24/outline";

function UserMenu({ user, logout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    //Close when click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    return (<>
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-blue-700 hover:text-blue-900 focus:outline-none"
                aria-expanded={isMenuOpen}
                aria-label="Menu do usuário"
            >
                {user?.photo ? (
                    <img 
                        src={user.photo} 
                        alt="Foto do usuário" 
                        className="h-8 w-8 rounded-full object-cover"
                    />
                ) : (
                    <UserIcon className="h-6 w-6" />
                )}
            </button>

            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <NavLink
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <UserIcon className="h-4 w-4 mr-2" />
                        Perfil
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Cog6ToothIcon className="h-4 w-4 mr-2" />
                        Configurações
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                        Sair
                    </button>
                </div>
            )}
        </div>
    </>);
}

export default UserMenu;