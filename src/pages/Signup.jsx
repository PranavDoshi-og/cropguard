import { useState } from "react";
import { User, Lock, Phone, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState("farmer");
  const [step, setStep] = useState(1); // 1 = form, 2 = OTP
  const navigate = useNavigate();

  const isFarmer = role === "farmer";

  const handleSendOtp = () => {
    setStep(2);
  };

  const handleVerifyOtp = () => {
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

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
            Sign up as {isFarmer ? "Farmer 🌱" : "Agri-Helper 🛠️"}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
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

        {step === 1 && (
          <>
            {/* Full Name */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <User size={16} /> Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Phone size={16} /> Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Lock size={16} /> Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
              />
            </div>

            <button
              onClick={handleSendOtp}
              className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold text-lg"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="6-digit OTP"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 text-center tracking-widest"
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold text-lg"
            >
              Verify & Create Account
            </button>
          </>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-400 cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}