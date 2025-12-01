import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ArrowLeft, Save, Camera, Trash2, Loader2, Sun, Moon, User, Mail, FileText } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function EditProfile() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    photo: user.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const [preview, setPreview] = useState(formData.photo);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Expanded Avatar options including male and female
  const avatars = [
    { url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", gender: "Male" },
    { url: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png", gender: "Male" },
    { url: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png", gender: "Female" },
    { url: "https://cdn-icons-png.flaticon.com/512/3135/3135826.png", gender: "Female" },
    { url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", gender: "Male" },
    { url: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png", gender: "Female" },
    { url: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png", gender: "Male" },
    { url: "https://cdn-icons-png.flaticon.com/512/3135/3135826.png", gender: "Female" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setFormData((prev) => ({ ...prev, photo: imageURL }));
    }
  };

  const handleRemoveImage = () => {
    const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    setPreview(defaultPhoto);
    setFormData((prev) => ({ ...prev, photo: defaultPhoto }));
  };

  const handleAvatarSelect = (avatarUrl) => {
    setPreview(avatarUrl);
    setFormData((prev) => ({ ...prev, photo: avatarUrl }));
    setShowAvatarModal(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    // Simulate save delay (replace with actual API call)
    setTimeout(() => {
      setUser(formData);
      setSaving(false);
      navigate("/profile");
    }, 1000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 py-10 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-purple-50 to-pink-100'} relative overflow-hidden transition-all duration-500`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-10 left-10 w-32 h-32 ${darkMode ? 'bg-gray-700' : 'bg-purple-200'} rounded-full blur-xl`}></div>
        <div className={`absolute bottom-10 right-10 w-40 h-40 ${darkMode ? 'bg-gray-600' : 'bg-pink-200'} rounded-full blur-xl`}></div>
      </div>

      {/* Dark Mode Toggle */}
      <Motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-3 rounded-full shadow-lg transition-all ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </Motion.button>

      {/* Card */}
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative ${darkMode ? 'bg-gray-800/95 text-white' : 'bg-white/95 text-gray-800'} backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-3xl shadow-2xl p-8 w-full max-w-lg z-10`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className={`flex items-center gap-2 ${darkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <ArrowLeft size={20} /> Back
          </Motion.button>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} bg-gradient-to-r ${darkMode ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
            Edit Profile
          </h1>
        </div>

        {/* Profile Picture Section */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-32 h-32 mx-auto mb-8"
        >
          <img
            src={preview}
            alt="Profile"
            className={`w-32 h-32 rounded-full border-4 ${darkMode ? 'border-purple-400' : 'border-purple-500'} shadow-xl object-cover transition-transform hover:scale-105`}
          />
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAvatarModal(true)}
            className={`absolute bottom-2 right-2 ${darkMode ? 'bg-purple-500 hover:bg-purple-600' : 'bg-purple-600 hover:bg-purple-700'} text-white p-3 rounded-full cursor-pointer shadow-lg transition-all`}
            title="Choose avatar"
          >
            <User size={18} />
          </Motion.button>
          <Motion.label
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            htmlFor="profileUpload"
            className={`absolute bottom-2 left-2 ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white p-3 rounded-full cursor-pointer shadow-lg transition-all`}
            title="Upload photo"
          >
            <Camera size={18} />
          </Motion.label>
          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all"
            title="Remove photo"
          >
            <Trash2 size={16} />
          </Motion.button>
        </Motion.div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Name */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold mb-2 flex items-center gap-2`}>
              <User size={18} /> Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'} rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
              placeholder="Enter your name"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </Motion.div>

          {/* Email */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold mb-2 flex items-center gap-2`}>
              <Mail size={18} /> Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'} rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </Motion.div>

          {/* Bio */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-semibold mb-2 flex items-center gap-2`}>
              <FileText size={18} /> Bio
            </label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className={`w-full border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'} rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none`}
              placeholder="Tell something about yourself..."
            />
          </Motion.div>

          {/* Save Button */}
          <Motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            type="submit"
            disabled={saving}
            className={`w-full flex items-center justify-center gap-2 ${saving ? (darkMode ? "bg-purple-400" : "bg-purple-300") : `bg-gradient-to-r ${darkMode ? 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`} text-white py-4 rounded-xl transition-all font-semibold shadow-lg disabled:cursor-not-allowed`}
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Changes"}
          </Motion.button>
        </form>
      </Motion.div>

      {/* Avatar Selection Modal */}
      <AnimatePresence>
        {showAvatarModal && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAvatarModal(false)}
          >
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`relative ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-3xl shadow-2xl p-6 w-full max-w-md mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Choose an Avatar</h3>
              <div className="grid grid-cols-4 gap-4">
                {avatars.map((avatar, index) => (
                  <Motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAvatarSelect(avatar.url)}
                    className={`w-16 h-16 rounded-full border-2 ${preview === avatar.url ? 'border-purple-500 shadow-lg' : (darkMode ? 'border-gray-600' : 'border-gray-300')} overflow-hidden transition-all`}
                    title={avatar.gender}
                  >
                    <img src={avatar.url} alt={`${avatar.gender} Avatar ${index + 1}`} className="w-full h-full object-cover" />
                  </Motion.button>
                ))}
              </div>
              <button
                onClick={() => setShowAvatarModal(false)}
                className={`mt-4 w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} py-2 rounded-xl transition-colors`}
              >
                Close
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
