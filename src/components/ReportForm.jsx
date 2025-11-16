import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, MapPin, CheckCircle2 } from "lucide-react";
import { db } from "../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function ReportForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const issueType = params.get("issue") || "General";

  const [userLocation, setUserLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [redirectNow, setRedirectNow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null,
  });


  if (redirectNow) {
    return <Navigate to="/reports" replace />;
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setUserLocation(data.display_name || `${latitude}, ${longitude}`);
        } catch {
          setUserLocation(`${latitude}, ${longitude}`);
        }

        setLoadingLocation(false);
      },
      () => {
        alert("Please allow location access.");
        setLoadingLocation(false);
      }
    );
  };

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

      
      setSubmitted(true);

    
      setTimeout(() => setRedirectNow(true), 1500);
    } catch (err) {
      console.error("Firebase Error:", err);
      alert("Failed to submit report.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-10 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('/hero.png')` }}
    >
      <div className="absolute inset-0 bg-[rgba(19,19,19,0.9)] backdrop-blur-md"></div>

      <div className="relative bg-white/95 border border-gray-200 rounded-2xl shadow-2xl p-8 w-full max-w-lg text-gray-800 z-10">

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

          <div>
            <label className="block text-gray-700 font-medium mb-1">Your Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md p-2"
                required
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="flex items-center justify-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md transition text-sm font-medium"
              >
                {loadingLocation ? "Locating..." : <><MapPin size={16}/> My Location</>}
              </button>
            </div>

            {coords && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  title="map"
                  width="100%"
                  height="200"
                  src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                ></iframe>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Attach Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.files[0] })
              }
              className="w-full border border-gray-300 rounded-md file:bg-teal-600 file:text-white file:px-3 file:py-2 file:rounded-md file:border-0"
            />
          </div>

          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-md transition-colors font-semibold shadow-md">
            Submit Report
          </button>

        </form>
      </div>

      <AnimatePresence>
        {submitted && (
          <Motion.div
            key="success-popup"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 flex items-center justify-center z-9999"
          >
            <div className="bg-white/95 text-center rounded-2xl shadow-2xl p-8 border border-gray-200">
              <CheckCircle2 className="text-green-500 w-16 h-16 mb-3 animate-bounce" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Report Submitted!
              </h2>
              <p className="text-gray-500 mt-1">
                Redirecting to Report List...
              </p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
