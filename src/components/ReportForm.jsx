import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, MapPin, CheckCircle2 } from "lucide-react";
import { db } from "../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

export default function ReportForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const issueType = params.get("issue") || "General";

  const [userLocation, setUserLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null,
  });

  // 🗺️ Get User Location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setUserLocation(data.display_name || `${latitude}, ${longitude}`);
        } catch {
          setUserLocation(`${latitude}, ${longitude}`);
        }

        setLoading(false);
      },
      () => {
        alert("Unable to fetch location. Please allow location access.");
        setLoading(false);
      }
    );
  };

  // 🧾 Submit to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "reports"), {
        name: formData.name,
        issueType,
        location: userLocation,
        description: formData.description,
        coords,
        photo: formData.photo ? URL.createObjectURL(formData.photo) : null,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      // ✅ Show success animation
      setSubmitted(true);

      // Redirect after animation
      setTimeout(() => {
        navigate("/reports");
      }, 2000);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("❌ Failed to submit report. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/hero.png')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(19,19,19,0.9)] backdrop-blur-md"></div>

      {/* Main form */}
      <div className="relative bg-white/95 border border-gray-200 rounded-2xl shadow-2xl p-8 w-full max-w-lg text-gray-800 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Report {issueType} Issue
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="w-full border border-gray-300 focus:border-teal-500 rounded-md p-2 focus:ring focus:ring-teal-100 outline-none"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                placeholder="Enter location"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:border-teal-500 focus:ring focus:ring-teal-100 outline-none"
                required
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="flex items-center justify-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md transition text-sm font-medium"
              >
                {loading ? "Locating..." : <><MapPin size={16}/> My Location</>}
              </button>
            </div>

            {/* Map Preview */}
            {coords && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  title="map"
                  width="100%"
                  height="200"
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                ></iframe>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the issue..."
              className="w-full border border-gray-300 rounded-md p-2 focus:border-teal-500 focus:ring focus:ring-teal-100 outline-none"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Attach Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files[0] })
              }
              className="w-full text-gray-600 border border-gray-300 rounded-md 
                         file:mr-3 file:py-2 file:px-3 file:rounded-md 
                         file:border-0 file:text-sm file:font-semibold 
                         file:bg-teal-600 file:text-white hover:file:bg-teal-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md transition-colors font-semibold shadow-md"
          >
            Submit Report
          </button>
        </form>
      </div>

      {/* ✅ Success Animation Popup */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-999"
          >
            <div className="bg-white text-center rounded-2xl shadow-2xl p-8 flex flex-col items-center">
              <CheckCircle2 className="text-green-500 w-16 h-16 mb-3 animate-pulse" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Report Submitted!
              </h2>
              <p className="text-gray-500 mt-1">Redirecting to your reports...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
