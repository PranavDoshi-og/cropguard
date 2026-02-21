import React from 'react';
import { MapPin, Sprout, Calendar, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto pt-6 px-4 space-y-8">
      {/* Farm Identity Card */}
      <div className="bg-gradient-to-r from-green-900/40 to-slate-900/40 p-8 rounded-[2.5rem] border border-green-500/20 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Welcome, Naveen</h2>
            <p className="text-green-400 flex items-center gap-2 text-sm">
              <MapPin size={14} /> Pune District, Maharashtra
            </p>
          </div>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-900/40">
            <PlusCircle size={20} /> Add New Plot
          </button>
        </div>
      </div>

      {/* Active Crops Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <CropCard crop="Tomato" variety="Abhinav" planted="Jan 15, 2026" status="Monitoring" />
        <CropCard crop="Potato" variety="Kufri Jyoti" planted="Dec 20, 2025" status="Action Required" warning />
      </div>
    </div>
  );
}

function CropCard({ crop, variety, planted, status, warning }) {
  return (
    <div className={`p-6 rounded-3xl border ${warning ? 'border-red-500/30 bg-red-500/5' : 'border-white/5 bg-slate-900/40'} backdrop-blur-sm transition-all hover:scale-[1.02]`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${warning ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
            <Sprout size={24} className={warning ? 'text-red-400' : 'text-green-400'} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{crop}</h3>
            <p className="text-xs text-slate-500">Variety: {variety}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${warning ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
          {status}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Calendar size={14} /> Sowing Date: {planted}
      </div>
    </div>
  );
}