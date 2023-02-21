import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Pages from '../pages/Index';
import Login from '../auth/Login';
import Layout from '../layout/Index';
import { AuthProvider } from '../providers/AuthProvider';
import RequireAuth from './RequireAuth';
import { APIProvider } from '../providers/APIProvider';
import Register from '../auth/Register';
import RedirectIfAuth from './RedirectIfAuth';

const Router = () => {
  return (
    <APIProvider>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={
              <RedirectIfAuth>
                <Login />
              </RedirectIfAuth>
            } />
            <Route path="/register" element={
              <RedirectIfAuth>
                <Register />
              </RedirectIfAuth>
            } />
            <Route path="/" element={
              <RequireAuth>
                <Pages />
              </RequireAuth>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </APIProvider>
  );
};

export default Router;