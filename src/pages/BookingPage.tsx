import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Camera, Calendar, User, Users, Shirt, Heart, ArrowLeft, ArrowRight, MapPin, Clock } from 'lucide-react';
import { getPhotographerById, getAllPhotographers } from '../data/photographers';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const BookingPage = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPhotographyType, setSelectedPhotographyType] = useState('');
  const [budgetRange, setBudgetRange] = useState([100, 1000]);
  const [selectedPhotographerId, setSelectedPhotographerId] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    duration: '2',
    location: '',
    notes: ''
  });
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const preSelectedPhotographer = searchParams.get('photographer');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const photographyTypes = [
    {
      id: 'portrait',
      name: t('booking.portraitPhotography'),
      icon: User,
      description: t('booking.portraitDesc'),
    },
    {
      id: 'event',
      name: t('booking.eventPhotography'),
      icon: Users,
      description: t('booking.eventDesc'),
    },
    {
      id: 'wedding',
      name: t('booking.weddingPhotography'),
      icon: Heart,
      description: t('booking.weddingDesc'),
    },
    {
      id: 'fashion',
      name: t('booking.fashionPhotography'),
      icon: Shirt,
      description: t('booking.fashionDesc'),
    },
  ];

  const allPhotographers = getAllPhotographers();

  // Get selected photographer info
  const selectedPhotographer = preSelectedPhotographer 
    ? getPhotographerById(preSelectedPhotographer)
    : selectedPhotographerId 
    ? getPhotographerById(selectedPhotographerId)
    : null;

  // Get photographers for selection step
  const photographersForSelection = selectedPhotographerId 
    ? [getPhotographerById(selectedPhotographerId)].filter(Boolean)
    : allPhotographers.slice(0, 3);

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBookingDetailsChange = (field: string, value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirmBooking = () => {
    if (!selectedPhotographer) return;

    const bookingData = {
      id: Date.now().toString(),
      reference: `SM-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      photographer: selectedPhotographer,
      photographyType: selectedPhotographyType,
      bookingDetails,
      budgetRange,
      totalCost: calculateTotalCost(),
      bookingDate: new Date().toISOString(),
      status: 'Confirmed',
    };

    // Lưu booking vào localStorage (hoặc call API)
    const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    existingBookings.push(bookingData);
    localStorage.setItem('userBookings', JSON.stringify(existingBookings));

    // CHUYỂN ĐẾN TRANG INVOICE VÀ TRUYỀN DỮ LIỆU bookingData qua state
    navigate('/booking-invoice', { state: { bookingData } });
  };

  const calculateTotalCost = () => {
    if (!selectedPhotographer) return 0;
    const hourlyRate = parseInt(selectedPhotographer.hourlyRate.replace(/[^0-9]/g, ''));
    const duration = parseInt(bookingDetails.duration);
    return hourlyRate * duration;
  };

  const totalSteps = preSelectedPhotographer ? 3 : 4;

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('booking.authRequired')}</h1>
          <p className="text-gray-600 mb-6">{t('booking.loginRequired')}</p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('booking.goToLogin')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">{t('booking.title')}</h1>
            <span className="text-gray-600">{t('booking.step')} {currentStep} {t('booking.of')} {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Photography Type Selection */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('booking.photographyType')}
            </h2>
            
            {/* Show selected photographer if pre-selected */}
            {preSelectedPhotographer && selectedPhotographer && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('booking.selectedPhotographer')}
                </h3>
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center mb-3">
                    <img
                      src={selectedPhotographer.image}
                      alt={selectedPhotographer.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedPhotographer.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>★ {selectedPhotographer.rating}</span>
                        <span className="ml-1">({selectedPhotographer.reviews} {t('common.reviews')})</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {selectedPhotographer.portfolioItems.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt="Portfolio"
                        className="w-full h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedPhotographer.specialties.map(s => s.replace(' Photography', '')).join(', ')}
                    </span>
                    <span className="font-medium text-blue-600">
                      {selectedPhotographer.hourlyRate}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {photographyTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={type.id}
                    onClick={() => setSelectedPhotographyType(type.id)}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                      selectedPhotographyType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        {type.name}
                      </h3>
                    </div>
                    <p className="text-gray-600">{type.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Date, Time & Location */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('booking.whenWhere')}
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    {t('booking.eventDate')}
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={bookingDetails.date}
                    onChange={(e) => handleBookingDetailsChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    {t('booking.eventTime')}
                  </label>
                  <input
                    type="time"
                    value={bookingDetails.time}
                    onChange={(e) => handleBookingDetailsChange('time', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.duration')}
                  </label>
                  <select 
                    value={bookingDetails.duration}
                    onChange={(e) => handleBookingDetailsChange('duration', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">{t('booking.hours.1')}</option>
                    <option value="2">{t('booking.hours.2')}</option>
                    <option value="3">{t('booking.hours.3')}</option>
                    <option value="4">{t('booking.hours.4')}</option>
                    <option value="5">{t('booking.hours.5')}</option>
                    <option value="6">{t('booking.hours.6')}</option>
                    <option value="8">{t('booking.hours.8')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('booking.estimatedCost')}
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                    <span className="text-2xl font-bold text-blue-600">
                      ${calculateTotalCost()}
                    </span>
                    {selectedPhotographer && (
                      <span className="text-gray-600 ml-2">
                        ({bookingDetails.duration}h × {selectedPhotographer.hourlyRate})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  {t('booking.eventLocation')}
                </label>
                <input
                  type="text"
                  placeholder={t('booking.locationPlaceholder')}
                  value={bookingDetails.location}
                  onChange={(e) => handleBookingDetailsChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.additionalNotes')}
                </label>
                <textarea
                  rows={4}
                  placeholder={t('booking.notesPlaceholder')}
                  value={bookingDetails.notes}
                  onChange={(e) => handleBookingDetailsChange('notes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photographer Selection (only if not pre-selected) */}
        {currentStep === 3 && !preSelectedPhotographer && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('booking.choosePhotographer')}
            </h2>
            
            <div className="space-y-6">
              {photographersForSelection.map((photographer) => (
                <div
                  key={photographer.id}
                  className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                    selectedPhotographerId === photographer.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPhotographerId(photographer.id)}
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={photographer.image}
                      alt={photographer.name}
                      className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {photographer.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <span>★ {photographer.rating}</span>
                            <span className="ml-1">({photographer.reviews} {t('common.reviews')})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {photographer.hourlyRate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 my-4">
                        {photographer.portfolioItems.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            alt="Portfolio"
                            className="w-full h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {photographer.specialties.slice(0, 3).map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                            >
                              {specialty.replace(' Photography', '')}
                            </span>
                          ))}
                        </div>
                        <div className={`px-4 py-2 rounded-lg font-medium ${
                          selectedPhotographerId === photographer.id
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}>
                          {selectedPhotographerId === photographer.id ? t('booking.selected') : t('booking.select')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review & Book Step */}
        {((currentStep === 3 && preSelectedPhotographer) || (currentStep === 4 && !preSelectedPhotographer)) && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t('booking.reviewBooking')}
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('booking.photographyTypeLabel')}</h3>
                  <p className="text-gray-600 capitalize">{selectedPhotographyType} {t('booking.photographyLabel')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('booking.dateTime')}</h3>
                  <p className="text-gray-600">
                    {bookingDetails.date} {t('booking.at')} {bookingDetails.time}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('booking.durationLabel')}</h3>
                  <p className="text-gray-600">{bookingDetails.duration} {t('booking.hoursText')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('booking.locationLabel')}</h3>
                  <p className="text-gray-600">{bookingDetails.location}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('booking.selectedPhotographer')}</h3>
                {selectedPhotographer && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={selectedPhotographer.image}
                      alt={selectedPhotographer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{selectedPhotographer.name}</h4>
                      <p className="text-gray-600">{selectedPhotographer.location}</p>
                      <p className="text-blue-600 font-medium">{selectedPhotographer.hourlyRate}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">{t('booking.totalCost')}</span>
                  <span className="text-3xl font-bold text-blue-600">${calculateTotalCost()}</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {bookingDetails.duration} {t('booking.hoursMultiplier')} {selectedPhotographer?.hourlyRate}
                </p>
              </div>
              
              <button 
                onClick={handleConfirmBooking}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                {t('booking.confirmPay')}
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {t('booking.back')}
          </button>
          
          <button
            onClick={nextStep}
            disabled={
              (preSelectedPhotographer && currentStep === 3) || 
              (!preSelectedPhotographer && currentStep === 4) ||
              (!preSelectedPhotographer && currentStep === 3 && !selectedPhotographerId) ||
              (currentStep === 2 && (!bookingDetails.date || !bookingDetails.time || !bookingDetails.location))
            }
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              (preSelectedPhotographer && currentStep === 3) || 
              (!preSelectedPhotographer && currentStep === 4) ||
              (!preSelectedPhotographer && currentStep === 3 && !selectedPhotographerId) ||
              (currentStep === 2 && (!bookingDetails.date || !bookingDetails.time || !bookingDetails.location))
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {t('booking.continue')}
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
