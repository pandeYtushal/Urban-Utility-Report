export default function ReportsList() {
  return (
    <div className="min-h-screen bg-[rgba(19,19,19,0.9)] pt-24 px-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Reported Issues 📋
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((report) => (
          <div
            key={report}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src="https://via.placeholder.com/300x200"
              alt="Issue"
              className="rounded mb-3"
            />
            <h3 className="text-xl font-semibold">Broken Streetlight</h3>
            <p className="text-gray-600 text-sm mt-1">
              Reported near Sector 17 Market, Chandigarh.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
