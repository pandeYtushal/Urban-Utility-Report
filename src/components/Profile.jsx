import { useNavigate } from "react-router-dom";
import { LogOut, Edit, FileText, Camera, Trash2, ArrowLeft } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [preview, setPreview] = useState(user.photo);
  const [showAvatars, setShowAvatars] = useState(false);

  const avatarOptions = [
    "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    "https://cdn-icons-png.flaticon.com/512/1999/1999625.png",
    "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
    "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setUser((prev) => ({ ...prev, photo: imageURL }));
    }
  };

  const handleRemoveImage = () => {
    const defaultPhoto = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    setPreview(defaultPhoto);
    setUser((prev) => ({ ...prev, photo: defaultPhoto }));
  };

  const handleAvatarSelect = (url) => {
    setPreview(url);
    setUser((prev) => ({ ...prev, photo: url }));
    setShowAvatars(false);
  };

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[rgba(19,19,19,0.9)] backdrop-blur-md flex justify-center items-center px-4 py-12 relative">
      
    {/* Back to Home Button */}
<button
  onClick={() => navigate("/")}
  className="fixed top-24 left-6 flex items-center gap-2 text-white bg-teal-600 hover:bg-teal-700 px-3 py-2 rounded-full shadow-lg transition-all duration-300 z-9999"
>
  <ArrowLeft size={18} />
  <span className="font-medium">Back</span>
</button>


      <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center border border-gray-200">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <img
            src={preview}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-teal-500 shadow-lg object-cover"
          />
          <label
            htmlFor="profileUpload"
            className="absolute bottom-1 right-1 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer shadow-md transition"
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
          >
            <Trash2 size={14} />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-500 mb-6">{user.email}</p>

        {/* Avatar Options */}
        <div className="mb-6">
          <button
            onClick={() => setShowAvatars(!showAvatars)}
            className="text-sm font-medium text-teal-600 hover:text-teal-700 underline transition"
          >
            {showAvatars ? "Hide Avatars" : "Choose from Avatars"}
          </button>

          {showAvatars && (
            <div className="mt-3 grid grid-cols-3 gap-3 justify-center">
              {avatarOptions.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="Avatar Option"
                  onClick={() => handleAvatarSelect(url)}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                    preview === url ? "border-teal-600" : "border-transparent"
                  } hover:scale-105 transition`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/edit-profile")}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition"
          >
            <Edit size={18} /> Edit Profile
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md transition"
          >
            <FileText size={18} /> View My Reports
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
