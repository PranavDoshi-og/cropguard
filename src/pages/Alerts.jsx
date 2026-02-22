import { Bell, Filter } from "lucide-react";

export default function Alerts() {
  return (
    <div className="p-10 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-green-400">Active</span> Alerts
          </h1>
          <p className="text-gray-400 mt-2">
            Manage and monitor current crop health issues across your farm.
          </p>
        </div>

        <div className="flex gap-4">
          <button className="border border-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-800">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl">
            Resolve All
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Active Alerts" value="08" />
        <StatCard title="Resolved (Week)" value="24" />
        <StatCard title="Mean Resolve Time" value="4.2h" />
      </div>

      {/* Alerts Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold">Recent Alerts</h2>
          <button className="text-sm text-green-400">View All</button>
        </div>

        <table className="w-full text-sm text-gray-400">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Crop Name</th>
              <th className="text-left py-2">Issue</th>
              <th className="text-left py-2">Severity</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <AlertRow crop="Maize Field A" issue="Nitrogen Deficiency" severity="Medium" />
            <AlertRow crop="Wheat Sector B" issue="Early Blight Detected" severity="High" />
            <AlertRow crop="Rice Paddies 4" issue="Irregular Irrigation" severity="Low" />
          </tbody>
        </table>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Security Protocol */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Security Protocol</h2>
          <p className="text-gray-400 text-sm mb-6">
            Automatic lockdown of irrigation systems has been engaged due to
            high severity blight detection.
          </p>

          <div className="flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-sm">
              Emergency Override
            </button>
            <button className="text-green-400 text-sm">
              Read full report
            </button>
          </div>
        </div>

        {/* Alert Sensitivity */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="font-semibold mb-6">Alert Sensitivity</h2>

          <SensitivityBar label="Blight Patterns" percent={90} enabled />
          <SensitivityBar label="Nitrogen Stress" percent={70} enabled />
          <SensitivityBar label="Pest Activity" percent={40} />
        </div>
      </div>

    </div>
  );
}

/* ---- Components ---- */

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function AlertRow({ crop, issue, severity }) {
  const color =
    severity === "High"
      ? "text-red-400"
      : severity === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <tr className="border-t border-gray-800">
      <td className="py-3">{crop}</td>
      <td>{issue}</td>
      <td className={color}>{severity}</td>
      <td>2026-02-21</td>
      <td className="text-green-400 cursor-pointer">Details</td>
    </tr>
  );
}

function SensitivityBar({ label, percent, enabled }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span className={enabled ? "text-green-400" : "text-gray-500"}>
          {enabled ? "ENABLED" : "DISABLED"}
        </span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}