import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Welcome from '../pages/Welcome';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import CreateEvent from '../pages/user/event/CreateEvent';
import Home from '../pages/user/home/Home';
import VendorList from '../pages/user/vendors/VendorList';
import VendorDetail from '../pages/user/vendors/VendorDetail';
import RequestQuote from '../pages/user/vendors/RequestQuote';
import ChatInterface from '../pages/user/chat/ChatInterface';
import Planner from '../pages/user/planner/Planner';
import NewsList from '../pages/user/news/NewsList';
import NewsDetail from '../pages/user/news/NewsDetail';
import CategoryList from '../pages/user/categories/CategoryList';
import Profile from '../pages/user/profile/Profile';

// Vendor Pages
import VendorWelcome from '../pages/vendor/Welcome';
import VendorLogin from '../pages/vendor/auth/Login';
import VendorSignup from '../pages/vendor/auth/Signup';
import VendorDashboard from '../pages/vendor/dashboard/Dashboard';
import VendorRequests from '../pages/vendor/requests/RequestsList';
import VendorRequestDetail from '../pages/vendor/requests/RequestDetail';
import VendorBookings from '../pages/vendor/bookings/BookingsList';
import VendorProfile from '../pages/vendor/profile/VendorProfile';
import VendorEarnings from '../pages/vendor/earnings/Earnings';
import VendorReviews from '../pages/vendor/reviews/Reviews';
import VendorAvailability from '../pages/vendor/availability/Availability';
import VendorNotifications from '../pages/vendor/notifications/Notifications';
import VendorSettings from '../pages/vendor/settings/Settings';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Vendor Routes */}
            <Route path="/vendor" element={<VendorWelcome />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/vendor/signup" element={<VendorSignup />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/requests" element={<VendorRequests />} />
            <Route path="/vendor/requests/:id" element={<VendorRequestDetail />} />
            <Route path="/vendor/bookings" element={<VendorBookings />} />
            <Route path="/vendor/profile" element={<VendorProfile />} />
            <Route path="/vendor/earnings" element={<VendorEarnings />} />
            <Route path="/vendor/reviews" element={<VendorReviews />} />
            <Route path="/vendor/availability" element={<VendorAvailability />} />
            <Route path="/vendor/notifications" element={<VendorNotifications />} />
            <Route path="/vendor/settings" element={<VendorSettings />} />
            <Route path="/vendor/chat" element={<ChatInterface />} />

            {/* User Routes */}
            <Route path="/user/create-event" element={<CreateEvent />} />
            <Route path="/user/home" element={<Home />} />
            <Route path="/user/vendors" element={<VendorList />} />
            <Route path="/user/vendor/:id" element={<VendorDetail />} />
            <Route path="/user/chat" element={<ChatInterface />} />
            <Route path="/user/chat/:vendorId" element={<ChatInterface />} />
            <Route path="/user/request-quote/:vendorId" element={<RequestQuote />} />
            <Route path="/user/planner" element={<Planner />} />
            <Route path="/user/news" element={<NewsList />} />
            <Route path="/user/news/:id" element={<NewsDetail />} />
            <Route path="/user/categories" element={<CategoryList />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;