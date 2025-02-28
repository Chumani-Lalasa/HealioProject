import React, { useState } from 'react';
import { Mic } from 'lucide-react';

const VoiceInput = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please try Chrome or Edge.');
      return;
    }
    
    setIsListening(true);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };
  
  return (
    <button
      type="button"
      onClick={startListening}
      className={`ml-2 p-2 rounded-full ${
        isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
      } hover:bg-gray-300 transition-colors`}
      title="Voice input"
      aria-label="Use voice input"
    >
      <Mic size={20} />
    </button>
  );
};

export default VoiceInput;
// import { useState } from "react";

// const VoiceInput = ({ onResult }) => {
//   const [listening, setListening] = useState(false);
//   const recognition = new SpeechRecognition();

//   recognition.onresult = (event) => {
//     onResult(event.results[0][0].transcript);
//   };

//   const startListening = () => {
//     setListening(true);
//     recognition.start();
//   };

//   return (
//     <button onClick={startListening} className="bg-green-500 text-white px-4 py-2 rounded">
//       {listening ? "Listening..." : "Start Voice Input"}
//     </button>
//   );
// };

// export default VoiceInput;