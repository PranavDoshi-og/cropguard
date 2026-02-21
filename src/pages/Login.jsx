import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Leaf } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("farmer");

  const isFarmer = role === "farmer";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#111827] text-white">

      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 w-[420px] shadow-2xl">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-500/10 p-5 rounded-2xl mb-4">
            <Leaf className="text-green-400" size={40} />
          </div>
          <h1 className="text-3xl font-bold">CropGuard</h1>
          <p className="text-gray-400 mt-2">
            Sign in as {isFarmer ? "Farmer 🌱" : "Agri-Helper 🛠️"}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-gray-800 rounded-xl p-1 mb-8">
          <button
            onClick={() => setRole("farmer")}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              isFarmer
                ? "bg-green-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Farmer
          </button>

          <button
            onClick={() => setRole("helper")}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              !isFarmer
                ? "bg-green-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Agri-Helper
          </button>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
            <User size={16} /> Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
            <Lock size={16} /> Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
        </div>

        {/* Sign In */}
        <button
          onClick={() => {
            localStorage.setItem("auth", "true");
            navigate("/dashboard");
          }}
          className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold text-lg"
        >
          Sign In
        </button>

      </div>
    </div>
  );
}