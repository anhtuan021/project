import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Edit, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Star, 
  DollarSign,
  Save,
  Upload,
  Plus,
  X,
  Eye,
  Settings,
  Award,
  Clock,
  TrendingUp,
  Image,
  Portfolio,
  Bell,
  CreditCard,
  Users
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getPhotographerById } from '../data/photographers';

const PhotographerSettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '+84 123 456 789',
    location: 'Ho Chi Minh City, Vietnam',
    avatar: '',
    bio: 'Professional photographer with 5+ years experience in wedding and portrait photography.',
    specialties: ['Wedding', 'Portrait'],
    pricing: {
      hourly: 150,
      halfDay: 800,
      fullDay: 1500,
      wedding: 2500
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    equipment: ['Canon EOS R5', 'Sony A7III', 'Various Lenses', 'Studio Lighting'],
    experience: 5,
    rating: 4.9,
    totalBookings: 127,
    totalEarnings: 15600
  });

  const [portfolioImages, setPortfolioImages] = useState([
    'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
  ]);

  const [notifications, setNotifications] = useState({
    newBookings: true,
    bookingUpdates: true,
    paymentAlerts: true,
    promotional: false
  });

  const { t } = useLanguage();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    if (user) {
      const photographerData = user.photographerId ? getPhotographerById(user.photographerId) : null;
      
      setProfileData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        avatar: user.avatar || prev.avatar,
        specialties: photographerData?.specialties || prev.specialties,
        rating: photographerData?.rating || prev.rating,
        location: photographerData?.location || prev.location
      }));
    }
  }, [user]);

  const handleSaveProfile = () => {
    console.log('Saving photographer profile:', profileData);

    // Update user in AuthContext
    if (user && updateUser) {
      const updatedUserData = {
        name: profileData.name,
        email: profileData.email,
        avatar: profileData.avatar,
        location: profileData.location,
        bio: profileData.bio,
        phone: profileData.phone,
        specialties: profileData.specialties,
        equipment: profileData.equipment
      };

      updateUser(updatedUserData);
    }

    setIsEditing(false);
    alert(t('editProfile.success') || 'Thông tin profile đã được cập nhật thành công!');
  };

  const handleAddSpecialty = (specialty: string) => {
    if (specialty && !profileData.specialties.includes(specialty)) {
      setProfileData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  const handleAddEquipment = (equipment: string) => {
    if (equipment && !profileData.equipment.includes(equipment)) {
      setProfileData(prev => ({
        ...prev,
        equipment: [...prev.equipment, equipment]
      }));
    }
  };

  const handleRemoveEquipment = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== index)
    }));
  };

  const recentBookings = [
    {
      id: 1,
      type: 'Wedding Photography',
      client: 'Nguyễn Văn A',
      date: '2024-02-15',
      status: 'Completed',
      amount: 2500
    },
    {
      id: 2,
      type: 'Portrait Session',
      client: 'Trần Thị B',
      date: '2024-02-10',
      status: 'Completed',
      amount: 800
    },
    {
      id: 3,
      type: 'Family Photos',
      client: 'Lê Văn C',
      date: '2024-02-05',
      status: 'Completed',
      amount: 600
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profileData.avatar || user?.avatar || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <Camera className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                <p className="text-purple-100 mb-2 flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Professional Photographer
                </p>
                <div className="flex items-center space-x-4 text-sm text-purple-200">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {profileData.rating}/5
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {profileData.totalBookings} bookings
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profileData.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <p className="text-sm text-purple-100 mb-1">Tổng thu nhập</p>
                <p className="text-2xl font-bold">${profileData.totalEarnings}</p>
                <p className="text-sm text-purple-200 flex items-center justify-end">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% tháng này
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Đánh giá</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.rating}/5</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tổng booking</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.totalBookings}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Thu nhập</p>
                <p className="text-2xl font-bold text-gray-900">${profileData.totalEarnings}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Kinh nghiệm</p>
                <p className="text-2xl font-bold text-gray-900">{profileData.experience} năm</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8 overflow-x-auto">
              {[
                { id: 'profile', label: 'Thông tin cá nhân', icon: User },
                { id: 'portfolio', label: 'Portfolio', icon: Image },
                { id: 'pricing', label: 'Bảng giá', icon: DollarSign },
                { id: 'availability', label: 'Lịch trống', icon: Calendar },
                { id: 'bookings', label: 'Booking gần đây', icon: Clock },
                { id: 'settings', label: 'Cài đặt', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 whitespace-nowrap ${
                    selectedTab === tab.id
                      ? 'border-purple-600 text-purple-600'
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
            {selectedTab === 'profile' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Thông tin cá nhân</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>{isEditing ? 'Hủy' : 'Chỉnh sửa'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Họ và tên
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="text"
                              value={profileData.name}
                              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                              disabled={!isEditing}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                              disabled={!isEditing}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số điện thoại
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                              disabled={!isEditing}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Địa điểm
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="text"
                              value={profileData.location}
                              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                              disabled={!isEditing}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mô tả
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chuyên môn
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {profileData.specialties.map((specialty, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                              {specialty}
                              {isEditing && (
                                <button
                                  onClick={() => handleRemoveSpecialty(index)}
                                  className="ml-2 text-purple-600 hover:text-purple-800"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              )}
                            </span>
                          ))}
                        </div>
                        {isEditing && (
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Thêm chuyên môn mới"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddSpecialty(e.target.value);
                                  e.target.value = '';
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thiết bị
                        </label>
                        <div className="space-y-2">
                          {profileData.equipment.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-700">{item}</span>
                              {isEditing && (
                                <button
                                  onClick={() => handleRemoveEquipment(index)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        {isEditing && (
                          <div className="mt-2 flex space-x-2">
                            <input
                              type="text"
                              placeholder="Thêm thiết bị mới"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddEquipment(e.target.value);
                                  e.target.value = '';
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {isEditing && (
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                          >
                            <Save className="h-4 w-4" />
                            <span>Lưu thay đổi</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Thống kê</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Đánh giá trung bình</span>
                          <span className="font-semibold">{profileData.rating}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tổng booking</span>
                          <span className="font-semibold">{profileData.totalBookings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tổng thu nhập</span>
                          <span className="font-semibold text-green-600">${profileData.totalEarnings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Kinh nghiệm</span>
                          <span className="font-semibold">{profileData.experience} năm</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <Link
                          to="/photographer-dashboard"
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          Photographer Dashboard
                        </Link>
                        <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                          Xem Portfolio
                        </button>
                        <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                          Quản lý booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'portfolio' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Portfolio</h2>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Tải ảnh lên</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioImages.map((image, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden shadow-md">
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                          <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors">
                    <div className="text-center">
                      <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Thêm ảnh mới</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'pricing' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900">Bảng giá dịch vụ</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Giá cơ bản</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Theo giờ</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold">${profileData.pricing.hourly}</span>
                            <span className="text-sm text-gray-500">/giờ</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Nửa ngày (4 giờ)</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold">${profileData.pricing.halfDay}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Cả ngày (8 giờ)</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold">${profileData.pricing.fullDay}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Wedding package</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-purple-600">${profileData.pricing.wedding}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Dịch vụ bổ sung</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Chỉnh sửa ảnh cao cấp</span>
                          <span className="font-semibold">$50/ảnh</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Album ảnh vật lý</span>
                          <span className="font-semibold">$200</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Giao ảnh nhanh (24h)</span>
                          <span className="font-semibold">$100</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Backup đám mây</span>
                          <span className="font-semibold">$25</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h3 className="font-semibold text-purple-900 mb-2">Ghi chú về giá</h3>
                      <p className="text-sm text-purple-700">
                        Giá có thể thay đổi tùy theo địa điểm, thời gian và yêu cầu đặc biệt. 
                        Vui lòng liên hệ để được báo giá chi tiết.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                    <Edit className="h-4 w-4" />
                    <span>Cập nhật bảng giá</span>
                  </button>
                </div>
              </div>
            )}

            {selectedTab === 'availability' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900">Lịch làm việc</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Lịch hàng tuần</h3>
                    <div className="space-y-3">
                      {Object.entries(profileData.availability).map(([day, available]) => (
                        <div key={day} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <span className="font-medium text-gray-900 capitalize">
                            {day === 'monday' ? 'Thứ 2' :
                             day === 'tuesday' ? 'Thứ 3' :
                             day === 'wednesday' ? 'Thứ 4' :
                             day === 'thursday' ? 'Thứ 5' :
                             day === 'friday' ? 'Thứ 6' :
                             day === 'saturday' ? 'Thứ 7' :
                             'Chủ nhật'}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={available}
                              onChange={(e) => setProfileData(prev => ({
                                ...prev,
                                availability: {
                                  ...prev.availability,
                                  [day]: e.target.checked
                                }
                              }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Lịch booking sắp tới</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-blue-900">Wedding Photography</p>
                            <p className="text-sm text-blue-700">Nguyễn Văn A</p>
                            <p className="text-sm text-blue-600">25/02/2024 - 08:00</p>
                          </div>
                          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs">
                            Confirmed
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-green-900">Portrait Session</p>
                            <p className="text-sm text-green-700">Trần Thị B</p>
                            <p className="text-sm text-green-600">28/02/2024 - 14:00</p>
                          </div>
                          <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'bookings' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900">Booking gần đây</h2>

                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Camera className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{booking.type}</h3>
                            <p className="text-sm text-gray-600">Khách hàng: {booking.client}</p>
                            <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">${booking.amount}</p>
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'settings' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-900">Cài đặt</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Thông báo
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 capitalize">
                              {key === 'newBookings' ? 'Booking mới' :
                               key === 'bookingUpdates' ? 'Cập nhật booking' :
                               key === 'paymentAlerts' ? 'Thông báo thanh toán' :
                               'Thông báo khuyến mãi'}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => setNotifications(prev => ({
                                  ...prev,
                                  [key]: e.target.checked
                                }))}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Thanh toán
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Phương thức ưa thích</span>
                          <span className="text-sm font-medium">Chuyển khoản</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Phí platform</span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Thanh toán cuối</span>
                          <span className="text-sm font-medium">01/02/2024</span>
                        </div>
                      </div>
                      <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        Cập nhật thông tin thanh toán
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Lưu cài đặt</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerSettingsPage;
