import { rleCompress, rleCompressBytes, rleDecompressText, rleDecompressBytes } from "../utils/rle.js";
import compressjs from 'compressjs';
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
const { Huffman } = compressjs;

export const Compress = async (req, res) => {
    const file = req.file;
    const algorithm = req.body.algorithm;
    

    try{
    const fileBuffer = file.buffer;
    const mimeType = file.mimetype;
    const originalName = file.originalname;
    console.log(fileBuffer);
    console.log(mimeType);
    let compressed;
     if (algorithm === "rle") {
      if (mimeType === "text/plain" && originalName.toLowerCase().endsWith(".txt")) {
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
  try{
    const file = req.file;
    const algorithm = req.body.algorithm;
    const originalExt = req.body.originalExt;
    const buffer = file.buffer;
    console.log(buffer);

     let decompressedBuffer;

    if (algorithm === "rle") {
      if (originalExt === "txt") {
        // Handle text decompression
        const compressedStr = buffer.toString("utf-8");
        const decompressedText = rleDecompressText(compressedStr);
        decompressedBuffer = Buffer.from(decompressedText, "utf-8");
      } else {
        // Handle binary decompression
        const byteArray = new Uint8Array(buffer);
        const decompressedBytes = rleDecompressBytes(byteArray);
        decompressedBuffer = Buffer.from(decompressedBytes);
      }


    } else {
      const decompressedArray = Huffman.decompressFile([...buffer]);
      decompressedBuffer = Buffer.from(decompressedArray)
    }
    console.log(decompressedBuffer);
    res.setHeader("Content-Disposition", `attachment; filename= decompressed.${originalExt}`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(decompressedBuffer);


  }catch(error){
    console.log(error);
    return res.status(500).json({ message: "Server Error", error });
  }
    

}

export const SignUp = async (req,res) => {
  const { name, email, password } = req.body;
 
   if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required",success:false });
  }
  try{
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists",sucess:false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully",success:true });
  }catch(error){
    console.log(error);
    return res.status(500).json({ message: "Server Error", error });
  }
}
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", error });
  }

}