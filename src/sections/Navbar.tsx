import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinks = [
  { label: 'Shop', href: '#products', isRoute: false },
  { label: 'Collections', href: '#collections', isRoute: false },
  { label: 'Deals', href: '#deals', isRoute: false },
  { label: 'About', href: '/about', isRoute: true },
  { label: 'Contact', href: '/contact', isRoute: true },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Entrance animation
    gsap.fromTo(
      nav,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'
        }`}
    >
      <div className={`mx-4 lg:mx-8 transition-all duration-500 ${isScrolled ? 'glass-warm rounded-full px-6 shadow-soft' : 'px-4'
        }`}>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/dieuclat-logo.png"
              alt="DIEUCLAT"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-xl font-semibold text-brand-charcoal tracking-tight">
              DIEUCLAT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative font-body text-sm text-brand-charcoal/60 hover:text-brand-charcoal transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-rose to-brand-taupe rounded-full transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={pathname === '/' ? link.href : `/${link.href}`}
                  className="relative font-body text-sm text-brand-charcoal/60 hover:text-brand-charcoal transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-rose to-brand-taupe rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-brand-charcoal transition-all shadow-soft hover:shadow-elevated"
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-brand-rose text-brand-rose' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-rose text-white text-[10px] font-semibold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-brand-charcoal transition-all shadow-soft hover:shadow-elevated"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-rose text-white text-[10px] font-semibold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-brand-charcoal"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-4 right-4 mt-2 glass-warm rounded-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-base text-brand-charcoal/80 hover:text-brand-rose transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={pathname === '/' ? link.href : `/${link.href}`}
                className="font-body text-base text-brand-charcoal/80 hover:text-brand-rose transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          ))}
        </div>
      </div>
    </nav>
  );
}
