import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Camera,
  Star,
  Clock,
  MapPin,
  User,
  DollarSign,
  TrendingUp,
  Edit,
  Eye,
  MessageSquare,
  Settings,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getPhotographerById } from "../data/photographers";
import { initializeSampleData } from "../utils/sampleData";
import BookingDetailsModal from "../components/BookingDetailsModal";
import NotificationCenter from "../components/NotificationCenter";

const PhotographerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [bookingRequests, setBookingRequests] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const { t } = useLanguage();

  // Get photographer data
  const photographerData = user?.photographerId
    ? getPhotographerById(user.photographerId)
    : null;

  // Load booking requests from localStorage
  useEffect(() => {
    // Initialize sample data first
    initializeSampleData();

    const allBookings = JSON.parse(
      localStorage.getItem("userBookings") || "[]",
    );
    // Filter bookings for this photographer
    const photographerBookings = allBookings.filter(
      (booking) => booking.photographer?.id === user?.photographerId,
    );
    setBookingRequests(photographerBookings);

    // Load concepts
    const savedConcepts = JSON.parse(
      localStorage.getItem("photographerConcepts") || "[]",
    );
    setConcepts(savedConcepts);
  }, [user?.photographerId]);

  // Sample analytics data
  const analytics = {
    totalBookings: bookingRequests.length,
    completedBookings: bookingRequests.filter((b) => b.status === "Completed")
      .length,
    totalEarnings: bookingRequests.reduce(
      (sum, booking) => sum + (booking.totalCost || 0),
      0,
    ),
    averageRating: photographerData?.rating || 4.9,
    responseRate: photographerData?.responseRate || 99,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Confirmed":
        return "text-blue-600 bg-blue-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleViewDetails = (booking: any) => {
    // Add sample customer info and additional details for demo
    const enhancedBooking = {
      ...booking,
      customerInfo: {
        name: 'Nguyễn Văn A',
        email: 'customer@example.com',
        phone: '+84 123 456 789'
      },
      conceptRequirements: t('photographerDashboard.conceptRequirements'),
      specialNotes: booking.bookingDetails?.notes || t('photographerDashboard.specialNotes')
    };
    setSelectedBooking(enhancedBooking);
    setIsModalOpen(true);
  };

  const handleAcceptBooking = (bookingId: string) => {
    const updatedBookings = bookingRequests.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'Confirmed' }
        : booking
    );
    setBookingRequests(updatedBookings);

    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const updatedAllBookings = allBookings.map((booking: any) =>
      booking.id === bookingId
        ? { ...booking, status: 'Confirmed' }
        : booking
    );
    localStorage.setItem('userBookings', JSON.stringify(updatedAllBookings));

    alert(t('photographerDashboard.bookingAccepted'));
  };

  const handleRejectBooking = (bookingId: string) => {
    const reason = prompt(t('photographerDashboard.rejectionReason'));
    if (reason) {
      const updatedBookings = bookingRequests.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'Cancelled', rejectionReason: reason }
          : booking
      );
      setBookingRequests(updatedBookings);

      // Update localStorage
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const updatedAllBookings = allBookings.map((booking: any) =>
        booking.id === bookingId
          ? { ...booking, status: 'Cancelled', rejectionReason: reason }
          : booking
      );
      localStorage.setItem('userBookings', JSON.stringify(updatedAllBookings));

      alert('Đã từ chối booking!');
    }
  };

  const handleCompleteBooking = (bookingId: string) => {
    const updatedBookings = bookingRequests.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'Completed', completedDate: new Date().toISOString() }
        : booking
    );
    setBookingRequests(updatedBookings);

    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const updatedAllBookings = allBookings.map((booking: any) =>
      booking.id === bookingId
        ? { ...booking, status: 'Completed', completedDate: new Date().toISOString() }
        : booking
    );
    localStorage.setItem('userBookings', JSON.stringify(updatedAllBookings));

    alert('Đã đánh dấu booking hoàn thành!');
  };

  const handleMessageCustomer = (booking: any) => {
    const message = prompt(`Gửi tin nhắn tới khách hàng (${booking.customerInfo?.name || 'Khách hàng'}):`);
    if (message) {
      alert(`Đã gửi tin nhắn: "${message}" tới khách hàng`);
    }
  };

  const handleAddConcept = () => {
    const title = prompt(t('photographerDashboard.conceptTitle'));
    const description = prompt(t('photographerDashboard.conceptDescription'));
    const category = prompt('Danh mục (Wedding/Portrait/Family/Event):');

    if (title && description && category) {
      const newConcept = {
        id: Date.now(),
        title,
        description,
        category,
        image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        likes: 0,
        views: 0
      };

      setConcepts(prev => [...prev, newConcept]);

      // Save to localStorage
      const savedConcepts = JSON.parse(localStorage.getItem('photographerConcepts') || '[]');
      savedConcepts.push(newConcept);
      localStorage.setItem('photographerConcepts', JSON.stringify(savedConcepts));

      alert(t('photographerDashboard.conceptAdded'));
    }
  };

  const handleEditConcept = (conceptId: number) => {
    const concept = sampleConcepts.find(c => c.id === conceptId);
    if (concept) {
      const newTitle = prompt('Tiêu đề mới:', concept.title);
      const newDescription = prompt('Mô tả mới:', concept.description);

      if (newTitle && newDescription) {
        const updatedConcepts = sampleConcepts.map(c =>
          c.id === conceptId
            ? { ...c, title: newTitle, description: newDescription }
            : c
        );
        setConcepts(updatedConcepts);
        localStorage.setItem('photographerConcepts', JSON.stringify(updatedConcepts));
        alert('Đã cập nhật concept thành công!');
      }
    }
  };

  const sampleConcepts =
    concepts.length === 0
      ? [
          {
            id: 1,
            title: t('photographerDashboard.vintageWedding'),
            description:
              t('photographerDashboard.vintageWeddingDesc'),
            image:
              "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
            category: "Wedding",
            likes: 24,
            views: 156,
          },
          {
            id: 2,
            title: t('photographerDashboard.streetPortrait'),
            description: t('photographerDashboard.streetPortraitDesc'),
            image:
              "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
            category: "Portrait",
            likes: 18,
            views: 89,
          },
          {
            id: 3,
            title: "Ảnh gia đình ngoài trời",
            description: "Tự nhiên và ấm áp trong môi trường công viên",
            image:
              "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
            category: "Family",
            likes: 31,
            views: 203,
          },
        ]
      : concepts;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={
                  photographerData?.image ||
                  user?.avatar ||
                  "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
                }
                alt={photographerData?.name || user?.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {t('dashboard.welcome')}{photographerData?.name || user?.name}!
                </h1>
                <p className="text-gray-600 mb-2">
                  {photographerData?.specialties?.join(", ") || t('dashboard.photographer')}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{photographerData?.rating || 4.9}/5</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {photographerData?.location || "Ho Chi Minh City"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/edit-profile"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                                <span>{t('dashboard.editProfile')}</span>
              </Link>
              <NotificationCenter photographerId={user?.photographerId} />
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                                <span>{t('dashboard.settings')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('dashboard.totalBookings')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.totalBookings}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('dashboard.completed')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.completedBookings}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Camera className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('dashboard.totalIncome')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${analytics.totalEarnings}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('dashboard.averageRating')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.averageRating}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                                <p className="text-sm text-gray-500 mb-1">{t('dashboard.responseRate')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.responseRate}%
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              <button
                onClick={() => setSelectedTab("overview")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                            >
                {t('dashboard.overview')}
              </button>
              <button
                onClick={() => setSelectedTab("bookings")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === "bookings"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                            >
                {t('dashboard.manageBookings')}
              </button>
              <button
                onClick={() => setSelectedTab("concepts")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === "concepts"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                            >
                {t('dashboard.conceptPortfolio')}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {selectedTab === "overview" && (
              <div className="space-y-8">
                {/* Recent Bookings */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">
                      {t('dashboard.recentBookings')}
                    </h2>
                    {bookingRequests.filter(b => b.status === 'Pending').length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                                    {bookingRequests.filter(b => b.status === 'Pending').length} {t('dashboard.pendingBookings')}
                        </span>
                      </div>
                    )}
                                        <button
                      onClick={() => setSelectedTab("bookings")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <span>{t('dashboard.viewAll')}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {bookingRequests.slice(0, 3).length > 0 ? (
                    <div className="space-y-4">
                      {bookingRequests.slice(0, 3).map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Camera className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {booking.photographyType ||
                                    "Photography Session"}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {formatDate(booking.bookingDetails?.date)}
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {booking.bookingDetails?.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                              >
                                {booking.status}
                              </span>
                              <span className="text-lg font-bold text-gray-900">
                                ${booking.totalCost}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                            <p>{t('dashboard.noBookings')}</p>
                    </div>
                  )}
                </div>

                {/* Popular Concepts */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">
                      {t('dashboard.popularConcepts')}
                    </h2>
                                        <button
                      onClick={() => setSelectedTab("concepts")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <span>{t('dashboard.viewAll')}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sampleConcepts.slice(0, 3).map((concept) => (
                      <div key={concept.id} className="group cursor-pointer">
                        <div className="aspect-video rounded-lg overflow-hidden mb-3 relative">
                          <img
                            src={concept.image}
                            alt={concept.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                            {concept.category}
                          </div>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {concept.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {concept.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {concept.views}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            {concept.likes}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "bookings" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">
                    {t('dashboard.manageBookings')}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <span>{t('dashboard.pending')}: {bookingRequests.filter(b => b.status === 'Pending').length}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <span>{t('dashboard.confirmed')}: {bookingRequests.filter(b => b.status === 'Confirmed').length}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span>{t('dashboard.completed')}: {bookingRequests.filter(b => b.status === 'Completed').length}</span>
                    </div>
                  </div>
                </div>

                {bookingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {bookingRequests.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Camera className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {booking.photographyType ||
                                    "Photography Session"}
                                </h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                                >
                                  {booking.status}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>
                                    {formatDate(booking.bookingDetails?.date)}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>
                                    {booking.bookingDetails?.time || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span className="truncate">
                                    {booking.bookingDetails?.location || "N/A"}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                                                    <span>
                                    {t('dashboard.time')}:{" "}
                                    {booking.bookingDetails?.duration || "N/A"}{" "}
                                    {t('dashboard.hours')}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span>{t('dashboard.code')}: {booking.reference}</span>
                                </div>
                                <div className="text-lg font-bold text-blue-600">
                                  ${booking.totalCost || 0}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 pt-4 border-t border-gray-100 space-x-3">
                          {booking.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleRejectBooking(booking.id)}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                              >
                                {t('dashboard.reject')}
                              </button>
                              <button
                                onClick={() => handleAcceptBooking(booking.id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
                              >
                                {t('dashboard.accept')}
                              </button>
                            </>
                          )}
                          {booking.status === 'Confirmed' && (
                            <button
                              onClick={() => handleCompleteBooking(booking.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                            >
                              Đánh dấu hoàn thành
                            </button>
                          )}
                          <button
                            onClick={() => handleMessageCustomer(booking)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>{t('dashboard.message')}</span>
                          </button>
                          <button 
                            onClick={() => handleViewDetails(booking)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                                                        {t('dashboard.viewDetails')}
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
                      {t('dashboard.noBookings')}
                    </h3>
                    <p className="text-gray-500">
                      {t('dashboard.noBookingsMessage')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === "concepts" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">
                    {t('dashboard.conceptPortfolio')}
                  </h2>
                  <button
                    onClick={handleAddConcept}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{t('dashboard.addConcept')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sampleConcepts.map((concept) => (
                    <div
                      key={concept.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video relative">
                        <img
                          src={concept.image}
                          alt={concept.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          {concept.category}
                        </div>
                        <div className="absolute top-2 right-2 space-x-2">
                          <button
                            onClick={() => handleEditConcept(concept.id)}
                            className="bg-white bg-opacity-80 hover:bg-opacity-100 p-1 rounded"
                            title="Chỉnh sửa concept"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          {concept.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {concept.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                                                        {concept.views} {t('dashboard.views')}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                                                        {concept.likes} {t('dashboard.likes')}
                          </span>
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
        userType="photographer"
      />
    </div>
  );
};

export default PhotographerDashboard;
