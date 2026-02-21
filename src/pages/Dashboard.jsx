import { Leaf, AlertCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  return (
    
    <div className="p-10 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <span className="text-green-400 text-xs bg-green-500/10 px-3 py-1 rounded-full tracking-widest">
            SYSTEM ONLINE
          </span>

          <h1 className="text-4xl font-bold mt-4">
            Smart Crop <span className="text-green-400">Analytics</span>
          </h1>

          <p className="text-gray-400 mt-2 max-w-xl">
            AI-powered crop health monitoring system. Real-time insights for your agriculture needs.
          </p>
        </div>

            <button
        onClick={() => navigate("/scanner")}
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
      >
        Start New Scan →
      </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        {/* Crops Scanned */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <Leaf className="text-green-400 mb-4" />
          <p className="text-gray-400 text-sm">CROPS SCANNED</p>
          <h2 className="text-2xl font-bold mt-2">124</h2>
        </div>

        {/* Active Alerts */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <AlertCircle className="text-red-400 mb-4" />
          <p className="text-gray-400 text-sm">ACTIVE ALERTS</p>
          <h2 className="text-2xl font-bold mt-2">8</h2>
        </div>

        {/* Growth Rate */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <TrendingUp className="text-green-400 mb-4" />
          <p className="text-gray-400 text-sm">GROWTH RATE</p>
          <h2 className="text-2xl font-bold mt-2">1.4x</h2>
        </div>

        {/* Health Score Circle */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="relative w-28 h-28 mb-4">
            <svg className="w-28 h-28">
              <circle
                cx="56"
                cy="56"
                r="50"
                stroke="#1f2937"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="56"
                cy="56"
                r="50"
                stroke="#22c55e"
                strokeWidth="10"
                fill="none"
                strokeDasharray="314"
                strokeDashoffset="40"
                strokeLinecap="round"
                transform="rotate(-90 56 56)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              87%
            </div>
          </div>
          <p className="text-gray-400 text-sm">HEALTH SCORE</p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Alerts Table */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
            <button className="text-sm text-green-400">View All</button>
          </div>

          <table className="w-full text-sm text-gray-400">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left py-2">Crop Name</th>
                <th className="text-left py-2">Issue</th>
                <th className="text-left py-2">Severity</th>
                <th className="text-left py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-800">
                <td className="py-3">Maize Field A</td>
                <td>Nitrogen Deficiency</td>
                <td className="text-yellow-400">Medium</td>
                <td>2026-02-21</td>
              </tr>
              <tr className="border-t border-gray-800">
                <td className="py-3">Wheat Sector B</td>
                <td>Early Blight</td>
                <td className="text-red-400">High</td>
                <td>2026-02-20</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Side Cards */}
        <div className="flex flex-col gap-6">

          {/* Weather */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Weather Forecast</h2>
            <p className="text-2xl font-bold">24°C</p>
            <p className="text-gray-400 text-sm">Sunny</p>
          </div>

        </div>
      </div>
    </div>
  );
}