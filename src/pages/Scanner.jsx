import React, { useState } from "react";
import { predictImage } from "../api/predict";
import {
  Camera,
  Info,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Save,
  RefreshCw,
} from "lucide-react";

export default function Scanner() {
  const [city, setCity] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);

  // Handle image upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setShowResult(false);
    setSaved(false);
  };

  // Call backend
  const startAnalysis = async () => {
    if (!imageFile || !city) {
      alert("Please upload an image and enter city");
      return;
    }

    setLoading(true);
    setScanning(true);

    try {
      const data = await predictImage(imageFile, city);
      setResult(data);
      setShowResult(true);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
      setScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-6 px-4">

      {/* Hidden file input */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Plant Health Check
        </h2>
        <p className="text-slate-400 text-lg">
          Upload a clear photo of the leaf to begin analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* ================= Upload Section ================= */}
        <div className="bg-slate-900/60 p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="aspect-square rounded-[2rem] bg-black/40 border-2 border-dashed border-green-500/30 flex items-center justify-center relative overflow-hidden">

            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className={`w-full h-full object-cover ${
                    scanning ? "opacity-40" : "opacity-100"
                  }`}
                />

                {scanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <RefreshCw
                      className="text-green-400 animate-spin mb-2"
                      size={48}
                    />
                    <span className="text-green-400 text-xs uppercase tracking-widest">
                      Scanning...
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center text-center">
                <Camera className="text-green-400 mb-3" size={48} />
                <p className="text-white font-bold">Upload Leaf Image</p>
                <p className="text-slate-400 text-sm">
                  Use Gallery or Browse Files
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-4 justify-center">
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="px-5 py-2 bg-slate-800 rounded-lg text-white"
            >
              Gallery
            </button>
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="px-5 py-2 bg-slate-800 rounded-lg text-white"
            >
              Browse Files
            </button>
          </div>
        </div>

        {/* ================= Action Section ================= */}
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter city (e.g. Pune)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"
          />

          {!showResult ? (
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-400" />
                Photo Guide
              </h3>

              <GuideItem
                icon={<CheckCircle2 size={18} className="text-green-500" />}
                text="Hold camera 6–12 inches away"
              />
              <GuideItem
                icon={<CheckCircle2 size={18} className="text-green-500" />}
                text="Ensure bright natural light"
              />
              <GuideItem
                icon={<XCircle size={18} className="text-red-500" />}
                text="Avoid blurry images"
              />
            </div>
          ) : (
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-3xl text-green-400 flex items-center gap-3">
              <CheckCircle2 size={20} />
              Analysis complete
            </div>
          )}

          {preview && !showResult && (
            <button
              onClick={startAnalysis}
              disabled={loading}
              className="w-full py-5 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 text-white font-bold rounded-2xl text-xl"
            >
              {loading ? "Processing..." : "Analyze Now"}
            </button>
          )}
        </div>
      </div>

      {/* ================= Result ================= */}
      {showResult && (
        <div className="mt-8 p-8 bg-slate-900/80 rounded-[2.5rem] border border-green-500/30">
          <div className="flex items-center gap-4 mb-4">
            <ShieldAlert className="text-yellow-500" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-white">
                {result?.prediction?.disease}
              </h3>
              <p className="text-slate-400 text-sm">
                Confidence: {(result?.prediction?.confidence * 100).toFixed(2)}%
              </p>
              <p className="text-yellow-400 text-sm">
                Risk: {result?.prediction?.risk?.level}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-green-500/10 rounded-2xl border border-green-500/20">
              <h4 className="text-green-400 font-bold mb-2 text-sm uppercase">
                Organic Solution
              </h4>
              <p className="text-slate-300 text-xs">
                {result?.suggestions?.organic}
              </p>
            </div>

            <div className="p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <h4 className="text-blue-400 font-bold mb-2 text-sm uppercase">
                Chemical Solution
              </h4>
              <p className="text-slate-300 text-xs">
                {result?.suggestions?.chemical}
              </p>
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
      {icon}
      <span className="text-slate-300">{text}</span>
    </div>
  );
}