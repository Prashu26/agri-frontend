import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiImage, FiPaperclip, FiUser, FiMessageSquare, FiX } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';
import { format } from 'date-fns';

// Mock data for chat history
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    message: 'Hello! I\'m your agricultural assistant. How can I help you today?',
    timestamp: new Date(Date.now() - 3600000),
    type: 'text'
  },
  {
    id: 2,
    sender: 'user',
    message: 'Hi! I need advice on organic pest control for my tomato plants.',
    timestamp: new Date(Date.now() - 3500000),
    type: 'text'
  },
  {
    id: 3,
    sender: 'ai',
    message: 'For organic pest control on tomatoes, you can try these methods:\n\n1. Neem oil spray (2% solution) every 7-10 days\n2. Companion planting with marigolds or basil\n3. Handpicking larger pests like hornworms\n4. Soap spray (1 tbsp mild soap per liter of water)\n5. Diatomaceous earth around the base of plants\n\nWould you like more details on any of these methods?',
    timestamp: new Date(Date.now() - 3400000),
    type: 'text'
  },
];

// Mock quick questions
const quickQuestions = [
  'How to increase soil fertility?',
  'Best crops for red soil',
  'Organic fertilizer recipes',
  'Pest control for rice',
  'Watering schedule for vegetables'
];

// Mock AI responses
const getAIResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('pest') && lowerMessage.includes('tomato')) {
    return 'For tomato pests, I recommend using neem oil spray (2% solution) every 7-10 days. You can also introduce beneficial insects like ladybugs or use diatomaceous earth around the base of plants.';
  } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('fertiliser')) {
    return 'For organic fertilizer, you can make compost from kitchen scraps, use well-rotted manure, or try vermicompost. A balanced NPK fertilizer (10-10-10) is good for most crops during the growing season.';
  } else if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
    return 'Most vegetables need about 1-1.5 inches of water per week. Water deeply but less frequently to encourage deep root growth. Early morning is the best time to water to reduce evaporation and prevent fungal diseases.';
  } else if (lowerMessage.includes('soil') || lowerMessage.includes('land')) {
    return 'To test your soil, you can get a soil testing kit or send a sample to a local agricultural extension. They can provide specific recommendations for pH adjustment and nutrient deficiencies.';
  } else {
    const responses = [
      'I understand you\'re asking about ' + message + '. While I don\'t have specific information on that, I can help with general agricultural advice, pest control, crop management, and more. Could you provide more details?',
      'That\'s an interesting question about ' + message + '. For the most accurate advice, please provide more details about your specific situation, such as your location, crop type, and any symptoms you\'re observing.',
      'I can certainly help with ' + message + '. Could you tell me more about your specific needs or challenges?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
};

export default function AdvisoryChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    setShowQuickQuestions(false);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        message: getAIResponse(newMessage),
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setNewMessage(question);
    // Optionally auto-send the quick question
    // const fakeEvent = { preventDefault: () => {} };
    // handleSendMessage(fakeEvent);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-gray-50 rounded-lg shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 bg-green-600 text-white">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 mr-3 bg-white bg-opacity-20 rounded-full">
            <BsRobot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Agricultural Advisor</h2>
            <p className="text-xs text-green-100">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        <button className="p-1 text-white rounded-full hover:bg-white hover:bg-opacity-20">
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${msg.sender === 'user' ? 'ml-3 bg-blue-500' : 'mr-3 bg-green-500'} text-white`}
              >
                {msg.sender === 'user' ? <FiUser className="w-4 h-4" /> : <BsRobot className="w-4 h-4" />}
              </div>
              <div>
                <div
                  className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-gray-800' : 'bg-white shadow text-gray-700'}`}
                >
                  {msg.message.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">
                      {line || <br />}
                    </p>
                  ))}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {format(msg.timestamp, 'h:mm a')}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 mr-3 bg-green-500 rounded-full">
              <BsRobot className="w-4 h-4 text-white" />
            </div>
            <div className="flex space-x-1 p-3 bg-white rounded-lg shadow">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      {showQuickQuestions && messages.length <= 3 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="flex items-center flex-1 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
            <button type="button" className="p-1 text-gray-500 hover:text-gray-700">
              <FiPaperclip className="w-5 h-5" />
            </button>
            <button type="button" className="p-1 ml-1 text-gray-500 hover:text-gray-700">
              <FiImage className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
            />
            <button type="button" className="p-1 text-gray-500 hover:text-gray-700">
              <FiMic className="w-5 h-5" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 ml-2 text-white rounded-full ${newMessage.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-2 text-xs text-center text-gray-500">
          Ask about crops, pests, weather, market prices, and more
        </p>
      </form>
    </div>
  );
}
