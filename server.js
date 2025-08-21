
// server.js

require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();


// Allow requests from your frontend origin
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*'
}));

// Parse JSON bodies
app.use(express.json());


app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*'
}));
app.use(express.json());

// ✅ Endpoint to fetch API keys from .env (only for frontend use)
app.get('/api/get-key', (req, res) => {
  const { type } = req.query;
  
  if (type === 'openai') {
    return res.json({ key: process.env.OPENAI_API_KEY || '' });
  }
  if (type === 'huggingface') {
    return res.json({ key: process.env.HUGGINGFACE_API_KEY || '' });
  }
  
  res.status(400).json({ error: 'Invalid key type' });
});

// 🔹 OpenAI Proxy
app.post('/api/openai', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {

      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
    } catch (err) {
    console.error('OpenAI proxy error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// 🔹 Hugging Face Proxy
app.post('/api/huggingface', async (req, res) => {
  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${req.body.model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body.input)
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: await response.text() });
    }

    res.json(await response.json());
  } catch (err) {
    console.error('Hugging Face proxy error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
