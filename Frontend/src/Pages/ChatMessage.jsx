import React from 'react';

const ChatMessage = ({ message, isDarkMode, formatTime }) => {
  const { text, isUser, timestamp, isError } = message;
  
  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="flex flex-col max-w-[75%]">
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white')
              : isError
                ? (isDarkMode ? 'bg-red-900 text-white' : 'bg-red-100 text-red-800')
                : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')
          } ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'}`}
        >
          {!isUser && !isError && (
            <div className="flex items-center mb-1">
              <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                AI
              </div>
              <span className="font-medium">HealthTrack AI</span>
            </div>
          )}
          
          <p className="whitespace-pre-wrap">{text}</p>
        </div>
        
        <span 
          className={`text-xs mt-1 ${
            isUser ? 'text-right' : 'text-left'
          } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
        >
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
