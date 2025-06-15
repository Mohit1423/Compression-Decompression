import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
 

  const handleCompress = async () => {
    console.log(file, algorithm);
    if (!file || !algorithm) {
      toast.error("Please select a file and algorithm");
      return;
    }
    // setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("algorithm", algorithm);
    // try {
    //   const response = await fetch("http://localhost:5000/api/compress", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     const error = await response.json();
    //     throw new Error(error.error);
    //   }

    //   const blob = await response.blob();
    //   const url = window.URL.createObjectURL(blob);

    //   const downloadLink = document.createElement("a");
    //   downloadLink.href = url;
    //   downloadLink.download = `compressed_${file.name}`;
    //   downloadLink.click();
    //   toast.success("File compressed and downloaded!");
    // } catch (err) {
    //   console.error(err);
    //   toast.error(`Compression failed: ${err.message}`);
    // } finally {
    //   setLoading(false);
    // }
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
        <Button
          onClick={handleCompress}
          disabled={loading}
          className="bg-green-600 mt-4 cursor-pointer hover:bg-green-700 text-white font-semibold"
        >
          {loading ? "Compressing..." : "Compress File"}
        </Button>
      </div>
    </div>
  );
};

export default CompressSection;
