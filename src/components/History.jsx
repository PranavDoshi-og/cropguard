import React from 'react';
import { FileText, ExternalLink, Calendar, Inbox } from 'lucide-react';

export default function History({ records }) {
  return (
    <div className="max-w-4xl mx-auto pt-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Scan History</h2>
      
      {records.length === 0 ? (
        <div className="bg-slate-900/40 rounded-[2.5rem] p-12 text-center border border-white/5">
          <Inbox size={48} className="mx-auto text-slate-700 mb-4" />
          <p className="text-slate-400">No records saved yet. Complete a scan to see it here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((report) => (
            <div key={report.id} className="group flex items-center justify-between p-5 bg-slate-900/60 rounded-3xl border border-white/10 hover:border-green-500/30 transition-all">
              <div className="flex items-center gap-5">
                <img src={report.image} className="w-14 h-14 rounded-xl object-cover border border-white/10" alt="Thumbnail" />
                <div>
                  <h4 className="font-bold text-white text-lg">{report.crop}</h4>
                  <div className="flex gap-3 mt-1 text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-slate-500 flex items-center gap-1"><Calendar size={12}/> {report.date}</span>
                    <span className="text-red-400">{report.status}</span>
                  </div>
                </div>
              </div>
              <ExternalLink size={18} className="text-slate-600 group-hover:text-white transition-colors cursor-pointer" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}