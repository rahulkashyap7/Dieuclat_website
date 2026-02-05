import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Flower2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    name: 'Birthday Special',
    subtitle: 'Make their day unforgettable',
    image: 'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
    count: '24',
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 2,
    name: 'Anniversary Collection',
    subtitle: 'Celebrate your love story',
    image: 'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
    count: '18',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 3,
    name: 'Thank You Hampers',
    subtitle: 'Show your appreciation',
    image: 'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
    count: '15',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 4,
    name: 'Just Because',
    subtitle: 'Surprise someone special',
    image: 'https://ik.imagekit.io/72whyqnco/Products/4.jpg',
    count: '12',
    color: 'from-violet-400 to-purple-500',
  },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

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

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.12,
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

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Warm Background */}
      <div className="absolute inset-0 bg-warm-dark" />

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-rose/8 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-sage/8 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full mb-4">
            <Flower2 className="w-4 h-4 text-brand-rose" />
            <span className="text-eyebrow text-brand-rose">Collections</span>
          </div>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-tight text-brand-charcoal mb-4">
            Our Best <span className="text-gradient">Collections</span>
          </h2>
          <p className="font-body text-brand-charcoal/50 text-base lg:text-lg max-w-lg mx-auto">
            Discover our carefully curated collections for every occasion
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-soft">
                {/* Image */}
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Count Badge */}
                <div className="absolute top-5 left-5 glass-warm rounded-full px-4 py-1.5">
                  <span className="font-body text-xs font-semibold text-brand-charcoal">
                    {collection.count} items
                  </span>
                </div>

                {/* Arrow Button */}
                <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 border border-white/20">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${collection.color} mb-3`}>
                    <span className="font-body text-[10px] font-semibold text-white uppercase tracking-wider">
                      Collection
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-white mb-1 group-hover:translate-x-2 transition-transform duration-300">
                    {collection.name}
                  </h3>
                  <p className="font-body text-sm text-white/70">
                    {collection.subtitle}
                  </p>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-white/0 group-hover:border-white/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
