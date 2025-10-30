import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PrayerPage from "./components/pages/PrayerPage";
import ShopPage from "./components/pages/ShopPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <CartProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prayer" element={<PrayerPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Toaster />
        </>
      </Suspense>
    </CartProvider>
  );
}

export default App;