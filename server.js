import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));


// API Route
app.post("/api/generate-effect", async (req, res) => {
  try {
    const { prompt, type } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

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
      if (!response.ok) throw new Error(`HuggingFace API failed: ${response.status}`);

      const buffer = await response.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");

      return res.json({
        type: "image",

        image: `data:image/png;base64,${base64Image}`,

      });
    } else {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,

          "Content-Type": "application/json"

 
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `Create a fun futuristic visual effect idea for: ${prompt}`,

          max_tokens: 100
        })

      });
      if (!response.ok) throw new Error(`OpenAI API failed: ${response.status}`);

      const data = await response.json();
      return res.json({
        type:"text",

        result: data.choices?.[0]?.text?.trim() || "No response"
      });

    }
  } catch (err) {
    console.error("❌ API error:", err);
    return res.status(500).json({ error: "Failed to generate effect" });
  }
});


// SPA fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));

});

// Start server
app.listen(PORT, () => {

  console.log(`✅ Server running at http://localhost:${PORT}`);


});
