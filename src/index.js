import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';/*to keep your UI in sync with the URL*/ 

import './index.css';

import App from './App';

import CartProvider from './providers/cart/cart.provider';

ReactDOM.render(
  <CartProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </CartProvider>,
 document.getElementById('root'));