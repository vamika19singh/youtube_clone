import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated, logout } from "../utils/auth";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex items-center gap-6">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-red-600 whitespace-nowrap">
        Youtube Clone
      </Link>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-1 max-w-xl mx-auto"
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-l outline-none"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 rounded-r"
        >
          Search
        </button>
      </form>

      {/* Auth actions */}
      <div className="space-x-4 whitespace-nowrap">
        {!authenticated ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-red-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-red-600">
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
