import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistDrawer() {
    const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isWishlistOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, display: 'block', ease: 'power2.out' });
            gsap.fromTo(
                contentRef.current,
                { x: '100%' },
                { x: '0%', duration: 0.5, ease: 'power3.out' }
            );
        } else {
            document.body.style.overflow = '';
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.4, display: 'none', ease: 'power2.in' });
            gsap.to(contentRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
        }
    }, [isWishlistOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[60] bg-brand-charcoal/40 backdrop-blur-sm hidden opacity-0"
                onClick={() => setIsWishlistOpen(false)}
            />

            {/* Drawer */}
            <div
                ref={contentRef}
                className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[400px] glass-warm shadow-elevated translate-x-full overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-brand-charcoal/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-brand-rose fill-brand-rose" />
                        <h2 className="font-display text-xl text-brand-charcoal font-semibold">Your Wishlist</h2>
                        <span className="w-6 h-6 rounded-full bg-brand-rose/10 flex items-center justify-center text-[10px] font-bold text-brand-rose">
                            {wishlist.length}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsWishlistOpen(false)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-brand-charcoal/60 hover:text-brand-rose hover:bg-white transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Wishlist Items */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    {wishlist.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center mb-6">
                                <Heart className="w-8 h-8 text-brand-charcoal/20" />
                            </div>
                            <h3 className="font-display text-xl text-brand-charcoal mb-2">Wishlist is empty</h3>
                            <p className="font-body text-sm text-brand-charcoal/40 mb-8 max-w-[240px]">
                                Your favorite items will appear here.
                            </p>
                            <button
                                onClick={() => setIsWishlistOpen(false)}
                                className="px-8 py-3 bg-brand-charcoal text-white font-body text-sm font-medium rounded-full hover:bg-brand-rose transition-all shadow-soft"
                            >
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {wishlist.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-brand-cream shrink-0 border border-white/50 shadow-soft">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-display text-base text-brand-charcoal leading-tight line-clamp-1 group-hover:text-brand-rose transition-colors">
                                                    {item.name}
                                                </h4>
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="text-brand-charcoal/20 hover:text-brand-rose transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="font-body text-sm font-bold text-brand-rose mt-1">
                                                {item.price}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={() => {
                                                    addToCart(item);
                                                    removeFromWishlist(item.id);
                                                }}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-brand-charcoal text-white font-body text-[10px] font-medium rounded-lg hover:bg-brand-rose transition-all shadow-soft"
                                            >
                                                <ShoppingBag className="w-3 h-3" />
                                                Move to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
