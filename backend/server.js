const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const { OpenAI } = require('openai/index.mjs');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate', async (req, res) => {
  const { prompt, tone } = req.body;

  const message = [
    { role: "system", content: `You are a startup mentor who provides reflection about start up ideas.` },
    { role: "user", content: `Provide a verdict about ${prompt}. Return either Promising or Needs Work. Start with the title 'Verdict:'.` },
    { role: "user", content: `Provide a brief explanation about why ${prompt} is  Promising or Needs Work. Start the paragraph with the title 'Brief Explanation:'.` },
    { role: "user", content: `Provide one paragraph of improvement suggestion about ${prompt}. Start the paragraph with the title 'Improvement Suggestion:'.` },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: message
    });

    const responseMessage = completion?.choices?.[0]?.message?.content || "No response";
    res.json({ message: responseMessage });

  } catch (error) {
    console.error("OpenAI API error:", error.message || error);
    res.status(500).json({ message: "No response" });
  }
});


app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
