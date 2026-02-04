import { Link } from "react-router-dom";
import {
  Home,
  Flame,
  Tv,
  Library,
  Menu,
  History,
  ThumbsUp,
  ListVideo,
} from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-60"
      } bg-white dark:bg-gray-900 border-r
      min-h-screen transition-all duration-300`}
    >
      {/* Toggle button */}
      <div className="flex items-center px-4 py-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-200 text-amber-50"
        >
          <Menu size={20} />
        </button>

        {!collapsed && (
          <span className="ml-3 font-semibold text-amber-50">Menu</span>
        )}
      </div>

      <nav className="mt-2 space-y-1 text-amber-50">
        <SidebarItem to="/" icon={<Home />} label="Home" collapsed={collapsed} />
        <SidebarItem icon={<Flame />} label="Trending" collapsed={collapsed} />
        <SidebarItem icon={<Tv />} label="Subscriptions" collapsed={collapsed} />
        <SidebarItem icon={<Library />} label="Library" collapsed={collapsed} />
        <SidebarItem icon={<History />} label="History" collapsed={collapsed} />
        <SidebarItem icon={<ThumbsUp />} label="Liked Videos" collapsed={collapsed} />
        <SidebarItem icon={<ListVideo />} label="PlayList" collapsed={collapsed} />
      </nav>
    </aside>
  );
}

function SidebarItem({ to, icon, label, collapsed, disabled }) {
  const base =
    "flex items-center gap-4 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded";

  if (disabled) {
    return (
      <div className={`${base} text-gray-400 cursor-not-allowed`}>
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>
    );
  }

  return (
    <Link to={to} className={base}>
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export default Sidebar;
