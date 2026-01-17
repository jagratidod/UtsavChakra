import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VendorLogin from './modules/vendor/pages/VendorLogin.jsx';
import VendorLoginForm from './modules/vendor/pages/VendorLoginForm.jsx';
import VendorRegister from './modules/vendor/pages/VendorRegister.jsx';
import VendorDashboard from './modules/vendor/pages/VendorDashboard.jsx';
import VendorProfile from './modules/vendor/pages/VendorProfile.jsx';
import VendorPortfolio from './modules/vendor/pages/VendorPortfolio.jsx';
import VendorSchedule from './modules/vendor/pages/VendorSchedule.jsx';
import VendorNotifications from './modules/vendor/pages/VendorNotifications.jsx';
import VendorMessages from './modules/vendor/pages/VendorMessages.jsx';
import EmergencyHub from './modules/vendor/pages/EmergencyHub.jsx';

import UserLoginSplash from './modules/user/pages/UserLoginSplash.jsx';
import UserLoginForm from './modules/user/pages/UserLoginForm.jsx';
import UserRegister from './modules/user/pages/UserRegister.jsx';
import UserDashboard from './modules/user/pages/UserDashboard.jsx';
import UserProfile from './modules/user/pages/UserProfile.jsx';
import UserPreferences from './modules/user/pages/UserPreferences.jsx';
import CategoryResults from './modules/user/pages/CategoryResults.jsx';
import UserSchedule from './modules/user/pages/UserSchedule.jsx';
import VendorDirectory from './modules/user/pages/VendorDirectory.jsx';
import Wishlist from './modules/user/pages/Wishlist.jsx';
import WriteReview from './modules/user/pages/WriteReview.jsx';
import UserPortfolio from './modules/user/pages/UserPortfolio.jsx';
import UserMessages from './modules/user/pages/UserMessages.jsx';
import UserPlanner from './modules/user/pages/UserPlanner.jsx';
import UserEmergencyRequest from './modules/user/pages/UserEmergencyRequest.jsx';

import Home from './modules/shared/pages/Home.jsx';
import AdminLogin from './modules/admin/pages/AdminLogin.jsx';
import VendorDetails from './modules/shared/pages/VendorDetails.jsx';
import ForgotPassword from './modules/shared/pages/auth/ForgotPassword.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/vendor/login" replace />} />
        <Route path="/home" element={<Home />} />

        {/* Vendor Routes */}
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/login-form" element={<VendorLoginForm />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/profile" element={<VendorProfile />} />
        <Route path="/vendor/portfolio" element={<VendorPortfolio />} />
        <Route path="/vendor/schedule" element={<VendorSchedule />} />
        <Route path="/vendor/notifications" element={<VendorNotifications />} />
        <Route path="/vendor/messages" element={<VendorMessages />} />
        <Route path="/vendor/emergency-hub" element={<EmergencyHub />} />
        <Route path="/vendor/forgot-password" element={<ForgotPassword />} />

        {/* User Routes */}
        <Route path="/user/login" element={<UserLoginSplash />} />
        <Route path="/user/entry" element={<UserLoginSplash />} />
        <Route path="/user/login-form" element={<UserLoginForm />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/preferences" element={<UserPreferences />} />
        <Route path="/user/category/:id" element={<CategoryResults />} />
        <Route path="/user/schedule" element={<UserSchedule />} />
        <Route path="/user/vendor-directory" element={<VendorDirectory />} />
        <Route path="/user/wishlist" element={<Wishlist />} />
        <Route path="/user/write-review" element={<WriteReview />} />
        <Route path="/user/gallery" element={<UserPortfolio />} />
        <Route path="/user/messages" element={<UserMessages />} />
        <Route path="/user/planner" element={<UserPlanner />} />
        <Route path="/user/sos-request" element={<UserEmergencyRequest />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />

        {/* Shared / Dynamic Routes */}
        <Route path="/vendor-details/:id" element={<VendorDetails />} />

        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
