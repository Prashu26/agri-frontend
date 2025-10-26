import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaLeaf, FaSeedling, FaTint, FaBug } from 'react-icons/fa';
import { GiFarmer } from 'react-icons/gi';

// Mock responses for the chatbot
const RESPONSES = {
  greeting: {
    text: 'Hello! I\'m your farming assistant. How can I help you today?',
    options: [
      { text: 'Crop advice', value: 'crop_advice' },
      { text: 'Pest control', value: 'pest_control' },
      { text: 'Weather forecast', value: 'weather' },
    ]
  },
  crop_advice: {
    text: 'I can provide advice on various crops. Which crop would you like to know about?',
    options: [
      { text: 'Soybean', value: 'soybean_advice' },
      { text: 'Groundnut', value: 'groundnut_advice' },
      { text: 'Sunflower', value: 'sunflower_advice' },
      { text: 'Back to main menu', value: 'main_menu' }
    ]
  },
  soybean_advice: {
    text: '🌱 Soybean Farming Tips:\n\n• Best grown in well-drained loamy soil with pH 6.0-7.5\n• Requires 600-1000mm rainfall\n• Ideal temperature: 20-30°C\n• Sowing time: June-July (Kharif)\n• Harvest in 90-120 days\n\nWould you like to know about pest control for soybeans?',
    options: [
      { text: 'Yes, show pest control', value: 'soybean_pests' },
      { text: 'Back to crops', value: 'crop_advice' }
    ]
  },
  pest_control: {
    text: 'I can help with pest control for various crops. Which pest are you dealing with?',
    options: [
      { text: 'Aphids', value: 'aphids' },
      { text: 'Bollworms', value: 'bollworms' },
      { text: 'Whiteflies', value: 'whiteflies' },
      { text: 'Back to main menu', value: 'main_menu' }
    ]
  },
  main_menu: {
    text: 'What would you like to know about?',
    options: [
      { text: 'Crop advice', value: 'crop_advice' },
      { text: 'Pest control', value: 'pest_control' },
      { text: 'Weather forecast', value: 'weather' },
    ]
  }
};

// Fallback responses
const FALLBACK_RESPONSES = [
  "I'm not sure I understand. Could you rephrase that?",
  "I'm still learning about that topic. Could you ask something else?",
  "Let me connect you with a human expert for that question.",
  "I don't have that information right now. Try asking about crop advice or pest control."
];

const FarmerChatbot = () => {
  const [messages, setMessages] = useState([
    { text: RESPONSES.greeting.text, sender: 'bot', options: RESPONSES.greeting.options }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get a random fallback response
  const getFallbackResponse = () => {
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  };

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      // In a real app, you would call an API here
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle quick reply button clicks
  const handleQuickReply = (value) => {
    // Add user's selection as a message
    const selectedOption = messages[messages.length - 1].options?.find(opt => opt.value === value);
    if (selectedOption) {
      const userMessage = { text: selectedOption.text, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = getBotResponse(value);
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  // Generate bot response based on user input
  const getBotResponse = (userInput) => {
    const inputLower = userInput.toLowerCase();
    let response;

    // Check for keywords in user input
    if (inputLower.includes('hello') || inputLower.includes('hi') || inputLower.includes('hey')) {
      response = RESPONSES.greeting;
    } else if (inputLower.includes('crop') || inputLower.includes('plant') || inputLower.includes('grow')) {
      response = RESPONSES.crop_advice;
    } else if (inputLower.includes('pest') || inputLower.includes('insect') || inputLower.includes('bug')) {
      response = RESPONSES.pest_control;
    } else if (inputLower.includes('soybean') || inputLower.includes('soya')) {
      response = RESPONSES.soybean_advice;
    } else if (inputLower.includes('menu') || inputLower.includes('back')) {
      response = RESPONSES.main_menu;
    } else {
      // Check if input matches any option value
      const lastBotMessage = [...messages].reverse().find(m => m.sender === 'bot');
      if (lastBotMessage?.options) {
        const matchedOption = lastBotMessage.options.find(opt => 
          opt.value === userInput || opt.text.toLowerCase() === userInput.toLowerCase()
        );
        if (matchedOption) {
          response = RESPONSES[matchedOption.value] || { text: getFallbackResponse() };
        }
      }
    }

    // If no specific response found, use a fallback
    if (!response) {
      response = { text: getFallbackResponse() };
    }

    return {
      text: response.text,
      sender: 'bot',
      options: response.options,
      timestamp: new Date().toISOString()
    };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-gray-50 rounded-lg shadow-md overflow-hidden">
      {/* Chat header */}
      <div className="bg-green-600 text-white p-4 flex items-center">
        <div className="bg-white text-green-600 p-2 rounded-full mr-3">
          <FaRobot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Farming Assistant</h2>
          <p className="text-sm text-green-100">Always here to help with your farming needs</p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3/4 rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-green-600 text-white rounded-br-none' 
                  : 'bg-white border border-gray-200 rounded-bl-none'
              }`}
            >
              {message.sender === 'bot' && message.text.includes('\n') ? (
                message.text.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>
                    {line}
                  </p>
                ))
              ) : (
                <p>{message.text}</p>
              )}
              
              {/* Quick reply buttons */}
              {message.sender === 'bot' && message.options && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(option.value)}
                      className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-800 rounded-full transition-colors"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp || new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-1 p-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={isTyping}
          >
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Try: "How to grow soybeans?" or "Pest control for my crops"</span>
        </div>
      </form>
    </div>
  );
};

export default FarmerChatbot;
