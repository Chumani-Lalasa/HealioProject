import React, { useState, useRef, useEffect } from 'react';
import VoiceInput from '../Components/VoiceInput';
import ChatMessage from './ChatMessage';
import { Send, Moon, Sun, Volume2 } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm HealthTrack AI. How can I assist with your health questions today?", isUser: false, timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Suggested quick replies
  const quickReplies = [
    "What is a normal blood pressure?",
    "How to maintain a healthy diet?",
    "What are symptoms of dehydration?",
    "How much exercise is recommended weekly?"
  ];
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Check system preference for dark mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  
  const handleVoiceInput = (text) => {
    setInputText(text);
    // Auto-submit after voice input if text is substantial
    if (text.length > 5) {
      sendMessage(text);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const sendMessage = (voiceText = null) => {
    const text = voiceText || inputText.trim();
    if (!text) return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    
    // Show AI typing indicator
    setIsLoading(true);
    
    // Call AI API for response
    getAIResponse(text);
  };
  
  const getAIResponse = async (userMessage) => {
    try {
      // Mock API call with timeout to simulate response time
      // In production, replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Example health-related responses
          const healthResponses = {
            "blood pressure": "Normal blood pressure is typically around 120/80 mmHg. Readings above 130/80 mmHg may indicate hypertension, while readings below 90/60 mmHg may indicate hypotension.",
            "healthy diet": "A healthy diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. It's recommended to limit processed foods, added sugars, and excessive sodium. Consider the Mediterranean diet or DASH diet as scientifically-backed eating patterns.",
            "exercise": "Adults should aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities on 2 or more days per week.",
            "dehydration": "Common symptoms of dehydration include thirst, dry mouth, dark yellow urine, fatigue, dizziness, and headache. Severe dehydration may cause rapid heartbeat, confusion, and fainting."
          };
          
          // Simple keyword matching to generate responses
          let aiResponseText = "I don't have specific information about that. Please consult with a healthcare professional for personalized advice.";
          
          for (const [keyword, response] of Object.entries(healthResponses)) {
            if (userMessage.toLowerCase().includes(keyword)) {
              aiResponseText = response;
              break;
            }
          }
          
          resolve(aiResponseText);
        }, 1500); // Simulate thinking time
      });
      
      // Add AI response
      const newAIMessage = {
        id: Date.now(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      
      // Text-to-speech if enabled
      if (isSpeechEnabled) {
        speakText(response);
      }
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now(),
        text: "I'm sorry, I encountered an error. Please try again later.",
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickReply = (text) => {
    setInputText(text);
    sendMessage(text);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
  };
  
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    speechSynthesis.speak(utterance);
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className={`flex flex-col h-full max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Header */}
      <div className={`p-4 flex justify-between items-center border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-blue-600 text-white'}`}>
        <div>
          <h1 className="text-xl font-bold">HealthTrack AI Chatbot 🤖</h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-blue-100'}`}>
            Ask your health-related queries and get instant AI-powered responses
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={toggleSpeech} 
            className={`p-2 rounded-full ${
              isSpeechEnabled 
                ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600') 
                : (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500')
            }`}
            aria-label={isSpeechEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
            title={isSpeechEnabled ? "Disable text-to-speech" : "Enable text-to-speech"}
          >
            <Volume2 size={20} />
          </button>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-600'}`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        {messages.map((message) => (
          <ChatMessage 
            key={message.id}
            message={message}
            isDarkMode={isDarkMode}
            formatTime={formatTime}
          />
        ))}
        
        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2 mt-2 ml-2">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick Replies */}
      {messages.length < 3 && (
        <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
          <p className="text-sm mb-2 font-medium">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((text, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(text)}
                className={`text-sm px-3 py-1 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' 
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input Area */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <textarea
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type your question here..."
              className={`w-full p-3 pr-10 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                  : 'bg-white text-gray-800 border-gray-300 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="1"
              style={{ resize: 'none' }}
            />
          </div>
          
          <VoiceInput 
            onResult={handleVoiceInput} 
            isDarkMode={isDarkMode}
            buttonClass={`p-3 rounded-full ${
              isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          />
          
          <button
            onClick={() => sendMessage()}
            disabled={inputText.trim() === ''}
            className={`p-3 rounded-full ${
              inputText.trim() === ''
                ? (isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400')
                : (isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
            }`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
