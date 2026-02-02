import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gem, Palette, Leaf, Heart, Award, Truck, Sparkles, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: 'Premium Quality',
    description: 'Handcrafted with the finest materials for lasting beauty and elegance.',
    icon: Gem,
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-50',
    size: 'large',
  },
  {
    id: 2,
    title: 'Fully Customizable',
    description: 'Personalize every detail to match your unique vision.',
    icon: Palette,
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    size: 'small',
  },
  {
    id: 3,
    title: 'Eco-Friendly',
    description: 'Sustainable packaging and responsibly sourced materials.',
    icon: Leaf,
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    size: 'small',
  },
  {
    id: 4,
    title: 'Made with Love',
    description: 'Each piece is crafted with care and attention to detail.',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
    size: 'small',
  },
  {
    id: 5,
    title: 'Best in Class',
    description: 'Award-winning designs recognized for excellence.',
    icon: Award,
    color: 'from-violet-400 to-purple-500',
    bgColor: 'bg-violet-50',
    size: 'small',
  },
  {
    id: 6,
    title: 'Free Shipping',
    description: 'Complimentary delivery on all orders across India.',
    icon: Truck,
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50',
    size: 'large',
  },
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Grid items animation with stagger
      const items = grid.querySelectorAll('.bento-item');
      gsap.fromTo(
        items,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: {
            amount: 0.6,
            from: 'random',
          },
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Warm Background */}
      <div className="absolute inset-0 bg-warm" />
      <div className="absolute inset-0 gradient-warm" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-brand-rose/8 blur-[80px]" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-brand-sage/8 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-warm rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-brand-rose" />
            <span className="text-eyebrow text-brand-rose">Why Us</span>
          </div>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-tight text-brand-charcoal mb-4">
            Why Choose <span className="text-gradient">Our Products</span>
          </h2>
          <p className="font-body text-brand-charcoal/50 text-base lg:text-lg max-w-lg mx-auto">
            We're committed to creating gifts that make every moment special
          </p>
        </div>

        {/* Refined Bento Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5 auto-rows-fr"
        >
          {/* Large Feature Card - Premium Quality (Top Left, spans 2 cols, 2 rows) */}
          <div className="bento-item md:col-span-2 lg:col-span-3 lg:row-span-2 group">
            <div className="relative h-full min-h-[320px] lg:min-h-[400px] bg-gradient-to-br from-rose-50 via-pink-50/80 to-rose-50/50 rounded-3xl p-8 lg:p-10 overflow-hidden border border-rose-100/60 card-lift backdrop-blur-sm">
              {/* Animated background decoration */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-rose-300/40 to-pink-200/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-200/30 to-transparent rounded-full blur-2xl" />
              
              {/* Icon with enhanced styling */}
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 flex items-center justify-center mb-8 shadow-xl shadow-rose-300/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Gem className="w-9 h-9 text-white drop-shadow-lg" />
              </div>

              {/* Content */}
              <h3 className="relative font-display text-3xl lg:text-4xl text-brand-charcoal mb-4 group-hover:text-brand-rose transition-colors duration-300">
                Premium Quality
              </h3>
              <p className="relative font-body text-brand-charcoal/70 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
                Handcrafted with the finest materials for lasting beauty and elegance. Every detail matters.
              </p>

              {/* Feature stats */}
              <div className="relative mt-auto space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-11 h-11 rounded-full border-3 border-white bg-gradient-to-br from-rose-200 to-pink-200 shadow-md ring-2 ring-white/50" />
                    ))}
                  </div>
                  <div>
                    <p className="font-display text-lg text-brand-charcoal font-semibold">500+</p>
                    <p className="font-body text-xs text-brand-charcoal/50">happy customers</p>
                  </div>
                </div>
              </div>

              {/* Hover arrow with enhanced animation */}
              <div className="absolute bottom-8 right-8 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 rotate-0 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                <ArrowUpRight className="w-6 h-6 text-brand-rose" />
              </div>
            </div>
          </div>

          {/* Fully Customizable - Top Right */}
          <div className="bento-item md:col-span-1 lg:col-span-3 group">
            <div className="relative h-full min-h-[200px] bg-gradient-to-br from-amber-50 via-orange-50/80 to-amber-50/50 rounded-3xl p-6 lg:p-8 overflow-hidden border border-amber-100/60 card-lift backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/40 to-orange-100/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
              
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center mb-5 shadow-lg shadow-amber-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Palette className="w-7 h-7 text-white drop-shadow-md" />
              </div>

              <h3 className="relative font-display text-xl lg:text-2xl text-brand-charcoal mb-3 group-hover:text-amber-700 transition-colors duration-300">
                Fully Customizable
              </h3>
              <p className="relative font-body text-sm lg:text-base text-brand-charcoal/60 leading-relaxed">
                Personalize every detail to match your unique vision.
              </p>
            </div>
          </div>

          {/* Eco-Friendly - Middle Right */}
          <div className="bento-item md:col-span-1 lg:col-span-3 group">
            <div className="relative h-full min-h-[200px] bg-gradient-to-br from-emerald-50 via-teal-50/80 to-emerald-50/50 rounded-3xl p-6 lg:p-8 overflow-hidden border border-emerald-100/60 card-lift backdrop-blur-sm">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/40 to-teal-100/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
              
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Leaf className="w-7 h-7 text-white drop-shadow-md" />
              </div>

              <h3 className="relative font-display text-xl lg:text-2xl text-brand-charcoal mb-3 group-hover:text-emerald-700 transition-colors duration-300">
                Eco-Friendly
              </h3>
              <p className="relative font-body text-sm lg:text-base text-brand-charcoal/60 leading-relaxed">
                Sustainable packaging and responsibly sourced materials.
              </p>
            </div>
          </div>

          {/* Made with Love - Bottom Left */}
          <div className="bento-item md:col-span-1 lg:col-span-2 group">
            <div className="relative h-full min-h-[200px] bg-gradient-to-br from-pink-50 via-rose-50/80 to-pink-50/50 rounded-3xl p-6 lg:p-8 overflow-hidden border border-pink-100/60 card-lift backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-pink-200/40 to-rose-100/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
              
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600 flex items-center justify-center mb-5 shadow-lg shadow-pink-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Heart className="w-7 h-7 text-white drop-shadow-md" />
              </div>

              <h3 className="relative font-display text-xl lg:text-2xl text-brand-charcoal mb-3 group-hover:text-pink-700 transition-colors duration-300">
                Made with Love
              </h3>
              <p className="relative font-body text-sm lg:text-base text-brand-charcoal/60 leading-relaxed">
                Each piece is crafted with care and attention to detail.
              </p>
            </div>
          </div>

          {/* Free Shipping - Bottom Center (spans 2 cols) */}
          <div className="bento-item md:col-span-2 lg:col-span-2 group">
            <div className="relative h-full min-h-[200px] bg-gradient-to-br from-blue-50 via-indigo-50/80 to-blue-50/50 rounded-3xl p-6 lg:p-8 overflow-hidden border border-blue-100/60 card-lift backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/40 to-indigo-100/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex items-start gap-5">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 flex-shrink-0">
                  <Truck className="w-8 h-8 text-white drop-shadow-md" />
                </div>

                <div className="flex-1">
                  <h3 className="relative font-display text-xl lg:text-2xl text-brand-charcoal mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    Free Shipping
                  </h3>
                  <p className="relative font-body text-sm lg:text-base text-brand-charcoal/60 leading-relaxed mb-5">
                    Complimentary delivery on all orders across India. No minimum order required.
                  </p>
                  
                  {/* Delivery stats */}
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/50 backdrop-blur-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm" />
                      <span className="font-body text-xs font-medium text-brand-charcoal/70">Pan India</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 backdrop-blur-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                      <span className="font-body text-xs font-medium text-brand-charcoal/70">2-5 Days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Best in Class - Bottom Right */}
          <div className="bento-item md:col-span-1 lg:col-span-2 group">
            <div className="relative h-full min-h-[200px] bg-gradient-to-br from-violet-50 via-purple-50/80 to-violet-50/50 rounded-3xl p-6 lg:p-8 overflow-hidden border border-violet-100/60 card-lift backdrop-blur-sm">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-violet-200/40 to-purple-100/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
              
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 via-purple-500 to-violet-600 flex items-center justify-center mb-5 shadow-lg shadow-violet-200/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Award className="w-7 h-7 text-white drop-shadow-md" />
              </div>

              <h3 className="relative font-display text-xl lg:text-2xl text-brand-charcoal mb-3 group-hover:text-violet-700 transition-colors duration-300">
                Best in Class
              </h3>
              <p className="relative font-body text-sm lg:text-base text-brand-charcoal/60 leading-relaxed">
                Award-winning designs recognized for excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
