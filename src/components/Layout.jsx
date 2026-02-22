import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Sidebar open={open} setOpen={setOpen} />

      {/* Content Wrapper */}
      <div className="md:ml-64 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}