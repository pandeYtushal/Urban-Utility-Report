import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, MapPin, CheckCircle2, Camera, Send, Loader2 } from "lucide-react";
import { db } from "../../Firebase"; 
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function ReportForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const issueType = params.get("issue") || "General";

  const [userLocation, setUserLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [redirectNow, setRedirectNow] = useState(false);
  const [errors, setErrors] = useState({});

  if (redirectNow) {
    return <Navigate to="/reports" replace />;
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrors({ location: "Geolocation not supported." });
      return;
    }

    setLoadingLocation(true);
    setErrors({});

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
        setErrors({ location: "Please allow location access." });
        setLoadingLocation(false);
      }
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!userLocation.trim()) newErrors.location = "Location is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || !validateForm()) return;
    setSubmitting(true);

    try {
      let photoURL = null;

      // If user attached a photo, upload to Firebase Storage
      if (formData.photo) {
        const file = formData.photo;
        const storage = getStorage(); // uses default firebase app
        const filename = `reports/${Date.now()}_${file.name}`;
        const sRef = storageRef(storage, filename);
        
        await uploadBytes(sRef, file);
        photoURL = await getDownloadURL(sRef);
      }

      // add document to Firestore
      await addDoc(collection(db, "reports"), {
        name: formData.name,
        issueType,
        location: userLocation,
        description: formData.description,
        coords,
        photo: photoURL,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      
      setSubmitted(true);

      
      setTimeout(() => {
        setRedirectNow(true);
      }, 1400);
    } catch (err) {
      console.error("Firebase Error:", err);
      setErrors({ submit: "Failed to submit report. Please try again." });
      setSubmitting(false);
    }
  };

  return (
    <div
     className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col justify-center items-center px-4 py-20"
      style={{ backgroundImage: `url('/hero.png')` }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[rgba(19,19,19,0.9)] backdrop-blur-md z-0"></div>

      {/* Card */}
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-8 w-full max-w-lg text-gray-800 z-10"
      >
        <div className="flex items-center justify-between mb-8">
          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} /> Back
          </Motion.button>

          <h1 className="text-2xl font-bold transparent bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Report {issueType} Issue
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="e.g. Priya Sharma"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </Motion.div>

          {/* Location */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Type an address or use My Location"
                required
              />
              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleGetLocation}
                className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-xl transition-all font-medium shadow-lg"
                disabled={loadingLocation}
              >
                {loadingLocation ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
                {loadingLocation ? "Locating..." : "My Location"}
              </Motion.button>
            </div>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            {coords && (
              <Motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-lg"
              >
                <iframe
                  title="map"
                  width="100%"
                  height="200"
                  src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                  className="rounded-xl"
                />
              </Motion.div>
            )}
          </Motion.div>

          {/* Description */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe the issue with as much detail as possible"
              required
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </Motion.div>

          {/* Photo */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-700 font-semibold mb-2 block items-center gap-2">
              <Camera size={18} /> Attach Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
              className="w-full border border-gray-300 rounded-xl file:bg-teal-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 file:font-medium file:transition-all hover:file:bg-teal-700 p-2"
            />
            <p className="text-xs text-gray-500 mt-2">Optional — photos help authorities respond faster.</p>
          </Motion.div>

          {/* Submit */}
          <Motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            type="submit"
            disabled={submitting}
            className={`w-full ${submitting ? "bg-teal-300" : "bg-linear-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"} text-white py-4 rounded-xl transition-all font-semibold shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
          >
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {submitting ? "Submitting..." : "Submit Report"}
          </Motion.button>
          {errors.submit && <p className="text-red-500 text-sm mt-2 text-center">{errors.submit}</p>}
        </form>
      </Motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <Motion.div
            key="success-popup"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="pointer-events-auto bg-white/95 backdrop-blur-lg text-center rounded-3xl shadow-2xl p-8 border border-gray-200 max-w-sm">
              <Motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="text-green-500 w-16 h-16 mb-4 mx-auto animate-pulse" />
              </Motion.div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Report Submitted!</h2>
              <p className="text-gray-500">Redirecting to Report List...</p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
