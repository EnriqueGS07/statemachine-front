import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import OrdersPage from './pages/OrdersPage';
import OrdersDetailPage from './pages/OrderDetailPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrdersDetailPage />} />
    </Routes>
  );
}

export default App;
