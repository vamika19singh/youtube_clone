import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

function Navbar() {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    return (
        <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-red-600">
            Youtube Clone 
            </Link>

            <div className="space-x-4">
                {!authenticated ? (
                    <>
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-red-600"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-gray-700 hover:text-red-600"
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-red-600"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;