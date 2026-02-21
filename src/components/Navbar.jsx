import React from 'react';
import { Leaf, Globe, Volume2, ShieldCheck } from 'lucide-react';

export default function Navbar({ setPage, currentPage }) {
  return (
    <nav className="p-4 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-[#020617]/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-green-600 p-2 rounded-lg shadow-[0_0_15px_rgba(22,163,74,0.5)]">
          <Leaf size={20} className="text-white" />
        </div>
        <div className="hidden xs:block">
          <h1 className="text-lg font-black tracking-tighter text-white uppercase">Crop<span className="text-green-500">Guard</span></h1>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Offline Ready</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <button onClick={() => setPage('scanner')} className={currentPage === 'scanner' ? 'text-green-400' : 'hover:text-white'}>Scan</button>
          <button onClick={() => setPage('dashboard')} className={currentPage === 'dashboard' ? 'text-green-400' : 'hover:text-white'}>Farm Stats</button>
          <button onClick={() => setPage('alerts')} className={currentPage === 'alerts' ? 'text-green-400' : 'hover:text-white'}>Community</button>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice Assistant Toggle */}
          <button className="p-2 bg-white/5 rounded-full border border-white/10 text-slate-400 hover:text-green-400 transition" title="Voice Guidance">
            <Volume2 size={18} />
          </button>
          
          {/* Language Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-xl">
            <Globe size={14} className="text-green-400" />
            <select className="bg-transparent text-xs font-bold text-green-400 outline-none cursor-pointer">
              <option value="en">EN</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}