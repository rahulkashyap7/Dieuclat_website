import { useEffect } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

interface ImagePreviewProps {
    image: string | null;
    onClose: () => void;
}

export default function ImagePreview({ image, onClose }: ImagePreviewProps) {
    useEffect(() => {
        if (image) {
            document.body.style.overflow = 'hidden';

            const tl = gsap.timeline();
            tl.fromTo('.preview-overlay',
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
            tl.fromTo('.preview-content',
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
                "-=0.2"
            );
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [image]);

    if (!image) return null;

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: onClose
        });
        tl.to('.preview-content', { scale: 0.8, opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
        tl.to('.preview-overlay', { opacity: 0, duration: 0.3, ease: 'power2.in' }, "-=0.2");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            {/* Backdrop */}
            <div
                className="preview-overlay absolute inset-0 bg-brand-charcoal/60 backdrop-blur-md"
                onClick={handleClose}
            />

            {/* Content */}
            <div className="preview-content relative w-full max-w-5xl bg-brand-warm-light/50 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center max-h-[85vh]">
                <button
                    onClick={handleClose}
                    className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-brand-charcoal/20 hover:bg-brand-charcoal/40 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95"
                >
                    <X className="w-5 h-5" />
                </button>

                <img
                    src={image}
                    alt="Product Preview"
                    className="w-full h-full max-h-[85vh] object-contain"
                />

                {/* Subtle Gradient Overlay for depth */}
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/20 rounded-3xl" />
            </div>
        </div>
    );
}
