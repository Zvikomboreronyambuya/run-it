import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import GoalsPage from './pages/GoalsPage';
import ProgressPage from './pages/ProgressPage';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

              <Route path='/' element={<PrivateRoute />}>
              <Route index element={<DashboardPage />} />
              <Route path='/goals' element={<GoalsPage />} />
              <Route path='/progress' element={<ProgressPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
