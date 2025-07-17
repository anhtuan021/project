import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Check, Camera, Users, Award, MessageCircle, Calendar, Shield } from 'lucide-react';
import { getPhotographerById } from '../data/photographers';

const PhotographerProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const { id } = useParams();

  const photographer = getPhotographerById(id || '1');

  if (!photographer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Photographer Not Found</h1>
          <p className="text-gray-600 mb-6">The photographer you're looking for doesn't exist.</p>
          <Link
            to="/photographers"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Photographers
          </Link>
        </div>
      </div>
    );
  }

  const filteredPortfolio = selectedTab === 'all' 
    ? photographer.portfolioItems 
    : photographer.portfolioItems.filter(item => item.category === selectedTab);

  // Get unique categories from portfolio items
  const categories = ['all', ...new Set(photographer.portfolioItems.map(item => item.category))];
  
  const tabs = categories.map(category => ({
    id: category,
    label: category === 'all' ? 'All Work' : category.charAt(0).toUpperCase() + category.slice(1)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <img
                  src={photographer.image}
                  alt={photographer.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex items-center justify-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 mr-2">{photographer.name}</h1>
                  {photographer.verified && (
                    <Shield className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div className="flex items-center justify-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{photographer.location}</span>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{photographer.rating}</span>
                    <span className="text-gray-500 ml-1">({photographer.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {photographer.hourlyRate}
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/booking?photographer=${photographer.id}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Book Now
                  </Link>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Message
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Camera className="h-4 w-4 mr-2" />
                    <span>Projects Completed</span>
                  </div>
                  <span className="font-medium">{photographer.projectsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Award className="h-4 w-4 mr-2" />
                    <span>Experience</span>
                  </div>
                  <span className="font-medium">{photographer.experience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span>Response Rate</span>
                  </div>
                  <span className="font-medium">{photographer.responseRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Response Time</span>
                  </div>
                  <span className="font-medium">{photographer.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Availability</span>
                  </div>
                  <span className={`font-medium ${photographer.availableForBookings ? 'text-green-600' : 'text-red-600'}`}>
                    {photographer.availableForBookings ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>

              {/* Languages */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {photographer.languages.map((language, index) => (
                    <span
                      to={`/booking?photographer=${photographer.id}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-2">Equipment</h3>
                <p className="text-gray-600 text-sm">{photographer.equipment}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Portfolio and Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{photographer.about}</p>
              
              <h3 className="font-medium text-gray-900 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {photographer.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
              
              {/* Portfolio Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={`Portfolio item ${item.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Reviews</h2>
              <div className="space-y-6">
                {photographer.clientReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-medium text-gray-900 mr-2">{review.name}</span>
                          <div className="flex items-center mr-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerProfilePage;