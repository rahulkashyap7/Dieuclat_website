import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#EDE8E2]"
                >
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-64 h-64 lg:w-80 lg:h-80 relative flex items-center justify-center">
                            {/* Decorative background glow */}
                            <div className="absolute inset-0 bg-brand-rose/20 blur-[100px] rounded-full animate-pulse-soft" />

                            <DotLottieReact
                                src="https://lottie.host/42f366e0-f594-4c67-99b7-7db5e62274a2/A30Z2y6uSM.lottie"
                                loop
                                autoplay
                                className="w-full h-full"
                            />
                        </div>

                        {/* Elegant loading text */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-center"
                        >
                            <span className="font-display text-2xl tracking-[0.3em] text-brand-charcoal uppercase">
                                Dieuclat
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
