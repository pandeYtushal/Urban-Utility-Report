import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { ArrowLeft, Save, Camera, Trash2 } from "lucide-react";

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

  // 🖼️ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setFormData((prev) => ({ ...prev, photo: imageURL }));
    }
  };

  // 🗑️ Remove photo
  const handleRemoveImage = () => {
    const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    setPreview(defaultPhoto);
    setFormData((prev) => ({ ...prev, photo: defaultPhoto }));
  };

  // 💾 Save changes
  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData); // 🔄 updates global user (Navbar + Profile)
    alert("Profile updated successfully!");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[rgba(19,19,19,0.9)] backdrop-blur-md flex justify-center items-center px-4 py-12">
      <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-lg p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition">
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
        </div>

        {/* Profile Picture Section */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <img
            src={preview}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-teal-500 shadow-lg object-cover"
          />
          <label
            htmlFor="profileUpload"
            className="absolute bottom-1 right-1 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer shadow-md transition"
            title="Change photo"
          >
            <Camera size={16} />
          </label>
          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition"
            title="Remove photo"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 focus:border-teal-500 rounded-md p-2 focus:ring focus:ring-teal-100 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 focus:border-teal-500 rounded-md p-2 focus:ring focus:ring-teal-100 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bio</label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full border border-gray-300 focus:border-teal-500 rounded-md p-2 focus:ring focus:ring-teal-100 outline-none"
              placeholder="Tell something about yourself..."
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition font-semibold shadow-md"
          >
            <Save size={18} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
