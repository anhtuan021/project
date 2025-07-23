import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Check, MapPin, Calendar, Clock, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BookingInvoicePage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận bookingData được truyền từ BookingPage
  const bookingData = location.state?.bookingData;

  // Nếu ko có bookingData (vào thẳng URL hoặc F5) => redirect về trang booking hoặc trang khác
  React.useEffect(() => {
    if (!bookingData) {
      navigate('/booking'); // hoặc trang 404
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null; // hoặc loading...
  }

  // Chuẩn lại dữ liệu để hiển thị tương tự cấu trúc trong state bookingData
  const {
    reference,
    photographer,
    photographyType,
    bookingDetails,
    totalCost,
    status,
  } = bookingData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header giống bạn đã xây dựng */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('invoice.confirmed')}
            </h1>
            <p className="text-gray-600">
              {t('invoice.reference')}: <span className="font-medium">{reference}</span>
            </p>
          </div>

          {/* Photographer info */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{photographer.name}</h2>
                  <div className="flex items-center text-gray-600 text-sm">
                    <span>★ {photographer.rating}</span>
                    <span className="mx-1">•</span>
                    <span>({photographer.reviews} {t('common.reviews')})</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{photographer.location}</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {t('invoice.professionalPhotographer')}
              </div>
            </div>
          </div>

          {/* Booking details */}
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{t('invoice.bookingDetails')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('invoice.date')}</span>
                  <span className="font-medium text-gray-900">{bookingDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('invoice.time')}</span>
                  <span className="font-medium text-gray-900">{bookingDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('invoice.duration')}</span>
                  <span className="font-medium text-gray-900">{bookingDetails.duration} {t('common.hours')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('invoice.type')}</span>
                  <span className="font-medium text-gray-900">{photographyType}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('invoice.location')}</span>
                  <span className="font-medium text-gray-900">{bookingDetails.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('invoice.status')}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {status}
                  </span>
                </div>
              </div>
            </div>

            {/* Total cost */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('invoice.totalCost')}</span>
                <span>${totalCost}</span>
              </div>
            </div>
          </div>

          {/* Nút Back */}
          <div className="p-8 flex justify-end">
            <Link
              to="/profile"
              className="bg-gray-100 px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              {t('invoice.backToBookings')}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer nếu có... */}
    </div>
  );
};

export default BookingInvoicePage;
