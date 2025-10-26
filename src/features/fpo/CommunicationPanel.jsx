import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaPaperPlane, 
  FaPaperclip, 
  FaSmile, 
  FaEllipsisV, 
  FaCheck, 
  FaCheckDouble, 
  FaReply,
  FaTrash,
  FaArchive,
  FaBell,
  FaBellSlash,
  FaUserPlus,
  FaUsers,
  FaUserTag,
  FaPhone,
  FaVideo,
  FaInfoCircle,
  FaArrowLeft
} from 'react-icons/fa';
import { BsThreeDotsVertical, BsEmojiSmile } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import { format } from 'date-fns';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Farmer',
    lastMessage: 'When will the next procurement happen?',
    time: '10:30 AM',
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    online: true,
    messages: [
      {
        id: 1,
        text: 'Namaste, when is the next procurement date?',
        time: '10:20 AM',
        sent: false,
        read: true
      },
      {
        id: 2,
        text: 'Hello Rajesh, the next procurement is scheduled for 25th October.',
        time: '10:25 AM',
        sent: true,
        read: true
      },
      {
        id: 3,
        text: 'When will the next procurement happen?',
        time: '10:30 AM',
        sent: false,
        read: false
      }
    ]
  },
  {
    id: 2,
    name: 'Suresh Patel',
    role: 'Farmer',
    lastMessage: 'Received the payment, thank you!',
    time: 'Yesterday',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    online: false
  },
  {
    id: 3,
    name: 'Vijay Singh',
    role: 'Farmer',
    lastMessage: 'Need information about organic farming',
    time: 'Yesterday',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    online: true
  },
  {
    id: 4,
    name: 'Anita Devi',
    role: 'Farmer',
    lastMessage: 'When is the next training session?',
    time: 'Monday',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    online: false
  },
  {
    id: 5,
    name: 'Rameshwar Yadav',
    role: 'Farmer',
    lastMessage: 'I have submitted my documents',
    time: 'Last week',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    online: false
  }
];

// Mock data for announcements
const mockAnnouncements = [
  {
    id: 1,
    title: 'Next Procurement Date',
    content: 'The next procurement for Soybean and Groundnut will be on 25th October 2024. Please ensure your produce meets the quality standards.',
    date: '2024-10-20',
    priority: 'high',
    read: false
  },
  {
    id: 2,
    title: 'Training Session on Organic Farming',
    content: 'Join us for a training session on Organic Farming Practices on 28th October 2024 at the FPO office.',
    date: '2024-10-18',
    priority: 'medium',
    read: true
  },
  {
    id: 3,
    title: 'New Market Rates',
    content: 'Updated market rates for various crops have been published. Please check the app for details.',
    date: '2024-10-15',
    priority: 'medium',
    read: true
  }
];

const CommunicationPanel = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [showNewAnnouncementForm, setShowNewAnnouncementForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium',
    date: new Date().toISOString().split('T')[0]
  });

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      time: format(new Date(), 'h:mm a'),
      sent: true,
      read: false
    };

    // Update the selected conversation with the new message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: message,
          time: 'Just now',
          messages: [...(conv.messages || []), newMessage]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setMessage('');
  };

  // Handle creating a new announcement
  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    const newAnnouncementObj = {
      id: Date.now(),
      ...newAnnouncement,
      read: false,
      date: new Date().toISOString().split('T')[0]
    };

    setAnnouncements([newAnnouncementObj, ...announcements]);
    setShowNewAnnouncementForm(false);
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'medium',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Mark announcement as read
  const markAsRead = (id) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, read: true } : ann
    ));
  };

  // Get priority badge style
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Communications</h1>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaUserPlus className="text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <BsThreeDotsVertical className="text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Tabs */}
          <div className="flex mt-4 border-b">
            <button
              className={`flex-1 py-2 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'chats' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('chats')}
            >
              Chats
            </button>
            <button
              className={`flex-1 py-2 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'announcements' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('announcements')}
            >
              Announcements
            </button>
          </div>
        </div>
        
        {/* Conversations/Announcements List */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chats' ? (
            // Chats List
            <div className="divide-y divide-gray-200">
              {filteredConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center ${selectedConversation?.id === conversation.id ? 'bg-green-50' : ''}`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="relative">
                    <img 
                      src={conversation.avatar} 
                      alt={conversation.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500 truncate max-w-[180px]">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{conversation.role}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Announcements List
            <div className="p-2">
              <button
                onClick={() => setShowNewAnnouncementForm(true)}
                className="w-full mb-3 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
              >
                <FaPlus className="mr-2" /> New Announcement
              </button>
              
              {announcements.map(announcement => (
                <div 
                  key={announcement.id}
                  className={`p-3 mb-2 rounded-lg border ${!announcement.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
                  onClick={() => markAsRead(announcement.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {announcement.content.length > 80 
                      ? `${announcement.content.substring(0, 80)}...` 
                      : announcement.content}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {format(new Date(announcement.date), 'MMM d, yyyy')}
                    </span>
                    {!announcement.read && (
                      <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Right Panel - Chat or Announcement Detail */}
      <div className="hidden md:flex md:flex-1 flex-col bg-white">
        {selectedConversation ? (
          // Chat View
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedConversation(null)}
                >
                  <FaArrowLeft className="text-gray-600" />
                </button>
                <div className="relative">
                  <img 
                    src={selectedConversation.avatar} 
                    alt={selectedConversation.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  {selectedConversation.online && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{selectedConversation.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <FaPhone />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <FaVideo />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <FaInfoCircle />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {selectedConversation.messages?.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sent ? 'bg-green-100 rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none'}`}
                    >
                      <p className="text-sm text-gray-800">{msg.text}</p>
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs text-gray-400">{msg.time}</span>
                        {msg.sent && (
                          <span className="text-xs">
                            {msg.read ? (
                              <FaCheckDouble className="text-blue-500" />
                            ) : (
                              <FaCheck className="text-gray-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                  <FaPaperclip />
                </button>
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                  <BsEmojiSmile />
                </button>
                <input
                  type="text"
                  className="flex-1 mx-2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button 
                  type="submit"
                  className="p-2 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <IoMdSend />
                </button>
              </form>
            </div>
          </>
        ) : showNewAnnouncementForm ? (
          // New Announcement Form
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">New Announcement</h2>
                <button 
                  onClick={() => setShowNewAnnouncementForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaArrowLeft className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    placeholder="Enter announcement title"
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    id="content"
                    rows="6"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    placeholder="Enter announcement details..."
                  />
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    id="priority"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewAnnouncementForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Publish Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <FaCommentAlt className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
            <p className="text-gray-500 max-w-md">
              {activeTab === 'chats' 
                ? 'Select a conversation or start a new one to begin messaging.'
                : 'Create a new announcement or select an existing one to view details.'}
            </p>
            {activeTab === 'announcements' && !showNewAnnouncementForm && (
              <button
                onClick={() => setShowNewAnnouncementForm(true)}
                className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                New Announcement
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationPanel;
