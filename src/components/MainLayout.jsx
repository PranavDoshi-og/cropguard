import { useState } from "react";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">

        {/* Top Header */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-8">
          <p className="text-gray-300">
            Welcome back, <span className="font-semibold">Farmer 👋</span>
          </p>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
              F
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>

      </div>
    </div>
  );
}