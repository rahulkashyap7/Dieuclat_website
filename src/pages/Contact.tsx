import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline({ delay: 0.2 });

            tl.fromTo('.contact-header > *',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
            );

            tl.fromTo('.contact-card',
                { scale: 0.95, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
                "-=0.4"
            );

            tl.fromTo('.info-item',
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
                "-=0.6"
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="relative min-h-screen pt-32 pb-24 overflow-hidden">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-brand-rose/5 blur-[120px] animate-pulse-soft" />
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-brand-warm/10 blur-[100px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="contact-header text-center mb-16 lg:mb-24">
                    <span className="inline-block text-eyebrow text-brand-rose mb-6 px-4 py-2 glass-warm rounded-full">
                        Get in Touch
                    </span>
                    <h1 className="font-display text-[clamp(44px,7vw,84px)] leading-[0.92] text-brand-charcoal mb-6">
                        Let's Start a <span className="text-gradient italic font-body">Conversation.</span>
                    </h1>
                    <p className="font-body text-brand-charcoal/60 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                        Have a special request or just want to say hello? We'd love to hear from you.
                        Our team is here to help you create the perfect gifting experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Info (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-12">
                            <div className="info-item group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl glass-warm flex items-center justify-center text-brand-rose shadow-soft group-hover:bg-brand-rose group-hover:text-white transition-all duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest mb-1">Email Us</p>
                                        <a href="mailto:hello@dieuclat.com" className="font-display text-xl text-brand-charcoal hover:text-brand-rose transition-colors">
                                            hello@dieuclat.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="info-item group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl glass-warm flex items-center justify-center text-brand-rose shadow-soft group-hover:bg-brand-rose group-hover:text-white transition-all duration-300">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest mb-1">Call Us</p>
                                        <a href="tel:+919876543210" className="font-display text-xl text-brand-charcoal hover:text-brand-rose transition-colors">
                                            +91 98765 43210
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="info-item group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl glass-warm flex items-center justify-center text-brand-rose shadow-soft group-hover:bg-brand-rose group-hover:text-white transition-all duration-300">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest mb-1">Studio Address</p>
                                        <p className="font-display text-xl text-brand-charcoal">
                                            Worli, Mumbai,<br />Maharashtra 400018
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="info-item group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl glass-warm flex items-center justify-center text-brand-rose shadow-soft group-hover:bg-brand-rose group-hover:text-white transition-all duration-300">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest mb-1">Working Hours</p>
                                        <p className="font-display text-xl text-brand-charcoal">
                                            Mon - Sat: 10AM - 7PM<br />Sun: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Connect */}
                        <div className="info-item pt-8 border-t border-brand-charcoal/5">
                            <p className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest mb-6">Connect with us</p>
                            <div className="flex gap-4">
                                {[
                                    { icon: Instagram, label: 'Instagram' },
                                    { icon: Facebook, label: 'Facebook' },
                                    { icon: MessageCircle, label: 'WhatsApp' }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-12 h-12 rounded-full glass flex items-center justify-center text-brand-charcoal/60 hover:text-white hover:bg-brand-rose transition-all shadow-soft"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (8 cols) */}
                    <div className="lg:col-span-8">
                        <div className="contact-card glass-warm rounded-[2.5rem] p-8 lg:p-12 shadow-elevated border border-white/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/5 blur-[80px] rounded-full pointer-events-none" />

                            <h2 className="font-display text-3xl text-brand-charcoal mb-10 text-balance">
                                Send us a message and we'll get back to you within 24 hours.
                            </h2>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-body text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest ml-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-4 bg-white/50 border border-brand-charcoal/5 rounded-2xl font-body text-sm focus:outline-none focus:border-brand-rose/30 focus:bg-white transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-body text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest ml-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-6 py-4 bg-white/50 border border-brand-charcoal/5 rounded-2xl font-body text-sm focus:outline-none focus:border-brand-rose/30 focus:bg-white transition-all"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-body text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest ml-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-4 bg-white/50 border border-brand-charcoal/5 rounded-2xl font-body text-sm focus:outline-none focus:border-brand-rose/30 focus:bg-white transition-all"
                                            placeholder="+91"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-body text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest ml-1">
                                            Inquiry Type
                                        </label>
                                        <select
                                            className="w-full px-6 py-4 bg-white/50 border border-brand-charcoal/5 rounded-2xl font-body text-sm focus:outline-none focus:border-brand-rose/30 focus:bg-white transition-all appearance-none cursor-pointer"
                                        >
                                            <option>Curated Hampers</option>
                                            <option>Custom Gift Set</option>
                                            <option>Corporate Gifting</option>
                                            <option>Wedding Inquiry</option>
                                            <option>General Support</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="font-body text-[10px] font-bold text-brand-charcoal/40 uppercase tracking-widest ml-1">
                                        Your Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        className="w-full px-6 py-4 bg-white/50 border border-brand-charcoal/5 rounded-2xl font-body text-sm focus:outline-none focus:border-brand-rose/30 focus:bg-white transition-all resize-none"
                                        placeholder="Tell us about the moment you're celebrating..."
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="w-full group inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-brand-rose to-brand-rose-light text-white font-body text-sm font-semibold rounded-full shadow-glow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    Send Message
                                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
