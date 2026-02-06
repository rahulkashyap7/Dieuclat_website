import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Zap, Percent, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);
const dealProducts = [
  {
    id: 301,
    name: 'Dried Flower Wall Art',
    description: 'Beautiful preserved blooms arranged in a premium frame',
    price: '₹1,899',
    originalPrice: '₹2,499',
    discount: '24%',
    image: 'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
  },
  {
    id: 302,
    name: 'Luxury Gift Hamper',
    description: 'Curated selection of artisan treats and blooms',
    price: '₹2,199',
    originalPrice: '₹2,799',
    discount: '21%',
    image: 'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
  },
  {
    id: 303,
    name: 'Signature Bloom Box',
    description: 'Our bestselling arrangement in a keepsake box',
    price: '₹2,499',
    originalPrice: '₹3,199',
    discount: '22%',
    image: 'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
  },
];

export default function DealOfDay() {
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timer = timerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || !timer || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        timer.children,
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: timer,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const timeBlocks = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <section
      ref={sectionRef}
      id="deals"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Warm Background */}
      <div className="absolute inset-0 bg-warm-dark" />

      {/* Decorative orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-rose/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-sage/10 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full mb-4">
            <Zap className="w-4 h-4 text-brand-rose" />
            <span className="text-eyebrow text-brand-rose">Limited Time</span>
          </div>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-tight text-brand-charcoal mb-4">
            Deal of the <span className="text-gradient">Day</span>
          </h2>
          <p className="font-body text-brand-charcoal/50 text-base max-w-md mx-auto">
            Grab these exclusive offers before they're gone
          </p>
        </div>

        {/* Countdown Timer */}
        <div
          ref={timerRef}
          className="flex justify-center gap-3 lg:gap-5 mb-12 lg:mb-16"
        >
          {timeBlocks.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative w-16 h-16 lg:w-24 lg:h-24">
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-rose to-brand-rose-light rounded-2xl lg:rounded-3xl shadow-glow" />

                {/* Glass overlay */}
                <div className="absolute inset-1 bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl flex items-center justify-center">
                  <span className="font-display text-2xl lg:text-4xl text-white font-semibold">
                    {formatNumber(item.value)}
                  </span>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-2xl lg:rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
              </div>
              <span className="font-body text-xs lg:text-sm text-brand-charcoal/50 mt-2 block">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Deal Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {dealProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group"
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden shadow-soft card-lift border border-white/50">
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-brand-rose to-brand-rose-light rounded-full shadow-lg">
                  <Percent className="w-3 h-3 text-white" />
                  <span className="font-body text-[10px] font-semibold text-white">
                    {product.discount} OFF
                  </span>
                </div>

                {/* Timer badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 glass-warm rounded-full">
                  <Timer className="w-3 h-3 text-brand-rose" />
                  <span className="font-body text-[10px] text-brand-charcoal">Limited</span>
                </div>

                {/* Image */}
                <Link to={`/product/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-brand-cream/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>

                {/* Content */}
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-xl text-brand-charcoal mb-2 group-hover:text-brand-rose transition-colors duration-300">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-body text-sm text-brand-charcoal/50 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-xl font-semibold text-brand-rose">
                        {product.price}
                      </span>
                      <span className="font-body text-sm text-brand-charcoal/40 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-brand-charcoal text-white font-body text-sm font-medium rounded-full hover:bg-brand-rose transition-all duration-300 active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
