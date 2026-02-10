import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ReturnPolicy from './pages/ReturnPolicy';
import TermsPolicy from './pages/TermsPolicy';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="relative bg-warm">
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Subtle Grain Overlay */}
          <div className="grain-overlay" />

          {/* Navigation */}
          <Navbar />

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Wishlist Drawer */}
          <WishlistDrawer />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/returns" element={<ReturnPolicy />} />
            <Route path="/terms" element={<TermsPolicy />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Routes>



          {/* Footer is on every page, but some pages might want their own layout if they have special needs. 
              For now, keeping it here is fine, but Navbar and Footer might need to know about the current route. */}
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
