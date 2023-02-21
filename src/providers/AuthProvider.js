import React, { createContext, useState, useContext } from 'react';

let AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let [user, _setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );

  let setUser = user => {
    _setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  let isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
  };

  let value = { user, setUser, isAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
