import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const glow = glowRef.current;

    if (!section || !card || !text || !image || !glow) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1 — ENTRANCE (0%–30%)
      scrollTl.fromTo(
        card,
        { y: '18vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        text.children,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        image,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Phase 2 — SETTLE (30%–70%): Hold

      // Phase 3 — EXIT (70%–100%)
      scrollTl.fromTo(
        card,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        glow,
        { opacity: 1 },
        { opacity: 0.6, ease: 'none' },
        0.70
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
      <div className="absolute inset-0 gradient-orb-center" />

      {/* Blush Orb */}
      <div
        ref={glowRef}
        className="absolute w-[50vw] h-[50vw] rounded-full bg-brand-blush/50 blur-3xl animate-pulse-glow"
        style={{ left: '25%', top: '20%' }}
      />

      {/* CTA Card */}
      <div
        ref={cardRef}
        className="relative w-[min(72vw,920px)] bg-white rounded-3xl lg:rounded-[34px] card-shadow overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Text Content */}
          <div ref={textRef} className="p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="font-display text-[clamp(32px,3.5vw,48px)] leading-tight text-brand-charcoal mb-4">
              Ready to send something thoughtful?
            </h2>
            <p className="font-body text-brand-taupe leading-relaxed mb-8">
              Choose a curated set or build your own. We'll wrap it like it
              matters—because it does.
            </p>

            <a
              href="#shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-coral text-white font-body text-sm font-medium rounded-full hover:bg-brand-coral/90 transition-all hover:gap-3 w-fit mb-10"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Newsletter */}
            <div className="border-t border-brand-charcoal/10 pt-8">
              <p className="font-body text-sm text-brand-taupe mb-4">
                Get gifting inspiration
              </p>
              
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-brand-coral">
                  <Mail className="w-5 h-5" />
                  <span className="font-body text-sm">Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="flex-1 px-4 py-3 bg-brand-cream rounded-full font-body text-sm text-brand-charcoal placeholder:text-brand-taupe/60 focus:outline-none focus:ring-2 focus:ring-brand-coral/30"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-charcoal text-white font-body text-sm font-medium rounded-full hover:bg-brand-coral transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0">
              <img
                src="/final_cta_peek.jpg"
                alt="Gift bundle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
