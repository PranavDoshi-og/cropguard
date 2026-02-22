import { Calendar, Download, Search, Clock } from "lucide-react";
import { useState, useMemo } from "react";

export default function History() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const scans = [
    { crop: "Maize", score: 98, status: "Healthy", date: "2024-06-21" },
    { crop: "Wheat", score: 82, status: "Mild Stress", date: "2024-06-20" },
    { crop: "Rice", score: 45, status: "Disease Detected", date: "2024-06-19" },
    { crop: "Corn", score: 94, status: "Healthy", date: "2024-06-18" },
    { crop: "Soybean", score: 91, status: "Healthy", date: "2024-06-17" },
    { crop: "Potatoes", score: 68, status: "Nitrogen Deficiency", date: "2024-06-16" },
    { crop: "Cotton", score: 96, status: "Healthy", date: "2024-06-15" },
  ];

  // 🔎 Search filter
  const filteredScans = useMemo(() => {
    return scans.filter((scan) =>
      scan.crop.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 📄 CSV Export
  const exportCSV = () => {
    const headers = ["Crop", "Score", "Status", "Date"];
    const rows = filteredScans.map((s) => [
      s.crop,
      s.score,
      s.status,
      s.date,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "scan-history.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-10 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">
            Scan <span className="text-green-400">History</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Review and export previous crop scan results.
          </p>
        </div>

        <div className="flex gap-4">
          <button className="border border-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-800">
            <Calendar size={16} /> June 2024
          </button>
          <button
            onClick={exportCSV}
            className="border border-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-800"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

        {/* Search */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-semibold text-lg">Recent Scans</h2>

          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search crop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* Scan List */}
        <div className="space-y-4">
          {filteredScans.slice(0, visibleCount).map((scan, index) => (
            <ScanCard key={index} scan={scan} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredScans.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-xl text-sm"
            >
              Load More History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------- Scan Card -------- */

function ScanCard({ scan }) {
  const scoreColor =
    scan.score >= 90
      ? "text-green-400"
      : scan.score >= 70
      ? "text-yellow-400"
      : "text-red-400";

  const badgeColor =
    scan.score >= 90
      ? "bg-green-500/20 text-green-400"
      : scan.score >= 70
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-red-500/20 text-red-400";

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex justify-between items-center hover:border-green-500 transition">

      <div className="flex items-center gap-4">
        <div className="bg-gray-700 p-3 rounded-xl">
          <Clock size={18} className="text-gray-400" />
        </div>

        <div>
          <p className="font-medium">{scan.crop}</p>
          <p className="text-xs text-gray-500">{scan.date}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs text-gray-500">HEALTH SCORE</p>
          <p className={`font-bold ${scoreColor}`}>{scan.score}%</p>
        </div>

        <span className={`text-xs px-3 py-1 rounded-full ${badgeColor}`}>
          {scan.status}
        </span>
      </div>
    </div>
  );
}