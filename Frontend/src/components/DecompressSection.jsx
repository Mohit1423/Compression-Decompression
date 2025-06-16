import React,{ useEffect, useState, useRef} from "react";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

function DecompressSection() {

  const [decompressFile, setDecompressFile] = useState(null);
  const [decompressedBlob, setDecompressedBlob] = useState(null);
  const [loading, setLoading] = useState(false);


  function parseCompressedFilename(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) return null;

  const algoExt = filename.slice(lastDotIndex + 1).toLowerCase(); 
  if (algoExt !== "rle" && algoExt !== "huff") return null;

  const mainName = filename.slice(0, lastDotIndex);

  const compressedSuffix = "_compressed_";
  const suffixIndex = mainName.lastIndexOf(compressedSuffix);
  if (suffixIndex === -1) return null;

  const originalName = mainName.slice(0, suffixIndex);
  const originalExt = mainName.slice(suffixIndex + compressedSuffix.length);

  return {
    originalName,
    originalExt,
    algorithm: algoExt,
  };
}


  const handleDecompress = async () => {
    if (!decompressFile) {
      toast.error("Please select a file to decompress.");
      return;
    }
    
    
    setDecompressedBlob(true)
  }

  const handleDecompressDownload = async () => {
    console.log("Downloading");
  }

  const decompressFileRef = useRef(null);
  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 bg-[#1d1d1d] p-6 rounded-2xl shadow-xl text-white space-y-6 border border-neutral-700">
        <h2 className="text-3xl font-bold text-white">📤 Decompress a File</h2>

        <div className="space-y-4 mt-8">
          <div className="flex flex-col mb-8 gap-2">
            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={decompressFileRef}
                className="hidden"
                accept="*"
                onChange={(e) => setDecompressFile(e.target.files[0])}
              />

              <button
                onClick={() => decompressFileRef.current.click()}
                className="bg-[#2a2a2a] cursor-pointer text-white px-4 py-2 rounded-lg border border-neutral-700 hover:bg-[#333] transition-all"
              >
                Choose File
              </button>

              
              <span className="text-md text-neutral-400">
                {decompressFile?.name || "No file selected"}
              </span>
            </div>
          </div>

        

          {/* Submit and Download Buttons */}
          <div className="flex gap-5">
            <Button
              onClick={handleDecompress}
              disabled={loading}
              className="bg-green-600 mt-4 cursor-pointer hover:bg-green-700 text-white font-semibold"
            >
              {loading ? "Decompressing..." : "Decompress File"}
            </Button>
            <Button
              onClick={handleDecompressDownload}
              disabled={!decompressedBlob}
              className="bg-green-600 mt-4 block cursor-pointer hover:bg-green-700 text-white font-semibold"
            >
              Download Decompressed File
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DecompressSection;
