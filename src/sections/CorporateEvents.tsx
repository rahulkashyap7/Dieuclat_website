import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download, Check, Package, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Custom branding available',
  'Bulk pricing from 50 units',
  'Pan-India delivery',
];

const stats = [
  { label: '500+ orders delivered', icon: Package },
  { label: '48hr turnaround', icon: Clock },
];

export default function CorporateEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const statsEl = statsRef.current;

    if (!section || !leftCol || !rightCol || !statsEl) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftCol,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Right column animation
      gsap.fromTo(
        rightCol,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        statsEl.children,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsEl,
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
      id="corporate"
      className="relative bg-brand-cream py-20 lg:py-28"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <div ref={leftColRef}>
            <span className="text-eyebrow text-brand-coral mb-4 block">
              For Business
            </span>
            <h2 className="font-display text-[clamp(36px,4.2vw,60px)] leading-tight text-brand-charcoal mb-6">
              Corporate & Events
            </h2>
            <p className="font-body text-base lg:text-lg text-brand-taupe leading-relaxed mb-8">
              Employee welcomes. Client thank-yous. Wedding favors. We design,
              pack, and deliver at scale—without losing the handmade touch.
            </p>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 font-body text-brand-charcoal"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-coral/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-brand-coral" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-coral text-white font-body text-sm font-medium rounded-full hover:bg-brand-coral/90 transition-all hover:gap-3"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 border border-brand-charcoal/20 text-brand-charcoal font-body text-sm font-medium rounded-full hover:border-brand-coral hover:text-brand-coral transition-all"
              >
                <Download className="w-4 h-4" />
                Download Lookbook
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div ref={rightColRef}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden card-shadow">
                <img
                  src="https://ik.imagekit.io/72whyqnco/Products/2.jpg"
                  alt="Corporate gifting"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stats Row */}
              <div
                ref={statsRef}
                className="absolute -bottom-6 left-6 right-6 flex justify-center gap-4"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl card-shadow"
                    >
                      <Icon className="w-5 h-5 text-brand-coral" />
                      <span className="font-body text-sm text-brand-charcoal font-medium">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
