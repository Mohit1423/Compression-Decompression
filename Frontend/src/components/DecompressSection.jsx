import React, { useEffect, useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function DecompressSection() {
  const [decompressFile, setDecompressFile] = useState(null);
  const [decompressedBlob, setDecompressedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Stats, setStats] = useState(null);
  const [filename, setFilename] = useState(null);

  function parseCompressedFilename(fileName) {
    const lastDot = fileName.lastIndexOf(".");
    const extension = fileName.slice(lastDot + 1); // rle or huff

    if (!["rle", "huff"].includes(extension)) {
      toast.error("Invalid compressed file extension.");
    }

    const nameWithoutExt = fileName.slice(0, lastDot);
    const compressedIndex = nameWithoutExt.lastIndexOf("_compressed_");

    if (compressedIndex === -1) {
      throw new Error("Invalid compressed file name.");
    }

    const base = nameWithoutExt.slice(0, compressedIndex);
    let extPart = nameWithoutExt.slice(compressedIndex + "_compressed_".length);

    if (extPart.includes(" (")) {
      extPart = extPart.split(" (")[0];
    }

    return {
      originalName: base,
      originalExt: extPart,
      algorithm: extension,
    };
  }

  const handleDecompress = async () => {
    if (!decompressFile) {
      toast.error("Please select a file to decompress.");
      return;
    }

    const parsed = parseCompressedFilename(decompressFile.name);
    if (!parsed) {
      toast.error("Invalid compressed file name.");
      return;
    }

    try {
      setLoading(true);
      const start = performance.now();
      const formData = new FormData();
      formData.append("file", decompressFile);
      formData.append("algorithm", parsed.algorithm);
      formData.append("originalExt", parsed.originalExt);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/decompress`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer", // important for binary file response
        }
      );
      const fileBuffer = response.data;
      const blob = new Blob([fileBuffer]);
      const end = performance.now();
      const duration = (end - start).toFixed(2) + "ms";

      setDecompressedBlob(blob);
      setFilename(parsed.originalName + "." + parsed.originalExt);
      setStats({
        compressedSize: decompressFile.size, // size of the compressed file user uploaded
        originalSize: blob.size, // size after decompression (resulting blob)
        decompressionRatio: (blob.size / decompressFile.size).toFixed(3),
        processingTime: duration,
      });

      console.log(Stats);
      toast.success("Decompression successful!");
    } catch (err) {
      console.error(err);
      toast.error("Decompression failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleDecompressDownload = async () => {
    if (!decompressedBlob) return;
    const url = URL.createObjectURL(decompressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => {
      a.remove();
    }, 200);
  };

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
        {Stats && (
          <>
            <p className="text-sm text-yellow-400 font-medium mt-2">
              ⚠️ Don’t change the file name after compression – it helps
              decompression detect the file type correctly.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-[#2a303c] text-gray-100 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-green-400">
                📊 Decompression Statistics
              </h2>

              <p>
                📦{" "}
                <span className="font-semibold text-gray-300">
                  Compressed Size:
                </span>{" "}
                {Stats.compressedSize} bytes
              </p>
              <p>
                🗂️{" "}
                <span className="font-semibold text-gray-300">
                  Original Size:
                </span>{" "}
                {Stats.originalSize} bytes
              </p>
              <p>
                📈{" "}
                <span className="font-semibold text-gray-300">
                  Decompression Ratio:
                </span>{" "}
                {Stats.decompressionRatio}
              </p>
              <p>
                ⏱️{" "}
                <span className="font-semibold text-gray-300">Time Taken:</span>{" "}
                {Stats.processingTime}
              </p>

              <div className="h-72 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Compressed", size: Stats.compressedSize },
                      { name: "Original", size: Stats.originalSize },
                    ]}
                  >
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1d232a",
                        borderColor: "#4b5563",
                        color: "#fff",
                      }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="size" fill="#34d399" />{" "}
                    {/* green-400 for decompression */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DecompressSection;
