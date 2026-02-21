import { Camera, Image, Search, ShieldCheck, Zap } from "lucide-react";

export default function Scanner() {
  return (
    <div className="p-10 text-white">

      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-2">
        AI Crop <span className="text-green-400">Scanner</span>
      </h1>
      <p className="text-gray-400 mb-10">
        Upload an image or use your camera to detect diseases and health issues.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE - Main Scanner Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-3xl p-12 shadow-xl flex flex-col items-center">

          <div className="bg-gray-800 p-10 rounded-2xl mb-8">
            <Camera size={60} className="text-gray-400" />
          </div>

          <button className="bg-green-500 hover:bg-green-600 transition px-10 py-4 rounded-xl font-semibold text-lg mb-6">
            Start AI Scan
          </button>

          <div className="flex gap-4">
            <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-800 transition flex items-center gap-2">
              <Image size={18} /> Gallery
            </button>

            <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-800 transition flex items-center gap-2">
              <Search size={18} /> Browse Files
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-8">

          {/* How it works */}
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
            <h2 className="text-xl font-semibold mb-6">How it works</h2>

            <div className="space-y-6">

              <div className="flex gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                  <Camera className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Capture Photo</p>
                  <p className="text-gray-400 text-sm">
                    Take a clear photo of the affected crop area or leaf.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                  <Zap className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium">AI Diagnosis</p>
                  <p className="text-gray-400 text-sm">
                    Our neural network identifies thousands of disease patterns.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-500/10 p-3 rounded-xl">
                  <ShieldCheck className="text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Get Treatment</p>
                  <p className="text-gray-400 text-sm">
                    Receive expert-backed recovery recommendations.
                  </p>
                </div>
              </div>

            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
}