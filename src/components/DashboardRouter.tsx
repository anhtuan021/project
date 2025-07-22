import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/HomePage';
import AdminDashboard from '../pages/AdminDashboard';
import PhotographerDashboard from '../pages/PhotographerDashboard';

const DashboardRouter = () => {
  const { user, isAuthenticated } = useAuth();



  // Nếu chưa đăng nhập hoặc là customer, hiển thị HomePage
  if (!isAuthenticated || !user || user.userType === 'customer') {

    return <HomePage />;
  }

  // Nếu là admin, hiển thị AdminDashboard
  if (user.userType === 'admin') {

    return <AdminDashboard />;
  }

  // Nếu là photographer, hiển thị PhotographerDashboard
  if (user.userType === 'photographer') {

    return <PhotographerDashboard />;
  }

  // Fallback về HomePage

  return <HomePage />;
};

export default DashboardRouter;
