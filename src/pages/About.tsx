import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles, Gift, ArrowRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import RotatingText from '../components/RotatingText';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Entrance
            gsap.fromTo('.about-hero-content > *',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
            );

            gsap.fromTo('.about-hero-image',
                { scale: 1.1, opacity: 0, rotateY: 10 },
                { scale: 1, opacity: 1, rotateY: 0, duration: 1.5, ease: 'power2.out', delay: 0.4 }
            );

            // Section Fade-ins
            const fadeSections = ['.story-section', '.values-section', '.vision-section'];
            fadeSections.forEach((section) => {
                gsap.fromTo(section,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // Stats Counting
            gsap.from('.stat-number', {
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: 'top 85%'
                }
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="relative min-h-screen overflow-hidden">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-brand-rose/5 blur-[120px] animate-pulse-soft" />
                <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-brand-sage/5 blur-[100px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
            </div>

            <main className="relative z-10 pt-32 pb-24">
                {/* --- Hero Section --- */}
                <section ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-12 mb-24 lg:mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                        <div className="about-hero-content order-2 lg:order-1">
                            <span className="inline-block text-eyebrow text-brand-rose mb-6 px-4 py-2 glass-warm rounded-full">
                                Our Story
                            </span>
                            <h1 className="font-display text-[clamp(48px,8vw,88px)] leading-[0.9] text-brand-charcoal mb-8">
                                Crafting{' '}
                                <RotatingText
                                    texts={['Moments', 'Stories', 'Smiles', 'Magic', 'Memories']}
                                    mainClassName="inline-flex text-brand-rose"
                                    staggerFrom={"last"}
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: "-100%", opacity: 0 }}
                                    staggerDuration={0.03}
                                    splitLevelClassName="pb-2"
                                    elementLevelClassName="text-gradient"
                                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                    rotationInterval={3000}
                                />
                                {' '}
                                of Joy.
                            </h1>
                            <p className="font-body text-brand-charcoal/60 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg">
                                Dieuclat was born from a simple belief: that every gift should be as unique as the person receiving it. We don't just pack boxes; we curate experiences.
                            </p>
                            <div className="flex flex-wrap gap-12 stats-grid">
                                <div>
                                    <p className="font-display text-4xl text-brand-charcoal mb-1"><span className="stat-number">2021</span></p>
                                    <p className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest">Founded</p>
                                </div>
                                <div>
                                    <p className="font-display text-4xl text-brand-charcoal mb-1"><span className="stat-number">5000</span>+</p>
                                    <p className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest">Smiles Delivered</p>
                                </div>
                                <div>
                                    <p className="font-display text-4xl text-brand-charcoal mb-1"><span className="stat-number">100</span>%</p>
                                    <p className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest">Handmade</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-hero-image order-1 lg:order-2 perspective flex justify-center">
                            <div className="relative w-full max-w-[400px] aspect-square rounded-[2.5rem] overflow-hidden shadow-elevated shine rotate-2 hover:rotate-0 transition-transform duration-700">
                                <img
                                    src="/featured_main.jpg"
                                    alt="Crafting Process"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Story Section --- */}
                <section ref={storyRef} className="story-section max-w-7xl mx-auto px-6 lg:px-12 mb-32 lg:mb-48">
                    <div className="p-10 lg:p-20 glass-warm rounded-[3rem] shadow-soft relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose/5 blur-[60px] rounded-full" />

                        <div className="max-w-3xl mx-auto text-center">
                            <Heart className="w-10 h-10 text-brand-rose mx-auto mb-8" />
                            <h2 className="font-display text-[clamp(32px,4vw,54px)] leading-tight text-brand-charcoal mb-8">
                                The Mission <span className="text-gradient italic font-body">Behind the Brand</span>
                            </h2>
                            <div className="font-body text-brand-charcoal/70 text-lg lg:text-xl leading-relaxed space-y-6">
                                <p>
                                    "Dieuclat" is more than a name; it's a promise of excellence and warmth. We started in a small home studio with a roll of ribbon and a heart full of ideas. Today, we've grown, but our artisanal soul remains the same.
                                </p>
                                <p>
                                    Our mission is to help people express their deepest emotions through the art of gifting. We source the finest materials and collaborate with local artisans to ensure every hamper is a masterpiece of taste and aesthetics.
                                </p>
                            </div>

                            <div className="mt-12 flex justify-center italic font-handwriting text-2xl lg:text-3xl text-brand-rose">
                                — With love, Team Dieuclat
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Values Section --- */}
                <section ref={valuesRef} className="values-section max-w-7xl mx-auto px-6 lg:px-12 mb-32 lg:mb-48">
                    <div className="text-center mb-16">
                        <span className="inline-block text-eyebrow text-brand-rose mb-4 px-4 py-2 glass-warm rounded-full">
                            Our Core Values
                        </span>
                        <h2 className="font-display text-[clamp(36px,5vw,64px)] text-brand-charcoal">
                            What We <span className="text-gradient">Live By</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Sparkles className="w-6 h-6" />,
                                title: "Attention to Detail",
                                desc: "From the first fold of tissue paper to the last hand-tied silk ribbon, we obsess over every tiny detail."
                            },
                            {
                                icon: <Gift className="w-6 h-6" />,
                                title: "Thoughtful Curation",
                                desc: "We select products that complement each other, creating a harmonious sensory experience for the receiver."
                            },
                            {
                                icon: <Camera className="w-6 h-6" />,
                                title: "Visual Storytelling",
                                desc: "A gift should be beautiful before it's even opened. Our packaging is designed to be a visual treat."
                            }
                        ].map((value, i) => (
                            <div key={i} className="group p-8 lg:p-10 glass-warm rounded-3xl shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 border border-white/50">
                                <div className="w-14 h-14 rounded-2xl bg-brand-rose/10 flex items-center justify-center text-brand-rose mb-8 group-hover:bg-brand-rose group-hover:text-white transition-all duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="font-display text-2xl text-brand-charcoal mb-4">{value.title}</h3>
                                <p className="font-body text-brand-charcoal/60 leading-relaxed text-sm lg:text-base">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Vision Section / Final Image --- */}
                <section className="vision-section max-w-7xl mx-auto px-6 lg:px-12 mb-16">
                    <div className="relative h-[400px] lg:h-[600px] rounded-[3.5rem] overflow-hidden shadow-elevated">
                        <img
                            src="/hero_card_c.jpg"
                            alt="Artisanal Setup"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-charcoal/30 flex items-center justify-center text-center p-6">
                            <div className="max-w-2xl">
                                <h2 className="font-display text-[clamp(28px,4vw,54px)] text-white mb-8">
                                    "Gifting is the simplest way to tell someone they matter."
                                </h2>
                                <Link
                                    to="/all-products"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-brand-charcoal font-body text-sm font-semibold rounded-full hover:bg-brand-rose hover:text-white transition-all duration-300 group"
                                >
                                    Browse Our Catalog
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
