import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";


const CompressSection = () => {
  const allowedTypes = [
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
  ];

  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState("");
  const [loading, setLoading] = useState(false);
  const [Stats, setStats] = useState(null);
  const fileRef = useRef(null);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [filename, setFilename] = useState("compressed.rle");
  const MAX_SIZE_MB = 3;
  const handleCompress = async () => {
    if (!file || !algorithm) {
      toast.error("Please select a file and algorithm");
      return;
    }
    // if (!allowedTypes.includes(file.type)) {
    //   toast.error(
    //     "Unsupported file type. Only .txt, images (jpeg/png/webp/gif), and PDFs are allowed."
    //   );
    //   return;
    // }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File too large! Max allowed size is ${MAX_SIZE_MB}MB.`);
      return;
    }
    
    const isAlreadyCompressed = (fileName) => {
      const pattern = /_compressed_.*\.(rle|huff)$/i;
      return pattern.test(fileName);
    };

    if (isAlreadyCompressed(file.name)) {
      toast.error(
        "This file seems to be already compressed. Please choose an uncompressed file."
      );
      return;
    }

    setLoading(true);
    const start = performance.now();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("algorithm", algorithm);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/compress",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );

      if (!response) {
        toast.error("Compression failed");
      }
      console.log("Hello");
      const blob = new Blob([response.data]);
      setCompressedBlob(blob);
      const ext = algorithm === "huffman" ? "huff" : "rle";
      const originalExt = file.name.split(".").pop();
      const baseName = file.name.split(".").slice(0, -1).join(".");
      
      setFilename(`${baseName}_compressed_${originalExt}.${ext}`);

      const end = performance.now();
      const duration = (end - start).toFixed(2) + "ms";

      setStats({
        originalSize: file.size,
        compressedSize: blob.size,
        compressionRatio: (blob.size / file.size).toFixed(3),
        processingTime: duration,
      });
      console.log(Stats);
      toast.success("Download ready!");
    } catch (error) {
      toast.error("Compression failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => {
      a.remove();
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-[#1d1d1d] p-6 rounded-2xl shadow-xl text-white space-y-6 border border-neutral-700">
      <h2 className="text-3xl font-bold text-white">📦 Compress a File</h2>

      <div className="space-y-4 mt-8 ">
        <div className="flex flex-col mb-8 gap-2">
          <div className="flex items-center gap-4">
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              onClick={() => fileRef.current.click()}
              className="bg-[#2a2a2a] cursor-pointer text-white px-4 py-2 rounded-lg border border-neutral-700 hover:bg-[#333] transition-all"
            >
              Choose File
            </button>

            {/* Optional File Name Preview */}
            <span className="text-md text-neutral-400">
              {file?.name || "No file selected"}
            </span>
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="flex flex-col  gap-2">
          <Label className="text-white px-1 mb-2">
            Select Compression Algorithm
          </Label>
          <Select onValueChange={setAlgorithm}>
            <SelectTrigger className="bg-[#2a2a2a] cursor-pointer text-white border-neutral-700">
              <SelectValue placeholder="Choose algorithm" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a]  text-white border-neutral-700">
              <SelectItem className="cursor-pointer" value="rle">
                Run-Length Encoding (RLE)
              </SelectItem>
              <SelectItem className="cursor-pointer" value="huffman">
                Huffman Coding
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="flex gap-5">
          <Button
            onClick={handleCompress}
            disabled={loading}
            className="bg-green-600 mt-4 cursor-pointer hover:bg-green-700 text-white font-semibold"
          >
            {loading ? "Compressing..." : "Compress File"}
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!compressedBlob}
            className="bg-green-600 mt-4 block cursor-pointer hover:bg-green-700 text-white font-semibold"
          >
            Download Compressed File
          </Button>
        </div>

        {Stats && (
          <>
            <p className="text-sm text-yellow-400 font-medium mt-2">
              ⚠️ Don’t change the file name after compression – it helps
              decompression detect the file type correctly.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-[#2a303c] text-gray-100 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-blue-400">
                📊 Compression Statistics
              </h2>
              <p>
                🗂️{" "}
                <span className="font-semibold mb-2 text-gray-300">
                  Original Size:
                </span>{" "}
                {Stats.originalSize} bytes
              </p>
              <p>
                📦{" "}
                <span className="font-semibold mb-2 text-gray-300">
                  Compressed Size:
                </span>{" "}
                {Stats.compressedSize} bytes
              </p>
              <p>
                📉{" "}
                <span className="font-semibold mb-2 text-gray-300">
                  Compression Ratio:
                </span>{" "}
                {Stats.compressionRatio}
              </p>
              <p>
                ⏱️{" "}
                <span className="font-semibold mb-2 text-gray-300">
                  Time Taken:
                </span>{" "}
                {Stats.processingTime}
              </p>

              <div className="h-72 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Original", size: Stats.originalSize },
                      { name: "Compressed", size: Stats.compressedSize },
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
                    <Bar dataKey="size" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {algorithm === "rle" ? (
              <div className="bg-[#1d232a] text-gray-200 p-6 rounded-2xl mt-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  📘 Learn About RLE Compression
                </h2>

                <p className="mb-4 text-gray-300">
                  <span className="font-semibold text-white">
                    Run-Length Encoding (RLE)
                  </span>{" "}
                  is a simple data compression technique that replaces sequences
                  of repeating elements (like characters or bytes) with a single
                  value and a count.
                </p>

                <div className="bg-[#2a323c] p-4 rounded-xl mb-4 border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    🧠 How It Works:
                  </h3>
                  <p className="text-sm text-gray-300">
                    Suppose your file contains:{" "}
                    <code className="text-green-400 font-mono">
                      AAABBBCCDAA
                    </code>
                    <br />
                    RLE would compress this as:{" "}
                    <code className="text-blue-400 font-mono">3A3B2C1D2A</code>
                  </p>
                </div>

                <div className="bg-[#2a323c] p-4 rounded-xl mb-4 border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    📉 When Is It Useful?
                  </h3>
                  <ul className="list-disc pl-6 text-sm text-gray-300">
                    <li>
                      ✅ Works well on files with many repeating characters
                      (e.g., simple images or text patterns)
                    </li>
                    <li>
                      ❌ Not very effective on complex or random data (e.g.,
                      PDFs, high-res images)
                    </li>
                    <li>
                      ⚠️ May even increase file size if data lacks repetition
                    </li>
                  </ul>
                </div>

                <div className="bg-[#2a323c] p-4 rounded-xl border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    🔍 Takeaway:
                  </h3>
                  <p className="text-sm text-gray-300">
                    RLE is fast and lightweight but not universally efficient.
                    Use it for educational purposes or for compressing
                    structured and predictable data. For better compression,
                    explore more advanced algorithms like Huffman coding or LZW.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#1d232a] text-gray-200 p-6 rounded-2xl mt-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  📘 Learn About Huffman Compression
                </h2>

                <p className="mb-4 text-gray-300">
                  <span className="font-semibold text-white">
                    Huffman Coding
                  </span>{" "}
                  is an efficient and lossless data compression algorithm that
                  assigns shorter binary codes to frequent characters and longer
                  codes to rare ones, reducing overall file size.
                </p>

                <div className="bg-[#2a323c] p-4 rounded-xl mb-4 border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    🧠 How It Works:
                  </h3>
                  <p className="text-sm text-gray-300">
                    Huffman builds a binary tree based on character frequency in
                    your data. More frequent characters appear closer to the
                    root, receiving shorter binary codes.
                    <br />
                    <br />
                    For example, the word{" "}
                    <code className="text-green-400 font-mono">
                      "hello"
                    </code>{" "}
                    might become:
                    <br />
                    <code className="text-blue-400 font-mono">
                      011010011...
                    </code>{" "}
                    (binary)
                  </p>
                </div>

                <div className="bg-[#2a323c] p-4 rounded-xl mb-4 border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    📉 When Is It Useful?
                  </h3>
                  <ul className="list-disc pl-6 text-sm text-gray-300">
                    <li>
                      ✅ Great for compressing large text files or files with
                      repeating patterns
                    </li>
                    <li>
                      ✅ More efficient than RLE for general-purpose text and
                      binary data
                    </li>
                    <li>
                      ❌ Slight overhead on very small files (can increase size)
                    </li>
                    <li>
                      ⚠️ Requires a decoding table to be stored or rebuilt for
                      decompression
                    </li>
                  </ul>
                </div>

                <div className="bg-[#2a323c] p-4 rounded-xl border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    🔍 Takeaway:
                  </h3>
                  <p className="text-sm text-gray-300">
                    Huffman coding is widely used in real-world compression
                    (e.g., ZIP, MP3, JPEG). It's a great balance of speed and
                    compression ratio for varied file types.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        
      </div>
    </div>
  );
};

export default CompressSection;
