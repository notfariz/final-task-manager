import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Hide search + logout on login/register pages
  const hideExtras = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
      {/* Left - Brand */}
      <div
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        TaskManager
      </div>

      {/* Center - Search (only when logged in + not login/register pages) */}
      {!hideExtras && token && (
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="px-3 py-1 rounded-md text-black w-1/2 max-w-md"
          />
        </div>
      )}

      {/* Right - Logout */}
      {!hideExtras && token && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
        >
          Logout
        </button>
      )}
    </nav>
  );
}