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
  MessageSquare
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

  const { t } = useLanguage();

  // Load data on component mount
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
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
        status: 'active'
      },
      {
        id: '2',
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        userType: 'customer',
        joinDate: '2024-02-01',
        totalBookings: 2,
        totalSpent: 600,
        status: 'active'
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
        reviews: 127
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
        reviews: 96
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
        status: 'published'
      },
      {
        id: '2',
        bookingId: 'booking_002',
        customerName: 'Trần Thị B',
        photographerName: 'Michael Chen',
        rating: 4,
        comment: 'Chất lượng ảnh tốt, tuy nhiên có chút chậm trễ trong việc giao ảnh.',
        date: '2024-01-25',
        status: 'pending'
      }
    ];

    setUsers(sampleUsers);
    setPhotographers(samplePhotographers);
    setBookings(sampleBookings);
    setFeedbacks(sampleFeedbacks);
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
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'pending_payment':
        return 'text-yellow-600 bg-yellow-100';
      case 'suspended':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
    averageRating: feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('admin.dashboard')}</h1>
              <p className="text-gray-600">{t('admin.systemManagement')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                                <p className="text-sm text-gray-500">{t('admin.monthlyRevenue')}</p>
                <p className="text-2xl font-bold text-green-600">${analytics.monthlyRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('admin.totalUsers')}</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('admin.photographers')}</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalPhotographers}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Camera className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('admin.totalBookings')}</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalBookings}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('admin.monthlyRevenue')}</p>
                <p className="text-2xl font-bold text-gray-900">${analytics.monthlyRevenue}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('admin.pendingPayments')}</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.pendingPayments}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Đánh giá TB</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
                            {[
                { id: 'overview', label: t('admin.overview') },
                { id: 'users', label: t('admin.users') },
                { id: 'photographers', label: t('admin.photographers') },
                { id: 'payments', label: t('admin.payments') },
                { id: 'feedbacks', label: t('admin.reviews') }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Activities */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Hoạt động gần đây</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Booking mới được tạo</p>
                        <p className="text-sm text-gray-500">Nguyễn Văn A đã đặt lịch với Lily Emily - 2 giờ trước</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Thanh toán chậm trễ</p>
                        <p className="text-sm text-gray-500">Michael Chen chưa thanh toán phí tháng này - 1 ngày trước</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Star className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Đánh giá mới</p>
                        <p className="text-sm text-gray-500">Trần Thị B đã đánh giá 5 sao cho Michael Chen - 3 giờ trước</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Quản lý người dùng</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm người dùng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Người dùng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày tham gia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chi tiêu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.filter(user => 
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(user.joinDate).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.totalBookings}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${user.totalSpent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {getStatusText(user.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeleteModal(true);
                              }}
                              className="text-red-600 hover:text-red-900"
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
            )}

            {selectedTab === 'photographers' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Quản lý nhiếp ảnh gia</h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nhiếp ảnh gia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Đánh giá
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Doanh thu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phí tháng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {photographers.map((photographer) => (
                        <tr key={photographer.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <Camera className="h-5 w-5 text-gray-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{photographer.name}</div>
                                <div className="text-sm text-gray-500">{photographer.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-900">{photographer.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">({photographer.reviews})</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {photographer.totalBookings}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${photographer.totalEarnings}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${photographer.monthlyFee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(photographer.status)}`}>
                              {getStatusText(photographer.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedUser(photographer);
                                setShowDeleteModal(true);
                              }}
                              className="text-red-600 hover:text-red-900"
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
            )}

            {selectedTab === 'payments' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Quản lý thanh toán</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Payment Status */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Trạng thái thanh toán</h3>
                    <div className="space-y-4">
                      {photographers.map((photographer) => (
                        <div key={photographer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{photographer.name}</p>
                            <p className="text-sm text-gray-500">Phí tháng: ${photographer.monthlyFee}</p>
                            <p className="text-sm text-gray-500">Thanh toán cuối: {photographer.lastPayment}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(photographer.status)}`}>
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
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Revenue Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo tháng</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tháng 1/2024</span>
                        <span className="font-semibold text-gray-900">$150</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tháng 2/2024</span>
                        <span className="font-semibold text-gray-900">$100</span>
                      </div>
                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-gray-900 font-semibold">Tổng c��ng</span>
                        <span className="font-bold text-green-600">${analytics.monthlyRevenue}</span>
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
                </div>

                <div className="space-y-6">
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {feedback.customerName.charAt(0)}
                              </span>
                            </div>
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
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{feedback.comment}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{feedback.date}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              feedback.status === 'published' 
                                ? 'text-green-600 bg-green-100' 
                                : 'text-yellow-600 bg-yellow-100'
                            }`}>
                              {feedback.status === 'published' ? 'Đã xuất bản' : 'Chờ duyệt'}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          {feedback.status === 'pending' && (
                            <>
                              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                                Duyệt
                              </button>
                              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                                Từ chối
                              </button>
                            </>
                          )}
                          <button className="text-gray-600 hover:text-gray-900">
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
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa tài khoản của <strong>{selectedUser.name}</strong>? 
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser.id, selectedUser.userType)}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
