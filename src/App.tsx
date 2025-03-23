
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import NutritionPrograms from './pages/NutritionPrograms';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Programs from './pages/Programs';
import Community from './pages/Community';
import Blog from './pages/Blog';
import ShredWaitlist from './pages/ShredWaitlist';
import MonthlyApp from './pages/MonthlyApp';
import StandalonePrograms from './pages/StandalonePrograms';
import ProductSelector from './pages/ProductSelector';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import Checkout from './pages/Checkout';
import RedeemGift from './pages/RedeemGift';
import CheckoutSuccess from './pages/CheckoutSuccess';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useMetrics } from './lib/hooks/useMetrics';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useMetrics();

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | JMEFit Training">
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <div className="min-h-screen bg-white text-gray-900">
            <Navigation />
            {/* Added padding-top to ensure content isn't hidden behind the fixed header */}
            <div className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/nutrition-programs" element={<NutritionPrograms />} />
              <Route path="/train" element={<ProductSelector />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/monthly-app" element={<MonthlyApp />} />
              <Route path="/standalone-programs" element={<StandalonePrograms />} />
              <Route path="/community" element={<Community />} />
              <Route path="/shred-waitlist" element={<ShredWaitlist />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/redeem" element={<RedeemGift />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </div>
            <Footer />
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
