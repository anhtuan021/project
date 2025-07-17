import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PersonalProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [bookingHistory, setBookingHistory] = useState([]);

  const { language, t } = useLanguage();

  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    joinDate: 'Tham gia từ tháng 3, 2024'
  };

  // Lấy dữ liệu booking từ localStorage khi component mount
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
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
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'upcoming':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Đã hoàn thành';
      case 'upcoming':
        return 'Sắp tới';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500">{user.joinDate}</p>
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
            <div className="space-y-4">
              {bookingHistory
                .filter(booking =>
                  selectedTab === 'upcoming'
                    ? booking.status === 'upcoming'
                    : booking.status === 'completed'
                )
                .map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.photographer?.image || booking.image}
                        alt={booking.photographer?.name || booking.type}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {booking.photographyType || booking.type}
                        </h3>
                        <p className="text-gray-600">
                          {booking.photographer?.name || booking.photographer}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.bookingDetails?.date || booking.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        {t('profile.viewDetails')}
                      </button>
                    </div>
                  </div>
                ))
              }
              {bookingHistory.filter(
                booking =>
                  selectedTab === 'upcoming'
                    ? booking.status === 'upcoming'
                    : booking.status === 'completed'
                ).length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  {t('profile.noBookingHistory')}
                </div>
              )}
            </div>
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
    </div>
  );
};

export default PersonalProfilePage;
