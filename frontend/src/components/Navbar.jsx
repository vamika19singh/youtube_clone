import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import { useState, useEffect } from "react";
import { toggleTheme } from "../utils/theme";
import { Moon, Sun } from "lucide-react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleThemeToggle = () => {
    const root = document.documentElement;

    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-white shadow px-6 py-3 flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-red-600"
      >
        <span className="bg-red-600 text-white px-2 py-1 rounded">▶</span>
        <span>YouTube Clone</span>
      </Link>

      <form onSubmit={handleSearch} className="flex w-1/2">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-1 rounded-l
                     dark:bg-gray-800 dark:border-gray-700"
        />
        <button className="bg-red-600 text-white px-4 rounded-r">Search</button>
      </form>

      <div className="flex items-center gap-4">
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {authenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
