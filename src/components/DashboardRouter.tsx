import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/HomePage';
import AdminDashboard from '../pages/AdminDashboard';
import PhotographerDashboard from '../pages/PhotographerDashboard';
import CustomerDashboard from '../pages/CustomerDashboard';

const DashboardRouter = () => {
  const { user, isAuthenticated } = useAuth();



  // Nếu chưa đăng nhập, hiển thị HomePage
  if (!isAuthenticated || !user) {
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

  // Nếu là customer, hiển thị CustomerDashboard
  if (user.userType === 'customer') {
    return <CustomerDashboard />;
  }

  // Fallback về HomePage
  return <HomePage />;
};

export default DashboardRouter;
