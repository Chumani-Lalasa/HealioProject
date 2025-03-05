import React, {useState} from "react";
import axios from 'axios'

function VoiceAssistant() {
    const [response, setResponse] = useState("");

    const fetchAIResponse = async(text) => {
        const apiKey = process.env.GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp:generateContent?key=${GEMINI_API_KEY}`;

        try{
            const res = await axios.post(apiUrl, {
                contents: [{
                    parts: [{text}],
                }]
            });

            const aiResponse = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
            setResponse(aiResponse);
            speakText(aiResponse);
        }catch(error){
            console.error("Error fetching AI response:", error);
            setResponse("Sorry, I couldn't process that.")
        }
    };

    const speakText = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speechSynthesis.speak(speech);
    }

    // Function to handle voice input
    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = (event) => {
            const userSpeech = event.results[0][0].transcipt;
            fetchAIResponse(userSpeech);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error: ", event.error);
        };
    };
  return (
    <div className="voice-assistant">
      <h2>AI Voice Assistant</h2>
      <button onClick={startListening}>🎤 Speak</button>
      <p><strong>Response:</strong>{response}</p>
    </div>
  )
}

export default VoiceAssistant
