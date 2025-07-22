import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/HomePage';
import AdminDashboard from '../pages/AdminDashboard';
import PhotographerDashboard from '../pages/PhotographerDashboard';

const DashboardRouter = () => {
  const { user, isAuthenticated } = useAuth();

  // Debug logs
  console.log('DashboardRouter - isAuthenticated:', isAuthenticated);
  console.log('DashboardRouter - user:', user);
  console.log('DashboardRouter - userType:', user?.userType);

  // Nếu chưa đăng nhập hoặc là customer, hiển thị HomePage
  if (!isAuthenticated || !user || user.userType === 'customer') {
    console.log('DashboardRouter - Showing HomePage');
    return <HomePage />;
  }

  // Nếu là admin, hiển thị AdminDashboard
  if (user.userType === 'admin') {
    console.log('DashboardRouter - Showing AdminDashboard');
    return <AdminDashboard />;
  }

  // Nếu là photographer, hiển thị PhotographerDashboard
  if (user.userType === 'photographer') {
    console.log('DashboardRouter - Showing PhotographerDashboard');
    return <PhotographerDashboard />;
  }

  // Fallback về HomePage
  console.log('DashboardRouter - Fallback to HomePage');
  return <HomePage />;
};

export default DashboardRouter;
