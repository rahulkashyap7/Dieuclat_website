import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      });
    };

    // Handle hover states
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Handle pointer states (links, buttons)
    const handlePointerEnter = () => setIsPointer(true);
    const handlePointerLeave = () => setIsPointer(false);

    window.addEventListener('mousemove', moveCursor);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handlePointerEnter);
      el.addEventListener('mouseleave', handlePointerLeave);
    });

    // Add listeners to cards for hover effect
    const cards = document.querySelectorAll('.card-hover, .card-lift');
    cards.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handlePointerEnter);
        el.removeEventListener('mouseleave', handlePointerLeave);
      });
      cards.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-all duration-200 ${
          isPointer ? 'scale-150' : isHovering ? 'scale-125' : 'scale-100'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isPointer
              ? 'w-10 h-10 border-white/60 bg-white/10'
              : isHovering
              ? 'w-14 h-14 border-white/40'
              : 'w-8 h-8 border-white/50'
          }`}
        />
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-white transition-all duration-200 ${
            isPointer ? 'opacity-50 scale-150' : 'opacity-100 scale-100'
          }`}
        />
      </div>
    </>
  );
}
