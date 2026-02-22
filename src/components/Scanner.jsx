import { predictCrop } from '../api/predict';
import React, { useState } from 'react';
import { Camera, Upload, Info, CheckCircle2, XCircle, ShieldAlert, Save, RefreshCw } from 'lucide-react';

export default function Scanner({ t }) {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleUpload = (e) => {
  const selected = e.target.files[0];
  if (selected) {
    setImageFile(selected);
    setPreview(URL.createObjectURL(selected));
    setSaved(false);
    setShowResult(false);
    setResult(null);
  }
};
  
  const startAnalysis = async () => {
  if (!imageFile) return;

  setScanning(true);

  const formData = new FormData();
  formData.append("crop", "tomato");
  formData.append("image", imageFile);

  try {
    const response = await predictCrop(formData);
    setResult(response);
    setShowResult(true);
  } catch (error) {
    alert("Backend error. Please try again.");
  }

  setScanning(false);
};

 // Inside Scanner component...
    const saveToHistory = () => {
    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-IN'),
        crop: "Tomato",
        status: "Early Blight",
        risk: "High",
        image: preview // Saving the preview URL
    };
    
    setSaved(true);
    };

  return (
    <div className="max-w-4xl mx-auto pt-6 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Plant Health Check</h2>
        <p className="text-slate-400 text-lg">Upload a clear photo of the leaf to begin analysis.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Step 1: Upload */}
        <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
          <div className="aspect-square rounded-[2rem] bg-black/40 border-2 border-dashed border-green-500/30 flex items-center justify-center relative overflow-hidden group">
            {preview ? (
              <>
                <img src={preview} className={w-full h-full object-cover ${scanning ? 'opacity-40' : 'opacity-100'} transition-opacity} alt="Specimen" />
                {scanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <RefreshCw className="text-green-400 animate-spin mb-2" size={48} />
                    <span className="text-green-400 font-mono text-xs uppercase tracking-widest animate-pulse">Scanning Specimen...</span>
                  </div>
                )}
              </>
            ) : (
              <label className="flex flex-col items-center cursor-pointer p-10 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/40">
                  <Camera className="text-green-400" size={36} />
                </div>
                <span className="text-xl font-bold text-white">Capture Photo</span>
                <span className="text-slate-400 mt-2 text-sm">Tap to use camera or gallery</span>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
            )}
          </div>
        </div>

        {/* Step 2: Quality Check / Actions */}
        <div className="space-y-6">
          {!showResult ? (
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-400" /> Photo Guide
              </h3>
              <div className="space-y-4">
                <GuideItem icon={<CheckCircle2 size={18} className="text-green-500" />} text="Hold camera 6-12 inches away" />
                <GuideItem icon={<CheckCircle2 size={18} className="text-green-500" />} text="Ensure bright, natural light" />
                <GuideItem icon={<XCircle size={18} className="text-red-500" />} text="Avoid blurry or shaky images" />
              </div>
            </div>
          ) : (
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-3xl text-green-400 text-sm flex items-center gap-3">
              <CheckCircle2 size={20} /> Analysis complete. See findings below.
            </div>
          )}

          {!preview ? (
            <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl text-yellow-200/80 text-sm">
              <strong>Status:</strong> Awaiting image. Please capture a leaf photo to see analysis.
            </div>
          ) : (
            !showResult && (
              <button 
                onClick={startAnalysis}
                disabled={scanning}
                className="w-full py-5 bg-green-600 hover:bg-green-500 disabled:bg-slate-800 text-white font-bold rounded-2xl shadow-lg shadow-green-900/40 transition-all text-xl uppercase tracking-tight"
              >
                {scanning ? 'Processing...' : 'Analyze Now'}
              </button>
            )
          )}
        </div>
      </div>

      {/* Result Card with Save Action */}
      {showResult && (
        <div className="mt-8 p-8 bg-slate-900/80 rounded-[2.5rem] border border-green-500/30 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500/20 p-3 rounded-2xl">
                <ShieldAlert className="text-yellow-500" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{result?.prediction?.disease}</h3>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                  Confidence:{(result?.prediction?.confidence * 100).toFixed(2)}%
                  </p>
              </div>
            </div>
            
            <button 
              onClick={saveToHistory}
              disabled={saved}
              className={flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${saved ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-white text-black hover:bg-slate-200'}}
            >
              <Save size={18} /> {saved ? 'Saved to Records' : 'Save Result'}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-green-500/10 rounded-2xl border border-green-500/20">
              <h4 className="text-green-400 font-bold mb-2 text-sm uppercase">Organic Solution</h4>
              <p className="text-slate-300 text-xs leading-relaxed">Apply Neem Oil spray (5ml/L) and remove infected leaves immediately.</p>
            </div>
            <div className="p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <h4 className="text-blue-400 font-bold mb-2 text-sm uppercase">Chemical Solution</h4>
              <p className="text-slate-300 text-xs leading-relaxed">Mancozeb 75% WP (2g/L). Consult your local expert before applying.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GuideItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/5">
      {icon} <span className="text-slate-300 font-medium">{text}</span>
    </div>
  );
}