// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON parsing
app.use(express.json());

// Enable CORS (important for frontend ↔ backend communication)
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// ===== API ROUTE =====
app.post("/api/generate-effect", async (req, res) => {
  try {
    const { prompt, type } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    
    if (type === "image") {
    
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`HuggingFace API failed: ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");

      return res.json({
        type: "image",
        image: `data:image/png;base64,${base64Image}`,
      });
    } else {
      // OpenAI for text effects
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `Create a fun futuristic visual effect idea for: ${prompt}`,
          max_tokens: 100,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API failed: ${response.status}`);
      }

      const data = await response.json();

      return res.json({
        type: "text",
        result: data.choices?.[0]?.text?.trim() || "No response",
      });
    }
  } catch (err) {
    console.error("❌ API error:", err);
    return res.status(500).json({ error: "Failed to generate effect" });
  }
});

// ===== DEPLOYMENT: serve frontend (optional) =====
app.use(express.static(path.join(process.cwd(), "public")));

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
