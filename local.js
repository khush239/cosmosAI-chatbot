import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 COSMOS local backend running on http://localhost:${PORT}`);
  console.log(`✨ Port 5000 is ready for frontend proxying.`);
});
