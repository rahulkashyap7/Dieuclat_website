import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Flower2, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const chips = [
  { id: 1, label: 'Scented Candle', icon: Sparkles },
  { id: 2, label: 'Dried Blooms', icon: Flower2 },
  { id: 3, label: 'Personalized Note', icon: PenTool },
];

export default function CustomHamper() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textBlock = textBlockRef.current;
    const card = cardRef.current;
    const chipElements = chipsRef.current.filter(Boolean);
    const glow = glowRef.current;

    if (!section || !textBlock || !card || chipElements.length === 0 || !glow) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1 — ENTRANCE (0%–30%)
      scrollTl.fromTo(
        textBlock,
        { x: '-22vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        card,
        { x: '26vw', rotate: -8, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0
      );

      chipElements.forEach((chip, index) => {
        scrollTl.fromTo(
          chip,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1 + index * 0.03
        );
      });

      // Phase 2 — SETTLE (30%–70%): Hold

      // Phase 3 — EXIT (70%–100%)
      scrollTl.fromTo(
        textBlock,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        card,
        { x: 0, rotate: 0, opacity: 1 },
        { x: '18vw', rotate: 6, opacity: 0, ease: 'power2.in' },
        0.70
      );

      chipElements.forEach((chip) => {
        scrollTl.fromTo(
          chip,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.72
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="custom"
      className="section-pinned bg-brand-cream flex items-center justify-center"
    >
      {/* Gradient Orb Background */}
      <div className="absolute inset-0 gradient-orb-right" />

      {/* Blush Orb */}
      <div
        ref={glowRef}
        className="absolute w-[45vw] h-[45vw] rounded-full bg-brand-blush/50 blur-3xl animate-pulse-glow"
        style={{ right: '5%', top: '25%' }}
      />

      {/* Content Container */}
      <div className="relative w-full h-full flex items-center">
        {/* Text Block (Left) */}
        <div
          ref={textBlockRef}
          className="absolute left-[8vw] top-1/2 -translate-y-1/2 w-[min(40vw,520px)] z-10"
        >
          {/* Label */}
          <span className="text-eyebrow text-brand-coral mb-4 block">
            Custom Hampers
          </span>

          {/* Headline */}
          <h2 className="font-display text-[clamp(40px,4.5vw,64px)] leading-[1.0] text-brand-charcoal mb-6">
            Create Your Own Hamper
          </h2>

          {/* Body */}
          <p className="font-body text-base lg:text-lg text-brand-taupe leading-relaxed mb-8 max-w-md">
            Pick a box, add treats, blooms, and a note. We wrap it like a story.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-coral text-white font-body text-sm font-medium rounded-full hover:bg-brand-coral/90 transition-all hover:gap-3"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-charcoal/20 text-brand-charcoal font-body text-sm font-medium rounded-full hover:border-brand-coral hover:text-brand-coral transition-all"
            >
              See Examples
            </a>
          </div>
        </div>

        {/* Builder Preview Card (Right) */}
        <div
          ref={cardRef}
          className="absolute hidden lg:block animate-float"
          style={{
            left: '58vw',
            top: '45%',
            transform: 'translateY(-50%)',
            width: 'min(34vw, 520px)',
          }}
        >
          <div className="aspect-[4/3] rounded-2xl overflow-hidden card-shadow">
            <img
              src="/builder_preview.jpg"
              alt="Custom hamper builder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Floating Chips */}
        {chips.map((chip, index) => {
          const Icon = chip.icon;
          const positions = [
            { left: '86vw', top: '22vh' },
            { left: '90vw', top: '46vh' },
            { left: '86vw', top: '72vh' },
          ];
          return (
            <div
              key={chip.id}
              ref={(el) => { chipsRef.current[index] = el; }}
              className={`absolute hidden lg:flex items-center gap-2 px-4 py-2.5 bg-white rounded-full card-shadow animate-float`}
              style={{
                ...positions[index],
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <Icon className="w-4 h-4 text-brand-coral" />
              <span className="font-body text-sm text-brand-charcoal">
                {chip.label}
              </span>
            </div>
          );
        })}

        {/* Mobile Preview Image */}
        <div className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 w-28 opacity-50">
          <div className="aspect-square rounded-xl overflow-hidden card-shadow">
            <img
              src="/builder_preview.jpg"
              alt="Custom hamper builder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
