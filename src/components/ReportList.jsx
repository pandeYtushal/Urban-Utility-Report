export default function ReportsList() {
  // Later you can replace this dummy data with API or Firebase data
  const reports = [
    {
      id: 1,
      title: "Broken Streetlight",
      desc: "Reported near Sector 17 Market, Chandigarh.",
      image: "/streetlight.png",
      type: "Streetlight Fault",
      status: "Pending",
    },
    {
      id: 2,
      title: "Garbage Overflow",
      desc: "Uncollected garbage near Rose Garden road.",
      image: "/garbage.png",
      type: "Garbage Issue",
      status: "Resolved",
    },
    {
      id: 3,
      title: "Sewage Leakage",
      desc: "Water leakage near Sector 22 Police Station.",
      image: "/sewage.png",
      type: "Sewage Issue",
      status: "In Progress",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative pt-24 px-6 flex flex-col items-center"
      style={{
        backgroundImage: `url('/hero.png')`, // 👈 reuse same background for consistency
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(19,19,19,0.9)] backdrop-blur-md z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-400 mb-8 text-center drop-shadow-lg">
          Reported Issues 📋
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white/90 border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <img
                src={report.image}
                alt={report.title}
                className="w-full h-48 object-contain bg-gray-50"
              />

              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
                  {report.title}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      report.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : report.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {report.status}
                  </span>
                </h3>

                <p className="text-sm text-gray-600">{report.desc}</p>

                <div className="mt-3 text-xs text-teal-600 font-medium uppercase tracking-wide">
                  {report.type}
                </div>

                <button
                  className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md text-sm transition"
                  onClick={() => alert(`Viewing details for ${report.title}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
