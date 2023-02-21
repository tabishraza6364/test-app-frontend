import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { showToast } from '../services/helper';

const BASE_URL = 'http://localhost:8080/api';
let APIContext = createContext(null);

export const APIProvider = ({ children }) => {
  let [token, _setToken] = useState(localStorage.getItem('token') || null);

  let setToken = token => {
    _setToken(token);
    localStorage.setItem('token', token);
  };

  let signin = data => {
    return axios.post(`${BASE_URL}/login`, data);
  };

  let signup = data => {
    return axios.post(`${BASE_URL}/register`, data);
  };

  let signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast('Logged Out.', '', 'success', 1000);
    setTimeout(() => {
      window.location.href = '/login';
    }, 1200);
  };

  let getPages = () => {
    return axios.get(`${BASE_URL}/pages`, {
      headers: {
        Authorization: token,
      },
    });
  };

  let createPage = data => {
    return axios.post(`${BASE_URL}/pages/create`, data, {
      headers: {
        Authorization: token,
      },
    });
  };

  let updatePage = data => {
    return axios.post(`${BASE_URL}/pages/update`, data, {
      headers: {
        Authorization: token,
      },
    });
  };

  let value = {
    token,
    setToken,
    signin,
    signup,
    signout,
    getPages,
    createPage,
    updatePage,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export const useAPI = () => {
  return useContext(APIContext);
};
