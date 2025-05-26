const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  const message = `
    You are a startup mentor who provides reflection about startup ideas.
    Provide a verdict about "${prompt}". Return either "Promising" or "Needs Work". Start with the title "Verdict:".
    Provide a brief explanation about why "${prompt}" is Promising or Needs Work. Start the paragraph with the title "Brief Explanation:".
    Provide one paragraph of improvement suggestion about "${prompt}". Start the paragraph with the title "Improvement Suggestion:".
    `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ message: text });

  } catch (error) {
    console.error("Gemini API error:", error.message || error);
    res.status(500).json({ message: "No response" });
  }
});


app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
