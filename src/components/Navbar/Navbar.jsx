import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ClinicLogo from "../Logo/Logo";
import { FiMenu, FiX } from "react-icons/fi";
import AuthContext from "../../context/AuthContext";
import UserMenu from "./UserMenu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useContext(AuthContext);

    const navLinks = [
        { name: 'HOME', to: '/' },
        { name: 'ALL DOCTORS', to: '/doctors' },
        { name: 'ABOUT', to: '/about' },
        { name: 'CONTACT', to: '/contact' },
    ];

    return (
        <nav className="py-2 bg-white border-b border-gray-300">
            <div>
                <div className="flex justify-between items-center h-18">

                    <div className="shrink-0">
                        <ClinicLogo />
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                to={link.to}
                                key={link.name}
                                end
                                className={({ isActive }) =>
                                    `text-sm font-medium transition duration-150 ease-in-out ${isActive
                                        ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                        : "text-gray-500 hover:text-indigo-600"
                                    }`
                                }>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    {user ? <UserMenu /> :
                        <div className="hidden md:flex items-center">
                            <Link to="/signup" className="text-sm! cursor-pointer px-6 py-2 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 hover:scale-105 transition duration-300! ease-in-out shadow-lg">
                                Create account
                            </Link>
                        </div>
                    }
                    <button
                        className="md:hidden text-gray-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>

                {/* Mobile  */}
                {isOpen && (
                    <div className="md:hidden mt-4 space-y-3 pb-4">
                        {navLinks.map((link) => (
                            <NavLink
                                to={link.to}
                                key={link.name}
                                className={({ isActive }) =>
                                    `text-sm block w-max font-medium transition duration-150 ease-in-out ${isActive
                                        ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                        : "text-gray-500 hover:text-indigo-600"
                                    }`
                                }>
                                {link.name}
                            </NavLink>
                        ))}

                        <button className="text-sm! w-full mt-2 cursor-pointer px-6 py-2 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition duration-150 ease-in-out shadow-lg">
                            Create account
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;