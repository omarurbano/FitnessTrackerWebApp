import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ user, logout}) {
    const navigate = useNavigate();
    const isLoggedIn = !!user;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClasses = "inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3";

    return (
        <div>
            <nav className="flex justify-between items-center mb-6">
                <NavLink to="/">
                    <img alt="CoreTrack Logo" className="h-10 inline" src="/src/assets/CoreTrackLogo.png"></img>
                </NavLink>

                <div className="flex items-center gap-2">
                    <NavLink className={navLinkClasses} to="/nutrition">
                        Nutrition Lookup
                    </NavLink>
                    <NavLink className={navLinkClasses} to="/exercise">
                        Exercise Lookup
                    </NavLink>

                    {isLoggedIn ? (
                        <>
                            <NavLink className={navLinkClasses} to={user?.role === 'admin' ? '/admindash' : '/dashboard'}>
                                Dashboard
                            </NavLink>
                            <span className="px-3">Welcome, {user?.name}!</span>
                            <button className={navLinkClasses} onClick={handleLogout}>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className={navLinkClasses} to="/signin">
                                Sign In
                            </NavLink>
                            <NavLink className={navLinkClasses} to="/signup">
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
