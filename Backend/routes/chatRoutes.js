const express = require('express');
const axios = require('axios');
require('dotenv').config();

const chatRoutes = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

chatRoutes.post('/chat', async (req, res) => {
  try {
    const { userMessage } = req.body;

    // Step 1: Generate AI Response
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-1219:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          { role: "user", parts: [
            {text: `You are a compassionate AI mental health assistant. Provide a thoughtful, empathetic, and supportive response within 200 characters. Address the user's emotions and offer brief, helpful guidance.

    User's concern: "${userMessage}"`}
          ] }
        ]
      }
    );    

    const aiMessage = response.data.candidates[0].content.parts[0].text;

    // Step 2: Generate AI-powered Quick Replies
    const quickRepliesResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          { role: "user", parts: [{ text: `Generate 3 short follow-up suggestions for this mental health response: "${aiMessage}". Keep them short within 15 or 20 letters and conversational.` }] }
        ]
      }
    );    

    // Extract quick replies
    const quickReplies = quickRepliesResponse.data.candidates[0].content.parts[0].text.split("\n").filter(q => q.trim());

    // Step 3: Send AI Response + Quick Replies
    return res.json({
      message: aiMessage,
      quickReplies: quickReplies.slice(1, 3) // Limit to 3 quick replies
    });

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }  
});

module.exports = chatRoutes;
