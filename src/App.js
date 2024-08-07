import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TopBar from './components/common/TopBar';
import AppNavbar from './components/common/NavigationBar';
import ContactPage from './components/ContactUsPage/ContactPage';
import HomePage from './components/Home/HomePage';
import ServicesPage from './components/ServicesPage/ServicesPage';
import Login from './components/Login/Login';
import RegisterForm from './components/CreateProfile/CreateProfile';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Reports from './components/admincontrolpanel/Registries';
import Customers from './components/admincontrolpanel/Users';
import Footer from './components/common/Footer';
import AdminLinks from './components/admincontrolpanel/adminlinks';
import UserLinks from './components/UserLink/UserLink';
import Courses from './components/Courses/Courses';
import Green from './components/Green/Green';
import DataFetcher from './DataFetcher';

const AdminControlPanel = ({ setShowAdminLinks }) => {
  const navigate = useNavigate();

  const handleShowAdminLinks = () => {
    setShowAdminLinks(true);
    navigate('/'); // This will keep the URL at the base path
  };

  return (
    <div>
      <button onClick={handleShowAdminLinks}>Go to Admin Links</button>
    </div>
  );
};

const App = () => {
  const [showAdminLinks, setShowAdminLinks] = useState(false);

  return (
    <Router>
      <div>
        <TopBar />
        <AppNavbar />
        {showAdminLinks ? (
          <AdminLinks />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-profile" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/registries" element={<Reports />} />
            <Route path="/users" element={<Customers />} />
            <Route path="/adminpanel" element={<AdminControlPanel setShowAdminLinks={setShowAdminLinks} />} />
            <Route path="/userlink" element={<UserLinks />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/green" element={<Green />} />
            <Route path="/data-fetcher" element={<DataFetcher />} />
          </Routes>
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
