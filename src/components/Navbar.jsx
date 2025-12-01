import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useUser } from "../context/UserContext";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Assuming global dark mode, but for navbar, keep dark
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement global dark mode toggle if needed
  };

  return (
    <nav className={`fixed top-0 w-full ${darkMode ? 'bg-gray-900' : 'bg-[rgb(19,19,19)]'} shadow-lg z-50 text-white transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white hover:text-teal-400 transition"
        >
          Urban<span className="text-teal-400">Reporter</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Motion.div
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-medium relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-teal-400 after:w-0 hover:after:w-full after:transition-all duration-300 ${
                    isActive
                      ? "text-teal-400 after:w-full"
                      : "text-gray-300 hover:text-teal-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </Motion.div>
          ))}

          {user ? (
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={user.photo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-teal-500 object-cover hover:scale-110 transition-transform"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 text-sm font-semibold transition-colors"
              >
                Logout
              </button>
            </Motion.div>
          ) : (
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link to="/login" className="text-gray-300 hover:text-teal-400 font-medium transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-teal-400 font-medium transition-colors">
                Signup
              </Link>
            </Motion.div>
          )}

          {/* Dark Mode Toggle for Desktop */}
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full shadow-lg transition-all ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <Motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </Motion.button>
      </div>

      {/* Mobile Menu - Full Screen Overlay with Centered Content */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 flex items-center justify-center md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <Motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`relative ${darkMode ? 'bg-gray-800' : 'bg-[rgb(19,19,19)]'} rounded-3xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </Motion.button>

              {/* User Info */}
              {user ? (
                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-teal-400 object-cover mx-auto mb-4 shadow-lg"
                  />
                  <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </Motion.div>
              ) : (
                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <User size={48} className="mx-auto text-teal-400 mb-4" />
                  <p className="text-gray-400 text-lg mb-4">Welcome Guest</p>
                  <div className="flex gap-6 justify-center">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                    >
                      Signup
                    </Link>
                  </div>
                </Motion.div>
              )}

              {/* Navigation Links */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col space-y-6 font-medium text-lg"
              >
                {navLinks.map((link, index) => (
                  <Motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-gray-300 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </Motion.div>
                ))}
                {user && (
                  <>
                    <Motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-gray-300 hover:text-teal-400 transition-colors"
                      >
                        Profile
                      </Link>
                    </Motion.div>
                    <Motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 text-red-400 hover:text-red-500 py-2 transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </Motion.button>
                  </>
                )}
              </Motion.div>

              {/* Dark Mode Toggle in Mobile Menu */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={toggleDarkMode}
                  className={`p-3 rounded-full shadow-lg transition-all ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'}`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </Motion.div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
