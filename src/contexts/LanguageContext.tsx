import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations
const translations = {
  en: {
    // Header
    'header.findPhotographers': 'Find Photographers',
    'header.aiFeatures': 'AI Features',
    'header.support': 'Support',
    'header.login': 'Login',
    'header.signup': 'Sign Up',
    'header.profile': 'Profile',
    'header.logout': 'Logout',
    'header.welcome': 'Welcome',
    'header.booking': 'Booking',
    
    // Home Page
    'home.title': 'Find Your Perfect Photographer with AI',
    'home.subtitle': 'Connect with professional photographers powered by intelligent matching',
    'home.search.location': 'Location',
    'home.search.style': 'Photography Style',
    'home.search.budget': 'Budget Range',
    'home.search.button': 'Search',
    'home.topPhotographers': 'Top Photographers Near You',
    'home.aiFeatures': 'AI-Powered Photography Experience',
    'home.aiSubtitle': 'Transform your photography workflow with our intelligent tools designed to enhance every aspect of your creative process',
    'home.cta.title': 'Ready to Transform Your Photography Experience?',
    'home.cta.subtitle': 'Join thousands of satisfied clients and photographers who trust SnapMatch AI',
    'home.cta.findPhotographer': 'Find a Photographer',
    'home.cta.joinPhotographer': 'Join as Photographer',
    'home.hero.title': 'Find Your Perfect',
    'home.hero.titleHighlight': 'Photographer',
    'home.hero.subtitle': 'Connect with talented photographers worldwide. Book sessions, get AI-enhanced photos, and create memories that last forever.',
    'home.stats.photographers': 'Photographers',
    'home.stats.photos': 'Photos Taken',
    'home.stats.clients': 'Happy Clients',
    'home.stats.rating': 'Average Rating',
    'home.featured.title': 'Featured Photographers',
    'home.featured.subtitle': 'Discover talented photographers from around the world, each bringing their unique style and expertise to capture your special moments.',
    'home.aiPowered.title': 'AI-Powered Photography',
    'home.aiPowered.subtitle': 'Experience the future of photography with our cutting-edge AI tools that enhance every aspect of your photo journey.',
    'home.categories.title': 'Photography Categories',
    'home.categories.subtitle': 'Find the perfect photographer for any occasion or style preference.',
    'home.howItWorks.title': 'How It Works',
    'home.howItWorks.subtitle': 'Getting professional photos has never been easier. Follow these simple steps to book your perfect photographer.',
    'home.howItWorks.step1.title': 'Search & Browse',
    'home.howItWorks.step1.description': 'Find photographers in your area using our smart search filters.',
    'home.howItWorks.step2.title': 'Book & Pay',
    'home.howItWorks.step2.description': 'Choose your preferred photographer and book your session securely.',
    'home.howItWorks.step3.title': 'Get Photos',
    'home.howItWorks.step3.description': 'Receive your professionally edited photos enhanced with AI.',
    'home.testimonials.title': 'What Our Clients Say',
    'home.testimonials.subtitle': "Don't just take our word for it. Here's what our satisfied clients have to say about their experience.",
    'home.cta.finalTitle': 'Ready to Capture Your Moments?',
    'home.cta.finalSubtitle': 'Join thousands of satisfied clients who have found their perfect photographer through our platform.',
    'home.cta.findPhotographers': 'Find Photographers',
    'home.cta.joinAsPhotographer': 'Join as Photographer',
    'home.support.title': 'Need Help?',
    'home.support.subtitle': 'Our support team is here to assist you 24/7',
    'home.support.available': '24/7 Support',
    'home.support.contact': 'Contact Us',
    
    // Login Page
    'login.title': 'Welcome back to SnapMatch AI',
    'login.subtitle': 'Sign in to continue to your account',
    'login.email': 'Email address',
    'login.password': 'Password',
    'login.forgotPassword': 'Forgot password?',
    'login.signIn': 'Sign In',
    'login.signInWith': 'or continue with',
    'login.googleSignIn': 'Sign in with Google',
    'login.noAccount': "Don't have an account?",
    'login.signUp': 'Sign up',
    'login.emailPlaceholder': 'Enter your email',
    'login.passwordPlaceholder': 'Enter your password',
    'login.loading': 'Signing in...',
    'login.error': 'Email or password is incorrect',
    
    // Sign Up Page
    'signup.title': 'Create Account',
    'signup.subtitle': 'Already have an account?',
    'signup.login': 'Log in',
    'signup.googleSignUp': 'Sign up with Google',
    'signup.continueWith': 'Or continue with email',
    'signup.fullName': 'Full Name',
    'signup.email': 'Email Address',
    'signup.password': 'Password',
    'signup.confirmPassword': 'Confirm Password',
    'signup.passwordHint': 'Must be at least 8 characters long',
    'signup.agreeTerms': 'I agree to the',
    'signup.termsOfService': 'Terms of Service',
    'signup.and': 'and',
    'signup.privacyPolicy': 'Privacy Policy',
    'signup.createAccount': 'Create Account',
    'signup.loading': 'Creating account...',
    'signup.fullNamePlaceholder': 'Enter your full name',
    'signup.emailPlaceholder': 'name@example.com',
    'signup.passwordPlaceholder': 'Create a password',
    'signup.confirmPasswordPlaceholder': 'Re-enter your password',
    'signup.leftTitle': 'Join the creative world of SnapMatch AI',
    'signup.leftSubtitle': 'Transform your ideas into reality with AI-powered creativity',
    'signup.leftFeature': 'Create amazing designs with SnapMatch AI',
    
    // Profile Page
    'profile.editProfile': 'Edit Profile',
    'profile.joinedSince': 'Joined since',
    'profile.upcoming': 'Upcoming',
    'profile.completed': 'Completed',
    'profile.bookingHistory': 'Booking History',
    'profile.savedPhotographers': 'Saved Photographers',
    'profile.aiSuggestions': 'Saved AI Ideas',
    'profile.viewDetails': 'View Details',
    'profile.status.completed': 'Completed',
    'profile.status.upcoming': 'Upcoming',
    'profile.status.cancelled': 'Cancelled',
    'profile.noUpcoming': 'No Upcoming Bookings',
    'profile.noCompleted': 'No Completed Bookings',
    'profile.noUpcomingDesc': "You don't have any upcoming photography sessions.",
    'profile.noCompletedDesc': "You haven't completed any photography sessions yet.",
    'profile.findPhotographers': 'Find Photographers',
    
    // Edit Profile Page
    'editProfile.title': 'Edit Profile',
    'editProfile.changePhoto': 'Change Photo',
    'editProfile.fullName': 'Full Name',
    'editProfile.email': 'Email Address',
    'editProfile.phone': 'Phone Number (Optional)',
    'editProfile.password': 'Password',
    'editProfile.changePassword': 'Change Password',
    'editProfile.language': 'Language',
    'editProfile.theme': 'Theme',
    'editProfile.saveChanges': 'Save Changes',
    'editProfile.cancel': 'Cancel',
    'editProfile.needAssistance': 'Need assistance?',
    'editProfile.chatSupport': 'Chat with AI Support',
    'editProfile.success': 'Profile updated successfully!',
    
    // Photographer Listing Page
    'listing.title': 'Find Photographers',
    'listing.subtitle': 'Discover talented photographers in your area',
    'listing.grid': 'Grid',
    'listing.map': 'Map',
    'listing.filters': 'Filters',
    'listing.search': 'Search',
    'listing.searchPlaceholder': 'Name, location, or specialty...',
    'listing.specialty': 'Specialty',
    'listing.allSpecialties': 'All Specialties',
    'listing.priceRange': 'Price Range',
    'listing.anyPrice': 'Any Price',
    'listing.location': 'Location',
    'listing.locationPlaceholder': 'City or region...',
    'listing.availability': 'Availability',
    'listing.anyTime': 'Any Time',
    'listing.availableNow': 'Available Now',
    'listing.availableTomorrow': 'Available Tomorrow',
    'listing.availableNextWeek': 'Available Next Week',
    'listing.clearFilters': 'Clear All Filters',
    'listing.photographersFound': 'photographers found',
    'listing.photographerFound': 'photographer found',
    'listing.filteredFromSearch': '(filtered from search)',
    'listing.sortBy': 'Sort by:',
    'listing.relevance': 'Relevance',
    'listing.rating': 'Rating',
    'listing.priceLowHigh': 'Price (Low to High)',
    'listing.priceHighLow': 'Price (High to Low)',
    'listing.verified': 'Verified',
    'listing.viewProfile': 'View Profile',
    'listing.bookNow': 'Book Now',
    'listing.mapComingSoon': 'Map view coming soon',
    'listing.mapDescription': 'Interactive map with photographer locations',
    'listing.noResults': 'No photographers found',
    'listing.noResultsDesc': 'Try adjusting your search criteria or filters',
    
    // Photographer Profile Page
    'photographerProfile.professional': 'Professional Photographer',
    'photographerProfile.bookNow': 'Book Now',
    'photographerProfile.message': 'Message',
    'photographerProfile.projectsCompleted': 'Projects Completed',
    'photographerProfile.experience': 'Experience',
    'photographerProfile.responseRate': 'Response Rate',
    'photographerProfile.responseTime': 'Response Time',
    'photographerProfile.availability': 'Availability',
    'photographerProfile.available': 'Available',
    'photographerProfile.busy': 'Busy',
    'photographerProfile.languages': 'Languages',
    'photographerProfile.equipment': 'Equipment',
    'photographerProfile.about': 'About',
    'photographerProfile.specialties': 'Specialties',
    'photographerProfile.portfolio': 'Portfolio',
    'photographerProfile.allWork': 'All Work',
    'photographerProfile.clientReviews': 'Client Reviews',
    'photographerProfile.notFound': 'Photographer Not Found',
    'photographerProfile.notFoundDesc': "The photographer you're looking for doesn't exist.",
    'photographerProfile.backToPhotographers': 'Back to Photographers',
    
    // Booking Page
    'booking.title': 'Book a Photographer',
    'booking.step': 'Step',
    'booking.of': 'of',
    'booking.photographyType': 'What type of photography do you need?',
    'booking.selectedPhotographer': 'Selected Photographer',
    'booking.whenWhere': 'When and where do you need photography?',
    'booking.eventDate': 'Event Date',
    'booking.eventTime': 'Event Time',
    'booking.duration': 'Duration (hours)',
    'booking.estimatedCost': 'Estimated Cost',
    'booking.eventLocation': 'Event Location',
    'booking.locationPlaceholder': 'Enter the address or venue name',
    'booking.additionalNotes': 'Additional Notes (Optional)',
    'booking.notesPlaceholder': 'Tell us more about your event or specific requirements...',
    'booking.choosePhotographer': 'Choose Your Photographer',
    'booking.selected': 'Selected',
    'booking.select': 'Select',
    'booking.reviewBooking': 'Review Your Booking',
    'booking.totalCost': 'Total Cost',
    'booking.confirmPay': 'Confirm Booking & Pay',
    'booking.back': 'Back',
    'booking.continue': 'Continue',
    'booking.authRequired': 'Authentication Required',
    'booking.loginRequired': 'Please log in to book a photographer',
    'booking.goToLogin': 'Go to Login',
    'booking.portraitPhotography': 'Portrait Photography',
    'booking.portraitDesc': 'Professional headshots and personal portraits',
    'booking.eventPhotography': 'Event Photography',
    'booking.eventDesc': 'Capture your special events and celebrations',
    'booking.weddingPhotography': 'Wedding Photography',
    'booking.weddingDesc': 'Document your most important day',
    'booking.fashionPhotography': 'Fashion Photography',
    'booking.fashionDesc': 'Professional fashion and lifestyle shoots',
    
    // Booking Invoice Page
    'invoice.confirmed': 'Your Booking is Confirmed!',
    'invoice.reference': 'Booking Reference:',
    'invoice.bookingDetails': 'Booking Details',
    'invoice.date': 'Date',
    'invoice.time': 'Time',
    'invoice.duration': 'Duration',
    'invoice.type': 'Type',
    'invoice.location': 'Location',
    'invoice.status': 'Status',
    'invoice.totalCost': 'Total Cost',
    'invoice.backToBookings': 'Go back to My Bookings',
    
    // AI Tools Page
    'aiTools.title': 'AI-Powered Photography Tools',
    'aiTools.subtitle': 'Transform your photography workflow with our intelligent tools',
    'aiTools.conceptGenerator': 'Concept Generator',
    'aiTools.conceptDesc': 'Generate creative photography concepts from text',
    'aiTools.autoEditing': 'Auto-Editing Tool',
    'aiTools.autoEditingDesc': 'AI-powered photo editing and enhancement',
    'aiTools.styleMatcher': 'Style Matcher',
    'aiTools.styleMatcherDesc': 'Find photographers with matching aesthetics',
    'aiTools.enterTheme': 'Enter your theme or description',
    'aiTools.themePlaceholder': 'e.g., romantic sunset wedding, modern urban portrait...',
    'aiTools.generate': 'Generate',
    'aiTools.uploadPhoto': 'Upload Your Photo',
    'aiTools.dragDrop': 'Drag and drop your photo here',
    'aiTools.browseFiles': 'Browse Files',
    'aiTools.aiEnhanced': 'AI-Enhanced Preview',
    'aiTools.enhancedPreview': 'Enhanced photo will appear here',
    'aiTools.brightness': 'Brightness',
    'aiTools.contrast': 'Contrast',
    'aiTools.saturation': 'Saturation',
    'aiTools.autoEnhance': 'Auto Enhance',
    'aiTools.uploadReference': 'Upload a reference photo',
    'aiTools.matchedPhotographers': 'Matched Photographers',
    'aiTools.detectedTags': 'Detected Style Tags',
    'aiTools.getStarted': 'Get Started in Minutes',
    'aiTools.generateIdeas': 'Generate Ideas',
    'aiTools.generateIdeasDesc': 'Create visual concepts from text descriptions',
    'aiTools.editAutomatically': 'Edit Automatically',
    'aiTools.editAutomaticallyDesc': 'Enhance your photos with AI-powered editing',
    'aiTools.matchStyles': 'Match Styles',
    'aiTools.matchStylesDesc': 'Find photographers with similar aesthetic',
    
    // Support Page
    'support.title': 'Support Center',
    'support.gettingStarted': 'Getting Started',
    'support.gettingStartedDesc': 'Learn the basics of SnapMatch AI',
    'support.accountSettings': 'Account Settings',
    'support.accountSettingsDesc': 'Manage your account preferences',
    'support.matchingProcess': 'Matching Process',
    'support.matchingProcessDesc': 'How our AI matching works',
    'support.pricingPlans': 'Pricing & Plans',
    'support.pricingPlansDesc': 'Billing and subscription info',
    'support.faq': 'FAQ',
    'support.faqDesc': 'Frequently asked questions',
    'support.contactInfo': 'Contact Information',
    'support.chatWithAI': 'Chat with SnapMatch AI',
    'support.online': 'Online',
    'support.respondsIn': 'Usually responds in 1 minute',
    'support.typeMessage': 'Type your message here...',
    'support.quickActions': 'Quick Actions',
    'support.howToBook': 'How do I book?',
    'support.priceRange': "What's the price range?",
    'support.aiMatching': 'How does the AI matching work?',
    'support.accountSetup': 'Account setup help',
    'support.helpfulResources': 'Helpful Resources',
    'support.gettingStartedGuide': 'Getting Started Guide',
    'support.accountSecurity': 'Account Security',
    'support.privacySettings': 'Privacy Settings',
    'support.paymentMethods': 'Payment Methods',
    'support.termsOfService': 'Terms of Service',
    'support.needMoreHelp': 'Need More Help?',
    'support.cantFind': "Can't find what you're looking for? Contact our support team.",
    'support.contactSupport': 'Contact Support',
    'support.privacyPolicy': 'Privacy Policy',
    'support.helpCenter': 'Help Center',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred. Please try again.',
    'common.success': 'Success!',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.viewAll': 'View All',
    'common.showMore': 'Show More',
    'common.showLess': 'Show Less',
    'common.hours': 'hours',
    'common.hour': 'hour',
    'common.years': 'years',
    'common.reviews': 'reviews',
    'common.review': 'review',
  },
  vi: {
    // Header
    'header.findPhotographers': 'Tìm Nhiếp Ảnh Gia',
    'header.aiFeatures': 'Tính Năng AI',
    'header.support': 'Hỗ Trợ',
    'header.login': 'Đăng Nhập',
    'header.signup': 'Đăng Ký',
    'header.profile': 'Hồ Sơ',
    'header.logout': 'Đăng Xuất',
    'header.welcome': 'Chào mừng',
    'header.booking': 'Đặt Lịch',
    
    // Home Page
    'home.title': 'Tìm Nhiếp Ảnh Gia Hoàn Hảo với AI',
    'home.subtitle': 'Kết nối với các nhiếp ảnh gia chuyên nghiệp thông qua hệ thống ghép đôi thông minh',
    'home.search.location': 'Địa điểm',
    'home.search.style': 'Phong cách chụp ảnh',
    'home.search.budget': 'Ngân sách',
    'home.search.button': 'Tìm kiếm',
    'home.topPhotographers': 'Nhiếp Ảnh Gia Hàng Đầu Gần Bạn',
    'home.aiFeatures': 'Trải Nghiệm Chụp Ảnh Được Hỗ Trợ Bởi AI',
    'home.aiSubtitle': 'Biến đổi quy trình chụp ảnh của bạn với các công cụ thông minh được thiết kế để nâng cao mọi khía cạnh của quá trình sáng tạo',
    'home.cta.title': 'Sẵn Sàng Biến Đổi Trải Nghiệm Chụp Ảnh?',
    'home.cta.subtitle': 'Tham gia cùng hàng nghìn khách hàng và nhiếp ảnh gia hài lòng tin tưởng SnapMatch AI',
    'home.cta.findPhotographer': 'Tìm Nhiếp Ảnh Gia',
    'home.cta.joinPhotographer': 'Tham Gia Với Tư Cách Nhiếp Ảnh Gia',
    'home.hero.title': 'Tìm Nhiếp Ảnh Gia',
    'home.hero.titleHighlight': 'Hoàn Hảo',
    'home.hero.subtitle': 'Kết nối với các nhiếp ảnh gia tài năng trên toàn thế giới. Đặt lịch chụp, nhận ảnh được nâng cấp bởi AI và tạo ra những kỷ niệm vĩnh cửu.',
    'home.stats.photographers': 'Nhiếp Ảnh Gia',
    'home.stats.photos': 'Ảnh Đã Chụp',
    'home.stats.clients': 'Khách Hàng Hài Lòng',
    'home.stats.rating': 'Đánh Giá Trung Bình',
    'home.featured.title': 'Nhiếp Ảnh Gia Nổi Bật',
    'home.featured.subtitle': 'Khám phá các nhiếp ảnh gia tài năng từ khắp nơi trên thế giới, mỗi người mang đến phong cách và chuyên môn độc đáo để ghi lại những khoảnh khắc đặc biệt của bạn.',
    'home.aiPowered.title': 'Nhiếp Ảnh Được Hỗ Trợ Bởi AI',
    'home.aiPowered.subtitle': 'Trải nghiệm tương lai của nhiếp ảnh với các công cụ AI tiên tiến giúp nâng cao mọi khía cạnh trong hành trình chụp ảnh của bạn.',
    'home.categories.title': 'Danh Mục Nhiếp Ảnh',
    'home.categories.subtitle': 'Tìm nhiếp ảnh gia hoàn hảo cho bất kỳ dịp nào hoặc sở thích phong cách.',
    'home.howItWorks.title': 'Cách Thức Hoạt Động',
    'home.howItWorks.subtitle': 'Việc có được những bức ảnh chuyên nghiệp chưa bao giờ dễ dàng hơn. Làm theo các bước đơn giản này để đặt nhiếp ảnh gia hoàn hảo của bạn.',
    'home.howItWorks.step1.title': 'Tìm Kiếm & Duyệt',
    'home.howItWorks.step1.description': 'Tìm nhiếp ảnh gia trong khu vực của bạn bằng bộ lọc tìm kiếm thông minh.',
    'home.howItWorks.step2.title': 'Đặt Lịch & Thanh Toán',
    'home.howItWorks.step2.description': 'Chọn nhiếp ảnh gia ưa thích và đặt lịch chụp một cách an toàn.',
    'home.howItWorks.step3.title': 'Nhận Ảnh',
    'home.howItWorks.step3.description': 'Nhận những bức ảnh được chỉnh sửa chuyên nghiệp và nâng cấp bởi AI.',
    'home.testimonials.title': 'Khách Hàng Nói Gì Về Chúng Tôi',
    'home.testimonials.subtitle': 'Đừng chỉ tin lời chúng tôi. Đây là những gì khách hàng hài lòng nói về trải nghiệm của họ.',
    'home.cta.finalTitle': 'Sẵn Sàng Ghi Lại Những Khoảnh Khắc?',
    'home.cta.finalSubtitle': 'Tham gia cùng hàng nghìn khách hàng hài lòng đã tìm thấy nhiếp ảnh gia hoàn hảo thông qua nền tảng của chúng tôi.',
    'home.cta.findPhotographers': 'Tìm Nhiếp Ảnh Gia',
    'home.cta.joinAsPhotographer': 'Tham Gia Với Tư Cách Nhiếp Ảnh Gia',
    'home.support.title': 'Cần Giúp Đỡ?',
    'home.support.subtitle': 'Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7',
    'home.support.available': 'Hỗ Trợ 24/7',
    'home.support.contact': 'Liên Hệ',
    
    // Login Page
    'login.title': 'Chào mừng trở lại SnapMatch AI',
    'login.subtitle': 'Đăng nhập để tiếp tục vào tài khoản của bạn',
    'login.email': 'Địa chỉ email',
    'login.password': 'Mật khẩu',
    'login.forgotPassword': 'Quên mật khẩu?',
    'login.signIn': 'Đăng Nhập',
    'login.signInWith': 'hoặc tiếp tục với',
    'login.googleSignIn': 'Đăng nhập với Google',
    'login.noAccount': 'Chưa có tài khoản?',
    'login.signUp': 'Đăng ký',
    'login.emailPlaceholder': 'Nhập email của bạn',
    'login.passwordPlaceholder': 'Nhập mật khẩu của bạn',
    'login.loading': 'Đang đăng nhập...',
    'login.error': 'Email hoặc mật khẩu không đúng',
    
    // Sign Up Page
    'signup.title': 'Tạo Tài Khoản',
    'signup.subtitle': 'Đã có tài khoản?',
    'signup.login': 'Đăng nhập',
    'signup.googleSignUp': 'Đăng ký với Google',
    'signup.continueWith': 'Hoặc tiếp tục với email',
    'signup.fullName': 'Họ và Tên',
    'signup.email': 'Địa Chỉ Email',
    'signup.password': 'Mật Khẩu',
    'signup.confirmPassword': 'Xác Nhận Mật Khẩu',
    'signup.passwordHint': 'Phải có ít nhất 8 ký tự',
    'signup.agreeTerms': 'Tôi đồng ý với',
    'signup.termsOfService': 'Điều khoản dịch vụ',
    'signup.and': 'và',
    'signup.privacyPolicy': 'Chính sách bảo mật',
    'signup.createAccount': 'Tạo Tài Khoản',
    'signup.loading': 'Đang tạo tài khoản...',
    'signup.fullNamePlaceholder': 'Nhập họ và tên của bạn',
    'signup.emailPlaceholder': 'ten@example.com',
    'signup.passwordPlaceholder': 'Tạo mật khẩu',
    'signup.confirmPasswordPlaceholder': 'Nhập lại mật khẩu',
    'signup.leftTitle': 'Tham gia thế giới sáng tạo của SnapMatch AI',
    'signup.leftSubtitle': 'Biến ý tưởng của bạn thành hiện thực với sự sáng tạo được hỗ trợ bởi AI',
    'signup.leftFeature': 'Tạo ra những thiết kế tuyệt vời với SnapMatch AI',
    
    // Profile Page
    'profile.editProfile': 'Chỉnh Sửa Hồ Sơ',
    'profile.joinedSince': 'Tham gia từ',
    'profile.upcoming': 'Sắp Tới',
    'profile.completed': 'Đã Hoàn Thành',
    'profile.bookingHistory': 'Lịch Sử Đặt Lịch',
    'profile.savedPhotographers': 'Nhiếp Ảnh Gia Đã Lưu',
    'profile.aiSuggestions': 'Ý Tưởng AI Đã Lưu',
    'profile.viewDetails': 'Xem Chi Tiết',
    'profile.status.completed': 'Đã hoàn thành',
    'profile.status.upcoming': 'Sắp tới',
    'profile.status.cancelled': 'Đã hủy',
    'profile.noUpcoming': 'Không Có Lịch Sắp Tới',
    'profile.noCompleted': 'Không Có Lịch Đã Hoàn Thành',
    'profile.noUpcomingDesc': 'Bạn không có buổi chụp ảnh nào sắp tới.',
    'profile.noCompletedDesc': 'Bạn chưa hoàn thành buổi chụp ảnh nào.',
    'profile.findPhotographers': 'Tìm Nhiếp Ảnh Gia',
    
    // Edit Profile Page
    'editProfile.title': 'Chỉnh Sửa Hồ Sơ',
    'editProfile.changePhoto': 'Thay Đổi Ảnh',
    'editProfile.fullName': 'Họ và Tên',
    'editProfile.email': 'Địa Chỉ Email',
    'editProfile.phone': 'Số Điện Thoại (Tùy chọn)',
    'editProfile.password': 'Mật Khẩu',
    'editProfile.changePassword': 'Thay Đổi Mật Khẩu',
    'editProfile.language': 'Ngôn Ngữ',
    'editProfile.theme': 'Giao Diện',
    'editProfile.english': 'Tiếng Anh',
    'editProfile.vietnamese': 'Tiếng Việt',
    'editProfile.spanish': 'Tiếng Tây Ban Nha',
    'editProfile.french': 'Tiếng Pháp',
    'editProfile.light': 'Sáng',
    'editProfile.dark': 'Tối',
    'editProfile.saveChanges': 'Lưu Thay Đổi',
    'editProfile.cancel': 'Hủy',
    'editProfile.needAssistance': 'Cần hỗ trợ?',
    'editProfile.chatSupport': 'Trò chuyện với AI Hỗ trợ',
    'editProfile.success': 'Cập nhật hồ sơ thành công!',
    
    // Photographer Listing Page
    'listing.title': 'Tìm Nhiếp Ảnh Gia',
    'listing.subtitle': 'Khám phá các nhiếp ảnh gia tài năng trong khu vực của bạn',
    'listing.grid': 'Lưới',
    'listing.map': 'Bản Đồ',
    'listing.filters': 'Bộ Lọc',
    'listing.search': 'Tìm Kiếm',
    'listing.searchPlaceholder': 'Tên, địa điểm hoặc chuyên môn...',
    'listing.specialty': 'Chuyên Môn',
    'listing.allSpecialties': 'Tất Cả Chuyên Môn',
    'listing.priceRange': 'Khoảng Giá',
    'listing.anyPrice': 'Bất Kỳ Giá Nào',
    'listing.location': 'Địa Điểm',
    'listing.locationPlaceholder': 'Thành phố hoặc khu vực...',
    'listing.availability': 'Tình Trạng',
    'listing.anyTime': 'Bất Kỳ Lúc Nào',
    'listing.availableNow': 'Có Sẵn Ngay',
    'listing.availableTomorrow': 'Có Sẵn Ngày Mai',
    'listing.availableNextWeek': 'Có Sẵn Tuần Sau',
    'listing.clearFilters': 'Xóa Tất Cả Bộ Lọc',
    'listing.photographersFound': 'nhiếp ảnh gia được tìm thấy',
    'listing.photographerFound': 'nhiếp ảnh gia được tìm thấy',
    'listing.filteredFromSearch': '(được lọc từ tìm kiếm)',
    'listing.sortBy': 'Sắp xếp theo:',
    'listing.relevance': 'Liên quan',
    'listing.rating': 'Đánh giá',
    'listing.priceLowHigh': 'Giá (Thấp đến Cao)',
    'listing.priceHighLow': 'Giá (Cao đến Thấp)',
    'listing.verified': 'Đã Xác Minh',
    'listing.viewProfile': 'Xem Hồ Sơ',
    'listing.bookNow': 'Đặt Ngay',
    'listing.mapComingSoon': 'Chế độ xem bản đồ sắp ra mắt',
    'listing.mapDescription': 'Bản đồ tương tác với vị trí nhiếp ảnh gia',
    'listing.noResults': 'Không tìm thấy nhiếp ảnh gia',
    'listing.noResultsDesc': 'Thử điều chỉnh tiêu chí tìm kiếm hoặc bộ lọc',
    
    // Photographer Profile Page
    'photographerProfile.professional': 'Nhiếp Ảnh Gia Chuyên Nghiệp',
    'photographerProfile.bookNow': 'Đặt Ngay',
    'photographerProfile.message': 'Nhắn Tin',
    'photographerProfile.projectsCompleted': 'Dự Án Hoàn Thành',
    'photographerProfile.experience': 'Kinh Nghiệm',
    'photographerProfile.responseRate': 'Tỷ Lệ Phản Hồi',
    'photographerProfile.responseTime': 'Thời Gian Phản Hồi',
    'photographerProfile.availability': 'Tình Trạng',
    'photographerProfile.available': 'Có Sẵn',
    'photographerProfile.busy': 'Bận',
    'photographerProfile.languages': 'Ngôn Ngữ',
    'photographerProfile.equipment': 'Thiết Bị',
    'photographerProfile.about': 'Giới Thiệu',
    'photographerProfile.specialties': 'Chuyên Môn',
    'photographerProfile.portfolio': 'Danh Mục Tác Phẩm',
    'photographerProfile.allWork': 'Tất Cả Tác Phẩm',
    'photographerProfile.clientReviews': 'Đánh Giá Khách Hàng',
    'photographerProfile.notFound': 'Không Tìm Thấy Nhiếp Ảnh Gia',
    'photographerProfile.notFoundDesc': 'Nhiếp ảnh gia bạn đang tìm không tồn tại.',
    'photographerProfile.backToPhotographers': 'Quay Lại Danh Sách Nhiếp Ảnh Gia',
    
    // Booking Page
    'booking.title': 'Đặt Lịch Nhiếp Ảnh Gia',
    'booking.step': 'Bước',
    'booking.of': 'của',
    'booking.photographyType': 'Bạn cần loại nhiếp ảnh nào?',
    'booking.selectedPhotographer': 'Nhiếp Ảnh Gia Đã Chọn',
    'booking.whenWhere': 'Khi nào và ở đâu bạn cần chụp ảnh?',
    'booking.eventDate': 'Ngày Sự Kiện',
    'booking.eventTime': 'Giờ Sự Kiện',
    'booking.duration': 'Thời Lượng (giờ)',
    'booking.estimatedCost': 'Chi Phí Ước Tính',
    'booking.eventLocation': 'Địa Điểm Sự Kiện',
    'booking.locationPlaceholder': 'Nhập địa chỉ hoặc tên địa điểm',
    'booking.additionalNotes': 'Ghi Chú Thêm (Tùy chọn)',
    'booking.notesPlaceholder': 'Cho chúng tôi biết thêm về sự kiện hoặc yêu cầu cụ thể...',
    'booking.choosePhotographer': 'Chọn Nhiếp Ảnh Gia',
    'booking.selected': 'Đã Chọn',
    'booking.select': 'Chọn',
    'booking.reviewBooking': 'Xem Lại Đặt Lịch',
    'booking.totalCost': 'Tổng Chi Phí',
    'booking.confirmAndPay': 'Xác Nhận Đặt Lịch & Thanh Toán',
    'booking.back': 'Quay Lại',
    'booking.continue': 'Tiếp Tục',
    'booking.authRequired': 'Yêu Cầu Xác Thực',
    'booking.loginRequired': 'Vui lòng đăng nhập để đặt lịch nhiếp ảnh gia',
    'booking.goToLogin': 'Đi Đến Đăng Nhập',
    'booking.portraitDesc': 'Ảnh chân dung chuyên nghiệp và cá nhân',
    'booking.eventDesc': 'Ghi lại các sự kiện đặc biệt và lễ kỷ niệm',
    'booking.weddingDesc': 'Ghi lại ngày quan trọng nhất của bạn',
    'booking.fashionDesc': 'Chụp ảnh thời trang và phong cách sống chuyên nghiệp',
    'booking.portraitDesc': 'Ảnh chân dung chuyên nghiệp và cá nhân',
    'booking.eventPhotography': 'Chụp Ảnh Sự Kiện',
    'booking.eventDesc': 'Ghi lại các sự kiện đặc biệt và lễ kỷ niệm',
    'booking.weddingPhotography': 'Chụp Ảnh Cưới',
    'booking.weddingDesc': 'Ghi lại ngày quan trọng nhất của bạn',
    'booking.fashionPhotography': 'Chụp Ảnh Thời Trang',
    'booking.fashionDesc': 'Chụp ảnh thời trang và phong cách sống chuyên nghiệp',
    
    // Booking Invoice Page
    'invoice.confirmed': 'Đặt Lịch Của Bạn Đã Được Xác Nhận!',
    'invoice.reference': 'Mã Tham Chiếu Đặt Lịch:',
    'invoice.professionalPhotographer': 'Nhiếp Ảnh Gia Chuyên Nghiệp',
    'invoice.bookingDetails': 'Chi Tiết Đặt Lịch',
    'invoice.date': 'Ngày',
    'invoice.time': 'Giờ',
    'invoice.duration': 'Thời Lượng',
    'invoice.type': 'Loại',
    'invoice.location': 'Địa Điểm',
    'invoice.status': 'Trạng Thái',
    'invoice.totalCost': 'Tổng Chi Phí',
    'invoice.backToBookings': 'Quay Lại Lịch Đặt Của Tôi',
    
    // AI Tools Page
    'aiTools.title': 'Công Cụ Nhiếp Ảnh Được Hỗ Trợ Bởi AI',
    'aiTools.subtitle': 'Biến đổi quy trình nhiếp ảnh của bạn với các công cụ thông minh',
    'aiTools.conceptGenerator': 'Tạo Ý Tưởng',
    'aiTools.conceptDesc': 'Tạo ý tưởng nhiếp ảnh sáng tạo từ văn bản',
    'aiTools.autoEditing': 'Công Cụ Chỉnh Sửa Tự Động',
    'aiTools.autoEditingDesc': 'Chỉnh sửa và nâng cấp ảnh được hỗ trợ bởi AI',
    'aiTools.styleMatcher': 'Ghép Đôi Phong Cách',
    'aiTools.styleMatcherDesc': 'Tìm nhiếp ảnh gia có thẩm mỹ phù hợp',
    'aiTools.enterTheme': 'Nhập chủ đề hoặc mô tả của bạn',
    'aiTools.themePlaceholder': 'ví dụ: đám cưới hoàng hôn lãng mạn, chân dung đô thị hiện đại...',
    'aiTools.generate': 'Tạo',
    'aiTools.uploadPhoto': 'Tải Ảnh Lên',
    'aiTools.dragDrop': 'Kéo và thả ảnh của bạn vào đây',
    'aiTools.browseFiles': 'Duyệt Tệp',
    'aiTools.aiEnhanced': 'Xem Trước Được Nâng Cấp Bởi AI',
    'aiTools.enhancedPreview': 'Ảnh được nâng cấp sẽ xuất hiện ở đây',
    'aiTools.brightness': 'Độ Sáng',
    'aiTools.contrast': 'Độ Tương Phản',
    'aiTools.saturation': 'Độ Bão Hòa',
    'aiTools.autoEnhance': 'Nâng Cấp Tự Động',
    'aiTools.uploadReference': 'Tải ảnh tham khảo lên',
    'aiTools.matchedPhotographers': 'Nhiếp Ảnh Gia Phù Hợp',
    'aiTools.detectedTags': 'Thẻ Phong Cách Được Phát Hiện',
    'aiTools.getStarted': 'Bắt Đầu Trong Vài Phút',
    'aiTools.generateIdeas': 'Tạo Ý Tưởng',
    'aiTools.generateIdeasDesc': 'Tạo khái niệm hình ảnh từ mô tả văn bản',
    'aiTools.editAutomatically': 'Chỉnh Sửa Tự Động',
    'aiTools.editAutomaticallyDesc': 'Nâng cấp ảnh của bạn với chỉnh sửa được hỗ trợ bởi AI',
    'aiTools.matchStyles': 'Ghép Đôi Phong Cách',
    'aiTools.matchStylesDesc': 'Tìm nhiếp ảnh gia có thẩm mỹ tương tự',
    
    // Support Page
    'support.title': 'Trung Tâm Hỗ Trợ',
    'support.gettingStarted': 'Bắt Đầu',
    'support.gettingStartedDesc': 'Tìm hiểu những điều cơ bản về SnapMatch AI',
    'support.accountSettings': 'Cài Đặt Tài Khoản',
    'support.accountSettingsDesc': 'Quản lý tùy chọn tài khoản của bạn',
    'support.matchingProcess': 'Quy Trình Ghép Đôi',
    'support.matchingProcessDesc': 'Cách thức hoạt động của AI ghép đôi',
    'support.pricingPlans': 'Giá & Gói Dịch Vụ',
    'support.pricingPlansDesc': 'Thông tin thanh toán và đăng ký',
    'support.faq': 'Câu Hỏi Thường Gặp',
    'support.faqDesc': 'Các câu hỏi được hỏi thường xuyên',
    'support.contactInfo': 'Thông Tin Liên Hệ',
    'support.chatWithAI': 'Trò Chuyện Với SnapMatch AI',
    'support.online': 'Trực Tuyến',
    'support.respondsIn': 'Thường phản hồi trong 1 phút',
    'support.typePlaceholder': 'Nhập tin nhắn của bạn ở đây...',
    'support.helpfulResources': 'Tài Nguyên Hữu Ích',
    'support.needMoreHelp': 'Cần Thêm Trợ Giúp?',
    'support.cantFind': 'Không thể tìm thấy những gì bạn đang tìm kiếm? Liên hệ với đội ngũ hỗ trợ của chúng tôi.',
    'support.contactSupport': 'Liên Hệ Hỗ Trợ',
    'support.quickActions.booking': 'Làm thế nào để đặt lịch?',
    'support.quickActions.price': 'Khoảng giá là bao nhiêu?',
    'support.quickActions.matching': 'AI ghép đôi hoạt động như thế nào?',
    'support.quickActions.setup': 'Trợ giúp thiết lập tài khoản',
    'support.aiGreeting': 'Xin chào! Tôi là trợ lý AI SnapMatch của bạn. Tôi có thể giúp gì cho bạn hôm nay?',
    'support.userMessage': 'Tôi muốn biết thêm về quy trình ghép đôi AI.',
    'support.quickActions.booking': 'Làm thế nào để đặt lịch?',
    'support.quickActions.price': 'Khoảng giá là bao nhiêu?',
    'support.quickActions.matching': 'AI ghép đôi hoạt động như thế nào?',
    'support.quickActions.setup': 'Trợ giúp thiết lập tài khoản',
    'support.aiGreeting': 'Xin chào! Tôi là trợ lý AI SnapMatch của bạn. Tôi có thể giúp gì cho bạn hôm nay?',
    'support.userMessage': 'Tôi muốn biết thêm về quy trình ghép đôi AI.',
    
    // Common
    'common.loading': 'Đang tải...',
    'common.error': 'Có lỗi xảy ra. Vui lòng thử lại.',
    'common.success': 'Thành công!',
    'common.cancel': 'Hủy',
    'common.save': 'Lưu',
    'common.edit': 'Chỉnh sửa',
    'common.delete': 'Xóa',
    'common.confirm': 'Xác nhận',
    'common.back': 'Quay lại',
    'common.next': 'Tiếp theo',
    'common.previous': 'Trước',
    'common.search': 'Tìm kiếm',
    'common.filter': 'Lọc',
    'common.sort': 'Sắp xếp',
    'common.viewAll': 'Xem Tất Cả',
    'common.showMore': 'Hiển Thị Thêm',
    'common.showLess': 'Hiển Thị Ít Hơn',
    'common.hours': 'giờ',
    'common.hour': 'giờ',
    'common.years': 'năm',
    'common.reviews': 'đánh giá',
    'common.review': 'đánh giá',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'vi';
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: 'en' | 'vi') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};