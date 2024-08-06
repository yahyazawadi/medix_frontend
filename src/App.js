import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { useGetDataQuery } from './app/api/apiSlice';
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

const App = () => {
  const { data, error, isLoading } = useGetDataQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Provider store={store}>
      <Router>
        <div>
          <TopBar />
          <AppNavbar />
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
            <Route path="/adminpanel/adminlinks" element={<AdminLinks />} />
            <Route path="/userlink" element={<UserLinks />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/green" element={<Green />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
