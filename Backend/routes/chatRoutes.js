const express = require('express');
const axios = require('axios');
require('dotenv').config();

const chatRoutes = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

chatRoutes.post('/chat', async (req, res) => {
  try {
    const { userMessage } = req.body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
      {
        prompt: {
          text: `You are a mental health AI assistant. Respond with empathy and provide emotional support.\nUser: ${userMessage}\nAI:`
        }
      }
    );

    const aiMessage = response.data.candidates[0].output;
    res.json({ aiMessage });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

module.exports = chatRoutes;
