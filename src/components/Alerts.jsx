import React from 'react';
import { Map, MapPin, ExternalLink, Info } from 'lucide-react';

export default function Alerts() {
  return (
    <div className="max-w-6xl mx-auto pt-6 px-4 space-y-8">
      {/* 1. Community Heatmap Section */}
      <section className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 p-8 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Map className="text-green-500" /> Regional Outbreak Map
            </h2>
            <p className="text-sm text-slate-400">Real-time disease reports in your district.</p>
          </div>
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold rounded-full border border-red-500/30">3 ACTIVE HOTSPOTS</span>
        </div>
        
        {/* Visual Map Placeholder */}
        <div className="aspect-video md:aspect-[21/9] bg-green-950/20 rounded-3xl border border-green-500/10 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative text-center">
             <MapPin size={48} className="text-red-500 animate-bounce mx-auto mb-2" />
             <p className="text-xs font-mono text-green-500/60 uppercase tracking-[0.2em]">GPS: Pune District - Satellite Data Active</p>
          </div>
        </div>
      </section>

      {/* 2. Government Schemes Section */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-500/5 rounded-[2rem] border border-blue-500/20">
          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
            <Info size={18} /> Available Subsidies
          </h3>
          <div className="space-y-3">
            <SchemeItem title="PM-Kisan Pesticide Subsidy" link="View Eligibility" />
            <SchemeItem title="Organic Farming Incentive (State)" link="Apply Now" />
          </div>
        </div>

        <div className="p-6 bg-green-500/5 rounded-[2rem] border border-green-500/20">
          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
            <ShieldCheck size={18} /> Authorized Vendors
          </h3>
          <p className="text-xs text-slate-400 mb-4">Find verified bio-fertilizers within 10km.</p>
          <button className="text-xs font-bold text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500 transition">Open Directory</button>
        </div>
      </section>
    </div>
  );
}

function SchemeItem({ title, link }) {
  return (
    <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
      <span className="text-sm text-slate-200">{title}</span>
      <button className="text-[10px] text-blue-400 font-bold hover:underline flex items-center gap-1">
        {link} <ExternalLink size={10} />
      </button>
    </div>
  );
}