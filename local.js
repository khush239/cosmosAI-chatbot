import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import handler from "./api/chat.js";

dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback to .env too

const app = express();
app.use(cors());

// Do NOT use express.json() globally for edge routes, we need the raw body
app.use(express.text({ type: '*/*' }));

// Proxy the local /chat route to the Vercel-style Edge handler
const edgeBridge = async (req, res) => {
  try {
    // Construct Web Standard Request
    const webReq = new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method,
      headers: new Headers(req.headers),
      body: req.method === 'POST' ? req.body : undefined,
    });

    const webRes = await handler(webReq);

    res.status(webRes.status);
    webRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (webRes.body) {
      // Pipe the Web ReadableStream to Node WritableStream
      const reader = webRes.body.getReader();
      const push = async () => {
        const { done, value } = await reader.read();
        // Check for client disconnect
        if (req.socket.destroyed) {
          reader.cancel();
          return;
        }
        if (done) {
          res.end();
          return;
        }
        res.write(Buffer.from(value));
        push();
      };
      push();
    } else {
      res.send(await webRes.text());
    }
  } catch (err) {
    console.error("Local proxy error:", err);
    res.status(500).json({ error: err.message });
  }
};

app.post("/chat", edgeBridge);
app.post("/api/chat", edgeBridge);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 COSMOS local backend running on http://localhost:${PORT}`);
  console.log(`✨ Port 5000 is ready for frontend proxying.`);
});
