import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Camera, 
  DollarSign, 
  Star, 
  Trash2, 
  Edit, 
  Search, 
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  BarChart3,
  Calendar,
  Award,
  Shield,
  Activity,
  Clock,
  MapPin,
  Phone,
  Mail,
  Download,
  RefreshCw,
  Plus,
  Settings
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useLanguage();

  // Load data on component mount
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    setIsLoading(true);
    
    // Load sample data - in real app this would come from API
    const sampleUsers = [
      {
        id: '1',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        userType: 'customer',
        joinDate: '2024-01-15',
        totalBookings: 5,
        totalSpent: 1200,
        status: 'active',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        lastActive: '2024-01-20'
      },
      {
        id: '2',
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        userType: 'customer',
        joinDate: '2024-02-01',
        totalBookings: 2,
        totalSpent: 600,
        status: 'active',
        avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        lastActive: '2024-01-18'
      },
      {
        id: '3',
        name: 'Lê Văn C',
        email: 'levanc@example.com',
        userType: 'customer',
        joinDate: '2024-01-10',
        totalBookings: 8,
        totalSpent: 2400,
        status: 'active',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        lastActive: '2024-01-21'
      }
    ];

    const samplePhotographers = [
      {
        id: '1',
        name: 'Lily Emily',
        email: 'lily@photographer.com',
        userType: 'photographer',
        joinDate: '2023-12-01',
        totalBookings: 45,
        totalEarnings: 12000,
        monthlyFee: 50,
        lastPayment: '2024-01-01',
        status: 'active',
        rating: 4.9,
        reviews: 127,
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        specialties: ['Wedding', 'Portrait'],
        location: 'Ho Chi Minh City'
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael@photographer.com',
        userType: 'photographer',
        joinDate: '2024-01-10',
        totalBookings: 23,
        totalEarnings: 6900,
        monthlyFee: 50,
        lastPayment: '2024-01-10',
        status: 'pending_payment',
        rating: 4.8,
        reviews: 96,
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        specialties: ['Commercial', 'Event'],
        location: 'San Francisco'
      },
      {
        id: '3',
        name: 'Emma Rodriguez',
        email: 'emma@photographer.com',
        userType: 'photographer',
        joinDate: '2023-11-15',
        totalBookings: 67,
        totalEarnings: 18500,
        monthlyFee: 50,
        lastPayment: '2024-01-01',
        status: 'active',
        rating: 4.7,
        reviews: 84,
        avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        specialties: ['Fashion', 'Portrait'],
        location: 'Los Angeles'
      }
    ];

    const sampleBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    
    const sampleFeedbacks = [
      {
        id: '1',
        bookingId: 'booking_001',
        customerName: 'Nguyễn Văn A',
        photographerName: 'Lily Emily',
        rating: 5,
        comment: 'Nhiếp ảnh gia rất chuyên nghiệp, ảnh đẹp và giao hàng đúng hẹn!',
        date: '2024-01-20',
        status: 'published',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      {
        id: '2',
        bookingId: 'booking_002',
        customerName: 'Trần Thị B',
        photographerName: 'Michael Chen',
        rating: 4,
        comment: 'Chất lượng ảnh tốt, tuy nhiên có chút chậm trễ trong việc giao ảnh.',
        date: '2024-01-25',
        status: 'pending',
        avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      {
        id: '3',
        bookingId: 'booking_003',
        customerName: 'Lê Văn C',
        photographerName: 'Emma Rodriguez',
        rating: 5,
        comment: 'Tuyệt vời! Ảnh chụp rất nghệ thuật và đúng ý tôi muốn.',
        date: '2024-01-22',
        status: 'published',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      }
    ];

    setTimeout(() => {
      setUsers(sampleUsers);
      setPhotographers(samplePhotographers);
      setBookings(sampleBookings);
      setFeedbacks(sampleFeedbacks);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteUser = (userId, userType) => {
    if (userType === 'photographer') {
      setPhotographers(prev => prev.filter(p => p.id !== userId));
    } else {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleUpdatePaymentStatus = (photographerId, status) => {
    setPhotographers(prev => prev.map(p =>
      p.id === photographerId
        ? { ...p, status, lastPayment: status === 'active' ? new Date().toISOString().split('T')[0] : p.lastPayment }
        : p
    ));

    // Lưu vào localStorage
    const updatedPhotographers = photographers.map(p =>
      p.id === photographerId
        ? { ...p, status, lastPayment: status === 'active' ? new Date().toISOString().split('T')[0] : p.lastPayment }
        : p
    );
    localStorage.setItem('adminPhotographers', JSON.stringify(updatedPhotographers));

    // Show notification
    alert(`Đã cập nhật trạng thái thanh toán của nhiếp ảnh gia thành "${status === 'active' ? 'Hoạt động' : status}"`);
  };

  const handleAddUser = () => {
    const name = prompt('Nhập tên người dùng:');
    const email = prompt('Nhập email:');
    const userType = prompt('Nhập loại người dùng (customer/photographer):');

    if (name && email && userType) {
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        userType: userType === 'photographer' ? 'photographer' : 'customer',
        joinDate: new Date().toISOString().split('T')[0],
        totalBookings: 0,
        totalSpent: 0,
        status: 'active',
        avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        lastActive: new Date().toISOString().split('T')[0]
      };

      if (userType === 'photographer') {
        const newPhotographer = {
          ...newUser,
          totalEarnings: 0,
          monthlyFee: 50,
          lastPayment: new Date().toISOString().split('T')[0],
          rating: 0,
          reviews: 0,
          specialties: ['Photography'],
          location: 'Vietnam'
        };
        setPhotographers(prev => [...prev, newPhotographer]);
        localStorage.setItem('adminPhotographers', JSON.stringify([...photographers, newPhotographer]));
      } else {
        setUsers(prev => [...prev, newUser]);
        localStorage.setItem('adminUsers', JSON.stringify([...users, newUser]));
      }

      alert('Đã thêm người dùng mới thành công!');
    }
  };

  const handleExportReport = (type) => {
    let data = [];
    let filename = '';

    switch(type) {
      case 'photographers':
        data = photographers;
        filename = 'photographers_report.json';
        break;
      case 'users':
        data = users;
        filename = 'users_report.json';
        break;
      case 'payments':
        data = photographers.map(p => ({
          name: p.name,
          email: p.email,
          monthlyFee: p.monthlyFee,
          totalEarnings: p.totalEarnings,
          status: p.status,
          lastPayment: p.lastPayment
        }));
        filename = 'payments_report.json';
        break;
      default:
        return;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Đã xuất báo cáo ${filename} thành công!`);
  };

  const handleApproveFeedback = (feedbackId) => {
    setFeedbacks(prev => prev.map(f =>
      f.id === feedbackId ? { ...f, status: 'published' } : f
    ));
    localStorage.setItem('adminFeedbacks', JSON.stringify(
      feedbacks.map(f => f.id === feedbackId ? { ...f, status: 'published' } : f)
    ));
    alert('Đã duyệt feedback thành công!');
  };

  const handleRejectFeedback = (feedbackId) => {
    setFeedbacks(prev => prev.map(f =>
      f.id === feedbackId ? { ...f, status: 'rejected' } : f
    ));
    localStorage.setItem('adminFeedbacks', JSON.stringify(
      feedbacks.map(f => f.id === feedbackId ? { ...f, status: 'rejected' } : f)
    ));
    alert('Đã từ chối feedback!');
  };

  const handleViewUserDetails = (user) => {
    alert(`Chi tiết người dùng:\nTên: ${user.name}\nEmail: ${user.email}\nLoại: ${user.userType}\nTổng booking: ${user.totalBookings}\nTổng chi tiêu: $${user.totalSpent}`);
  };

  const handleContactUser = (user) => {
    const message = prompt(`Gửi tin nhắn tới ${user.name}:`);
    if (message) {
      alert(`Đã gửi tin nhắn "${message}" tới ${user.email}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'pending_payment':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'suspended':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return t('admin.status.active');
      case 'pending_payment':
        return t('admin.status.pendingPayment');
      case 'suspended':
        return t('admin.status.suspended');
      default:
        return status;
    }
  };

  // Analytics calculations
  const analytics = {
    totalUsers: users.length,
    totalPhotographers: photographers.length,
    totalBookings: bookings.length,
    monthlyRevenue: photographers.reduce((sum, p) => sum + (p.status === 'active' ? p.monthlyFee : 0), 0),
    pendingPayments: photographers.filter(p => p.status === 'pending_payment').length,
    averageRating: feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : 0,
    totalEarnings: photographers.reduce((sum, p) => sum + p.totalEarnings, 0),
    activeUsers: users.filter(u => u.status === 'active').length
  };

  const recentActivities = [
    {
      id: 1,
      type: 'user_joined',
      message: 'Người dùng mới Trần Thị B đã tham gia',
      time: '5 phút trước',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'booking_completed',
      message: 'Booking #WED-001 đã hoàn thành',
      time: '15 phút trước',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      type: 'payment_received',
      message: 'Nhận thanh toán $50 từ Lily Emily',
      time: '1 giờ trước',
      icon: DollarSign,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 4,
      type: 'review_posted',
      message: 'Đánh giá 5 sao mới từ Lê Văn C',
      time: '2 giờ trước',
      icon: Star,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('admin.dashboard')}</h1>
              <p className="text-blue-100">{t('admin.systemManagement')}</p>
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  <span className="text-sm">Hệ thống hoạt động bình thường</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm">Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100 mb-1">{t('admin.monthlyRevenue')}</p>
              <p className="text-4xl font-bold">${analytics.monthlyRevenue}</p>
              <div className="flex items-center justify-end mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12% so với tháng trước</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('admin.totalUsers')}</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalUsers}</p>
                <p className="text-sm text-green-600 mt-1">+{analytics.activeUsers} hoạt động</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('admin.photographers')}</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalPhotographers}</p>
                <p className="text-sm text-blue-600 mt-1">{photographers.filter(p => p.status === 'active').length} đang hoạt động</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('admin.totalBookings')}</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalBookings}</p>
                <p className="text-sm text-green-600 mt-1">Tổng thu: ${analytics.totalEarnings}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Đánh giá trung bình</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.averageRating}</p>
                <p className="text-sm text-yellow-600 mt-1">{feedbacks.length} đánh giá</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: t('admin.overview'), icon: BarChart3 },
                { id: 'users', label: t('admin.users'), icon: Users },
                { id: 'photographers', label: t('admin.photographers'), icon: Camera },
                { id: 'payments', label: t('admin.payments'), icon: DollarSign },
                { id: 'feedbacks', label: t('admin.reviews'), icon: Star }
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
                {/* Quick Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-800 font-medium">Doanh thu hôm nay</p>
                        <p className="text-2xl font-bold text-green-900">$1,250</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-800 font-medium">Booking hôm nay</p>
                        <p className="text-2xl font-bold text-blue-900">12</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-800 font-medium">Người dùng mới</p>
                        <p className="text-2xl font-bold text-purple-900">8</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-600" />
                      {t('admin.recentActivities')}
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

                  {/* Top Photographers */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-600" />
                      Top Photographers
                    </h2>
                    <div className="space-y-4">
                      {photographers.slice(0, 4).map((photographer, index) => (
                        <div key={photographer.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <img
                            src={photographer.avatar}
                            alt={photographer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{photographer.name}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span>{photographer.rating} ({photographer.reviews})</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${photographer.totalEarnings}</p>
                            <p className="text-sm text-gray-500">{photographer.totalBookings} bookings</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{t('admin.userManagement')}</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder={t('admin.searchUsers')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Thêm người dùng</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Người dùng
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thông tin liên hệ
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hoạt động
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hành động
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.filter(user => 
                          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                {user.email}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                Tham gia: {new Date(user.joinDate).toLocaleDateString('vi-VN')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.totalBookings} bookings</div>
                              <div className="text-sm text-gray-500">${user.totalSpent} chi tiêu</div>
                              <div className="text-xs text-gray-400 mt-1">
                                Hoạt động: {new Date(user.lastActive).toLocaleDateString('vi-VN')}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(user.status)}`}>
                                {getStatusText(user.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteModal(true);
                                }}
                                className="text-red-600 hover:text-red-900 p-1 rounded"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'photographers' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Quản lý nhiếp ảnh gia</h2>
                  <div className="flex items-center space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Tất cả trạng thái</option>
                      <option>Đang hoạt động</option>
                      <option>Chờ thanh toán</option>
                      <option>Tạm ngưng</option>
                    </select>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Xuất báo cáo</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {photographers.map((photographer) => (
                    <div key={photographer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={photographer.avatar}
                            alt={photographer.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 flex items-center">
                              {photographer.name}
                              {photographer.status === 'active' && (
                                <Shield className="h-4 w-4 ml-2 text-green-600" />
                              )}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {photographer.location}
                            </div>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{photographer.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">({photographer.reviews})</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Bookings:</span>
                            <span className="font-medium">{photographer.totalBookings}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Doanh thu:</span>
                            <span className="font-medium text-green-600">${photographer.totalEarnings}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Phí tháng:</span>
                            <span className="font-medium">${photographer.monthlyFee}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Chuyên môn:</span>
                            <span className="text-xs">{photographer.specialties.join(', ')}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(photographer.status)}`}>
                              {getStatusText(photographer.status)}
                            </span>
                            {photographer.status === 'pending_payment' && (
                              <button
                                onClick={() => handleUpdatePaymentStatus(photographer.id, 'active')}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                              >
                                Xác nhận
                              </button>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50">
                              Xem chi tiết
                            </button>
                            <button className="flex-1 text-gray-600 hover:text-gray-700 text-sm font-medium py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                              Liên hệ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'payments' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Quản lý thanh toán</h2>
                  <div className="flex items-center space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Tháng này</option>
                      <option>Tháng trước</option>
                      <option>3 tháng gần đây</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Xuất báo cáo</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Payment Summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan thanh toán</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="text-green-800">Đã thu tháng này</span>
                          <span className="font-bold text-green-900">${analytics.monthlyRevenue}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                          <span className="text-yellow-800">Chờ thanh toán</span>
                          <span className="font-bold text-yellow-900">{analytics.pendingPayments}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="text-blue-800">Tổng doanh thu</span>
                          <span className="font-bold text-blue-900">${analytics.totalEarnings}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tháng 1/2024</span>
                          <span className="font-semibold">$150</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tháng 2/2024</span>
                          <span className="font-semibold">$100</span>
                        </div>
                        <div className="flex justify-between border-t pt-3">
                          <span className="font-semibold">Tổng cộng</span>
                          <span className="font-bold text-green-600">${analytics.monthlyRevenue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái thanh toán nhiếp ảnh gia</h3>
                      <div className="space-y-4">
                        {photographers.map((photographer) => (
                          <div key={photographer.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center space-x-4">
                              <img
                                src={photographer.avatar}
                                alt={photographer.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{photographer.name}</p>
                                <div className="text-sm text-gray-500 space-y-1">
                                  <p>Phí tháng: ${photographer.monthlyFee}</p>
                                  <p>Thanh toán cuối: {photographer.lastPayment}</p>
                                  <p>Tổng doanh thu: ${photographer.totalEarnings}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(photographer.status)}`}>
                                {getStatusText(photographer.status)}
                              </span>
                              {photographer.status === 'pending_payment' && (
                                <button
                                  onClick={() => handleUpdatePaymentStatus(photographer.id, 'active')}
                                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                                >
                                  Xác nhận thanh toán
                                </button>
                              )}
                              <button className="text-blue-600 hover:text-blue-700 p-2 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'feedbacks' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Quản lý đánh giá</h2>
                  <div className="flex items-center space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Tất cả đánh giá</option>
                      <option>Chờ duyệt</option>
                      <option>Đã xuất bản</option>
                      <option>Đã từ chối</option>
                    </select>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>Đánh giá trung bình: {analytics.averageRating}/5</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <img
                            src={feedback.avatar}
                            alt={feedback.customerName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <div>
                                <p className="font-medium text-gray-900">{feedback.customerName}</p>
                                <p className="text-sm text-gray-500">cho {feedback.photographerName}</p>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 text-sm font-medium">{feedback.rating}/5</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3 bg-gray-50 p-3 rounded-lg">{feedback.comment}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>Booking ID: {feedback.bookingId}</span>
                                <span>•</span>
                                <span>{feedback.date}</span>
                              </div>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                                feedback.status === 'published' 
                                  ? 'text-green-600 bg-green-100 border-green-200' 
                                  : 'text-yellow-600 bg-yellow-100 border-yellow-200'
                              }`}>
                                {feedback.status === 'published' ? 'Đã xuất bản' : 'Chờ duyệt'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          {feedback.status === 'pending' && (
                            <>
                              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                                Duyệt
                              </button>
                              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">
                                Từ chối
                              </button>
                            </>
                          )}
                          <button className="text-gray-600 hover:text-gray-900 p-2 rounded">
                            <Trash2 className="h-4 w-4" />
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa tài khoản của <strong>{selectedUser.name}</strong>? 
              Hành động này không thể hoàn tác và sẽ xóa tất cả dữ liệu liên quan.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser.id, selectedUser.userType)}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Xóa tài khoản
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
