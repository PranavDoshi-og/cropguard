import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content Wrapper */}
      <div className="md:ml-64 flex flex-col min-h-screen">

        {/* Mobile Topbar */}
        <div className="md:hidden p-4 bg-[#111827]">
          <button onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>

      </div>
    </div>
  );
}