import React from "react";
import { useSelector } from "react-redux";

const downloadBase64File = (base64Data, filename) => {
  const link = document.createElement("a");
  link.href = base64Data;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const HistoryPage = () => {
  const history = useSelector((state) => state.history.logs); 

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-[#1f2937] rounded-xl text-white">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">🕘 Compression History</h1>
      {history.length === 0 ? (
        <p className="text-gray-400">No files compressed in this session.</p>
      ) : (
        <div className="space-y-6">
          {history.map((entry, index) => {
            const { name, algorithm, originalBase64, compressedBase64 } = entry;

            const ext = algorithm === "huffman" ? "huff" : "rle";
            const origExt = name.split(".").pop();
            const baseName = name.split(".").slice(0, -1).join(".");

            const compressedName = `${baseName}_compressed_${origExt}.${ext}`;

            return (
              <div key={index} className="bg-[#374151] p-4 rounded-lg shadow">
                <p className="text-lg font-semibold text-yellow-300 mb-2">📄 {name}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => downloadBase64File(compressedBase64, compressedName)}
                    className="px-4 py-2 cursor-pointer bg-blue-500 rounded hover:bg-blue-600 transition"
                  >
                    Download Compressed File
                  </button>
                  <button
                    onClick={() => downloadBase64File(originalBase64, name)}
                    className="px-4 py-2 cursor-pointer bg-green-500 rounded hover:bg-green-600 transition"
                  >
                    Download Original File
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
