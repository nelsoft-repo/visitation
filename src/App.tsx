import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";

const Home = lazy(() => import('./components/home'));
const PrayerPage = lazy(() => import('./components/pages/PrayerPage'));
const ShopPage = lazy(() => import('./components/pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./components/pages/ProductDetailPage'));
const CartPage = lazy(() => import('./components/pages/CartPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));
const PrayerRequestPage = lazy(() => import('./components/pages/PrayerRequestPage'));
const CustomRosariesPage = lazy(() => import('./components/pages/CustomRosariesPage'));
const RosaryBuilderPage = lazy(() => import('./components/pages/RosaryBuilderPage'));
const LoginPage = lazy(() => import('./components/pages/LoginPage'));
const RegisterPage = lazy(() => import('./components/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./components/pages/ForgotPasswordPage'));
const ProfilePage = lazy(() => import('./components/pages/ProfilePage'));
const AdminPage = lazy(() => import('./components/pages/AdminPage'));
const OrdersPage = lazy(() => import('./components/pages/OrdersPage'));
const PrivacyPolicyPage = lazy(() => import('./components/pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./components/pages/TermsOfServicePage'));

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<p>Loading...</p>}>
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prayer" element={<PrayerPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/prayer-request" element={<PrayerRequestPage />} />
                <Route path="/custom-rosaries" element={<CustomRosariesPage />} />
                <Route path="/rosary-builder" element={<RosaryBuilderPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              </Routes>
              <Toaster />
            </>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;