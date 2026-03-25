import { Link, NavLink } from "react-router-dom";
import { LogIn, LogOut, Menu, X, User, PlusCircle, Settings, ClipboardList } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Available Foods", path: "/available-foods" },
    ];

    const privateLinks = [
        { name: "Add Food", path: "/add-food", icon: <PlusCircle size={18} /> },
        { name: "Manage My Foods", path: "/manage-my-foods", icon: <Settings size={18} /> },
        { name: "My Food Requests", path: "/my-food-requests", icon: <ClipboardList size={18} /> },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo & Name */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-orange-500 p-2 rounded-lg">
                                <span className="text-white font-bold text-2xl">B</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                                BiteBridge
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hover:text-orange-500 ${
                                        isActive ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-600"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center focus:outline-none"
                                >
                                    <img
                                        src={user.photoURL || "https://via.placeholder.com/40"}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full border-2 border-orange-500 object-cover cursor-pointer"
                                        title={user.displayName}
                                    />
                                </button>
                                
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 transform origin-top-right">
                                        <div className="px-4 py-2 border-b border-gray-50 flex flex-col">
                                            <span className="text-sm font-bold text-gray-800">{user.displayName}</span>
                                            <span className="text-xs text-gray-500 truncate">{user.email}</span>
                                        </div>
                                        {privateLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.path}
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
                                            >
                                                <span className="mr-3 text-orange-500">{link.icon}</span>
                                                {link.name}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={() => {
                                                logOut();
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50"
                                        >
                                            <LogOut size={18} className="mr-3" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-700 transition-all flex items-center shadow-lg shadow-orange-100"
                            >
                                <LogIn size={18} className="mr-2" />
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-orange-500 transition-colors p-2"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-slideDown">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-3 rounded-lg text-base font-medium ${
                                        isActive ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        
                        {user ? (
                            <div className="border-t border-gray-100 pt-4 mt-4">
                                <div className="px-4 flex items-center mb-4">
                                    <img
                                        src={user.photoURL || "https://via.placeholder.com/40"}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full border-2 border-orange-500 mr-3"
                                    />
                                    <div>
                                        <div className="text-base font-bold text-gray-800">{user.displayName}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                {privateLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="mr-3 text-orange-500">{link.icon}</span>
                                        {link.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        logOut();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full flex items-center px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={18} className="mr-3" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="pt-4">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-center bg-orange-600 text-white px-4 py-3 rounded-lg text-base font-bold hover:bg-orange-700 shadow-lg shadow-orange-100"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
