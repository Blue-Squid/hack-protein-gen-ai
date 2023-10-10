// server/routes/openai.js
const express = require('express');
const router = express.Router();
const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

router.post('/process', async (req, res) => {
  const { inputValue } = req.body;

  try {
    // Process the inputValue using OpenAI
    const response = await openai.Completion.create({
      engine: 'davinci-codex',
      prompt: `Process this text: ${inputValue}`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 1,
    });

    const processedText = response.choices[0].text.trim();
    res.status(200).json({ processedText });
  } catch (error) {
    console.error('OpenAI processing failed:', error.message);
    res.status(500).json({ error: 'OpenAI processing failed' });
  }
});

module.exports = router;
