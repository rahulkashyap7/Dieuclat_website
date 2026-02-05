import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'The Bloom Box',
    price: '₹2,800',
    rating: 4.9,
    image: 'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
  },
  {
    id: 2,
    name: 'Sweet Indulgence',
    price: '₹1,950',
    rating: 4.8,
    image: 'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
  },
  {
    id: 3,
    name: 'Linen & Love',
    price: '₹3,200',
    rating: 5.0,
    image: 'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
  },
];

export default function CuratedSets() {
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
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: index * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="shop"
      className="relative bg-brand-cream py-20 lg:py-28"
    >
      {/* Subtle top gradient to blend from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-blush/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <span className="text-eyebrow text-brand-coral mb-4 block">
            Bestsellers
          </span>
          <h2 className="font-display text-[clamp(36px,4.2vw,60px)] leading-tight text-brand-charcoal mb-4">
            Curated Sets
          </h2>
          <p className="font-body text-brand-taupe text-base lg:text-lg max-w-md mx-auto">
            Ready-to-send hampers, each wrapped like a present.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden card-shadow transition-all duration-500 group-hover:card-shadow-hover group-hover:-translate-y-1.5">
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 lg:p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-brand-coral text-brand-coral" />
                    <span className="font-body text-sm text-brand-taupe">
                      {product.rating}
                    </span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl text-brand-charcoal mb-2">
                    {product.name}
                  </h3>
                  <p className="font-body text-base text-brand-coral font-medium">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 border border-brand-charcoal/20 text-brand-charcoal font-body text-sm font-medium rounded-full hover:border-brand-coral hover:text-brand-coral transition-all hover:gap-3"
          >
            View All Gifts
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
