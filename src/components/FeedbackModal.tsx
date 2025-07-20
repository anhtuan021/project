import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FeedbackModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: any) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const { t } = useLanguage();

  if (!isOpen || !booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const feedback = {
      id: Date.now().toString(),
      bookingId: booking.id,
      customerName: 'Khách hàng', // In real app, get from auth context
      photographerName: booking.photographer?.name || 'Photographer',
      photographerId: booking.photographer?.id,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    onSubmit(feedback);
    onClose();
    
    // Reset form
    setRating(5);
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Đánh giá dịch vụ</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Photographer Info */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={booking.photographer?.image || 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
              alt={booking.photographer?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{booking.photographer?.name}</h3>
              <p className="text-sm text-gray-500">{booking.photographyType}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Đánh giá chất lượng dịch vụ
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-colors"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {rating === 1 && 'Rất không hài lòng'}
              {rating === 2 && 'Không hài lòng'}
              {rating === 3 && 'Bình thường'}
              {rating === 4 && 'Hài lòng'}
              {rating === 5 && 'Rất hài lòng'}
            </p>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhận xét chi tiết (tùy chọn)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ chụp ảnh..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;