import React from 'react';
import { X, Calendar, Clock, MapPin, User, Phone, Mail, FileText, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingDetailsModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  userType: 'customer' | 'photographer';
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  isOpen,
  onClose,
  userType
}) => {
  const { t } = useLanguage();

  if (!isOpen || !booking) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-100';
      case 'Confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
                        <h2 className="text-2xl font-bold text-gray-900">{t('bookingModal.title')}</h2>
            <p className="text-gray-600">{t('bookingModal.code')}: {booking.reference}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{t('bookingModal.status')}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Photography Type */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-blue-600" />
                                    {t('bookingModal.type')}
                </h3>
                <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
                  {booking.photographyType || 'Photography Session'}
                </p>
              </div>

              {/* Date & Time */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                                    {t('bookingModal.time')}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{formatDate(booking.bookingDetails?.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{booking.bookingDetails?.time || 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                                        <span className="text-sm text-gray-500 mr-2">{t('bookingModal.duration')}</span>
                    <span>{booking.bookingDetails?.duration || 'N/A'} {t('common.hours')}</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                                    {t('bookingModal.location')}
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {booking.bookingDetails?.location || 'N/A'}
                </p>
              </div>

              {/* Cost */}
              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('bookingModal.cost')}</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                                        <span className="text-gray-700">{t('bookingModal.totalCost')}</span>
                    <span className="text-2xl font-bold text-green-600">${booking.totalCost || 0}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                                        {booking.bookingDetails?.duration || 0} {t('bookingModal.hoursMultiplier')} ${Math.round((booking.totalCost || 0) / (booking.bookingDetails?.duration || 1))}{t('bookingModal.perHour')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Information */}
              {userType === 'photographer' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Thông tin khách hàng
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{booking.customerInfo?.name || 'Khách hàng'}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{booking.customerInfo?.email || 'customer@example.com'}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{booking.customerInfo?.phone || '+84 123 456 789'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Photographer Information */}
              {userType === 'customer' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-blue-600" />
                    Thông tin nhiếp ảnh gia
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4 mb-3">
                      <img
                        src={booking.photographer?.image || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                        alt={booking.photographer?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{booking.photographer?.name || 'Nhiếp ảnh gia'}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <span>★ {booking.photographer?.rating || 4.9}</span>
                          <span className="mx-1">•</span>
                          <span>({booking.photographer?.reviews || 0} đánh giá)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{booking.photographer?.location || 'Ho Chi Minh City'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Concept Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Concept yêu cầu
                </h3>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    {booking.conceptRequirements || 'Chụp ảnh tự nhiên, phong cách hiện đại với ánh sáng tự nhiên. Tập trung vào cảm xúc và khoảnh khắc chân thực.'}
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ghi chú & Lưu ý</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    {booking.bookingDetails?.notes || booking.specialNotes || 'Vui lòng đến đúng giờ. Mang theo trang phục dự phòng. Liên hệ trước 30 phút nếu có thay đổi.'}
                  </p>
                </div>
              </div>

              {/* Additional Services */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Dịch vụ bổ sung</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">Chỉnh sửa ảnh cơ bản</span>
                    <span className="text-green-600 font-medium">Bao gồm</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">Giao ảnh online</span>
                    <span className="text-green-600 font-medium">Bao gồm</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">In ảnh (20 tấm)</span>
                    <span className="text-blue-600 font-medium">+$50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            {userType === 'photographer' && booking.status === 'Pending' && (
              <>
                <button className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                  Từ chối
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Chấp nhận
                </button>
              </>
            )}
            {userType === 'photographer' && booking.status === 'Confirmed' && (
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Liên hệ khách hàng
              </button>
            )}
            {userType === 'customer' && booking.status === 'Confirmed' && (
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Liên hệ nhiếp ảnh gia
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
