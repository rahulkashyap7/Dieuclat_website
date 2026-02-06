import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShoppingBag, Heart, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImagePreview from '../components/ImagePreview';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

gsap.registerPlugin(ScrollTrigger);
// ... existing products ...
// I'll skip the products array and go to the component

const products = [
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
    name: 'Artisan Bliss Box',
    price: '₹3,500',
    originalPrice: '₹4,000',
    rating: 4.6,
    reviews: 52,
    image: 'https://ik.imagekit.io/72whyqnco/Products/5.jpg',
    tag: 'Trending',
    tagColor: 'from-blue-400 to-cyan-500',
  },
  {
    id: 6,
    name: 'Scented Harmony',
    price: '₹1,800',
    originalPrice: '₹2,200',
    rating: 4.9,
    reviews: 112,
    image: 'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
    tag: null,
    tagColor: '',
  },
  {
    id: 7,
    name: 'Midnight Elegance',
    price: '₹5,200',
    originalPrice: '₹6,000',
    rating: 5.0,
    reviews: 45,
    image: 'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
    tag: 'Premium',
    tagColor: 'from-brand-charcoal to-brand-brown',
  },
  {
    id: 8,
    name: 'Botanical Blush',
    price: '₹2,600',
    originalPrice: '₹3,000',
    rating: 4.7,
    reviews: 78,
    image: 'https://ik.imagekit.io/72whyqnco/Products/8.jpg',
    tag: null,
    tagColor: '',
  },
  {
    id: 9,
    name: 'Classic Keepsake',
    price: '₹3,800',
    originalPrice: '₹4,200',
    rating: 4.8,
    reviews: 91,
    image: 'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
    tag: 'Classic',
    tagColor: 'from-brand-rose to-brand-coral',
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
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
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            ease: 'power2.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-20 lg:py-28"
    >
      {/* Warm Background */}
      <div className="absolute inset-0 bg-warm" />
      <div className="absolute inset-0 gradient-rose-subtle" />

      {/* Decorative orb */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-brand-rose/8 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 lg:mb-20">
          <span className="inline-block text-eyebrow text-brand-rose mb-4 px-4 py-2 glass-warm rounded-full">
            Products
          </span>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-tight text-brand-charcoal mb-4">
            This Month's <span className="text-gradient">Top Selling</span>
          </h2>
          <p className="font-body text-brand-charcoal/50 text-base lg:text-lg max-w-md mx-auto">
            Our most loved gifts, handpicked for you
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group perspective"
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden shadow-soft card-lift border border-white/50">
                {/* Tag */}
                {product.tag && (
                  <div className={`absolute top-2 left-2 md:top-3 md:left-3 z-10 px-1.5 md:px-2.5 py-0.5 md:py-1 bg-gradient-to-r ${product.tagColor} rounded-full shadow-lg`}>
                    <span className="font-body text-[7px] md:text-[8px] font-semibold text-white uppercase tracking-wider">
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex flex-col gap-1 md:gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <button
                    onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all shadow-soft active:scale-90"
                  >
                    <Heart className={`w-4 md:w-5 h-4 md:h-5 ${isInWishlist(product.id) ? 'fill-brand-rose text-brand-rose' : ''}`} />
                  </button>
                  <button
                    onClick={() => setPreviewImage(product.image)}
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-charcoal/40 hover:text-brand-rose hover:bg-white transition-all shadow-soft active:scale-90"
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
                        ({product.reviews})
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

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/all-products"
            className="inline-flex items-center gap-3 px-8 py-4 glass-warm text-brand-charcoal font-body text-sm font-medium rounded-full hover:bg-white/70 transition-all duration-300 group"
          >
            View All Products
            <span className="w-8 h-8 rounded-full bg-brand-rose/10 flex items-center justify-center group-hover:bg-brand-rose group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>

      <ImagePreview
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </section>
  );
}
