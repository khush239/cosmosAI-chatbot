import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import handler from "./api/chat.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Proxy the local /chat route to the Vercel-style handler
app.post("/chat", (req, res) => {
  handler(req, res);
});

// Also handle /api/chat if needed
app.post("/api/chat", (req, res) => {
  handler(req, res);
});

// Serve Vite's output directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), "dist")));
  
  // Fallback all other routes to React's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 COSMOS local backend running on http://localhost:${PORT}`);
  console.log(`✨ Port 5000 is ready for frontend proxying.`);
});
