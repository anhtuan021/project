import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Settings, 
  Users, 
  CreditCard, 
  FileText, 
  Mail, 
  Phone, 
  Send, 
  Paperclip,
  Sun,
  Moon,
  Globe,
  ChevronDown
} from 'lucide-react';

const SupportPage = () => {
  const [message, setMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const supportCategories = [
    {
      id: 'getting-started',
      icon: HelpCircle,
      title: 'Getting Started',
      description: 'Learn the basics of SnapMatch AI'
    },
    {
      id: 'account-settings',
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage your account preferences'
    },
    {
      id: 'matching-process',
      icon: Users,
      title: 'Matching Process',
      description: 'How our AI matching works'
    },
    {
      id: 'pricing-plans',
      icon: CreditCard,
      title: 'Pricing & Plans',
      description: 'Billing and subscription info'
    },
    {
      id: 'faq',
      icon: FileText,
      title: 'FAQ',
      description: 'Frequently asked questions'
    }
  ];

  const helpfulResources = [
    { title: 'Getting Started Guide', href: '#' },
    { title: 'Account Security', href: '#' },
    { title: 'Privacy Settings', href: '#' },
    { title: 'Payment Methods', href: '#' },
    { title: 'Terms of Service', href: '#' }
  ];

  const quickActions = [
    'How do I book?',
    'What\'s the price range?',
    'How does the AI matching work?',
    'Account setup help'
  ];

  const chatMessages = [
    {
      id: 1,
      type: 'bot',
      message: "Hello! I'm your SnapMatch AI assistant. How can I help you today?",
      time: '9:41 AM',
      avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      type: 'user',
      message: "I'd like to know more about the AI matching process.",
      time: '9:42 AM'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Support Center</h2>
              
              <div className="space-y-2">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <category.icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">{category.title}</div>
                      <div className="text-sm text-gray-500">{category.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>support@snapmatch.ai</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+84 (777) 123-45555</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Chat Interface */}
            <div className="bg-white rounded-xl shadow-sm h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">AI</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Chat with SnapMatch AI</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Usually responds in 1 minute</p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {msg.type === 'bot' && (
                          <img
                            src={msg.avatar}
                            alt="AI Assistant"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        {msg.type === 'user' && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">U</span>
                          </div>
                        )}
                        <div>
                          <div className={`p-3 rounded-lg ${
                            msg.type === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Helpful Resources</h3>
              <div className="space-y-3">
                {helpfulResources.map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="block text-blue-600 hover:text-blue-700 text-sm transition-colors"
                  >
                    {resource.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Need More Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Can't find what you're looking for? Contact our support team.
              </p>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link to="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-blue-600 transition-colors">Help Center</Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">© 2024 SnapMatch AI. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;