import { useNavigate } from "react-router-dom";
import { LogOut, Edit, FileText, ArrowLeft, Sun, Moon } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { motion as Motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 py-10 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-teal-50 to-blue-100'} relative overflow-hidden transition-all duration-500`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-10 left-10 w-32 h-32 ${darkMode ? 'bg-gray-700' : 'bg-teal-200'} rounded-full blur-xl`}></div>
        <div className={`absolute bottom-10 right-10 w-40 h-40 ${darkMode ? 'bg-gray-600' : 'bg-blue-200'} rounded-full blur-xl`}></div>
      </div>

      {/* Container for Card and Buttons */}
      <div className="relative w-full max-w-md">
        {/* Buttons near the card */}
        <div className="flex justify-between items-center mb-4">
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 ${darkMode ? 'text-white bg-teal-600 hover:bg-teal-700' : 'text-white bg-teal-600 hover:bg-teal-700'} px-4 py-2 rounded-full shadow-lg transition-all duration-300`}
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Back</span>
          </Motion.button>

          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className={`p-3 rounded-full shadow-lg transition-all ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Motion.button>
        </div>

        {/* Card */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative ${darkMode ? 'bg-gray-800/95 text-white' : 'bg-white/95 text-gray-800'} backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-3xl shadow-2xl p-8 text-center z-10`}
        >
          {/* Profile Picture Section */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-32 h-32 mx-auto mb-8"
          >
            <img
              src={user.photo}
              alt="Profile"
              className={`w-32 h-32 rounded-full border-4 ${darkMode ? 'border-teal-400' : 'border-teal-500'} shadow-xl object-cover`}
            />
          </Motion.div>

          {/* User Info */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{user.name}</h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-8`}>{user.email}</p>
            {user.bio && <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>{user.bio}</p>}
          </Motion.div>

          {/* Action Buttons */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4 mt-8"
          >
            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/edit-profile")}
              className={`flex items-center justify-center gap-2 ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-600 hover:bg-teal-700'} text-white py-3 rounded-xl transition-all font-semibold shadow-lg`}
            >
              <Edit size={18} /> Edit Profile
            </Motion.button>

            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/reports")}
              className={`flex items-center justify-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} py-3 rounded-xl transition-all font-semibold shadow-lg`}
            >
              <FileText size={18} /> View My Reports
            </Motion.button>

            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-all font-semibold shadow-lg"
            >
              <LogOut size={18} /> Logout
            </Motion.button>
          </Motion.div>
        </Motion.div>
      </div>
    </div>
  );
}
