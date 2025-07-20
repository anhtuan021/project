import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Star, Calendar, MapPin, Clock, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import BookingDetailsModal from '../components/BookingDetailsModal';

const PersonalProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [bookingHistory, setBookingHistory] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useLanguage();
  const { user } = useAuth();

  // Lấy dữ liệu booking từ localStorage khi component mount
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    console.log('Loaded bookings:', bookings); // Debug log
    setBookingHistory(bookings.reverse()); // Đảo chiều để booking mới nhất lên trên
  }, []);

  const savedPhotographers = [
    {
      id: 1,
      name: 'Nhiếp ảnh gia Minh',
      specialty: 'Ảnh cưới, Chân dung',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Nhiếp ảnh gia Hương',
      specialty: 'Ảnh gia đình',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Nhiếp ảnh gia Tuấn',
      specialty: 'Ảnh sự kiện',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Nhiếp ảnh gia Linh',
      specialty: 'Ảnh thời trang',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    }
  ];

  const aiSuggestions = [
    {
      id: 1,
      title: 'Ảnh cưới lãng mạn',
      description: 'Phong cách cổ điển với ánh sáng tự nhiên',
      image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Chân dung nghệ thuật',
      description: 'Phong cách hiện đại với hiệu ứng ánh sáng',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Ảnh gia đình ngoài trời',
      description: 'Tự nhiên và ấm áp trong môi trường thiên nhiên',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Ảnh thời trang đường phố',
      description: 'Phong cách urban với background thành phố',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Ảnh chân dung studio',
      description: 'Chuyên nghiệp với ánh sáng studio được kiểm soát',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
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
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Filter bookings based on selected tab
  const filteredBookings = bookingHistory.filter(booking => {
    if (selectedTab === 'upcoming') {
      return booking.status === 'Confirmed';
    } else {
      return booking.status === 'Completed';
    }
  });

  const handleViewDetails = (booking: any) => {
    // Add sample customer info and additional details for demo
    const enhancedBooking = {
      ...booking,
      customerInfo: {
        name: user?.name || 'Khách hàng',
        email: user?.email || 'customer@example.com',
        phone: '+84 123 456 789'
      },
      conceptRequirements: 'Chụp ảnh tự nhiên, phong cách hiện đại với ánh sáng tự nhiên. Tập trung vào cảm xúc và khoảnh khắc chân thực.',
      specialNotes: booking.bookingDetails?.notes || 'Vui lòng đến đúng giờ. Mang theo trang phục dự phòng. Liên hệ trước 30 phút nếu có thay đổi.'
    };
    setSelectedBooking(enhancedBooking);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                alt={user?.name || 'User'}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{user?.name || 'User'}</h1>
                <p className="text-gray-600 mb-2">{user?.email || 'user@example.com'}</p>
                <p className="text-sm text-gray-500">{t('profile.joinedSince')} March 2024</p>
              </div>
            </div>
            <Link
              to="/edit-profile"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>{t('profile.editProfile')}</span>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              <button
                onClick={() => setSelectedTab('upcoming')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'upcoming'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('profile.upcoming')}
              </button>
              <button
                onClick={() => setSelectedTab('completed')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'completed'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t('profile.completed')}
              </button>
            </div>
          </div>

          {/* Booking History */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('profile.bookingHistory')}</h2>
            
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
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
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-gray-500">
                              <span>Duration: {booking.bookingDetails?.duration || 'N/A'} hours</span>
                              <span className="mx-2">•</span>
                              <span>Reference: {booking.reference}</span>
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              ${booking.totalCost || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleViewDetails(booking)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {t('profile.viewDetails')}
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
                  {selectedTab === 'upcoming' ? t('profile.noUpcoming') : t('profile.noCompleted')}
                </h3>
                <p className="text-gray-500 mb-6">
                  {selectedTab === 'upcoming' 
                    ? t('profile.noUpcomingDesc')
                    : t('profile.noCompletedDesc')
                  }
                </p>
                <Link
                  to="/photographers"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('profile.findPhotographers')}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Saved Photographers */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('profile.savedPhotographers')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedPhotographers.map((photographer) => (
              <div key={photographer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-gray-900 mb-1">{photographer.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{photographer.specialty}</p>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-900">{photographer.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('profile.aiSuggestions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {aiSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="group cursor-pointer">
                <div className="aspect-video rounded-lg overflow-hidden mb-3">
                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{suggestion.title}</h3>
                <p className="text-sm text-gray-600">{suggestion.description}</p>
              </div>
            ))}
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
    </div>
  );
};

export default PersonalProfilePage;