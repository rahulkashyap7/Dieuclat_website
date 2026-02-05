import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, Gift, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const orbs = orbsRef.current;
    if (!section || !orbs) return;

    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo('.hero-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo('.hero-headline',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        0.1
      );

      tl.fromTo('.hero-body',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.3
      );

      tl.fromTo('.hero-cta',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.45
      );

      tl.fromTo('.hero-card',
        { y: 80, opacity: 0, scale: 0.9, rotateY: -15 },
        { y: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: 'power2.out', stagger: 0.2 },
        0.2
      );

      tl.fromTo('.hero-stat',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        0.6
      );

      // Floating orbs parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        gsap.to('.orb-1', {
          x: (clientX - centerX) * 0.02,
          y: (clientY - centerY) * 0.02,
          duration: 1,
          ease: 'power2.out'
        });

        gsap.to('.orb-2', {
          x: (clientX - centerX) * -0.015,
          y: (clientY - centerY) * -0.015,
          duration: 1,
          ease: 'power2.out'
        });

        gsap.to('.orb-3', {
          x: (clientX - centerX) * 0.01,
          y: (clientY - centerY) * 0.01,
          duration: 1,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Warm Background Layers */}
      <div className="absolute inset-0 bg-warm" />
      <div className="absolute inset-0 gradient-warm" />

      {/* Interactive Floating Orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-rose/15 to-brand-warm/10 blur-[100px] -top-20 -right-20 animate-pulse-soft" />
        <div className="orb-2 absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-brand-sage/12 to-brand-taupe/8 blur-[80px] bottom-10 left-10 animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="orb-3 absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-brand-warm/10 to-brand-rose-soft/15 blur-[60px] top-1/2 left-1/3 animate-pulse-soft" style={{ animationDelay: '4s' }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-20 h-20 border border-brand-rose/20 rounded-full animate-spin-slow opacity-50" />
      <div className="absolute bottom-40 right-20 w-16 h-16 border border-brand-sage/20 rounded-full animate-spin-slow opacity-50" style={{ animationDirection: 'reverse' }} />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Content */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-brand-rose" />
                <span className="text-eyebrow text-brand-rose">Handmade Gifting</span>
              </div>

              {/* Headline */}
              <h1 className="hero-headline font-display text-[clamp(44px,7vw,84px)] leading-[0.92] text-brand-charcoal mb-6">
                Gifts that feel like a{' '}
                <span className="text-gradient font-handwriting">handwritten</span>{' '}
                note.
              </h1>

              {/* Body */}
              <p className="hero-body font-body text-base lg:text-lg text-brand-charcoal/60 leading-relaxed mb-8">
                Curated hampers and keepsakes, wrapped with care for birthdays,
                anniversaries, and just-because moments. Each piece tells a story.
              </p>

              {/* CTAs */}
              <div className="hero-cta flex flex-wrap items-center gap-4 mb-10">
                <Link
                  to="/all-products"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-rose to-brand-rose-light text-white font-body text-sm font-semibold rounded-full shadow-glow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#custom"
                  className="inline-flex items-center gap-2 px-6 py-4 glass-warm text-brand-charcoal font-body text-sm font-medium rounded-full hover:bg-white/60 transition-all duration-300"
                >
                  <Gift className="w-4 h-4" />
                  Build Custom Hamper
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                {[
                  { value: '500+', label: 'Gifts Delivered' },
                  { value: '4.9', label: 'Customer Rating' },
                  { value: '50+', label: 'Unique Designs' },
                ].map((stat, index) => (
                  <div key={index} className="hero-stat">
                    <p className="font-display text-2xl lg:text-3xl text-brand-charcoal">{stat.value}</p>
                    <p className="font-body text-xs text-brand-charcoal/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Creative Image Grid */}
            <div className="relative hidden lg:block h-[580px]">
              {/* Main Large Card */}
              <div
                className="hero-card absolute top-0 right-8 w-[300px] animate-float-gentle group z-30"
              >
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-elevated shine">
                  <img
                    src="https://ik.imagekit.io/72whyqnco/Products/1.jpg"
                    alt="Premium gift hamper"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 glass-warm rounded-2xl px-4 py-3 shadow-soft z-50">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-brand-rose fill-brand-rose" />
                    <span className="font-body text-sm text-brand-charcoal">Most Loved</span>
                  </div>
                </div>
              </div>

              {/* Secondary Card */}
              <div
                className="hero-card absolute top-20 left-0 w-[200px] animate-float-slow group"
                style={{ animationDelay: '1s' }}
              >
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-elevated shine">
                  <img
                    src="https://ik.imagekit.io/72whyqnco/Products/4.jpg"
                    alt="Curated gift box"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Third Card */}
              <div
                className="hero-card absolute bottom-12 right-0 w-[240px] animate-float-gentle group z-10"
                style={{ animationDelay: '2s' }}
              >
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-elevated shine">
                  <img
                    src="https://ik.imagekit.io/72whyqnco/Products/10.jpg"
                    alt="Wrapped gift"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-brand-rose/40 animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-brand-sage/40 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Mobile Image */}
            <div className="lg:hidden">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-elevated">
                <img
                  src="https://ik.imagekit.io/72whyqnco/Products/4.jpg"
                  alt="Premium gift hamper"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
