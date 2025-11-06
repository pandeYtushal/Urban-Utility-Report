import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  FileText,
  ClipboardList,
  User,
  LogOut,
} from "lucide-react";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useUser();
  const profileDropdownRef = useRef(null);

  // Handle click outside to close profile dropdown on desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full bg-[rgba(19,19,19,0.9)] backdrop-blur-md shadow-lg z-80 text-white">
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

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 bg-gray-800/60 hover:bg-gray-700/70 px-3 py-2 rounded-full transition"
              >
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-teal-500"
                />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden z-50">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfile(false)}
                    className="block px-4 py-3 hover:bg-gray-100 text-sm font-medium"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      alert("Logout (Firebase soon)");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className="md:hidden fixed inset-0 z-60">
        {/* Backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm transition-opacity duration-300 z-60 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        ></div>

        {/* Drawer */}
        <div
          role="dialog"
          aria-modal="true"
          className={`absolute left-0 right-0 bottom-0 mx-auto w-full max-w-lg rounded-t-3xl bg-[rgba(24,24,27,0.95)] border border-gray-800/60 shadow-2xl transform transition-transform duration-500 ease-out z-70 ${
            isOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent backdrop close
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3">
            <div className="w-14 h-1.5 bg-gray-600 rounded-full opacity-80" />
          </div>

          <div className="px-6 pb-8 pt-4 text-gray-100">
            {/* Profile header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.photo}
                alt="Profile"
                className="w-14 h-14 rounded-full border-2 border-teal-500 object-cover shadow-sm"
              />
              <div>
                <div className="text-base font-semibold">{user?.name}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="ml-auto text-gray-400 hover:text-white p-2 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition"
              >
                <Home size={20} /> <span className="text-sm">Home</span>
              </Link>

              <Link
                to="/report"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition"
              >
                <FileText size={20} /> <span className="text-sm">Report</span>
              </Link>

              <Link
                to="/reports"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition"
              >
                <ClipboardList size={20} />{" "}
                <span className="text-sm">My Reports</span>
              </Link>

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition"
              >
                <User size={20} /> <span className="text-sm">Profile</span>
              </Link>

              <button
                onClick={() => {
                  setIsOpen(false);
                  alert("Logout (Firebase soon)");
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-white/5 hover:text-red-300 transition"
              >
                <LogOut size={20} /> <span className="text-sm">Logout</span>
              </button>
            </nav>

            {/* Quick actions row */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/report"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-teal-500 text-black py-2 rounded-lg font-medium hover:opacity-95 transition text-center"
              >
                Quick Report
              </Link>

              <Link
                to="/reports"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-lg border border-gray-700 text-sm hover:bg-white/5 transition"
              >
                My Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
