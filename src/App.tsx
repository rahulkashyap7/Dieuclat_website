import { Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="relative bg-warm">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Subtle Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer is on every page, but some pages might want their own layout if they have special needs. 
          For now, keeping it here is fine, but Navbar and Footer might need to know about the current route. */}
      <Footer />
    </div>
  );
}

export default App;
