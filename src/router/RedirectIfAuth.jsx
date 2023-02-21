import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const RedirectIfAuth = ({ children }) => {
  let auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuth;