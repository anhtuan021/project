import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Camera, 
  Calendar, 
  DollarSign,
  Users,
  Award,
  Clock,
  Heart,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getPhotographerById, getAllPhotographers } from '../data/photographers';

const PhotographerProfilePage = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      const photographerData = getPhotographerById(id);
      if (photographerData) {
        setPhotographer({
          ...photographerData,
          portfolio: [
            'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
            'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
            'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
            'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
            'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
            'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
          ],
          pricing: {
            hourly: 150,
            halfDay: 800,
            fullDay: 1500,
            wedding: 2500
          },
          experience: 5,
          totalProjects: 127,
          availability: 'Available this week'
        });

        // Sample reviews
        setReviews([
          {
            id: 1,
            customerName: 'Nguyễn Văn A',
            rating: 5,
            comment: 'Nhiếp ảnh gia rất chuyên nghiệp, ảnh đẹp và giao hàng đúng hẹn!',
            date: '2024-01-20',
            avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          {
            id: 2,
            customerName: 'Trần Thị B',
            rating: 5,
            comment: 'Chất lượng ảnh tuyệt vời, rất hài lòng với dịch vụ.',
            date: '2024-01-15',
            avatar: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          {
            id: 3,
            customerName: 'Lê Văn C',
            rating: 4,
            comment: 'Ảnh đ��p, nhiếp ảnh gia thân thiện. Sẽ quay lại lần sau.',
            date: '2024-01-10',
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          }
        ]);
      }
    }
  }, [id]);

  const handlePrevImage = () => {
    setSelectedImage(prev => 
      prev === 0 ? photographer.portfolio.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage(prev => 
      prev === photographer.portfolio.length - 1 ? 0 : prev + 1
    );
  };

  const handleBookNow = () => {
    if (isAuthenticated) {
      // Navigate to booking page with photographer pre-selected
      window.location.href = `/booking?photographer=${photographer.id}`;
    } else {
      // Redirect to login
      window.location.href = '/login';
    }
  };

  const handleContact = () => {
    setShowContactModal(true);
  };

  if (!photographer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Photographer not found</h2>
          <p className="text-gray-600 mb-4">The photographer you're looking for doesn't exist.</p>
          <Link
            to="/photographers"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Photographers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/photographers"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Photographers
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={photographer.portfolio[selectedImage]}
                  alt={`Portfolio ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {photographer.portfolio.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {photographer.portfolio.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {photographer.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {photographer.bio || `Professional photographer with ${photographer.experience || 5} years of experience specializing in ${photographer.specialties?.join(', ') || 'various photography styles'}. Passionate about capturing life's most precious moments with artistic vision and technical expertise.`}
              </p>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {photographer.specialties?.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div>• Professional DSLR Cameras</div>
                  <div>• Various Prime & Zoom Lenses</div>
                  <div>• Professional Lighting Equipment</div>
                  <div>• Backup Equipment Available</div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{photographer.rating}</span>
                  <span className="text-gray-500">({reviews.length} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.customerName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Photographer Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{photographer.name}</h1>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{photographer.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>{photographer.rating}/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{photographer.availability}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-bold text-gray-900">{photographer.experience}+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-bold text-gray-900">{photographer.totalProjects}</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Starting Prices</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hourly Rate</span>
                    <span className="font-semibold">${photographer.pricing?.hourly || 150}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Half Day</span>
                    <span className="font-semibold">${photographer.pricing?.halfDay || 800}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Day</span>
                    <span className="font-semibold">${photographer.pricing?.fullDay || 1500}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Book Now
                </button>
                <button
                  onClick={handleContact}
                  className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Contact</span>
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                      isLiked
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>Save</span>
                  </button>
                  <button className="flex-1 py-2 px-4 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact {photographer.name}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{photographer.email || 'contact@photographer.com'}</span>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={handleBookNow}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerProfilePage;
