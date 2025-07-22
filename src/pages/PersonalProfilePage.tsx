import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit, 
  Star, 
  Calendar, 
  MapPin, 
  Clock, 
  User,
  DollarSign,
  TrendingUp,
  Eye,
  MessageSquare,
  Settings,
  ChevronRight,
  Heart,
  BookOpen,
  Award,
  Activity,
  Gift,
  Sparkles,
  Users,
  BarChart3,
  Camera,
  Plus,
  Bell,
  Filter
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import BookingDetailsModal from '../components/BookingDetailsModal';
import FeedbackModal from '../components/FeedbackModal';

const PersonalProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [bookingHistory, setBookingHistory] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackBooking, setFeedbackBooking] = useState(null);

  const { t } = useLanguage();
  const { user } = useAuth();

  // Get booking data from localStorage when component mounts
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    setBookingHistory(bookings.reverse()); // Reverse to show newest bookings first
  }, []);

  // Analytics calculations
  const analytics = {
    totalBookings: bookingHistory.length,
    completedBookings: bookingHistory.filter(b => b.status === 'Completed').length,
    upcomingBookings: bookingHistory.filter(b => b.status === 'Confirmed').length,
    totalSpent: bookingHistory.reduce((sum, booking) => sum + (booking.totalCost || 0), 0),
    averageSpending: bookingHistory.length > 0 ? 
      (bookingHistory.reduce((sum, booking) => sum + (booking.totalCost || 0), 0) / bookingHistory.length).toFixed(0) : 0,
    favoritePhotographers: 3,
    savedConcepts: 12,
    loyaltyPoints: 250
  };

  const savedPhotographers = [
    {
      id: 1,
      name: 'Lily Emily',
      specialty: 'Wedding Photography',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      hourlyRate: '$120/hr',
      location: 'Ho Chi Minh City'
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Portrait Photography',
      rating: 4.8,
      reviews: 96,
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      hourlyRate: '$100/hr',
      location: 'San Francisco'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      specialty: 'Fashion Photography',
      rating: 4.7,
      reviews: 84,
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
      hourlyRate: '$150/hr',
      location: 'Los Angeles'
    }
  ];

  const aiSuggestions = [
    {
      id: 1,
      title: 'Ảnh cưới lãng mạn',
      description: 'Phong cách cổ điển với ánh sáng golden hour',
      image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      category: 'Wedding',
      matches: '95%'
    },
    {
      id: 2,
      title: 'Chân dung nghệ thuật',
      description: 'Phong cách hiện đại với hiệu ứng ánh sáng',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      category: 'Portrait',
      matches: '88%'
    },
    {
      id: 3,
      title: 'Ảnh gia đình ngoài trời',
      description: 'Tự nhiên và ấm áp trong thiên nhiên',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      category: 'Family',
      matches: '92%'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'booking_completed',
      message: 'Bạn đã hoàn thành phiên chụp với Lily Emily',
      time: '2 ngày trước',
      icon: Calendar,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'photographer_saved',
      message: 'Đã lưu Michael Chen vào danh sách yêu thích',
      time: '1 tuần trước',
      icon: Heart,
      color: 'text-pink-600 bg-pink-100'
    },
    {
      id: 3,
      type: 'points_earned',
      message: 'Nhận được 50 điểm loyalty từ booking gần nhất',
      time: '2 tuần trước',
      icon: Gift,
      color: 'text-yellow-600 bg-yellow-100'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-100';
      case 'Confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Completed':
        return t('profile.status.completed');
      case 'Confirmed':
        return t('profile.status.upcoming');
      case 'Cancelled':
        return t('profile.status.cancelled');
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleViewDetails = (booking) => {
    const enhancedBooking = {
      ...booking,
      customerInfo: {
        name: user?.name || t('profile.customer'),
        email: user?.email || 'customer@example.com',
        phone: '+84 123 456 789'
      },
      conceptRequirements: t('profile.defaultConceptRequirements'),
      specialNotes: booking.bookingDetails?.notes || t('profile.defaultSpecialNotes')
    };
    setSelectedBooking(enhancedBooking);
    setIsModalOpen(true);
  };

  const handleLeaveFeedback = (booking) => {
    setFeedbackBooking(booking);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = (feedback) => {
    const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    existingFeedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(existingFeedbacks));
    alert(t('profile.feedbackSuccess'));
  };

  const handleSavePhotographer = (photographerId) => {
    const savedPhotographers = JSON.parse(localStorage.getItem('savedPhotographers') || '[]');
    if (!savedPhotographers.includes(photographerId)) {
      savedPhotographers.push(photographerId);
      localStorage.setItem('savedPhotographers', JSON.stringify(savedPhotographers));
      alert(t('profile.photographerSaved'));
    } else {
      alert(t('profile.photographerAlreadySaved'));
    }
  };

  const handleUnsavePhotographer = (photographerId) => {
    const savedPhotographers = JSON.parse(localStorage.getItem('savedPhotographers') || '[]');
    const updatedSaved = savedPhotographers.filter(id => id !== photographerId);
    localStorage.setItem('savedPhotographers', JSON.stringify(updatedSaved));
    alert(t('profile.photographerUnsaved'));
  };

  const handleMessagePhotographer = (photographer) => {
    const message = prompt(`Gửi tin nhắn tới ${photographer.name}:`);
    if (message) {
      alert(`Đã gửi tin nhắn "${message}" tới ${photographer.name}`);
    }
  };

  const handleCancelBooking = (bookingId) => {
    const reason = prompt('Lý do hủy booking (tùy chọn):');
    const updatedBookings = bookingHistory.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'Cancelled', cancellationReason: reason }
        : booking
    );
    setBookingHistory(updatedBookings);

    // Update localStorage
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    alert(t('profile.bookingCancelled'));
  };

  const handleRebookPhotographer = (photographer) => {
    alert(`Chuyển hướng tới trang đặt chụp với ${photographer.name}`);
    // In real app, navigate to booking page with photographer pre-selected
  };

  const handleSaveConcept = (conceptId) => {
    const savedConcepts = JSON.parse(localStorage.getItem('savedConcepts') || '[]');
    if (!savedConcepts.includes(conceptId)) {
      savedConcepts.push(conceptId);
      localStorage.setItem('savedConcepts', JSON.stringify(savedConcepts));
      alert('Đã lưu concept vào danh sách yêu thích!');
    } else {
      alert('Concept này đã có trong danh sách yêu thích!');
    }
  };

  const handleFindPhotographerForConcept = (concept) => {
    alert(`Tìm nhiếp ảnh gia cho concept "${concept.title}" trong danh mục ${concept.category}`);
    // In real app, navigate to photographers page with category filter
  };

  const handleRefreshSuggestions = () => {
    alert('Đang làm mới gợi ý AI dựa trên sở thích và lịch sử của bạn...');
    // In real app, call API to get new AI suggestions
    setTimeout(() => {
      alert('Đã cập nhật gợi ý mới!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                alt={user?.name || 'User'}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {user?.name || 'Khách hàng'}
                </h1>
                <p className="text-blue-100 mb-2">{user?.email || 'user@example.com'}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    <span className="text-sm">Thành viên từ tháng 3/2024</span>
                  </div>
                  <div className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    <span className="text-sm">{analytics.loyaltyPoints} điểm tích lũy</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100 mb-1">Tổng chi tiêu</p>
              <p className="text-4xl font-bold">${analytics.totalSpent}</p>
              <Link
                to="/edit-profile"
                className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors mt-4"
              >
                <Edit className="h-4 w-4" />
                <span className="text-sm font-medium">Chỉnh sửa</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tổng số booking</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalBookings}</p>
                <p className="text-sm text-green-600 mt-1">+{analytics.completedBookings} hoàn thành</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Booking sắp tới</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.upcomingBookings}</p>
                <p className="text-sm text-blue-600 mt-1">Chuẩn bị sẵn sàng</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Chi tiêu trung bình</p>
                <p className="text-3xl font-bold text-gray-900">${analytics.averageSpending}</p>
                <p className="text-sm text-purple-600 mt-1">Mỗi phiên chụp</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Điểm tích lũy</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.loyaltyPoints}</p>
                <p className="text-sm text-yellow-600 mt-1">Có thể đổi quà</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <Gift className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
                { id: 'bookings', label: 'Lịch sử Booking', icon: Calendar },
                { id: 'favorites', label: 'Yêu thích', icon: Heart },
                { id: 'suggestions', label: 'Gợi ý AI', icon: Sparkles }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    selectedTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-800 font-medium">Booking tuần này</p>
                        <p className="text-2xl font-bold text-green-900">2</p>
                      </div>
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-800 font-medium">Nhiếp ảnh gia yêu thích</p>
                        <p className="text-2xl font-bold text-blue-900">{analytics.favoritePhotographers}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-800 font-medium">Concept đã lưu</p>
                        <p className="text-2xl font-bold text-purple-900">{analytics.savedConcepts}</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Recent Activities and Upcoming Bookings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-600" />
                      Hoạt động gần đây
                    </h2>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                            <activity.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.message}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Bookings */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-green-600" />
                      Booking sắp tới
                    </h2>
                    {bookingHistory.filter(b => b.status === 'Confirmed').slice(0, 3).length > 0 ? (
                      <div className="space-y-4">
                        {bookingHistory.filter(b => b.status === 'Confirmed').slice(0, 3).map((booking) => (
                          <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-gray-900">
                                {booking.photographyType || 'Photography Session'}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {formatDate(booking.bookingDetails?.date)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              với {booking.photographer?.name || 'Photographer'}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{booking.bookingDetails?.time}</span>
                              </div>
                              <span className="text-lg font-bold text-blue-600">
                                ${booking.totalCost}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Không có booking nào sắp tới</p>
                        <Link
                          to="/photographers"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
                        >
                          Đặt ngay →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'bookings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Lịch sử Booking</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Đã xác nhận: {analytics.upcomingBookings}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Hoàn thành: {analytics.completedBookings}</span>
                    </div>
                    <Link
                      to="/photographers"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Đặt mới</span>
                    </Link>
                  </div>
                </div>

                {bookingHistory.length > 0 ? (
                  <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <img
                              src={booking.photographer?.image || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                              alt={booking.photographer?.name || 'Photographer'}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {booking.photographyType || 'Photography Session'}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                  {getStatusText(booking.status)}
                                </span>
                              </div>
                              
                              <div className="flex items-center text-gray-600 mb-2">
                                <User className="h-4 w-4 mr-2" />
                                <span className="font-medium">{booking.photographer?.name || 'Photographer'}</span>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{formatDate(booking.bookingDetails?.date)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{booking.bookingDetails?.time || 'N/A'}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span className="truncate">{booking.bookingDetails?.location || 'N/A'}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                  <span>Thời lượng: {booking.bookingDetails?.duration || 'N/A'} giờ</span>
                                  <span className="mx-2">•</span>
                                  <span>Mã: {booking.reference}</span>
                                </div>
                                <div className="text-lg font-bold text-blue-600">
                                  ${booking.totalCost || 0}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4 pt-4 border-t border-gray-100 space-x-3">
                          {booking.status === 'Completed' && (
                            <button
                              onClick={() => handleLeaveFeedback(booking)}
                              className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
                            >
                              <Star className="h-4 w-4" />
                              <span>Đánh giá</span>
                            </button>
                          )}
                          {booking.status === 'Confirmed' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Hủy booking
                            </button>
                          )}
                          <button
                            onClick={() => handleMessagePhotographer(booking.photographer)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>Nhắn tin</span>
                          </button>
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Chưa có booking nào
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Hãy tìm và đặt nhiếp ảnh gia đầu tiên của bạn
                    </p>
                    <Link
                      to="/photographers"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Tìm nhiếp ảnh gia
                    </Link>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'favorites' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Nhiếp ảnh gia yêu thích</h2>
                  <Link
                    to="/photographers"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <span>Xem tất cả</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedPhotographers.map((photographer) => (
                    <div key={photographer.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={photographer.image}
                          alt={photographer.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900">
                            {photographer.name}
                          </h3>
                          <button
                            onClick={() => handleUnsavePhotographer(photographer.id)}
                            className="text-red-500 hover:text-red-600"
                            title="Xóa khỏi yêu thích"
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{photographer.specialty}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium text-gray-900">
                              {photographer.rating}
                            </span>
                            <span className="text-gray-400 text-sm ml-1">
                              ({photographer.reviews})
                            </span>
                          </div>
                          <span className="text-gray-900 font-medium text-sm">{photographer.hourlyRate}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{photographer.location}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleRebookPhotographer(photographer)}
                            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Đặt lại
                          </button>
                          <button
                            onClick={() => handleMessagePhotographer(photographer)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            title="Gửi tin nhắn"
                          >
                            <MessageSquare className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'suggestions' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Gợi ý AI dành cho bạn</h2>
                  <button
                    onClick={handleRefreshSuggestions}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Làm mới gợi ý</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={suggestion.image}
                          alt={suggestion.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          {suggestion.category}
                        </div>
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                          {suggestion.matches} khớp
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {suggestion.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {suggestion.description}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleFindPhotographerForConcept(suggestion)}
                            className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Tìm nhiếp ảnh gia
                          </button>
                          <button
                            onClick={() => handleSaveConcept(suggestion.id)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            title="Lưu concept"
                          >
                            <Heart className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userType="customer"
      />

      {/* Feedback Modal */}
      <FeedbackModal
        booking={feedbackBooking}
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
};

export default PersonalProfilePage;
