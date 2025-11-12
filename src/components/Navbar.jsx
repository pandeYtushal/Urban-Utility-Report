import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/report", label: "Report" },
    { path: "/reports", label: "My Reports" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[rgb(19,19,19)] shadow-lg z-50 text-white transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition"
        >
          Urban<span className="text-teal-400">Reporter</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-teal-400 after:w-0 hover:after:w-full after:transition-all ${
                  isActive
                    ? "text-teal-400 after:w-full"
                    : "text-gray-300 hover:text-teal-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-teal-500 object-cover"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-teal-400 font-medium">
                Login
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-teal-400 font-medium">
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Solid dark background matching navbar base color */}
      <div
        className={`fixed top-0 left-0 h-60 w-64 bg-[rgb(19,19,19)] transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-40 flex flex-col text-white`}
      >
        {/* Close button (top-right inside menu) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition"
        >
          <X size={28} />
        </button>

        {/* User Info */}
        {user ? (
          <div className="flex flex-col items-center mt-20 mb-6 px-6">
            <img
              src={user.photo}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-teal-400 object-cover mb-3"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        ) : (
          <div className="text-center mt-20 mb-4 px-6">
            <User size={40} className="mx-auto text-teal-400 mb-2" />
            <p className="text-gray-400 text-sm mb-3">Welcome Guest</p>
            <div className="flex gap-5 justify-center">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-teal-400 hover:text-teal-300 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="text-teal-400 hover:text-teal-300 font-medium"
              >
                Signup
              </Link>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex flex-col items-center space-y-5 font-medium text-lg px-6">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-teal-400 transition"
          >
            Home
          </Link>
          <Link
            to="/report"
            onClick={() => setIsOpen(false)}
            className="hover:text-teal-400 transition"
          >
            Report
          </Link>
          <Link
            to="/reports"
            onClick={() => setIsOpen(false)}
            className="hover:text-teal-400 transition"
          >
            My Reports
          </Link>
          {user && (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="hover:text-teal-400 transition"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-red-400 hover:text-red-500 flex items-center gap-2 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
