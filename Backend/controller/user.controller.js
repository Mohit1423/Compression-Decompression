import { rleCompress, rleCompressBytes } from "../utils/rle.js";
import compressjs from 'compressjs';
const { Huffman } = compressjs;

export const Compress = async (req, res) => {
    const file = req.file;
    const algorithm = req.body.algorithm;
    

    try{
    const fileBuffer = file.buffer;
    const mimeType = file.mimetype;
    const originalName = file.originalname;
    console.log(fileBuffer);

    let compressed;
     if (algorithm === "rle") {
      if (mimeType.startsWith("text")) {
        const text = fileBuffer.toString("utf-8");
        const compressedText = rleCompress(text);
        compressed = Buffer.from(compressedText, "utf-8");
      } else {
        const byteArray = [...fileBuffer];
        const compressedBytes = rleCompressBytes(byteArray);
        compressed = Buffer.from(compressedBytes);
      }
    } else if (algorithm === "huffman") {
      compressed = Buffer.from(Huffman.compressFile([...fileBuffer]));
    }
    
    console.log(compressed);
    const baseName = originalName.split('.').slice(0, -1).join('.') || originalName;
    const ext = algorithm === "huffman" ? "huff" : "rle";
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${baseName}_compressed.${ext}"`);
    res.send(compressed);

    
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server Error", error });
    }
}

export const Decompress = async (req, res) => {
    const file = req.file;
    const algorithm = req.body.algorithm;
    const originalExt = req.body.originalExt;
    
    console.log(file,algorithm,originalExt);
    

}