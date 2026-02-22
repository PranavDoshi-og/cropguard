import { NavLink } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 
        bg-[#0f172a] border-r border-gray-800
        shadow-2xl transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 text-2xl font-bold text-white flex items-center gap-2">
          🌿 CropGuard
        </div>

        <nav className="mt-8 space-y-3 px-4">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/scanner"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            Scanner
          </NavLink>

          <NavLink
            to="/alerts"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            Alerts
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            History
          </NavLink>

        </nav>
      </aside>
    </>
  );
}