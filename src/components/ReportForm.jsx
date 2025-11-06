import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function ReportForm() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const issueType = params.get("issue") || "General";

  // State for location
  const [userLocation, setUserLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle get current location
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

        // Try reverse geocoding to get address (using OpenStreetMap API)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.display_name) {
            setUserLocation(data.display_name);
          } else {
            setUserLocation(`${latitude}, ${longitude}`);
          }
        } catch (error) {
          setUserLocation(`${latitude}, ${longitude}`);
        }

        setLoading(false);
      },
      (error) => {
        alert("Unable to fetch location. Please allow location access.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-20 py-10 
                    bg-[rgba(19,19,19,0.9)] backdrop-blur-md bg-cover bg-center">
      {/* Form Container */}
      <div className="bg-white/95 border border-gray-200 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 
                      w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl transition-all duration-500">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Report {issueType} Issue
        </h1>
        <p className="text-gray-600 mb-8 text-center text-sm sm:text-base md:text-lg">
          Please describe the {issueType.toLowerCase()} problem and attach images or your current location if possible.
        </p>

        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 focus:border-teal-500 rounded-md p-2 sm:p-3 
                         text-sm sm:text-base focus:ring focus:ring-teal-100 outline-none"
              required
            />
          </div>

          {/* Location + Button */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Location
            </label>
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
              <input
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                placeholder="Enter location"
                className="flex-1 border border-gray-300 focus:border-teal-500 rounded-md p-2 sm:p-3 
                           text-sm sm:text-base focus:ring focus:ring-teal-100 outline-none"
                required
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="bg-teal-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-teal-700 
                           transition text-xs sm:text-sm font-medium"
              >
                {loading ? "Locating..." : "📍 Use My Location"}
              </button>
            </div>

            {/* Map Preview */}
            {coords && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  title="map"
                  width="100%"
                  height="180"
                  className="sm:h-56 md:h-64 lg:h-72"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                ></iframe>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Describe the issue..."
              className="w-full border border-gray-300 focus:border-teal-500 rounded-md p-2 sm:p-3 
                         text-sm sm:text-base focus:ring focus:ring-teal-100 outline-none"
              required
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Attach Photo
            </label>
            <input
              type="file"
              className="w-full text-gray-600 border border-gray-300 rounded-md 
                         file:mr-3 file:py-2 file:px-3 sm:file:px-4 sm:file:py-2 file:rounded-md 
                         file:border-0 file:text-xs sm:file:text-sm file:font-semibold 
                         file:bg-teal-600 file:text-white hover:file:bg-teal-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 sm:py-3 text-sm sm:text-base rounded-md 
                       hover:bg-teal-700 transition-colors duration-300 font-semibold shadow-md"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
