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

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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