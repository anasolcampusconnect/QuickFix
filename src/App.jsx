import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from './pages/Home';
import Revamp from './pages/Revamp';
import Native from './pages/Native';
import Beauty from './pages/Beauty';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import HelpCenter from './pages/HelpCenter';
import MyBookings from './pages/MyBookings';
import AboutUs from './pages/AboutUs';
import InvestorRelations from './pages/InvestorRelations';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AntiDiscrimination from './pages/AntiDiscrimination';
import Careers from './pages/Careers';
import UCReviews from './pages/UCReviews';
import CategoriesNearYou from './pages/CategoriesNearYou';
import ContactUs from './pages/ContactUs';
import RegisterProfessional from './pages/RegisterProfessional';
import SpaceDetails from './pages/spaceDetails';

// Helper component to reset scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
import Purifier from './pages/Purifier';
import Lockpage from './pages/Lockpage';
import NativeWaterService from './pages/NativeWaterService';
import NativeLockService from './pages/NativeLockService';

function App() {
  return (
    <Router>
      {/* ScrollToTop component monitors routing and instantly jumps window view to top (0,0) */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/revamp" element={<Revamp />} />
        <Route path="/native" element={<Native />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/investor-relations" element={<InvestorRelations />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/anti-discrimination" element={<AntiDiscrimination />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/reviews" element={<UCReviews />} />
        <Route path="/categories" element={<CategoriesNearYou />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register-professional" element={<RegisterProfessional />} />
        <Route path="/space/:id" element={<SpaceDetails />} />
        
        <Route path="/lock" element={<Lockpage />} />
        <Route path="/purifier" element={<Purifier />} />
        <Route path="/native-water-service" element={<NativeWaterService />} />
        <Route path="/native-lock-service" element={<NativeLockService />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;