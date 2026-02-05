import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'Products', href: '/all-products', isRoute: true },
  { label: 'Collections', href: '/all-products', isRoute: true },
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Contact Us', href: '/contact', isRoute: true },
];

const supportLinks = [
  { label: 'Shipping Info', href: '/faq', isRoute: true },
  { label: 'Returns Policy', href: '/returns', isRoute: true },
  { label: 'FAQ', href: '/faq', isRoute: true },
  { label: 'Terms & Conditions', href: '/terms', isRoute: true },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative bg-brand-charcoal text-white overflow-hidden"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-rose/50 to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-rose/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-sage/10 blur-[100px]" />

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Newsletter Section */}
        <div className="glass-dark rounded-[2rem] p-8 lg:p-12 mb-16 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-white mb-3">
                Get Gifting Inspiration
              </h3>
              <p className="font-body text-white/50 text-sm">
                Subscribe to receive exclusive offers, new arrivals, and gifting tips.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-full font-body text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-rose/50 transition-colors"
                />
              </div>
              <button className="px-6 py-4 bg-gradient-to-r from-brand-rose to-brand-rose-light rounded-full font-body text-sm font-semibold text-white hover:shadow-glow transition-all duration-300 flex items-center gap-2 group">
                Subscribe
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center p-1.5">
                <img src="/dieuclat-logo.png" alt="Dieuclat Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display text-2xl font-semibold text-white">
                DIEUCLAT
              </span>
            </Link>
            <p className="font-body text-sm text-white/40 leading-relaxed mb-6">
              Crafting memorable gifting experiences since 2020. Every gift tells a story.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hello@dieuclat.com" className="flex items-center gap-3 text-white/40 hover:text-brand-rose transition-colors">
                <Mail className="w-4 h-4" />
                <span className="font-body text-sm">hello@dieuclat.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-white/40 hover:text-brand-rose transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-body text-sm">+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-3 text-white/40">
                <MapPin className="w-4 h-4" />
                <span className="font-body text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="font-body text-sm text-white/40 hover:text-brand-rose transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="font-body text-sm text-white/40 hover:text-brand-rose transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="font-body text-sm text-white/40 hover:text-brand-rose transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="font-body text-sm text-white/40 hover:text-brand-rose transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Follow Us
            </h4>
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-brand-rose hover:border-brand-rose transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Payment Methods */}
            <p className="font-body text-xs text-white/20 mb-3">We Accept</p>
            <div className="flex items-center gap-2">
              {['Visa', 'MC', 'UPI', 'Pay'].map((method) => (
                <div key={method} className="px-2 py-1 bg-white/5 rounded text-white/30 font-body text-[10px]">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © 2026 DIEUCLAT. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-brand-rose fill-brand-rose" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
