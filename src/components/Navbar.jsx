import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <nav className="fixed top-0 w-full bg-[rgba(19,19,19,0.9)] backdrop-blur-md shadow-lg z-50 text-white">
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
          {[
            { path: "/", label: "Home" },
            { path: "/report", label: "Report" },
            { path: "/reports", label: "My Reports" },
          ].map((link) => (
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

          {/* Right side: user or auth links */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-teal-500 object-cover"
                />
              </Link>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-500 text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-teal-400 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 hover:text-teal-400 font-medium"
              >
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[rgba(19,19,19,0.95)] border-t border-gray-700">
          <div className="flex flex-col items-center space-y-3 py-5 text-gray-200">
            <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-teal-400">
              Home
            </Link>
            <Link to="/report" onClick={() => setIsOpen(false)} className="hover:text-teal-400">
              Report
            </Link>
            <Link to="/reports" onClick={() => setIsOpen(false)} className="hover:text-teal-400">
              My Reports
            </Link>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-teal-400">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-red-400 hover:text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-teal-400">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="hover:text-teal-400">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
