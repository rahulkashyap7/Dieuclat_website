export interface Product {
    id: number;
    name: string;
    price: string;
    originalPrice: string;
    rating: number;
    reviewsCount: number;
    image: string;
    images: string[];
    description: string;
    fullDescription: string;
    availability: boolean;
    category: string;
    tag?: string;
    tagColor?: string;
    deliveryInfo: string;
    specs: { label: string; value: string }[];
    reviews: { user: string; rating: number; comment: string; date: string }[];
}

export const allProducts: Product[] = [
    {
        id: 1,
        name: 'Eternal Bloom Box',
        price: '₹2,400',
        originalPrice: '₹2,800',
        rating: 4.9,
        reviewsCount: 128,
        image: 'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/4.jpg'
        ],
        description: 'A beautiful arrangement of everlasting flowers in a premium keepsake box.',
        fullDescription: 'Celebrate lasting love with our Eternal Bloom Box. These preserved flowers are treated with a special technique to maintain their natural beauty and softness for up to three years. Hand-arranged by our master florists in a luxurious linen-textured box, it\'s the perfect gift for anniversaries, birthdays, or just because.',
        availability: true,
        category: 'Flower Box',
        tag: 'Bestseller',
        tagColor: 'from-amber-400 to-orange-500',
        deliveryInfo: 'Free delivery within 3-5 business days. Express delivery available in select cities.',
        specs: [
            { label: 'Flower Type', value: 'Preserved Roses & Hydrangeas' },
            { label: 'Box Material', value: 'Premium Linen-Textured Cardboard' },
            { label: 'Dimensions', value: '20cm x 20cm x 15cm' },
            { label: 'Lifespan', value: '1-3 Years' }
        ],
        reviews: [
            { user: 'Sanya M.', rating: 5, comment: 'Absolutely stunning! The flowers look so fresh and the box is very elegant.', date: 'Dec 12, 2025' },
            { user: 'Rahul K.', rating: 4, comment: 'Great gift, my wife loved it. Perfect for decoration.', date: 'Jan 05, 2026' }
        ]
    },
    {
        id: 2,
        name: 'Velvet Rose Hamper',
        price: '₹2,800',
        originalPrice: '₹3,200',
        rating: 5.0,
        reviewsCount: 96,
        image: 'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/5.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/7.jpg'
        ],
        description: 'Luxury velvet box featuring premium red roses and artisan chocolates.',
        fullDescription: 'Indulge in pure luxury with our Velvet Rose Hamper. This curated set combines the timeless elegance of deep red velvet roses with a selection of premium artisan chocolates. Each hamper is meticulously prepared to provide a multi-sensory experience that speaks of sophistication and care.',
        availability: true,
        category: 'Hampers',
        tag: 'New',
        tagColor: 'from-emerald-400 to-teal-500',
        deliveryInfo: 'Ships within 48 hours. Carefully packaged in temperature-controlled boxes.',
        specs: [
            { label: 'Quantity', value: '12-15 Premium Roses' },
            { label: 'Chocolates', value: '8 Piece Artisan Selection' },
            { label: 'Box Finish', value: 'Premium Red Velvet' },
            { label: 'Personalization', value: 'Custom Note Included' }
        ],
        reviews: [
            { user: 'Anjali P.', rating: 5, comment: 'The velvet box is so soft and high quality. The chocolates were delicious!', date: 'Jan 20, 2026' }
        ]
    },
    {
        id: 3,
        name: 'Linen & Lace Set',
        price: '₹3,200',
        originalPrice: '₹3,600',
        rating: 4.8,
        reviewsCount: 84,
        image: 'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/4.jpg'
        ],
        description: 'Delicate linen textures meeting intricate lace designs in a unique gift set.',
        fullDescription: 'Our Linen & Lace Set is the epitome of vintage charm and modern grace. Featuring a hand-wrapped bouquet in sustainable linen fabric finished with delicate lace trimmings, this set is designed for those who appreciate the finer details. Includes a scented soy candle and a handwritten calligraphy card.',
        availability: true,
        category: 'Curated Sets',
        deliveryInfo: 'Standard delivery in 5-7 days. Sustainable packaging used.',
        specs: [
            { label: 'Fabric', value: '100% Organic Linen' },
            { label: 'Lace', value: 'Cotton Crochet Lace' },
            { label: 'Extras', value: 'Scented Soy Candle' },
            { label: 'Packaging', value: 'Eco-friendly Box' }
        ],
        reviews: [
            { user: 'Priya S.', rating: 5, comment: 'Love the eco-friendly approach. It looks so classy!', date: 'Feb 01, 2026' }
        ]
    },
    {
        id: 4,
        name: 'Golden Glow Basket',
        price: '₹4,500',
        originalPrice: '₹5,000',
        rating: 4.7,
        reviewsCount: 64,
        image: 'https://ik.imagekit.io/72whyqnco/Products/4.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/4.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/8.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/7.jpg'
        ],
        description: 'A grand basket filled with golden-themed treats and bright sunflowers.',
        fullDescription: 'Bring sunshine into any room with the Golden Glow Basket. This centerpiece-worthy arrangement features vibrant sunflowers, gold-wrapped premium snacks, and a bottle of sparkling grape juice. Nestled in a reusable hand-woven wicker basket, it\'s a gift that keeps on giving.',
        availability: true,
        category: 'Baskets',
        tag: 'Limited',
        tagColor: 'from-purple-400 to-pink-500',
        deliveryInfo: 'Express same-day delivery available in major metro areas.',
        specs: [
            { label: 'Flowers', value: '6 Premium Sunflowers' },
            { label: 'Basket', value: 'Hand-woven Wicker' },
            { label: 'Drinks', value: 'Sparkling Juice (750ml)' },
            { label: 'Highlights', value: 'Gourmet Nuts & Dates' }
        ],
        reviews: [
            { user: 'Vikram R.', rating: 5, comment: 'The basket is huge and very well presented. Worth every penny.', date: 'Nov 15, 2025' }
        ]
    },
    {
        id: 5,
        name: 'Morning Mist Set',
        price: '₹1,800',
        originalPrice: '₹2,200',
        rating: 4.6,
        reviewsCount: 42,
        image: 'https://ik.imagekit.io/72whyqnco/Products/5.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/5.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/3.jpg'
        ],
        description: 'Refreshing morning-themed gift set with herbal tea and fresh blooms.',
        fullDescription: 'Start the day right with our Morning Mist Set. This calming collection features an assortment of organic herbal teas, a ceramic mug, and a mini-bouquet of fresh seasonal flowers in soft pastel hues. Designed to recreate the tranquility of a misty garden morning.',
        availability: true,
        category: 'Sets',
        deliveryInfo: 'Ships within 24-48 hours.',
        specs: [
            { label: 'Tea', value: '3 Flavors Organic Herbal' },
            { label: 'Mug', value: 'Hand-painted Ceramic' },
            { label: 'Flower Count', value: '5-7 Seasonal Stems' },
            { label: 'Mood', value: 'Relaxing & Refreshing' }
        ],
        reviews: [
            { user: 'Meera G.', rating: 4, comment: 'Very cute set. Perfect for a birthday gift for a tea lover.', date: 'Dec 05, 2025' }
        ]
    },
    {
        id: 6,
        name: 'Midnight Serenade',
        price: '₹3,900',
        originalPrice: '₹4,500',
        rating: 4.9,
        reviewsCount: 89,
        image: 'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/2.jpg'
        ],
        description: 'Elegant evening gift set featuring dark-toned blooms and a luxury candle.',
        fullDescription: 'Captivate the night with Midnight Serenade. This sophisticated set features deep purple and blue hued flowers, paired with a premium ebony candle and rich dark chocolate truffles. Ideal for evening celebrations or adding a touch of drama to home decor.',
        availability: true,
        category: 'Premium',
        tag: 'Trending',
        tagColor: 'from-blue-400 to-indigo-500',
        deliveryInfo: 'Securely packaged for long-distance shipping.',
        specs: [
            { label: 'Candle', value: 'Sandalwood & Musk (40hr Burn)' },
            { label: 'Flowers', value: 'Dahlias & Deep Sea Roses' },
            { label: 'Chocolates', value: '6pc Dark Truffles' },
            { label: 'Packaging', value: 'Matte Black Box' }
        ],
        reviews: [
            { user: 'Karan J.', rating: 5, comment: 'The packaging is top notch. The candle smells amazing.', date: 'Jan 15, 2026' }
        ]
    },
    {
        id: 7,
        name: 'Rustic Charm Box',
        price: '₹2,100',
        originalPrice: '₹2,500',
        rating: 4.5,
        reviewsCount: 56,
        image: 'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/8.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/10.jpg'
        ],
        description: 'Earthy and warm gift box with dried flowers and wooden accessories.',
        fullDescription: 'Embrace the beauty of nature with our Rustic Charm Box. This warm, earthy collection features a curated selection of dried wildflowers, a handcrafted wooden coaster set, and aromatic dried orange slices. It brings a cozy, farmhouse feel to any living space.',
        availability: true,
        category: 'Boxes',
        deliveryInfo: 'Available for pan-India shipping.',
        specs: [
            { label: 'Materials', value: 'Pine Wood & Burlap' },
            { label: 'Flowers', value: 'Dried Lavender & Oats' },
            { label: 'Coasters', value: 'Set of 4 Reclaimed Wood' },
            { label: 'Longevity', value: 'Indefinite (Dried)' }
        ],
        reviews: [
            { user: 'Siddharth M.', rating: 4, comment: 'Nice rustic look. Good for home decor.', date: 'Oct 20, 2025' }
        ]
    },
    {
        id: 8,
        name: 'Crystal Clear Hamper',
        price: '₹5,200',
        originalPrice: '₹6,000',
        rating: 5.0,
        reviewsCount: 31,
        image: 'https://ik.imagekit.io/72whyqnco/Products/8.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/8.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/5.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/6.jpg'
        ],
        description: 'Premium glass-themed hamper with crystal vase and orchid blooms.',
        fullDescription: 'Pure elegance personified. The Crystal Clear Hamper features rare orchids presented in a hand-cut crystal vase, accompanied by premium macarons and a bottle of imported rose water. For those who demand nothing but the absolute best.',
        availability: true,
        category: 'Luxury',
        tag: 'Premium',
        tagColor: 'from-slate-400 to-slate-600',
        deliveryInfo: 'Hand-delivered by our special boutique team.',
        specs: [
            { label: 'Vase', value: '24% Lead Hand-cut Crystal' },
            { label: 'Orchids', value: 'White Phalaenopsis' },
            { label: 'Sweet', value: '12pc French Macarons' },
            { label: 'Exclusivity', value: 'Boutique Collection Only' }
        ],
        reviews: [
            { user: 'Anita L.', rating: 5, comment: 'Breathtaking. The vase is a collector\'s piece.', date: 'Feb 03, 2026' }
        ]
    },
    {
        id: 9,
        name: 'Saffron Bliss Set',
        price: '₹3,400',
        originalPrice: '₹3,800',
        rating: 4.8,
        reviewsCount: 72,
        image: 'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/4.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/1.jpg'
        ],
        description: 'Traditional yet modern set featuring saffron-infused treats and marigolds.',
        fullDescription: 'A festivity in a box. The Saffron Bliss Set celebrates tradition with a modern twist. Featuring high-grade Kashmiri saffron, traditional sweets with a contemporary flavor palette, and beautifully arranged marigolds. Perfect for festive gifting and auspicious occasions.',
        availability: true,
        category: 'Festive',
        deliveryInfo: 'Festive season delivery timings may apply.',
        specs: [
            { label: 'Saffron', value: 'Grade A+ Kashmiri (2g)' },
            { label: 'Flowers', value: 'Double Petal Marigolds' },
            { label: 'Sweets', value: 'Sugar-free Artisan Mithai' },
            { label: 'Box Design', value: 'Gold Foil Traditional Motif' }
        ],
        reviews: [
            { user: 'Hitesh V.', rating: 5, comment: 'Great for Diwali gifting. Excellent quality of saffron.', date: 'Oct 30, 2025' }
        ]
    },
    {
        id: 301,
        name: 'Dried Flower Wall Art',
        price: '₹1,899',
        originalPrice: '₹2,499',
        rating: 4.8,
        reviewsCount: 54,
        image: 'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/5.jpg'
        ],
        description: 'Beautiful preserved blooms arranged in a premium frame.',
        fullDescription: 'Transform your walls into a living gallery with our Dried Flower Wall Art. Each piece is unique, featuring a curated selection of preserved blooms, moss, and foliage meticulously arranged within a high-quality solid wood shadow box frame. No maintenance required, just pure aesthetic joy.',
        availability: true,
        category: 'Wall Art',
        tag: 'Deal',
        tagColor: 'from-brand-rose to-brand-rose-light',
        deliveryInfo: 'Carefully crated for safe wall-to-wall delivery.',
        specs: [
            { label: 'Frame', value: 'Solid Oak Wood' },
            { label: 'Glass', value: 'Museum-quality UV Protection' },
            { label: 'Size', value: '30cm x 40cm' },
            { label: 'Mounting', value: 'Ready to hang' }
        ],
        reviews: [
            { user: 'Sonali T.', rating: 5, comment: 'Adds such a lovely touch to my bedroom. Very unique.', date: 'Dec 22, 2025' }
        ]
    },
    {
        id: 302,
        name: 'Luxury Gift Hamper',
        price: '₹2,199',
        originalPrice: '₹2,799',
        rating: 4.9,
        reviewsCount: 82,
        image: 'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/7.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/8.jpg'
        ],
        description: 'Curated selection of artisan treats and blooms.',
        fullDescription: 'The ultimate expression of thoughtfulness. Our Luxury Gift Hamper brings together the very best of our collections. From hand-poured candles to gourmet delights and our signature floral arrangements, this hamper is designed to wow at first sight and delight with every detail discovered.',
        availability: true,
        category: 'Deals',
        tag: 'Deal',
        tagColor: 'from-brand-rose to-brand-rose-light',
        deliveryInfo: 'Includes a personalized handwritten note.',
        specs: [
            { label: 'Combo', value: 'Flowers + Snacks + Candle' },
            { label: 'Theme', value: 'Signature Blush' },
            { label: 'Occasion', value: 'Versatile Gifting' },
            { label: 'Packaging', value: 'Branded Rigid Box' }
        ],
        reviews: [
            { user: 'Rishi P.', rating: 5, comment: 'Excellent value for money. The variety is great.', date: 'Jan 10, 2026' }
        ]
    },
    {
        id: 303,
        name: 'Signature Bloom Box',
        price: '₹2,499',
        originalPrice: '₹3,199',
        rating: 4.7,
        reviewsCount: 110,
        image: 'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/10.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/4.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/5.jpg'
        ],
        description: 'Our bestselling arrangement in a keepsake box.',
        fullDescription: 'Our Signature Bloom Box is what started it all. A perfectly balanced arrangement of seasonal flowers, chosen for their longevity and fragrance, presented in our iconic circular box. It\'s the gold standard of modern floral gifting.',
        availability: true,
        category: 'Deals',
        tag: 'Deal',
        tagColor: 'from-brand-rose to-brand-rose-light',
        deliveryInfo: 'Standard 3-5 day delivery.',
        specs: [
            { label: 'Box Shape', value: 'Iconic Circular' },
            { label: 'Flower Density', value: 'Premium / Full' },
            { label: 'Maintenance', value: 'Water sponge base' },
            { label: 'Sustainability', value: 'Recyclable Box' }
        ],
        reviews: [
            { user: 'Nisha K.', rating: 4, comment: 'Beautiful and lasted almost a week!', date: 'Jan 28, 2026' }
        ]
    },
    {
        id: 11,
        name: 'The Bloom Box',
        price: '₹2,800',
        originalPrice: '₹3,400',
        rating: 4.9,
        reviewsCount: 156,
        image: 'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/4.jpg'
        ],
        description: 'Our signature bloom box featuring a vibrant mix of seasonal flowers.',
        fullDescription: 'The Bloom Box is our flagship product, designed to bring joy and color to any space. Each box is hand-packed with the freshest seasonal blooms, chosen for their beauty and longevity. Presented in our premium circular gift box with a waterproof liner.',
        availability: true,
        category: 'Curated Sets',
        deliveryInfo: 'Ships within 24 hours of order.',
        specs: [
            { label: 'Flower Count', value: '18-22 Premium Stems' },
            { label: 'Box Type', value: 'Signature Round' },
            { label: 'Watering', value: '2-3 times per week' }
        ],
        reviews: [
            { user: 'Sonia P.', rating: 5, comment: 'Simply beautiful. The colors are so vibrant!', date: 'Jan 15, 2026' }
        ]
    },
    {
        id: 12,
        name: 'Sweet Indulgence',
        price: '₹1,950',
        originalPrice: '₹2,400',
        rating: 4.8,
        reviewsCount: 78,
        image: 'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/2.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/5.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/6.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/1.jpg'
        ],
        description: 'A sweet collection of flowers paired with hand-crafted chocolates.',
        fullDescription: 'Indulge your senses with this delightful pairing. Sweet Indulgence brings together a charming petite bouquet and a box of our most popular artisan truffles. It\'s a perfect thank-you, birthday, or just-because gift.',
        availability: true,
        category: 'Curated Sets',
        deliveryInfo: 'Includes cold-chain packaging for chocolates.',
        specs: [
            { label: 'Sweets', value: '6pc Artisan Truffles' },
            { label: 'Flowers', value: 'Pastel Seasonal Mix' },
            { label: 'Style', value: 'European Bouquet' }
        ],
        reviews: [
            { user: 'Amit G.', rating: 5, comment: 'The chocolates were amazing and the flowers stayed fresh for days.', date: 'Dec 02, 2025' }
        ]
    },
    {
        id: 13,
        name: 'Linen & Love',
        price: '₹3,200',
        originalPrice: '₹3,800',
        rating: 5.0,
        reviewsCount: 42,
        image: 'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
        images: [
            'https://ik.imagekit.io/72whyqnco/Products/3.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/1.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/4.jpg',
            'https://ik.imagekit.io/72whyqnco/Products/10.jpg'
        ],
        description: 'A premium linen-wrapped bouquet featuring rare flower varieties.',
        fullDescription: 'Linen & Love is for the true flower connoisseur. Wrapped in organic, sustainable linen and tied with raw silk ribbon, this arrangement features a selection of rare and exotic blooms that speak of timeless elegance and deep affection.',
        availability: true,
        category: 'Curated Sets',
        deliveryInfo: 'Special handling included for delicate blooms.',
        specs: [
            { label: 'Wrapping', value: '100% Organic Linen' },
            { label: 'Ribbon', value: 'Raw Silk Hand-dyed' },
            { label: 'Flower Type', value: 'Exotica Selection' }
        ],
        reviews: [
            { user: 'Rina T.', rating: 5, comment: 'The wrapping is so unique and high-quality. Truly a premium gift.', date: 'Feb 05, 2026' }
        ]
    }
];
