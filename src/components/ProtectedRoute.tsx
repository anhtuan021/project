import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: string[];
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedUserTypes = [],
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const { user, isAuthenticated } = useAuth();

  // Check if user needs to be authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user type is allowed
  if (allowedUserTypes.length > 0 && user && !allowedUserTypes.includes(user.userType)) {
    // Redirect to appropriate page based on user type
    if (user.userType === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.userType === 'photographer') {
      return <Navigate to="/photographer-dashboard" replace />;
    } else {
      return <Navigate to="/profile" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
