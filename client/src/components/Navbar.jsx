import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ user, logout }) {
    const navigate = useNavigate();
    const isLoggedIn = !!user;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClasses = ({ isActive }) =>
        `relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-lg group ${isActive
            ? 'text-blue-600 bg-blue-50 shadow-sm'
            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
        }`;

    const buttonClasses = "px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
    const primaryButtonClasses = `${buttonClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md transform hover:-translate-y-0.5`;
    const secondaryButtonClasses = `${buttonClasses} border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 shadow-sm`;
    const logoutButtonClasses = `${buttonClasses} bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md transform hover:-translate-y-0.5`;

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <NavLink
                        to="/"
                        className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
                    >
                        <div className="relative">
                            <img
                                alt="CoreTrack Logo"
                                className="h-10 w-auto transition-all duration-300 group-hover:brightness-110"
                                src="/src/assets/CoreTrackLogo.png"
                            />
                            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                        </div>
                        <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            CoreTrack
                        </span>
                    </NavLink>

                    <div className="flex items-center space-x-1">
                        <div className="hidden sm:flex items-center space-x-1">
                            <NavLink className={navLinkClasses} to="/nutrition">
                                <span className="relative">
                                    Nutrition Lookup
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </span>
                            </NavLink>
                            <NavLink className={navLinkClasses} to="/exercise">
                                <span className="relative">
                                    Exercise Lookup
                                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </span>
                            </NavLink>
                        </div>

                        {/* auth section */}
                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                            {isLoggedIn ? (
                                <>
                                    <NavLink
                                        className={navLinkClasses}
                                        to={user?.role === 'admin' ? '/admindash' : '/dashboard'}
                                    >
                                        <span className="relative">
                                            Dashboard
                                            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                        </span>
                                    </NavLink>

                                    <div className="hidden sm:flex items-center space-x-3">
                                        <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-gray-700 font-medium">
                                                Welcome, <span className="text-blue-600">{user?.name}</span>!
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className={logoutButtonClasses}
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <NavLink className={secondaryButtonClasses} to="/signin">
                                        Sign In
                                    </NavLink>
                                    <NavLink className={primaryButtonClasses} to="/signup">
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}