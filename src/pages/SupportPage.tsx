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
  ChevronDown,
  Lightbulb,
  Camera,
  Heart,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SupportPage = () => {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [chatMessages, setChatMessages] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const supportCategories = [
    {
      id: 'getting-started',
      icon: HelpCircle,
      title: t('support.gettingStarted'),
      description: t('support.gettingStartedDesc')
    },
    {
      id: 'account-settings',
      icon: Settings,
      title: t('support.accountSettings'),
      description: t('support.accountSettingsDesc')
    },
    {
      id: 'matching-process',
      icon: Users,
      title: t('support.matchingProcess'),
      description: t('support.matchingProcessDesc')
    },
    {
      id: 'pricing-plans',
      icon: CreditCard,
      title: t('support.pricingPlans'),
      description: t('support.pricingPlansDesc')
    },
    {
      id: 'faq',
      icon: FileText,
      title: t('support.faq'),
      description: t('support.faqDesc')
    }
  ];

  const helpfulResources = [
    { title: t('support.gettingStartedGuide'), href: '#' },
    { title: t('support.accountSecurity'), href: '#' },
    { title: t('support.privacySettings'), href: '#' },
    { title: t('support.paymentMethods'), href: '#' },
    { title: t('support.termsOfService'), href: '#' }
  ];

  const quickActions = [
    t('support.quickActions.booking'),
    t('support.quickActions.price'),
    t('support.quickActions.matching'),
    t('support.quickActions.setup')
  ];

  // Popular concept suggestions that AI will show initially
  const popularConcepts = [
    {
      id: 1,
      title: 'Ảnh cưới lãng mạn',
      description: 'Phong cách cổ điển với ánh sáng tự nhiên',
      icon: Heart,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50'
    },
    {
      id: 2,
      title: 'Chân dung nghệ thuật',
      description: 'Phong cách hiện đại với hiệu ứng ánh sáng',
      icon: Camera,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      title: 'Ảnh gia đình ngoài trời',
      description: 'Tự nhiên và ấm áp trong môi trường thiên nhiên',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 4,
      title: 'Ảnh thời trang đường phố',
      description: 'Phong cách urban với background thành phố',
      icon: Sparkles,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  // Initialize chat with AI greeting and concept suggestions
  React.useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        type: 'bot',
        message: 'Xin chào! Tôi là AI Assistant của SnapMatch. Tôi có thể giúp bạn tìm hiểu về các concept chụp ảnh phổ biến hoặc trả lời các câu hỏi khác.',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      }
    ];
    setChatMessages(initialMessages);
  }, []);

  const handleConceptClick = (concept) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: `Tôi muốn tìm hiểu về ${concept.title.toLowerCase()}`,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      message: `${concept.title} là một trong những concept được yêu thích nhất! ${concept.description}. Bạn có thể tìm thấy nhiều nhiếp ảnh gia chuyên về phong cách này trên nền tảng của chúng tôi. Bạn có muốn tôi giúp tìm nhiếp ảnh gia phù hợp không?`,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    };

    setChatMessages(prev => [...prev, userMessage, botResponse]);
    setShowSuggestions(false);
  };

  const handleQuickActionClick = (action) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: action,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    let botResponse = '';
    if (action.includes('đặt lịch')) {
      botResponse = 'Để đặt lịch chụp ảnh, bạn có thể: 1) Tìm kiếm nhiếp ảnh gia phù hợp trên trang "Find Photographers", 2) Xem hồ sơ và portfolio của họ, 3) Nhấn "Book Now" để đặt lịch. Bạn có cần tôi hướng dẫn chi tiết hơn không?';
    } else if (action.includes('giá')) {
      botResponse = 'Giá chụp ảnh thường dao động từ $50-200/giờ tùy thuộc vào: kinh nghiệm của nhiếp ảnh gia, loại hình chụp (cưới, chân dung, sự kiện), địa điểm và thời gian. Bạn có thể lọc theo ngân sách khi tìm kiếm nhiếp ảnh gia.';
    } else if (action.includes('AI')) {
      botResponse = 'Hệ thống AI của chúng tôi phân tích phong cách, sở thích và yêu cầu của bạn để gợi ý những nhiếp ảnh gia phù hợp nhất. AI cũng hỗ trợ tạo concept, chỉnh sửa ảnh tự động và ghép đôi phong cách. Bạn muốn thử tính năng nào?';
    } else {
      botResponse = 'Để thiết lập tài khoản, bạn có thể đăng ký bằng email hoặc Google. Sau đó hoàn thiện hồ sơ với thông tin cá nhân và sở thích chụp ảnh. Tôi có thể hướng dẫn bạn từng bước nếu cần.';
    }

    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      message: botResponse,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    };

    setChatMessages(prev => [...prev, userMessage, botMessage]);
    setShowSuggestions(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        message: message.trim(),
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      // Simple AI response logic
      let botResponse = 'Cảm ơn bạn đã liên hệ! Tôi đang xử lý câu hỏi của bạn. Trong thời gian chờ, bạn có thể xem các concept phổ biến hoặc liên hệ trực tiếp với đội ngũ hỗ trợ qua email support@snapmatch.ai';
      
      if (message.toLowerCase().includes('concept') || message.toLowerCase().includes('ý tưởng')) {
        botResponse = 'Tôi có thể giúp bạn tìm hiểu về các concept chụp ảnh phổ biến! Một số concept được yêu thích nhất bao gồm: ảnh cưới lãng mạn, chân dung nghệ thuật, ảnh gia đình ngoài trời, và ảnh thời trang đường phố. Bạn quan tâm đến concept nào?';
      } else if (message.toLowerCase().includes('giá') || message.toLowerCase().includes('chi phí')) {
        botResponse = 'Về giá cả, chúng tôi có nhiều mức giá khác nhau từ $50-200/giờ. Giá phụ thuộc vào kinh nghiệm nhiếp ảnh gia, loại hình chụp và yêu cầu cụ thể. Bạn có thể lọc theo ngân sách khi tìm kiếm nhiếp ảnh gia phù hợp.';
      } else if (message.toLowerCase().includes('đặt lịch') || message.toLowerCase().includes('booking')) {
        botResponse = 'Để đặt lịch, bạn chỉ cần: 1) Tìm nhiếp ảnh gia phù hợp, 2) Xem portfolio và đánh giá, 3) Chọn ngày giờ và địa điểm, 4) Xác nhận và thanh toán. Rất đơn giản! Bạn có cần hướng dẫn chi tiết không?';
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      };

      setChatMessages(prev => [...prev, userMessage, botMessage]);
      setMessage('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('support.title')}</h2>
              
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
              <h3 className="font-semibold text-gray-900 mb-4">{t('support.contactInfo')}</h3>
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
                    <h3 className="font-semibold text-gray-900">{t('support.chatWithAI')}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{t('support.online')}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{t('support.respondsIn')}</p>
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

                {/* Popular Concepts Suggestions */}
                {showSuggestions && (
                  <div className="mt-6">
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <h4 className="font-medium text-gray-900">Concept phổ biến</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {popularConcepts.map((concept) => (
                          <button
                            key={concept.id}
                            onClick={() => handleConceptClick(concept)}
                            className={`${concept.bgColor} border border-gray-200 rounded-lg p-3 text-left hover:shadow-md transition-all duration-200 group`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`${concept.color} group-hover:scale-110 transition-transform duration-200`}>
                                <concept.icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900 mb-1">{concept.title}</h5>
                                <p className="text-sm text-gray-600">{concept.description}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">Câu hỏi thường gặp</h4>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickActionClick(action)}
                            className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 hover:border-blue-300 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Nhập câu hỏi của bạn hoặc chọn concept phía trên..."
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
              <h3 className="font-semibold text-gray-900 mb-4">{t('support.helpfulResources')}</h3>
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
              <h3 className="font-semibold text-gray-900 mb-4">{t('support.needMoreHelp')}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {t('support.cantFind')}
              </p>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                {t('support.contactSupport')}
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
              <Link to="#" className="hover:text-blue-600 transition-colors">{t('support.privacyPolicy')}</Link>
              <Link to="#" className="hover:text-blue-600 transition-colors">{t('support.termsOfService')}</Link>
              <Link to="#" className="hover:text-blue-600 transition-colors">{t('support.helpCenter')}</Link>
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