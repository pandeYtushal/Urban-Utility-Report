import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase";
import { MapPin } from "lucide-react";

export default function ReportsList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportData);
    });
    return unsubscribe;
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex flex-col items-center px-4 py-20"
      style={{ backgroundImage: `url('/hero.png')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(19,19,19,0.9)] backdrop-blur-md z-0"></div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Page Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-10 text-center drop-shadow-lg">
          Reported Issues 📋
        </h2>

        {/* No Reports Found */}
        {reports.length === 0 ? (
          <div className="text-center text-gray-400 text-lg mt-16">
            🚫 No reports found. Be the first to report an issue!
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((r) => (
              <div
                key={r.id}
                className="bg-white/10 border border-white/10 rounded-2xl p-5 shadow-lg 
                           hover:shadow-2xl transition-all backdrop-blur-md hover:-translate-y-1"
              >
                {/* Image */}
                {r.photo && (
                  <img
                    src={r.photo}
                    alt="Reported issue"
                    className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-700/50"
                  />
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold text-teal-400 mb-1">
                  {r.issueType || "General"} Issue
                </h3>

                {/* Location */}
                <p className="text-gray-300 text-sm flex items-center gap-1 mb-2">
                  <MapPin size={14} className="text-teal-400" />
                  {r.location || "Unknown location"}
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm line-clamp-3 mb-3">
                  {r.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>
                    {r.createdAt?.toDate?.().toLocaleString?.() || "Pending..."}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      r.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {r.status || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
