import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote: "The attention to detail is incredible. Every element of the gift was thoughtfully curated, from the packaging to the handwritten note. It made our anniversary truly special.",
    name: 'Sarah Mitchell',
    role: 'Interior Designer',
    rating: 5,
    avatar: 'S',
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 2,
    quote: "I've ordered from Dieuclat multiple times for corporate gifts. The quality is consistently excellent, and our clients always appreciate the personal touch. Highly recommended!",
    name: 'James Chen',
    role: 'Marketing Director',
    rating: 5,
    avatar: 'J',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 3,
    quote: "The custom hamper I ordered for my mother's birthday exceeded all expectations. The flowers were fresh, the treats were delicious, and the presentation was absolutely stunning.",
    name: 'Priya Sharma',
    role: 'Fashion Blogger',
    rating: 5,
    avatar: 'P',
    color: 'from-emerald-400 to-teal-500',
  },
];

export default function Testimonials() {
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Warm Background */}
      <div className="absolute inset-0 bg-warm" />
      <div className="absolute inset-0 gradient-warm" />
      
      {/* Decorative */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-brand-rose/8 blur-[100px]" />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-brand-sage/8 blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-brand-rose" />
            <span className="text-eyebrow text-brand-rose">Testimonials</span>
          </div>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-tight text-brand-charcoal mb-4">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="font-body text-brand-charcoal/50 text-base lg:text-lg max-w-lg mx-auto">
            Real stories from real customers who loved our gifts
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group"
            >
              <div className="relative h-full bg-white/70 backdrop-blur-sm rounded-[2rem] p-6 lg:p-8 card-lift border border-white/50">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-rose/10 to-brand-taupe/10 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-brand-rose" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-brand-rose text-brand-rose"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-brand-charcoal/70 leading-relaxed mb-8 text-sm lg:text-base">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-brand-charcoal/10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg`}>
                    <span className="font-display text-lg text-white font-semibold">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-brand-charcoal font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-sm text-brand-charcoal/50">
                      {testimonial.role}
                    </p>
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
