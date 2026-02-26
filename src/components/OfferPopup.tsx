import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OfferPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // To handle the entrance after delay

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
            setIsVisible(true);
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer);
    }, []);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return (
        <>
            {/* Pulsing Trigger Button in Bottom Left */}
            <AnimatePresence>
                {isVisible && !isOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: -20 }}
                        onClick={openPopup}
                        className="fixed bottom-6 left-6 z-[90] w-14 h-14 rounded-full bg-brand-rose text-white shadow-elevated flex items-center justify-center group pointer-events-auto"
                        aria-label="View Special Offer"
                    >
                        <div className="absolute inset-0 rounded-full bg-brand-rose animate-ping opacity-25" />
                        <Gift className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />

                        {/* Tooltip */}
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-brand-charcoal text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
                            Special Offer
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 pointer-events-none">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closePopup}
                            className="absolute inset-0 bg-brand-charcoal/20 backdrop-blur-sm pointer-events-auto"
                        />

                        {/* Popup Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-md glass-warm rounded-3xl overflow-hidden shadow-elevated border border-white/50 pointer-events-auto"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                <Gift className="w-32 h-32 text-brand-rose rotate-12" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 opacity-10 pointer-events-none">
                                <Heart className="w-24 h-24 text-brand-rose -rotate-12" />
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={closePopup}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/50 hover:bg-white flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose transition-all z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative p-8 md:p-10 flex flex-col items-center text-center">
                                {/* Icon Header */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-rose to-brand-rose-light flex items-center justify-center mb-6 shadow-glow animate-float-gentle">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>

                                {/* Text Content */}
                                <span className="font-body text-eyebrow text-brand-rose mb-3">Special Moment Only For You</span>

                                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-brand-charcoal mb-4 leading-tight font-bold tracking-tight px-2">
                                    "If He/She likes you then they will <span className="text-brand-rose">buy one for you.</span>"
                                </h2>

                                <p className="font-body text-brand-charcoal/60 text-sm md:text-base mb-8 leading-relaxed">
                                    Sometimes the best gifts are the ones we receive from those who truly care.
                                </p>

                                {/* Offer Card */}
                                <div className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 mb-8 border-dashed relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        Your Secret Code
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="font-display text-4xl text-brand-rose font-bold mb-1">LOVE10</span>
                                        <span className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest">Flat 10% OFF on your first order</span>
                                    </div>
                                </div>

                                {/* Action */}
                                <Link
                                    to="/all-products"
                                    onClick={closePopup}
                                    className="w-full py-4 bg-brand-charcoal text-white rounded-full font-body font-bold text-sm shadow-elevated hover:bg-brand-rose transition-all active:scale-95 flex items-center justify-center gap-2 group"
                                >
                                    Claim This Offer
                                    <Gift className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
