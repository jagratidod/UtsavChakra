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
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;