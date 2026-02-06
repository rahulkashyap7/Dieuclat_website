import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Star, ShoppingBag, Heart, Eye, ArrowLeft, SlidersHorizontal, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImagePreview from '../components/ImagePreview';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { allProducts as productsData } from '../data/products';

export default function AllProducts() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    // States for Filtering and Sorting
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('featured');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

    // Categories extraction
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(productsData.map(p => p.category))];
        return cats;
    }, []);

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        let result = [...productsData];

        // Category Filter
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        // Price Filter (Extract numeric value)
        result = result.filter(p => {
            const price = parseInt(p.price.replace('₹', '').replace(',', ''));
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) =>
                    parseInt(a.price.replace('₹', '').replace(',', '')) -
                    parseInt(b.price.replace('₹', '').replace(',', ''))
                );
                break;
            case 'price-high':
                result.sort((a, b) =>
                    parseInt(b.price.replace('₹', '').replace(',', '')) -
                    parseInt(a.price.replace('₹', '').replace(',', ''))
                );
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            default: // featured / newest
                break;
        }

        return result;
    }, [activeCategory, sortBy, priceRange]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
            );
        });
        return () => ctx.revert();
    }, []);

    // Animation for Grid items when they change
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const cards = grid.children;
        const ctx = gsap.context(() => {
            gsap.fromTo(cards,
                { y: 30, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power2.out',
                    clearProps: 'all'
                }
            );
        });
        return () => ctx.revert();
    }, [filteredProducts]);

    const sortOptions = [
        { id: 'featured', label: 'Featured' },
        { id: 'price-low', label: 'Price: Low to High' },
        { id: 'price-high', label: 'Price: High to Low' },
        { id: 'rating', label: 'Top Rated' }
    ];

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

                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 glass-warm rounded-full font-body text-sm font-medium text-brand-charcoal hover:bg-white/70 transition-all shadow-soft active:scale-95 group"
                            >
                                <SlidersHorizontal className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                Filter & Sort
                                {(activeCategory !== 'All' || sortBy !== 'featured') && (
                                    <span className="w-2 h-2 rounded-full bg-brand-rose animate-pulse" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div
                        ref={gridRef}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
                    >
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
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
                                    <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex flex-col gap-1 md:gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                        <button
                                            onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                                            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all shadow-soft active:scale-95"
                                        >
                                            <Heart className={`w-4 md:w-5 h-4 md:h-5 ${isInWishlist(product.id) ? 'fill-brand-rose text-brand-rose' : ''}`} />
                                        </button>
                                        <button
                                            onClick={() => setPreviewImage(product.image)}
                                            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all shadow-soft active:scale-95"
                                        >
                                            <Eye className="w-4 md:w-5 h-4 md:h-5" />
                                        </button>
                                    </div>

                                    {/* Image */}
                                    <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-brand-cream/50">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </Link>

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
                                                    ({product.reviewsCount})
                                                </span>
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <Link to={`/product/${product.id}`}>
                                            <h3 className="font-display text-sm md:text-base lg:text-lg text-brand-charcoal mb-2 md:mb-3 group-hover:text-brand-rose transition-colors duration-300 line-clamp-1">
                                                {product.name}
                                            </h3>
                                        </Link>

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

                                            <button
                                                onClick={() => addToCart(product)}
                                                className="flex items-center justify-center h-8 md:h-9 px-2 md:px-3 bg-brand-charcoal text-white font-body text-[9px] md:text-[10px] font-medium rounded-lg hover:bg-brand-rose transition-all duration-300 group/btn overflow-hidden relative shadow-soft shrink-0"
                                            >
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

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 rounded-full bg-brand-rose/5 flex items-center justify-center mb-6">
                                <SlidersHorizontal className="w-8 h-8 text-brand-rose/20" />
                            </div>
                            <h3 className="font-display text-2xl text-brand-charcoal mb-2">No products found</h3>
                            <p className="font-body text-brand-charcoal/40 mb-8 max-w-xs">We couldn't find any products matching your current filters.</p>
                            <button
                                onClick={() => {
                                    setActiveCategory('All');
                                    setSortBy('featured');
                                    setPriceRange([0, 10000]);
                                }}
                                className="px-8 py-3 bg-brand-charcoal text-white rounded-full font-body text-sm font-bold shadow-soft hover:bg-brand-rose transition-all"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Filter Drawer Overlay */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 w-full max-w-md h-full bg-warm z-[101] shadow-2xl flex flex-col"
                        >
                            <div className="p-8 flex items-center justify-between border-b border-brand-charcoal/5">
                                <h2 className="font-display text-3xl text-brand-charcoal">Filters</h2>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-charcoal hover:text-brand-rose transition-all shadow-soft"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-12">
                                {/* Sort Section */}
                                <div className="space-y-6">
                                    <h4 className="font-display text-lg text-brand-charcoal uppercase tracking-widest">Sort By</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => setSortBy(opt.id)}
                                                className={`flex items-center justify-between px-6 py-4 rounded-2xl border transition-all ${sortBy === opt.id
                                                    ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-elevated'
                                                    : 'bg-white text-brand-charcoal border-white hover:border-brand-rose/30 shadow-soft'
                                                    }`}
                                            >
                                                <span className="font-body font-medium">{opt.label}</span>
                                                {sortBy === opt.id && <Check className="w-4 h-4" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories Section */}
                                <div className="space-y-6">
                                    <h4 className="font-display text-lg text-brand-charcoal uppercase tracking-widest">Category</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                className={`px-6 py-3 rounded-full font-body text-sm font-bold transition-all ${activeCategory === cat
                                                    ? 'bg-brand-rose text-white shadow-glow'
                                                    : 'bg-white text-brand-charcoal border border-white hover:border-brand-rose/30 shadow-soft'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Section - Simplified for now but stylish */}
                                <div className="space-y-6">
                                    <h4 className="font-display text-lg text-brand-charcoal uppercase tracking-widest">Price Range</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between font-body text-sm text-brand-charcoal/60">
                                            <span>₹0</span>
                                            <span>₹10,000+</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10000"
                                            step="500"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full h-1.5 bg-brand-charcoal/10 rounded-full appearance-none cursor-pointer accent-brand-rose"
                                        />
                                        <div className="p-4 bg-white rounded-2xl shadow-soft text-center">
                                            <span className="font-body text-xs text-brand-charcoal/40 uppercase tracking-widest block mb-1">Up to</span>
                                            <span className="font-display text-xl text-brand-rose font-bold">₹{priceRange[1].toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-white border-t border-brand-charcoal/5 flex gap-4">
                                <button
                                    onClick={() => {
                                        setActiveCategory('All');
                                        setSortBy('featured');
                                        setPriceRange([0, 10000]);
                                    }}
                                    className="flex-1 py-4 font-body font-bold text-sm text-brand-charcoal/40 hover:text-brand-rose transition-colors"
                                >
                                    Reset All
                                </button>
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="flex-[2] py-4 bg-brand-charcoal text-white rounded-full font-body font-bold text-sm shadow-elevated hover:bg-brand-rose transition-all"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <ImagePreview
                image={previewImage}
                onClose={() => setPreviewImage(null)}
            />
        </div>
    );
}
