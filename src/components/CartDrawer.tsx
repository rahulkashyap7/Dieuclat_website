import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isCartOpen) {
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
    }, [isCartOpen]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-[60] bg-brand-charcoal/40 backdrop-blur-sm hidden opacity-0"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div
                ref={contentRef}
                className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[400px] glass-warm shadow-elevated translate-x-full overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-brand-charcoal/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-brand-rose" />
                        <h2 className="font-display text-xl text-brand-charcoal font-semibold">Your Cart</h2>
                        <span className="w-6 h-6 rounded-full bg-brand-rose/10 flex items-center justify-center text-[10px] font-bold text-brand-rose">
                            {cart.length}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-brand-charcoal/60 hover:text-brand-rose hover:bg-white transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center mb-6">
                                <ShoppingBag className="w-8 h-8 text-brand-charcoal/20" />
                            </div>
                            <h3 className="font-display text-xl text-brand-charcoal mb-2">Cart is empty</h3>
                            <p className="font-body text-sm text-brand-charcoal/40 mb-8 max-w-[240px]">
                                Looks like you haven't added anything to your cart yet.
                            </p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="px-8 py-3 bg-brand-charcoal text-white font-body text-sm font-medium rounded-full hover:bg-brand-rose transition-all shadow-soft"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {cart.map((item) => (
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
                                                    onClick={() => removeFromCart(item.id)}
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
                                            <div className="flex items-center gap-3 glass-warm rounded-full px-2 py-1 border border-brand-charcoal/5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-6 h-6 rounded-full flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all active:scale-90"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="font-body text-xs font-bold text-brand-charcoal min-w-[12px] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-6 h-6 rounded-full flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all active:scale-90"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <span className="font-body text-sm font-bold text-brand-charcoal/60">
                                                {formatPrice(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 bg-white/50 border-t border-brand-charcoal/10">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-body text-sm text-brand-charcoal/60">Subtotal</span>
                            <span className="font-display text-2xl font-bold text-brand-charcoal">
                                {formatPrice(cartTotal)}
                            </span>
                        </div>
                        <button className="w-full h-14 bg-brand-charcoal text-white font-body text-sm font-semibold rounded-2xl hover:bg-brand-rose transition-all shadow-soft flex items-center justify-center gap-3 group">
                            Proceed to Checkout
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-center font-body text-[10px] text-brand-charcoal/40 mt-4">
                            Shipping and taxes calculated at checkout
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
