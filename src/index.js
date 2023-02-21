import { createStandaloneToast } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Index';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const { ToastContainer } = createStandaloneToast();

root.render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
);
