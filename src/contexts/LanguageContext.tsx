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
    'header.booking': 'Đặt phòng',
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