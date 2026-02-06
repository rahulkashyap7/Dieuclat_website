import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Star,
    ShoppingBag,
    Heart,
    Truck,
    ShieldCheck,
    Clock,
    RefreshCcw,
    ChevronRight,
    Minus,
    Plus,
    Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { allProducts, type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState<Product | null>(null);
    const [activeImage, setActiveImage] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const currentProduct = allProducts.find(p => p.id === Number(id));
        if (currentProduct) {
            setProduct(currentProduct);
            setActiveImage(currentProduct.image);

            // Get related products (same category or just random ones)
            const related = allProducts
                .filter(p => p.id !== currentProduct.id)
                .slice(0, 4);
            setRelatedProducts(related);
        } else {
            // Product not found
            // navigate('/');
        }
    }, [id, navigate]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-warm">
                <div className="animate-pulse text-brand-charcoal font-display text-2xl">Loading luxury...</div>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        // Here you would normally redirect to checkout
        // For now, let's just open the cart
        // setIsCartOpen(true);
    };

    const toggleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="min-h-screen bg-warm pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm font-body text-brand-charcoal/40 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
                    <Link to="/" className="hover:text-brand-rose transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    <Link to="/all-products" className="hover:text-brand-rose transition-colors">Products</Link>
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    <span className="text-brand-charcoal font-medium truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: Image Gallery */}
                    <div className="space-y-6">
                        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-soft group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImage}
                                    src={activeImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />
                            </AnimatePresence>

                            {product.tag && (
                                <div className={`absolute top-6 left-6 z-10 px-4 py-1.5 bg-gradient-to-r ${product.tagColor} rounded-full shadow-lg`}>
                                    <span className="font-body text-[10px] font-bold text-white uppercase tracking-widest">
                                        {product.tag}
                                    </span>
                                </div>
                            )}

                            <button
                                onClick={toggleWishlist}
                                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all shadow-soft active:scale-90"
                            >
                                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-brand-rose text-brand-rose' : ''}`} />
                            </button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${activeImage === img ? 'border-brand-rose scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                                        }`}
                                >
                                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col space-y-8">
                        <div>
                            <span className="text-eyebrow text-brand-rose mb-2 block">{product.category}</span>
                            <h1 className="font-display text-4xl md:text-5xl text-brand-charcoal mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-rose/10 rounded-full">
                                    <Star className="w-4 h-4 fill-brand-rose text-brand-rose" />
                                    <span className="font-body text-sm font-bold text-brand-charcoal">{product.rating}</span>
                                </div>
                                <span className="font-body text-sm text-brand-charcoal/40 underline underline-offset-4 cursor-pointer hover:text-brand-rose transition-colors">
                                    {product.reviewsCount} verified reviews
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${product.availability ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                                    <span className={`font-body text-xs font-medium ${product.availability ? 'text-emerald-700' : 'text-red-700'}`}>
                                        {product.availability ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="font-display text-4xl text-brand-rose font-bold">{product.price}</span>
                                <span className="font-body text-xl text-brand-charcoal/30 line-through">{product.originalPrice}</span>
                                <span className="bg-brand-rose/10 text-brand-rose text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">Save ₹{parseInt(product.originalPrice.replace('₹', '').replace(',', '')) - parseInt(product.price.replace('₹', '').replace(',', ''))}</span>
                            </div>

                            <p className="font-body text-brand-charcoal/60 leading-relaxed text-lg max-w-xl">
                                {product.description}
                            </p>
                        </div>

                        {/* Order Controls */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 py-8 border-y border-brand-charcoal/5">
                            <div className="flex items-center justify-between bg-white/80 rounded-full px-6 py-3 shadow-soft border border-white/50 min-w-[140px]">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="text-brand-charcoal/40 hover:text-brand-rose transition-colors disabled:opacity-30"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-display text-brand-charcoal text-lg w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="text-brand-charcoal/40 hover:text-brand-rose transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 relative overflow-hidden group px-8 py-4 bg-brand-charcoal text-white rounded-full font-body font-bold text-sm transition-all duration-300 shadow-elevated hover:shadow-glow active:scale-95"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <ShoppingBag className="w-4 h-4" />
                                        Add to Cart
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-rose to-brand-rose-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 px-8 py-4 bg-brand-rose text-white rounded-full font-body font-bold text-sm transition-all duration-300 hover:bg-brand-charcoal shadow-elevated active:scale-95"
                                >
                                    Buy it Now
                                </button>
                            </div>
                        </div>

                        {/* Key Benefits */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                            {[
                                { icon: Truck, label: 'Free Delivery' },
                                { icon: ShieldCheck, label: 'Quality Assured' },
                                { icon: Clock, label: '3-Year Fresh' },
                                { icon: RefreshCcw, label: 'Easy Returns' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 text-center p-3 glass-warm rounded-2xl">
                                    <div className="w-8 h-8 rounded-full bg-brand-rose/10 flex items-center justify-center text-brand-rose">
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <span className="font-body text-[10px] font-medium text-brand-charcoal/60 uppercase tracking-widest">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-white/50 border border-white p-6 rounded-3xl space-y-4">
                            <h4 className="font-display text-lg text-brand-charcoal">Delivery & Returns</h4>
                            <div className="space-y-3">
                                <div className="flex gap-4">
                                    <Truck className="w-5 h-5 text-brand-rose shrink-0" />
                                    <div>
                                        <p className="font-body text-sm font-bold text-brand-charcoal">Free Shipping</p>
                                        <p className="font-body text-xs text-brand-charcoal/40">{product.deliveryInfo}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <RefreshCcw className="w-5 h-5 text-cyan-500 shrink-0" />
                                    <div>
                                        <p className="font-body text-sm font-bold text-brand-charcoal">7-Day Return Policy</p>
                                        <p className="font-body text-xs text-brand-charcoal/40">Not satisfied? We'll make it right with easy returns.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-24">
                    <div className="flex items-center justify-center gap-8 md:gap-16 border-b border-brand-charcoal/5 mb-12">
                        {[
                            { id: 'description', label: 'Description' },
                            { id: 'specs', label: 'Specifications' },
                            { id: 'reviews', label: `Reviews (${product.reviewsCount})` }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`relative pb-6 font-display text-lg md:text-xl transition-all duration-300 ${activeTab === tab.id ? 'text-brand-rose' : 'text-brand-charcoal/40 hover:text-brand-charcoal'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-rose"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'description' && (
                                <motion.div
                                    key="desc"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="max-w-4xl mx-auto"
                                >
                                    <p className="font-body text-brand-charcoal/60 leading-relaxed text-lg mb-8">
                                        {product.fullDescription}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                        <div className="space-y-4">
                                            <h4 className="font-display text-2xl text-brand-charcoal border-l-4 border-brand-rose pl-4">Premium Quality</h4>
                                            <p className="font-body text-brand-charcoal/60 leading-relaxed">
                                                Every element is carefully selected for its visual appeal and structural integrity, ensuring that what you receive is a masterpiece of craftsmanship.
                                            </p>
                                            <ul className="space-y-2">
                                                {['Hand-assembled', 'Eco-friendly materials', 'Artisan craftmanship'].map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2 font-body text-sm text-brand-charcoal/60">
                                                        <Check className="w-4 h-4 text-emerald-500" /> {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="rounded-3xl overflow-hidden shadow-soft aspect-video bg-white">
                                            <img src={product.images[1]} alt="Detail" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'specs' && (
                                <motion.div
                                    key="specs"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <div className="divide-y divide-brand-charcoal/5">
                                        {product.specs.map((spec, idx) => (
                                            <div key={idx} className="flex justify-between py-5 group hover:bg-brand-rose/[0.02] transition-colors rounded-xl px-4">
                                                <span className="font-body text-brand-charcoal/50 font-medium">{spec.label}</span>
                                                <span className="font-display text-brand-charcoal font-semibold">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'reviews' && (
                                <motion.div
                                    key="reviews"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="max-w-3xl mx-auto"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 p-8 glass-warm rounded-[2rem]">
                                        <div className="text-center md:border-r border-brand-charcoal/5">
                                            <p className="text-5xl font-display text-brand-charcoal mb-2">{product.rating}</p>
                                            <div className="flex justify-center gap-1 mb-2">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star key={s} className="w-4 h-4 fill-brand-rose text-brand-rose" />
                                                ))}
                                            </div>
                                            <p className="font-body text-sm text-brand-charcoal/40">Based on {product.reviewsCount} reviews</p>
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            {[
                                                { star: 5, perc: 85 },
                                                { star: 4, perc: 10 },
                                                { star: 3, perc: 3 },
                                                { star: 2, perc: 1 },
                                                { star: 1, perc: 1 }
                                            ].map((line) => (
                                                <div key={line.star} className="flex items-center gap-4">
                                                    <span className="font-body text-xs text-brand-charcoal/40 w-4">{line.star}★</span>
                                                    <div className="flex-1 h-1.5 bg-brand-charcoal/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${line.perc}%` }}
                                                            transition={{ duration: 1, delay: 0.2 }}
                                                            className="h-full bg-brand-rose"
                                                        />
                                                    </div>
                                                    <span className="font-body text-xs text-brand-charcoal/40 w-8">{line.perc}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        {product.reviews.map((review, idx) => (
                                            <div key={idx} className="p-6 bg-white/40 border border-white rounded-[2rem] transition-all duration-300 hover:shadow-soft">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h5 className="font-display text-lg text-brand-charcoal">{review.user}</h5>
                                                        <div className="flex gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-brand-rose text-brand-rose' : 'text-brand-charcoal/10'}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="font-body text-xs text-brand-charcoal/30 italic">{review.date}</span>
                                                </div>
                                                <p className="font-body text-brand-charcoal/60 leading-relaxed italic">
                                                    "{review.comment}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Suggested Products */}
                <div className="mt-32">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-eyebrow text-brand-rose mb-2 block">You may also like</span>
                            <h2 className="font-display text-4xl text-brand-charcoal">Related <span className="text-gradient">Treasures</span></h2>
                        </div>
                        <Link to="/all-products" className="hidden sm:flex items-center gap-2 font-body text-sm font-bold text-brand-charcoal hover:text-brand-rose transition-all group">
                            View All <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <Link
                                key={p.id}
                                to={`/product/${p.id}`}
                                className="group block"
                            >
                                <div className="space-y-4">
                                    <div className="aspect-square rounded-[2rem] overflow-hidden bg-white shadow-soft group-hover:shadow-elevated transition-all duration-500">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div>
                                        <h4 className="font-display text-lg text-brand-charcoal group-hover:text-brand-rose transition-colors line-clamp-1">{p.name}</h4>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="font-body text-brand-rose font-bold">{p.price}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-brand-rose text-brand-rose" />
                                                <span className="font-body text-[11px] font-bold text-brand-charcoal">{p.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
