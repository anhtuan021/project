import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Camera, Palette, Heart, Users, Shirt, Star, ArrowRight, Lightbulb, Edit3, Sparkles, BarChart3, CheckCircle, Headphones } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllPhotographers } from '../data/photographers';

const HomePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchStyle, setSearchStyle] = useState('');
  const [searchBudget, setSearchBudget] = useState('');
  const { t } = useLanguage();
  const navigate = useNavigate();

  const topPhotographers = getAllPhotographers().slice(0, 4);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (searchLocation.trim()) {
      searchParams.set('location', searchLocation.trim());
    }
    if (searchStyle) {
      searchParams.set('specialty', searchStyle);
    }
    if (searchBudget) {
      searchParams.set('budget', searchBudget);
    }
    
    navigate(`/photographers?${searchParams.toString()}`);
  };
  const aiFeatures = [
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
            title: t('home.features.smartMatching'),
      description: t('home.features.smartMatchingDesc')
    },
    {
      icon: <Edit3 className="h-8 w-8 text-purple-600" />,
            title: t('home.features.instantEditing'),
      description: t('home.features.instantEditingDesc')
    },
    {
      icon: <Sparkles className="h-8 w-8 text-pink-600" />,
            title: t('home.features.styleTransfer'),
      description: t('home.features.styleTransferDesc')
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
            title: t('home.features.analytics'),
      description: t('home.features.analyticsDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.hero.title')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> {t('home.hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder={t('home.search.location')}
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={searchStyle}
                    onChange={(e) => setSearchStyle(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">{t('home.search.style')}</option>
                                        <option value="portrait">{t('home.search.styles.portrait')}</option>
                    <option value="wedding">{t('home.search.styles.wedding')}</option>
                    <option value="landscape">{t('home.search.styles.landscape')}</option>
                    <option value="event">{t('home.search.styles.event')}</option>
                  </select>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <select
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="">{t('home.search.budget')}</option>
                                        <option value="0-50">{t('home.search.budget.range1')}</option>
                    <option value="50-100">{t('home.search.budget.range2')}</option>
                    <option value="100-200">{t('home.search.budget.range3')}</option>
                    <option value="200+">{t('home.search.budget.range4')}</option>
                  </select>
                </div>
                <button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  {t('home.search.button')}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">{t('home.stats.photographers')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600">{t('home.stats.photos')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">25K+</div>
                <div className="text-gray-600">{t('home.stats.clients')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
                <div className="text-gray-600">{t('home.stats.rating')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Photographers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.featured.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.featured.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPhotographers.map((photographer, index) => (
              <Link
                key={photographer.id}
                to={`/photographer/${index + 1}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photographer.image}
                    alt={photographer.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {photographer.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{photographer.location}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {photographer.rating}
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm ml-2">
                      ({photographer.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {photographer.specialties[0]?.replace(' Photography', '') || 'Photography'}
                    </span>
                    <span className="text-gray-900 font-medium">{photographer.hourlyRate}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.aiPowered.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.aiPowered.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.categories.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.categories.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
                            { icon: <Heart className="h-8 w-8" />, name: t('home.categories.wedding'), color: 'text-red-500' },
              { icon: <Users className="h-8 w-8" />, name: t('home.categories.portrait'), color: 'text-blue-500' },
              { icon: <Camera className="h-8 w-8" />, name: t('home.categories.event'), color: 'text-green-500' },
              { icon: <Palette className="h-8 w-8" />, name: t('home.categories.fashion'), color: 'text-purple-500' },
              { icon: <MapPin className="h-8 w-8" />, name: t('home.categories.travel'), color: 'text-orange-500' },
              { icon: <Shirt className="h-8 w-8" />, name: t('home.categories.product'), color: 'text-pink-500' },
            ].map((category, index) => (
              <Link
                key={index}
                to={`/photographers?category=${category.name.toLowerCase()}`}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center group"
              >
                <div className={`${category.color} mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.howItWorks.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                                title: t('home.howItWorks.step1.title'),
                description: t('home.howItWorks.step1.description'),
                icon: <Search className="h-8 w-8 text-blue-600" />
              },
              {
                step: '2',
                                title: t('home.howItWorks.step2.title'),
                description: t('home.howItWorks.step2.description'),
                icon: <CheckCircle className="h-8 w-8 text-green-600" />
              },
              {
                step: '3',
                                title: t('home.howItWorks.step3.title'),
                description: t('home.howItWorks.step3.description'),
                icon: <Sparkles className="h-8 w-8 text-purple-600" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  {item.icon}
                </div>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.testimonials.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('home.testimonials.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                                name: t('home.testimonials.realClient1'),
                role: t('home.testimonials.realClient1Role'),
                content: t('home.testimonials.realReview1'),
                rating: 5,
                image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
              },
              {
                                name: t('home.testimonials.realClient2'),
                role: t('home.testimonials.realClient2Role'),
                content: t('home.testimonials.realReview2'),
                rating: 5,
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
              },
              {
                                name: t('home.testimonials.realClient3'),
                role: t('home.testimonials.realClient3Role'),
                content: t('home.testimonials.realReview3'),
                rating: 5,
                image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Capture Your Moments?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have found their perfect photographer through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/photographers"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              Find Photographers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Camera className="mr-2 h-5 w-5" />
              Join as Photographer
            </Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-semibold text-white mb-2">Need Help?</h3>
              <p className="text-gray-400">Our support team is here to assist you 24/7</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-white">
                <Headphones className="h-5 w-5 mr-2" />
                <span>24/7 Support</span>
              </div>
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
