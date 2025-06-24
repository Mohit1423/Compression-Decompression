# 🗜️ Universal File Compression & Decompression Portal

A full-stack web platform to compress and decompress **any file type** using proven algorithms like **Run-Length Encoding (RLE)** and **Huffman Coding**.

Includes a secure login system, session-based history tracking, real-time compression graphs, and a clear learning section explaining the algorithms.

> 🚀 Perfect for developers, students, and professionals looking to optimize file storage and transfer while understanding how compression works.

---

## 🚀 Core Features

- 🔐 **Secure Login / Signup** (MongoDB-based, session auth)
- 📁 **Supports Any File Type** – text, images, PDFs, archives, and more
- 🧠 **Dual Compression Algorithms:**
  - **RLE (Run-Length Encoding)** – efficient for repetitive data
  - **Huffman Coding** – optimal binary compression for varied data
- 🧾 **Session-Based History** – track compression/decompression activity during the session
- 📊 **Real-Time Graphs** – visualize compression ratios and file size savings
- 📚 **Learning Section** – clear, example-driven explanations of how RLE and Huffman algorithms work
- 🖥️ Modern UI built with **React**, **TailwindCSS**, **ShadCN UI**, **Framer Motion**, and **Redux Toolkit**

---

## 📚 Learning Section

The app includes a dedicated **Learning Section** that clearly explains the fundamentals of the compression algorithms used:

- **Run-Length Encoding (RLE):**  
  Learn how sequences of repeated characters are encoded by storing counts and values to reduce file size.

- **Huffman Coding:**  
  Understand how characters are assigned variable-length binary codes based on frequency, maximizing compression efficiency.

This section provides clear descriptions and practical examples to help users grasp the core concepts behind these compression methods — perfect for beginners or anyone curious about how compression works.

---

## 📊 Compression Graphs

- Dynamic graphs show the original vs compressed file sizes.
- Visualize compression ratios and efficiency for each file processed.
- Helps users immediately see the impact of different algorithms.

---

## 👤 Authentication

- Account registration and login with secure password hashing (bcrypt).
- MongoDB stores user credentials.

---

## 🧾 Session History

During each session, the app tracks:

| Field          | Description                         |
|----------------|-----------------------------------|
| File Name      | Original file name                 |
| Algorithm      | Compression algorithm used         |
| Action         | Compression or Decompression       |
| Original Size  | File size before compression       |
| Final Size     | File size after compression        |
| Timestamp      | When the operation occurred        |

History is stored in client-side Redux state and clears on session end or logout.

---

## 🛠 Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose (for user auth)
- Multer for file uploads
- Custom implementations of RLE & Huffman compression algorithms

### Frontend
- React.js
- Tailwind CSS
- ShadCN UI
- Framer Motion
- Redux Toolkit for state & history management
- Recharts for graph visualizations

---

## 📦 Supported File Types

Supports compression and decompression of **any file type**, including but not limited to:

- Text files: `.txt`, `.csv`, `.html`
- Images: `.png`, `.jpg`, `.svg`
- Documents: `.pdf`, `.docx`
- Archives: `.zip`, `.rar`
- Source code: `.js`, `.py`, `.java`

---

## 🧪 Getting Started Locally

### Backend Setup

-cd Backend
-npm install
-touch .env

# Add your MongoDB URI and session secret in .env

=PORT = 4000
-MONGO_URL = your_mongodb_connection_string


### Frontend Setup

-cd Frontend
-npm install
-npm run dev
