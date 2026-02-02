import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    name: 'Birthdays',
    image: '/category_birthdays.jpg',
    count: '24 gifts',
  },
  {
    id: 2,
    name: 'Anniversaries',
    image: '/category_anniversaries.jpg',
    count: '18 gifts',
  },
  {
    id: 3,
    name: 'Thank You',
    image: '/category_thankyou.jpg',
    count: '15 gifts',
  },
  {
    id: 4,
    name: 'Just Because',
    image: '/category_justbecause.jpg',
    count: '12 gifts',
  },
];

export default function ShopByMoment() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: index * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative bg-brand-cream py-20 lg:py-28"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <span className="text-eyebrow text-brand-coral mb-4 block">
            Browse
          </span>
          <h2 className="font-display text-[clamp(36px,4.2vw,60px)] leading-tight text-brand-charcoal mb-4">
            Shop by Moment
          </h2>
          <p className="font-body text-brand-taupe text-base lg:text-lg max-w-md mx-auto">
            Choose the occasion. We'll handle the details.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl lg:rounded-3xl"
            >
              {/* Background Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-brand-charcoal/20 to-transparent transition-all duration-500 group-hover:from-brand-charcoal/70" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-body text-sm text-white/70 mb-1">
                      {category.count}
                    </p>
                    <h3 className="font-display text-2xl lg:text-3xl text-white transition-transform duration-500 group-hover:-translate-y-1">
                      {category.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:bg-brand-coral group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5 text-white" />
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
