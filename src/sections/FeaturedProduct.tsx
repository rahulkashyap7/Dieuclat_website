import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const thumbnails = [
  { id: 1, image: 'https://ik.imagekit.io/72whyqnco/Products/6.jpg', alt: 'Artisan chocolates' },
  { id: 2, image: 'https://ik.imagekit.io/72whyqnco/Products/7.jpg', alt: 'Scented candle' },
  { id: 3, image: 'https://ik.imagekit.io/72whyqnco/Products/8.jpg', alt: 'Handwritten note' },
];

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const featuredProduct = {
    id: 100, // Unique ID for featured product
    name: 'The Birthday Box',
    price: '₹2,400',
    image: 'https://ik.imagekit.io/72whyqnco/Products/5.jpg',
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textBlock = textBlockRef.current;
    const card = cardRef.current;
    const thumbs = thumbsRef.current;
    const glow = glowRef.current;

    if (!section || !textBlock || !card || !thumbs || !glow) return;

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
        { x: '26vw', rotate: 8, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        thumbs.children,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.1
      );

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
        { x: '18vw', rotate: -6, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        thumbs,
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-brand-cream flex items-center justify-center"
    >
      {/* Gradient Orb Background */}
      <div className="absolute inset-0 gradient-orb-left" />

      {/* Blush Orb */}
      <div
        ref={glowRef}
        className="absolute w-[45vw] h-[45vw] rounded-full bg-brand-blush/50 blur-3xl animate-pulse-glow"
        style={{ left: '5%', top: '25%' }}
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
            Featured
          </span>

          {/* Headline */}
          <h2 className="font-display text-[clamp(40px,4.5vw,64px)] leading-[1.0] text-brand-charcoal mb-6">
            The Birthday Box
          </h2>

          {/* Body */}
          <p className="font-body text-base lg:text-lg text-brand-taupe leading-relaxed mb-6 max-w-md">
            A soft palette of blooms, treats, and a keepsake note—wrapped in
            linen and finished with a wax seal.
          </p>

          {/* Price */}
          <p className="font-display text-2xl lg:text-3xl text-brand-coral mb-8">
            From ₹2,400
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => addToCart(featuredProduct)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-coral text-white font-body text-sm font-medium rounded-full hover:bg-brand-coral/90 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-brand-charcoal/20 text-brand-charcoal font-body text-sm font-medium rounded-full hover:border-brand-coral hover:text-brand-coral transition-all">
              <Eye className="w-4 h-4" />
              See What's Inside
            </button>
          </div>
        </div>

        {/* Featured Card (Right) */}
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
              src="https://ik.imagekit.io/72whyqnco/Products/5.jpg"
              alt="The Birthday Box"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div
          ref={thumbsRef}
          className="absolute hidden lg:flex gap-3"
          style={{
            left: '58vw',
            top: '78vh',
          }}
        >
          {thumbnails.map((thumb) => (
            <div
              key={thumb.id}
              className="w-[72px] h-[72px] rounded-xl overflow-hidden card-shadow cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={thumb.image}
                alt={thumb.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Mobile Featured Image */}
        <div className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 w-28 opacity-50">
          <div className="aspect-square rounded-xl overflow-hidden card-shadow">
            <img
              src="https://ik.imagekit.io/72whyqnco/Products/5.jpg"
              alt="The Birthday Box"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
