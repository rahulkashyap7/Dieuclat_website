import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShoppingBag, Heart, Eye, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImagePreview from '../components/ImagePreview';

gsap.registerPlugin(ScrollTrigger);

const allProducts = [
    {
        id: 1,
        name: 'Eternal Bloom Box',
        price: '₹2,400',
        originalPrice: '₹2,800',
        rating: 4.9,
        reviews: 128,
        image: 'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
        tag: 'Bestseller',
        tagColor: 'from-amber-400 to-orange-500',
    },
    {
        id: 2,
        name: 'Velvet Rose Hamper',
        price: '₹2,800',
        originalPrice: '₹3,200',
        rating: 5.0,
        reviews: 96,
        image: 'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
        tag: 'New',
        tagColor: 'from-emerald-400 to-teal-500',
    },
    {
        id: 3,
        name: 'Linen & Lace Set',
        price: '₹3,200',
        originalPrice: '₹3,600',
        rating: 4.8,
        reviews: 84,
        image: 'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
        tag: null,
        tagColor: '',
    },
    {
        id: 4,
        name: 'Golden Glow Basket',
        price: '₹4,500',
        originalPrice: '₹5,000',
        rating: 4.7,
        reviews: 64,
        image: 'https://ik.imagekit.io/72whyqnco/Products/4.jpg',
        tag: 'Limited',
        tagColor: 'from-purple-400 to-pink-500',
    },
    {
        id: 5,
        name: 'Morning Mist Set',
        price: '₹1,800',
        originalPrice: '₹2,200',
        rating: 4.6,
        reviews: 42,
        image: 'https://ik.imagekit.io/72whyqnco/Products/5.jpg',
        tag: null,
        tagColor: '',
    },
    {
        id: 6,
        name: 'Midnight Serenade',
        price: '₹3,900',
        originalPrice: '₹4,500',
        rating: 4.9,
        reviews: 89,
        image: 'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
        tag: 'Trending',
        tagColor: 'from-blue-400 to-indigo-500',
    },
    {
        id: 7,
        name: 'Rustic Charm Box',
        price: '₹2,100',
        originalPrice: '₹2,500',
        rating: 4.5,
        reviews: 56,
        image: 'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
        tag: null,
        tagColor: '',
    },
    {
        id: 8,
        name: 'Crystal Clear Hamper',
        price: '₹5,200',
        originalPrice: '₹6,000',
        rating: 5.0,
        reviews: 31,
        image: 'https://ik.imagekit.io/72whyqnco/Products/8.jpg',
        tag: 'Premium',
        tagColor: 'from-slate-400 to-slate-600',
    },
    {
        id: 9,
        name: 'Saffron Bliss Set',
        price: '₹3,400',
        originalPrice: '₹3,800',
        rating: 4.8,
        reviews: 72,
        image: 'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
        tag: null,
        tagColor: '',
    },
];

export default function AllProducts() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const section = sectionRef.current;
        const header = headerRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!section || !header || cards.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                header,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                }
            );

            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: 0.2 + index * 0.1,
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative min-h-screen">
            <main className="pt-32 pb-20">
                <section ref={sectionRef} className="relative max-w-7xl mx-auto px-6 lg:px-12">
                    {/* Header */}
                    <div ref={headerRef} className="mb-12">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-rose transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span className="font-body text-sm font-medium">Back to Home</span>
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="inline-block text-eyebrow text-brand-rose mb-4 px-4 py-2 glass-warm rounded-full">
                                    Exquisite Collection
                                </span>
                                <h1 className="font-display text-[clamp(40px,6vw,80px)] leading-tight text-brand-charcoal">
                                    Our Entire <span className="text-gradient">Catalog</span>
                                </h1>
                            </div>

                            <button className="flex items-center gap-2 px-6 py-3 glass-warm rounded-full font-body text-sm font-medium text-brand-charcoal hover:bg-white/70 transition-all">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filter & Sort
                            </button>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                        {allProducts.map((product, index) => (
                            <div
                                key={product.id}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="group perspective"
                            >
                                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden shadow-soft card-lift border border-white/50">
                                    {/* Tag */}
                                    {product.tag && (
                                        <div className={`absolute top-2 left-2 md:top-3 md:left-3 z-10 px-1.5 md:px-2.5 py-0.5 md:py-1 bg-gradient-to-r ${product.tagColor} rounded-full shadow-lg`}>
                                            <span className="font-body text-[7px] md:text-[8px] font-bold text-white uppercase tracking-widest">
                                                {product.tag}
                                            </span>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex flex-col gap-1 md:gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                                        <button className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all shadow-soft active:scale-95">
                                            <Heart className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => setPreviewImage(product.image)}
                                            className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all shadow-soft active:scale-95"
                                        >
                                            <Eye className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                        </button>
                                    </div>

                                    {/* Image */}
                                    <div className="aspect-square overflow-hidden bg-brand-cream/50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-3 md:p-4">
                                        {/* Rating & Tag Info */}
                                        <div className="flex items-center justify-between mb-1 md:mb-1.5">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-brand-rose text-brand-rose" />
                                                <span className="font-body text-[10px] md:text-[11px] font-semibold text-brand-charcoal">
                                                    {product.rating}
                                                </span>
                                                <span className="font-body text-[8px] md:text-[9px] text-brand-charcoal/40">
                                                    ({product.reviews})
                                                </span>
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <h3 className="font-display text-sm md:text-base lg:text-lg text-brand-charcoal mb-2 md:mb-3 group-hover:text-brand-rose transition-colors duration-300 line-clamp-1">
                                            {product.name}
                                        </h3>

                                        {/* Price & Add to Cart */}
                                        <div className="flex items-center justify-between gap-1.5 md:gap-2">
                                            <div className="flex flex-col">
                                                <span className="font-body text-sm md:text-base font-bold text-brand-rose">
                                                    {product.price}
                                                </span>
                                                <span className="font-body text-[8px] md:text-[9px] text-brand-charcoal/40 line-through">
                                                    {product.originalPrice}
                                                </span>
                                            </div>

                                            <button className="flex items-center justify-center h-8 md:h-9 px-2 md:px-3 bg-brand-charcoal text-white font-body text-[9px] md:text-[10px] font-medium rounded-lg hover:bg-brand-rose transition-all duration-300 group/btn overflow-hidden relative shadow-soft shrink-0">
                                                <span className="relative z-10 flex items-center gap-1 md:gap-1.5">
                                                    <ShoppingBag className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                                    Add
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-brand-rose to-brand-rose-light translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <ImagePreview
                image={previewImage}
                onClose={() => setPreviewImage(null)}
            />
        </div>
    );
}
