import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';

function App() {
  return (
    <Router>
      <div>
        {/* Navigasi untuk memudahkan pengujian */}
        <nav className="p-4 bg-gray-100">
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register" className="mr-4">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        {/* Definisi Routes */}
        <Routes>
          <Route path="/login" element={<LoginPage />} /> // [cite: 923]
          <Route path="/register" element={<RegisterPage />} /> // [cite: 924]
          <Route path="/dashboard" element={<DashboardPage />} /> // [cite: 925]
          <Route path="/" element={<LoginPage />} /> // Default route [cite: 926]
        </Routes>
      </div>
    </Router>
  );
}

export default App;